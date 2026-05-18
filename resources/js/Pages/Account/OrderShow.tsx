import { Head, Link, usePage } from '@inertiajs/react';
import { FiDownload, FiShoppingBag } from 'react-icons/fi';

import AccountPageLayout from './AccountPageLayout';
import type { PageProps } from '@/types';

type OrderItem = {
    id: number;
    product_name: string;
    product_sku?: string | null;
    quantity: number;
    unit_price: number;
    total: number;
    image?: string | null;
    product_url?: string | null;
    company_name?: string | null;
};

type OrderDetail = {
    id: number;
    order_number: string;
    status: string;
    payment_method: string;
    payment_status: string;
    total: number;
    subtotal: number;
    shipping_total: number;
    created_at_full?: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    delivery_address?: string | null;
    city?: string | null;
    invoice_url: string;
    items: OrderItem[];
};

type Props = PageProps<{
    order: OrderDetail;
    successMessage?: string | null;
}>;

export default function OrderShow() {
    const { order, successMessage } = usePage<Props>().props;

    return (
        <>
            <Head title={`Commande ${order.order_number}`} />
            <AccountPageLayout
                title={`Commande ${order.order_number}`}
                subtitle="Retrouvez le détail de votre commande, vos produits et votre facture."
                eyebrow="Commande"
                action={<Link href="/account/orders">Retour aux commandes</Link>}
            >
                {successMessage ? (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-800">
                        {successMessage}
                    </div>
                ) : null}

                <article className="account-card">
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        <Field label="Date" value={order.created_at_full || '-'} />
                        <Field label="Statut" value={statusLabel(order.status)} />
                        <Field label="Paiement" value={paymentLabel(order.payment_method)} />
                        <Field label="Total" value={money(order.total)} />
                    </div>

                    <div className="mt-7 grid gap-5 md:grid-cols-2">
                        <section className="rounded-lg border border-black/10 bg-[#f8f6f3] p-5">
                            <h2 className="font-serif text-2xl font-semibold">Client</h2>
                            <p className="mt-3 text-sm leading-7 text-[#687074]">
                                {order.customer_name}<br />
                                {order.customer_email}<br />
                                {order.customer_phone || '-'}
                            </p>
                        </section>
                        <section className="rounded-lg border border-black/10 bg-[#f8f6f3] p-5">
                            <h2 className="font-serif text-2xl font-semibold">Livraison</h2>
                            <p className="mt-3 text-sm leading-7 text-[#687074]">
                                {order.delivery_address || '-'}<br />
                                {order.city || '-'}
                            </p>
                        </section>
                    </div>

                    <div className="mt-8">
                        <h2 className="font-serif text-2xl font-semibold">Produits commandés</h2>
                        <div className="mt-4 grid gap-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="grid gap-4 rounded-lg border border-black/10 bg-white p-4 sm:grid-cols-[72px_minmax(0,1fr)_120px_120px] sm:items-center">
                                    <div className="grid h-16 w-16 place-items-center rounded-md bg-[#eee4dc]">
                                        {item.image ? <img src={item.image} alt={item.product_name} className="h-full w-full object-contain" /> : <FiShoppingBag />}
                                    </div>
                                    <div>
                                        {item.product_url ? <Link href={item.product_url} className="font-semibold hover:text-[#b91f2c]">{item.product_name}</Link> : <strong>{item.product_name}</strong>}
                                        <p className="mt-1 text-sm text-[#687074]">SKU: {item.product_sku || '-'} {item.company_name ? `• ${item.company_name}` : ''}</p>
                                    </div>
                                    <div className="text-sm text-[#687074]">Qté {item.quantity} x {money(item.unit_price)}</div>
                                    <strong>{money(item.total)}</strong>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-2 text-sm">
                            <div className="flex gap-8"><span>Sous-total</span><strong>{money(order.subtotal)}</strong></div>
                            <div className="flex gap-8"><span>Livraison</span><strong>{money(order.shipping_total)}</strong></div>
                            <div className="flex gap-8 text-lg"><span>Total</span><strong>{money(order.total)}</strong></div>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <a href={order.invoice_url} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white">
                                <FiDownload /> Voir la facture
                            </a>
                            <Link href="/shop" className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100">
                                Retour à la boutique
                            </Link>
                        </div>
                    </div>
                </article>
            </AccountPageLayout>
        </>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span className="text-sm text-[#687074]">{label}</span>
            <strong className="mt-1 block">{value}</strong>
        </div>
    );
}

function statusLabel(status: string): string {
    const labels: Record<string, string> = {
        pending: 'En attente',
        processing: 'En préparation',
        delivered: 'Livrée',
        cancelled: 'Annulée',
    };

    return labels[status] || status;
}

function paymentLabel(method: string): string {
    return method === 'cash_on_delivery' ? 'Paiement à la livraison' : method;
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
