<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Support\OrderInvoice;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Checkout', [
            'customer' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'phone' => $request->user()->phone,
            ],
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:120'],
            'last_name' => ['required', 'string', 'max:120'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'customer_email' => ['required', 'email', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:50'],
            'delivery_address' => ['required', 'string', 'max:2000'],
            'city' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string', 'max:2000'],
            'payment_method' => ['required', 'in:cash_on_delivery,card'],
            'cart_items' => ['required', 'array', 'min:1'],
            'cart_items.*.id' => ['required', 'integer', 'exists:products,id'],
            'cart_items.*.quantity' => ['required', 'integer', 'min:1', 'max:99'],
        ], [
            'first_name.required' => 'Le prénom est requis.',
            'last_name.required' => 'Le nom est requis.',
            'customer_email.required' => 'L’adresse e-mail est requise.',
            'customer_email.email' => 'L’adresse e-mail doit être valide.',
            'customer_phone.required' => 'Le téléphone est requis.',
            'delivery_address.required' => 'L’adresse est requise.',
            'city.required' => 'La ville est requise.',
            'cart_items.required' => 'Votre panier est vide.',
            'cart_items.min' => 'Votre panier est vide.',
            'cart_items.*.id.exists' => 'Un produit du panier n’existe plus.',
        ]);

        $cartItems = collect($validated['cart_items'])
            ->map(fn (array $item) => [
                'id' => (int) $item['id'],
                'quantity' => (int) $item['quantity'],
            ])
            ->groupBy('id')
            ->map(fn ($items, int $id) => [
                'id' => $id,
                'quantity' => $items->sum('quantity'),
            ])
            ->values();

        $products = Product::query()
            ->with('merchant.company')
            ->whereIn('id', $cartItems->pluck('id'))
            ->where('is_active', true)
            ->get()
            ->keyBy('id');

        if ($products->count() !== $cartItems->count()) {
            throw ValidationException::withMessages([
                'cart_items' => 'Un ou plusieurs produits ne sont plus disponibles.',
            ]);
        }

        $subtotal = 0.0;

        foreach ($cartItems as $item) {
            $product = $products->get($item['id']);

            if ($product->stock < $item['quantity']) {
                throw ValidationException::withMessages([
                    'cart_items' => "Stock insuffisant pour {$product->name}.",
                ]);
            }

            $subtotal += (float) $product->price * $item['quantity'];
        }

        $shippingTotal = 0.0;
        $total = $subtotal + $shippingTotal;

        $order = DB::transaction(function () use ($request, $validated, $cartItems, $products, $subtotal, $shippingTotal, $total) {
            $firstProduct = $products->first();

            $order = Order::create([
                'user_id' => $request->user()->id,
                'merchant_id' => $firstProduct?->merchant_id,
                'order_number' => $this->nextOrderNumber(),
                'customer_name' => trim($validated['first_name'].' '.$validated['last_name']),
                'customer_email' => $validated['customer_email'],
                'customer_phone' => $validated['customer_phone'] ?? null,
                'delivery_address' => $validated['delivery_address'],
                'city' => $validated['city'],
                'status' => 'pending',
                'payment_method' => $validated['payment_method'],
                'payment_status' => 'unpaid',
                'subtotal' => $subtotal,
                'shipping_total' => $shippingTotal,
                'total' => $total,
                'notes' => $validated['notes'] ?? null,
            ]);

            foreach ($cartItems as $item) {
                $product = $products->get($item['id']);
                $lineTotal = (float) $product->price * $item['quantity'];

                $order->items()->create([
                    'product_id' => $product->id,
                    'merchant_id' => $product->merchant_id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku,
                    'sku' => $product->sku,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'total_price' => $lineTotal,
                    'total' => $lineTotal,
                ]);

                $product->decrement('stock', $item['quantity']);
            }

            return $order;
        });

        OrderInvoice::generate($order);

        return redirect()
            ->route('checkout.success', $order)
            ->with('success', 'Votre commande a été passée avec succès.');
    }

    public function success(Request $request, Order $order): Response
    {
        $this->authorizeOrder($request, $order);

        if (! $order->invoice_path) {
            OrderInvoice::generate($order);
            $order->refresh();
        }

        $order->load(['items.product', 'items.merchant.company']);

        return Inertia::render('Checkout/Success', [
            'order' => $this->orderPayload($order),
            'successMessage' => session('success'),
        ]);
    }

    public function invoice(Request $request, Order $order): RedirectResponse
    {
        $this->authorizeOrder($request, $order);

        if (! $order->invoice_path) {
            OrderInvoice::generate($order);
            $order->refresh();
        }

        return redirect()->route('account.orders.invoice', $order);
    }

    private function authorizeOrder(Request $request, Order $order): void
    {
        $user = $request->user();

        abort_unless($user && ($user->isAdmin() || (int) $order->user_id === (int) $user->id), 403);
    }

    private function orderPayload(Order $order): array
    {
        return [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'invoice_number' => $order->invoice_number,
            'created_at' => $order->created_at?->translatedFormat('d F Y H:i'),
            'customer_name' => $order->customer_name,
            'customer_email' => $order->customer_email,
            'customer_phone' => $order->customer_phone,
            'delivery_address' => $order->delivery_address,
            'city' => $order->city,
            'payment_method' => $order->payment_method,
            'payment_status' => $order->payment_status,
            'status' => $order->status,
            'subtotal' => (float) $order->subtotal,
            'shipping_total' => (float) $order->shipping_total,
            'total' => (float) $order->total,
            'invoice_url' => route('account.orders.invoice', $order),
            'invoice_print_url' => route('checkout.success.invoice', $order),
            'items' => $order->items->map(fn ($item) => [
                'id' => $item->id,
                'product_name' => $item->product_name,
                'product_sku' => $item->product_sku ?: $item->sku,
                'quantity' => $item->quantity,
                'unit_price' => (float) $item->unit_price,
                'total' => (float) ($item->total ?: $item->total_price),
                'merchant_name' => $item->merchant?->name,
                'company_name' => $item->merchant?->company?->company_name,
            ])->values(),
            'delivery' => [
                'assigned' => false,
                'message' => 'Livreur non assigné pour le moment.',
            ],
        ];
    }

    private function nextOrderNumber(): string
    {
        do {
            $number = 'CMD-'.now()->format('Ymd').'-'.Str::upper(Str::random(6));
        } while (Order::query()->where('order_number', $number)->exists());

        return $number;
    }
}
