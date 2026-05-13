<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Support\Images11;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $user = $request->user();

        $recentOrders = $user->orders()
            ->withCount('items')
            ->latest()
            ->take(4)
            ->get()
            ->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total' => (float) $order->total,
                'items_count' => $order->items_count,
                'created_at' => $order->created_at?->toFormattedDateString(),
            ]);

        $favoritePreview = Product::query()
            ->with(['brand:id,name', 'category:id,name'])
            ->where('is_active', true)
            ->latest()
            ->take(4)
            ->get()
            ->map(fn (Product $product, int $index) => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => (float) $product->price,
                'image' => Images11::urlAt($index) ?: $this->assetPath($product->featured_image),
                'category' => $product->category?->name,
                'brand' => $product->brand?->name,
            ]);

        return Inertia::render('Dashboard', [
            'recentOrders' => $recentOrders,
            'favoritePreview' => $favoritePreview,
        ]);
    }

    private function assetPath(?string $path): string
    {
        if (! $path) {
            return '';
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::url($path);
    }
}
