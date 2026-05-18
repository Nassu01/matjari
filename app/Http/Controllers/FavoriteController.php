<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Support\Images11;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favoriteProducts = $request->user()
            ->favoriteProducts()
            ->with(['brand', 'category'])
            ->latest('product_user.updated_at')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'image' => $this->imageUrl($product->featured_image, $product->id),
                'category' => $product->category?->name,
                'brand' => $product->brand?->name,
                'url' => route('products.show', ['product' => $product->slug]),
            ])
            ->values();

        return Inertia::render('Account/Favorites', [
            'favoriteProducts' => $favoriteProducts,
        ]);
    }

    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
        ]);

        $request->user()->favoriteProducts()->toggle((int) $validated['product_id']);

        return back()->with('success', 'Favoris mis a jour.');
    }

    private function imageUrl(?string $path, ?int $fallbackIndex = null): string
    {
        if (! $path) {
            return $this->fallbackImageUrl($fallbackIndex);
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/storage/') || str_starts_with($path, '/images/')) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return is_file(public_path(ltrim($path, '/'))) ? $path : $this->fallbackImageUrl($fallbackIndex);
        }

        if (is_file(public_path($path))) {
            return '/'.ltrim($path, '/');
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        return Storage::exists($path) ? Storage::url($path) : $this->fallbackImageUrl($fallbackIndex);
    }

    private function fallbackImageUrl(?int $index = null): string
    {
        return Images11::urlAt((int) ($index ?? 0)) ?: '/images/logomatjari.png';
    }
}
