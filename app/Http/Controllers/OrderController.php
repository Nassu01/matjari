<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Support\OrderInvoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = $request->user()->orders()
            ->withCount('items')
            ->latest()
            ->get()
            ->map(fn (Order $order) => $this->summary($order));

        return Inertia::render('Account/Orders', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order): Response
    {
        $this->authorizeOrder($request, $order);

        $order->load(['items.product', 'items.merchant.company']);

        return Inertia::render('Account/OrderShow', [
            'order' => $this->detail($order),
            'successMessage' => session('success'),
        ]);
    }

    public function invoice(Request $request, Order $order): BinaryFileResponse
    {
        $this->authorizeOrder($request, $order);

        if (! $order->invoice_path || ! Storage::disk('public')->exists($order->invoice_path)) {
            OrderInvoice::generate($order);
            $order->refresh();
        }

        return response()->file(Storage::disk('public')->path($order->invoice_path));
    }

    private function authorizeOrder(Request $request, Order $order): void
    {
        $user = $request->user();

        abort_unless($user && ($user->isAdmin() || (int) $order->user_id === (int) $user->id), 403);
    }

    private function summary(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'status' => $order->status,
            'payment_method' => $order->payment_method,
            'payment_status' => $order->payment_status,
            'total' => (float) $order->total,
            'items_count' => $order->items_count ?? $order->items()->count(),
            'created_at' => $order->created_at?->toFormattedDateString(),
        ];
    }

    private function detail(Order $order): array
    {
        return [
            ...$this->summary($order),
            'created_at_full' => $order->created_at?->translatedFormat('d F Y H:i'),
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'customer_phone' => $order->customer_phone,
            'delivery_address' => $order->delivery_address,
            'city' => $order->city,
            'subtotal' => (float) $order->subtotal,
            'shipping_total' => (float) $order->shipping_total,
            'invoice_number' => $order->invoice_number,
            'invoice_url' => route('account.orders.invoice', $order),
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'product_name' => $item->product_name,
                'product_sku' => $item->product_sku ?: $item->sku,
                'quantity' => $item->quantity,
                'unit_price' => (float) $item->unit_price,
                'total' => (float) ($item->total ?: $item->total_price),
                'image' => app(ProductController::class)->publicImageUrl($item->product?->featured_image, $item->product_id),
                'product_url' => $item->product?->slug ? route('products.show', ['product' => $item->product->slug]) : null,
                'merchant_name' => $item->merchant?->name,
                'merchant_email' => $item->merchant?->email,
                'company_name' => $item->merchant?->company?->company_name,
            ])->values(),
        ];
    }
}
