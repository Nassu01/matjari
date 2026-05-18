<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;

class ProductSeeder extends Seeder
{
    private const SOURCE = 'dummyjson';
    private const GENERATED_SOURCE = 'matjari-generated';
    private const TARGET_TOTAL = 180;

    public function run(): void
    {
        $this->deactivateLegacyLocalImageProducts();

        $categories = $this->categories();
        $brands = $this->brands();
        $products = $this->fetchDummyJsonProducts();
        $imported = 0;

        foreach ($products as $payload) {
            if (! is_array($payload) || empty($payload['id']) || empty($payload['title'])) {
                continue;
            }

            $externalId = (string) $payload['id'];
            $title = trim((string) $payload['title']);
            $category = $categories[$this->categorySlugFor($payload)] ?? $categories['clothing'];
            $brand = $this->brandFor($payload, $brands);

            Product::updateOrCreate(
                [
                    'external_source' => self::SOURCE,
                    'external_id' => $externalId,
                ],
                [
                    'brand_id' => $brand?->id,
                    'category_id' => $category->id,
                    'name' => $title,
                    'slug' => $this->uniqueSlug($title, self::SOURCE, $externalId),
                    'sku' => $this->uniqueSku("DUMMYJSON-{$externalId}", self::SOURCE, $externalId),
                    'short_description' => Str::limit((string) ($payload['description'] ?? ''), 250, ''),
                    'description' => (string) ($payload['description'] ?? ''),
                    'price' => (float) ($payload['price'] ?? 0),
                    'stock' => max(0, (int) ($payload['stock'] ?? 0)),
                    'featured_image' => $this->imageFor($payload),
                    'is_active' => true,
                ],
            );

            $imported++;
        }

        $this->generateMissingProducts($categories, $brands);

        $this->command?->info("Imported or updated {$imported} DummyJSON products and topped the catalog up to ".self::TARGET_TOTAL.' products.');
    }

    private function deactivateLegacyLocalImageProducts(): void
    {
        Product::query()
            ->whereNull('external_source')
            ->whereIn('featured_image', [
                '/images/bag.jpg',
                '/images/watch.jpg',
                '/images/shirt.jpg',
                '/images/headphone.jpg',
                '/images/sandle.jpg',
                '/images/boot1.jpg',
                '/images/cap.jpg',
            ])
            ->update(['is_active' => false]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function fetchDummyJsonProducts(): array
    {
        try {
            $response = Http::timeout(20)
                ->acceptJson()
                ->get('https://dummyjson.com/products?limit=0');
        } catch (Throwable $exception) {
            throw new RuntimeException('DummyJSON request failed: '.$exception->getMessage(), previous: $exception);
        }

        if (! $response->successful()) {
            throw new RuntimeException("DummyJSON returned HTTP {$response->status()}.");
        }

        $products = $response->json('products');

        if (! is_array($products)) {
            throw new RuntimeException('DummyJSON response did not contain a products array.');
        }

        if ($products === []) {
            throw new RuntimeException('DummyJSON returned an empty products array.');
        }

        return $products;
    }

    /**
     * @return array<string, Category>
     */
    private function categories(): array
    {
        $names = [
            'bags' => 'Bags',
            'shoes' => 'Shoes',
            'accessories' => 'Accessories',
            'electronics' => 'Electronics',
            'clothing' => 'Clothing',
        ];

        return collect($names)
            ->mapWithKeys(fn (string $name, string $slug) => [
                $slug => Category::updateOrCreate(
                    ['slug' => $slug],
                    ['name' => $name, 'is_active' => true],
                ),
            ])
            ->all();
    }

    /**
     * @return array<string, Brand>
     */
    private function brands(): array
    {
        $brands = [
            'matjari-essentials' => 'Matjari Essentials',
            'urban-style' => 'Urban Style',
            'tech-wave' => 'Tech Wave',
        ];

        return collect($brands)
            ->mapWithKeys(fn (string $name, string $slug) => [
                $slug => Brand::updateOrCreate(
                    ['slug' => $slug],
                    ['name' => $name, 'is_active' => true],
                ),
            ])
            ->all();
    }

    /**
     * @param array<string, mixed> $payload
     * @param array<string, Brand> $brands
     */
    private function brandFor(array $payload, array $brands): ?Brand
    {
        $brandName = trim((string) ($payload['brand'] ?? ''));

        if ($brandName === '') {
            $categorySlug = $this->categorySlugFor($payload);

            return $categorySlug === 'electronics'
                ? $brands['tech-wave']
                : $brands['matjari-essentials'];
        }

        return Brand::updateOrCreate(
            ['slug' => Str::slug($brandName)],
            ['name' => $brandName, 'is_active' => true],
        );
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function categorySlugFor(array $payload): string
    {
        $value = Str::lower(implode(' ', [
            (string) ($payload['title'] ?? ''),
            (string) ($payload['category'] ?? ''),
        ]));

        return match (true) {
            Str::contains($value, ['bag', 'backpack', 'handbag', 'purse']) => 'bags',
            Str::contains($value, ['shoe', 'sneaker', 'boot', 'sandal']) => 'shoes',
            Str::contains($value, ['watch', 'sunglasses', 'jewelry', 'cap', 'accessory']) => 'accessories',
            Str::contains($value, ['phone', 'laptop', 'tablet', 'electronics', 'headphones', 'audio', 'computer']) => 'electronics',
            default => 'clothing',
        };
    }

    /**
     * @param array<string, mixed> $payload
     */
    private function imageFor(array $payload): string
    {
        $thumbnail = trim((string) ($payload['thumbnail'] ?? ''));

        if ($thumbnail !== '') {
            return $thumbnail;
        }

        $images = $payload['images'] ?? [];

        if (is_array($images)) {
            foreach ($images as $image) {
                $image = trim((string) $image);

                if ($image !== '') {
                    return $image;
                }
            }
        }

        return $this->placeholderImage('matjari-product');
    }

    /**
     * @param array<string, Category> $categories
     * @param array<string, Brand> $brands
     */
    private function generateMissingProducts(array $categories, array $brands): void
    {
        $existingCount = Product::query()
            ->whereIn('external_source', [self::SOURCE, self::GENERATED_SOURCE])
            ->count();

        $categoryKeys = array_keys($categories);
        $generatedIndex = 1;

        while ($existingCount < self::TARGET_TOTAL) {
            $categorySlug = $categoryKeys[($existingCount + $generatedIndex) % count($categoryKeys)];
            $name = $this->generatedName($categorySlug, $generatedIndex);
            $externalId = "{$categorySlug}-{$generatedIndex}";
            $brand = $categorySlug === 'electronics' ? $brands['tech-wave'] : $brands['matjari-essentials'];

            Product::updateOrCreate(
                [
                    'external_source' => self::GENERATED_SOURCE,
                    'external_id' => $externalId,
                ],
                [
                    'brand_id' => $brand->id,
                    'category_id' => $categories[$categorySlug]->id,
                    'name' => $name,
                    'slug' => $this->uniqueSlug($name, self::GENERATED_SOURCE, $externalId),
                    'sku' => $this->uniqueSku('MAT-'.Str::upper(Str::substr($categorySlug, 0, 3)).'-'.str_pad((string) $generatedIndex, 4, '0', STR_PAD_LEFT), self::GENERATED_SOURCE, $externalId),
                    'short_description' => "Curated {$categories[$categorySlug]->name} product for the MATJARI catalog.",
                    'description' => "A reliable {$categories[$categorySlug]->name} selection generated to keep the MATJARI storefront complete while preserving online product imagery.",
                    'price' => 19 + (($generatedIndex * 7) % 140) + .99,
                    'stock' => 8 + (($generatedIndex * 5) % 52),
                    'featured_image' => $this->placeholderImage($name),
                    'is_active' => true,
                ],
            );

            $existingCount++;
            $generatedIndex++;
        }
    }

    private function generatedName(string $categorySlug, int $index): string
    {
        $prefixes = [
            'bags' => 'MATJARI Carry Bag',
            'shoes' => 'MATJARI Comfort Shoes',
            'accessories' => 'MATJARI Daily Accessory',
            'electronics' => 'MATJARI Smart Electronic',
            'clothing' => 'MATJARI Casual Clothing',
        ];

        return ($prefixes[$categorySlug] ?? 'MATJARI Product').' '.str_pad((string) $index, 3, '0', STR_PAD_LEFT);
    }

    private function placeholderImage(string $text): string
    {
        return 'https://placehold.co/800x800/f4f4f3/202526/png?text='.rawurlencode(Str::limit($text, 34, ''));
    }

    private function uniqueSlug(string $name, string $source, string $externalId): string
    {
        $base = Str::slug($name) ?: "{$source}-{$externalId}";
        $slug = $base;
        $suffix = 2;

        while ($this->conflictingProductQuery('slug', $slug, $source, $externalId)->exists()) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    private function uniqueSku(string $sku, string $source, string $externalId): string
    {
        $base = trim($sku) !== '' ? trim($sku) : Str::upper("{$source}-{$externalId}");
        $candidate = $base;
        $suffix = 2;

        while ($this->conflictingProductQuery('sku', $candidate, $source, $externalId)->exists()) {
            $candidate = "{$base}-{$suffix}";
            $suffix++;
        }

        return $candidate;
    }

    private function conflictingProductQuery(string $column, string $value, string $source, string $externalId)
    {
        return Product::query()
            ->where($column, $value)
            ->where(function ($query) use ($source, $externalId) {
                $query
                    ->where('external_source', '!=', $source)
                    ->orWhereNull('external_source')
                    ->orWhere('external_id', '!=', $externalId)
                    ->orWhereNull('external_id');
            });
    }
}
