<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function search(Request $request): Response
    {
        $query = trim((string) $request->query('query', ''));

        $products = collect();

        if ($query !== '') {
            $products = Product::query()
                ->with(['brand', 'category'])
                ->where('is_active', true)
                ->where(function ($builder) use ($query) {
                    $builder
                        ->where('name', 'like', "%{$query}%")
                        ->orWhere('short_description', 'like', "%{$query}%")
                        ->orWhere('description', 'like', "%{$query}%")
                        ->orWhereHas('category', function ($categoryQuery) use ($query) {
                            $categoryQuery->where('name', 'like', "%{$query}%");
                        });
                })
                ->latest()
                ->limit(48)
                ->get()
                ->map(fn (Product $product) => $this->summaryPayload($product));
        }

        return Inertia::render('Search', [
            'query' => $query,
            'products' => $products,
        ]);
    }

    public function show(Product $product): Response
    {
        abort_unless($product->is_active, 404);

        $product->load(['brand', 'category']);

        $relatedProducts = Product::query()
            ->with(['brand', 'category'])
            ->where('is_active', true)
            ->whereKeyNot($product->id)
            ->when($product->category_id, fn ($query) => $query->where('category_id', $product->category_id))
            ->latest()
            ->limit(4)
            ->get()
            ->map(fn (Product $relatedProduct) => $this->summaryPayload($relatedProduct));

        return Inertia::render('Product/Show', [
            'product' => $this->detailPayload($product),
            'reviews' => [],
            'relatedProducts' => $relatedProducts,
        ]);
    }

    private function summaryPayload(Product $product): array
    {
        return [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'category' => $product->category?->name,
            'brand' => $product->brand?->name,
            'price' => (float) $product->price,
            'image' => $this->imageUrl($product->featured_image),
            'description' => $product->short_description,
            'url' => route('products.show', ['product' => $product->slug]),
        ];
    }

    private function detailPayload(Product $product): array
    {
        $image = $this->imageUrl($product->featured_image);

        return [
            ...$this->summaryPayload($product),
            'sku' => $product->sku,
            'stock' => $product->stock,
            'description' => $product->description ?: $product->short_description,
            'short_description' => $product->short_description,
            'images' => array_values(array_filter([$image])),
            'options' => [
                'brand' => $product->brand?->name,
                'category' => $product->category?->name,
                'sku' => $product->sku,
                'stock' => $product->stock > 0 ? 'En stock' : 'Rupture de stock',
            ],
        ];
    }

    private function imageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::url($path);
    }
}
