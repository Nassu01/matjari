<?php

namespace App\Support;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class OrderPayment
{
    public static function markStripePaid(Order $order, string|object|array|null $paymentIntent = null): Order
    {
        return DB::transaction(function () use ($order, $paymentIntent) {
            $order = Order::query()->whereKey($order->id)->lockForUpdate()->firstOrFail();

            if ($order->payment_status === 'paid') {
                return $order;
            }

            $order->loadMissing('items');

            foreach ($order->items as $item) {
                if (! $item->product_id) {
                    continue;
                }

                Product::query()
                    ->whereKey($item->product_id)
                    ->decrement('stock', (int) $item->quantity);
            }

            $order->forceFill([
                'payment_status' => 'paid',
                'status' => 'processing',
                'stripe_payment_intent_id' => self::paymentIntentId($paymentIntent) ?: $order->stripe_payment_intent_id,
            ])->save();

            OrderInvoice::generate($order);

            return $order;
        });
    }

    private static function paymentIntentId(string|object|array|null $paymentIntent): ?string
    {
        if (is_string($paymentIntent)) {
            return $paymentIntent;
        }

        if (is_array($paymentIntent)) {
            return $paymentIntent['id'] ?? null;
        }

        return $paymentIntent?->id ?? null;
    }
}
