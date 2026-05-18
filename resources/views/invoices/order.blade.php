<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Facture {{ $order->invoice_number }}</title>
    <style>
        body { margin: 0; background: #f4f4f3; color: #202526; font-family: Arial, sans-serif; }
        main { max-width: 980px; margin: 32px auto; background: #fff; border: 1px solid #dedbd8; padding: 36px; }
        h1, h2 { margin: 0; font-family: Georgia, serif; }
        h1 { font-size: 34px; }
        h2 { margin-top: 28px; font-size: 22px; }
        .muted { color: #687074; }
        .top { display: flex; justify-content: space-between; gap: 24px; border-bottom: 2px solid #202526; padding-bottom: 22px; }
        .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin-top: 24px; }
        .box { border: 1px solid #ece7e1; background: #fbf7f2; padding: 18px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th { background: #202526; color: #fff; text-align: left; }
        th, td { padding: 12px; border-bottom: 1px solid #ece7e1; font-size: 14px; vertical-align: top; }
        .totals { margin-left: auto; margin-top: 20px; width: min(360px, 100%); }
        .totals div { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid #ece7e1; }
        .totals strong { font-size: 20px; }
    </style>
</head>
<body>
<main>
    <section class="top">
        <div>
            <h1>Facture</h1>
            <p class="muted">MATJARI e-commerce</p>
        </div>
        <div>
            <strong>{{ $order->invoice_number }}</strong><br>
            <span class="muted">Commande {{ $order->order_number }}</span><br>
            <span class="muted">{{ $order->created_at?->format('d/m/Y H:i') }}</span>
        </div>
    </section>

    <section class="grid">
        <div class="box">
            <h2>Client</h2>
            <p>
                {{ $order->customer_name }}<br>
                {{ $order->customer_email }}<br>
                {{ $order->customer_phone ?: '-' }}
            </p>
        </div>
        <div class="box">
            <h2>Livraison</h2>
            <p>
                {{ $order->delivery_address ?: '-' }}<br>
                {{ $order->city ?: '-' }}<br>
                Livreur non assigné pour le moment.
            </p>
        </div>
    </section>

    <section>
        <h2>Produits</h2>
        <table>
            <thead>
            <tr>
                <th>Produit</th>
                <th>SKU</th>
                <th>Marchand</th>
                <th>Qté</th>
                <th>Prix</th>
                <th>Total</th>
            </tr>
            </thead>
            <tbody>
            @foreach ($order->items as $item)
                <tr>
                    <td>{{ $item->product_name }}</td>
                    <td>{{ $item->product_sku ?: $item->sku ?: '-' }}</td>
                    <td>
                        {{ $item->merchant?->name ?: '-' }}<br>
                        <span class="muted">{{ $item->merchant?->email }}</span><br>
                        <span class="muted">{{ $item->merchant?->company?->company_name }}</span>
                    </td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ number_format((float) $item->unit_price, 2) }} DH</td>
                    <td>{{ number_format((float) ($item->total ?: $item->total_price), 2) }} DH</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </section>

    <section class="totals">
        <div><span>Statut</span><span>{{ $order->status }}</span></div>
        <div><span>Paiement</span><span>{{ $order->payment_method }} / {{ $order->payment_status }}</span></div>
        <div><span>Sous-total</span><span>{{ number_format((float) $order->subtotal, 2) }} DH</span></div>
        <div><span>Livraison</span><span>{{ number_format((float) $order->shipping_total, 2) }} DH</span></div>
        <div><strong>Total</strong><strong>{{ number_format((float) $order->total, 2) }} DH</strong></div>
    </section>
</main>
</body>
</html>
