<?php

namespace App\Console\Commands;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class ImportDummyJsonProducts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'products:import-dummyjson';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import or update products from the DummyJSON Products API.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $endpoint = 'https://dummyjson.com/products?limit=0';

        $this->info('Fetching DummyJSON products...');

        try {
            $response = Http::timeout(30)
                ->retry(2, 500)
                ->acceptJson()
                ->get($endpoint);
        } catch (\Throwable $exception) {
            $this->error('DummyJSON request failed: '.$exception->getMessage());

            return self::FAILURE;
        }

        if (! $response->successful()) {
            $this->error("DummyJSON returned HTTP {$response->status()}.");

            return self::FAILURE;
        }

        $products = $response->json('products');

        if (! is_array($products)) {
            $this->error('DummyJSON response did not contain a products array.');

            return self::FAILURE;
        }

        $count = 0;

        foreach ($products as $payload) {
            if (! is_array($payload) || empty($payload['id']) || empty($payload['title'])) {
                continue;
            }

            $category = $this->categoryFor((string) ($payload['category'] ?? 'general'));
            $brand = $this->brandFor((string) ($payload['brand'] ?? 'Generic'));
            $title = trim((string) $payload['title']);
            $externalId = (string) $payload['id'];

            Product::updateOrCreate(
                [
                    'external_source' => 'dummyjson',
                    'external_id' => $externalId,
                ],
                [
                    'brand_id' => $brand?->id,
                    'category_id' => $category->id,
                    'name' => $title,
                    'slug' => $this->uniqueSlug($title, $externalId),
                    'sku' => $this->uniqueSku($this->skuFor($payload, $externalId), $externalId),
                    'short_description' => Str::limit((string) ($payload['description'] ?? ''), 250, ''),
                    'description' => (string) ($payload['description'] ?? ''),
                    'price' => (float) ($payload['price'] ?? 0),
                    'stock' => max(0, (int) ($payload['stock'] ?? 0)),
                    'featured_image' => $this->imageFor($payload),
                    'images' => $this->imagesFor($payload),
                    'is_active' => true,
                ],
            );

            $count++;
        }

        $this->info("Imported or updated {$count} DummyJSON products.");

        return self::SUCCESS;
    }

    private function categoryFor(string $value): Category
    {
        $name = $this->readableName($value);

        return Category::updateOrCreate(
            ['slug' => Str::slug($name)],
            [
                'name' => $name,
                'is_active' => true,
            ],
        );
    }

    private function brandFor(string $value): ?Brand
    {
        $name = $this->readableName($value ?: 'Generic');

        if ($name === '') {
            return null;
        }

        return Brand::updateOrCreate(
            ['slug' => Str::slug($name)],
            [
                'name' => $name,
                'is_active' => true,
            ],
        );
    }

    private function readableName(string $value): string
    {
        $value = trim(str_replace(['-', '_'], ' ', $value));

        return Str::headline($value ?: 'Generic');
    }

    private function uniqueSlug(string $title, string $externalId): string
    {
        $base = Str::slug($title) ?: "dummyjson-product-{$externalId}";
        $slug = $base;
        $suffix = 2;

        while (
            Product::query()
                ->where('slug', $slug)
                ->where(function ($query) use ($externalId) {
                    $query
                        ->where('external_source', '!=', 'dummyjson')
                        ->orWhereNull('external_source')
                        ->orWhere('external_id', '!=', $externalId)
                        ->orWhereNull('external_id');
                })
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }

    private function skuFor(array $payload, string $externalId): string
    {
        $sku = trim((string) ($payload['sku'] ?? ''));

        return $sku !== '' ? $sku : "DUMMYJSON-{$externalId}";
    }

    private function uniqueSku(string $sku, string $externalId): string
    {
        $base = $sku !== '' ? $sku : "DUMMYJSON-{$externalId}";
        $candidate = $base;
        $suffix = 2;

        while (
            Product::query()
                ->where('sku', $candidate)
                ->where(function ($query) use ($externalId) {
                    $query
                        ->where('external_source', '!=', 'dummyjson')
                        ->orWhereNull('external_source')
                        ->orWhere('external_id', '!=', $externalId)
                        ->orWhereNull('external_id');
                })
                ->exists()
        ) {
            $candidate = "{$base}-{$suffix}";
            $suffix++;
        }

        return $candidate;
    }

    private function imageFor(array $payload): ?string
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

        return null;
    }

    private function imagesFor(array $payload): array
    {
        $images = $payload['images'] ?? [];

        if (! is_array($images)) {
            return [];
        }

        return collect($images)
            ->map(fn ($image) => trim((string) $image))
            ->filter()
            ->unique()
            ->values()
            ->all();
    }
}
