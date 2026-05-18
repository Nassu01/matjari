<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FavoriteController extends Controller
{
    public function index(Request $request): Response
    {
        $favoriteProducts = $request->user()
            ->favoriteProducts()
            ->with(['brand', 'category'])
            ->where('is_active', true)
            ->latest('favorites.created_at')
            ->get()
            ->map(fn (Product $product) => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => (float) $product->price,
                'image' => app(ProductController::class)->publicImageUrl($product->featured_image, $product->id),
                'category' => $product->category?->name,
                'url' => route('products.show', ['product' => $product->slug]),
            ]);

        return Inertia::render('Account/Favorites', [
            'favoriteProducts' => $favoriteProducts,
        ]);
    }

    public function store(Request $request, Product $product): RedirectResponse
    {
        abort_unless($product->is_active, 404);

        $request->user()->favorites()->firstOrCreate([
            'product_id' => $product->id,
        ]);

        return back()->with('success', 'Produit ajouté aux favoris.');
    }

    public function destroy(Request $request, Product $product): RedirectResponse
    {
        $request->user()
            ->favorites()
            ->where('product_id', $product->id)
            ->delete();

        return back()->with('success', 'Produit retiré des favoris.');
    }
}
