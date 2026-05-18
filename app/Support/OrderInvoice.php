<?php

namespace App\Support;

use App\Models\Order;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class OrderInvoice
{
    public static function generate(Order $order): Order
    {
        $order->loadMissing(['user', 'items.product.merchant.company', 'items.merchant.company']);

        if (! $order->invoice_number) {
            $order->invoice_number = 'FAC-'.now()->format('Ymd').'-'.Str::padLeft((string) $order->id, 6, '0');
        }

        $path = "invoices/{$order->invoice_number}.html";

        Storage::disk('public')->put($path, view('invoices.order', [
            'order' => $order,
        ])->render());

        $order->forceFill([
            'invoice_path' => $path,
            'invoice_number' => $order->invoice_number,
        ])->save();

        return $order;
    }
}
