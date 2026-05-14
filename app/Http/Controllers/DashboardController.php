<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        return Inertia::render('Dashboard', [
            'recentOrders' => $recentOrders,
            'favoritePreview' => [],
            'accountCreatedAt' => $user->created_at?->translatedFormat('d F Y'),
        ]);
    }
}
