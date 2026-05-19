import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { FiDownload, FiFileText, FiPrinter, FiShoppingBag } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

const CART_STORAGE_KEY = 'matjari_cart';

type OrderItem = {
    id: number;
    product_name: string;
    product_sku?: string | null;
    merchant_name?: string | null;
    company_name?: string | null;
    quantity: number;
    unit_price: number;
    total: number;
};

type SuccessOrder = {
    id: number;
    order_number: string;
    invoice_number?: string | null;
    created_at?: string | null;
    customer_name: string;
    customer_email: string;
    customer_phone?: string | null;
    delivery_address?: string | null;
    city?: string | null;
    payment_method: string;
    payment_status: string;
    is_demo_payment?: boolean;
    status: string;
    subtotal: number;
    shipping_total: number;
    total: number;
    invoice_url: string;
    invoice_print_url: string;
    items: OrderItem[];
    delivery?: {
        assigned: boolean;
        message?: string;
    };
};

type Props = PageProps<{
    order: SuccessOrder;
    successMessage?: string | null;
}>;

export default function CheckoutSuccess() {
    const { order } = usePage<Props>().props;

    useEffect(() => {
        window.localStorage.removeItem(CART_STORAGE_KEY);
    }, []);

    return (
        <AuthStorefrontLayout>
            <Head title={`Commande ${order.order_number} confirmée`} />

            <main className="bg-[#f4f4f3] px-4 py-12 text-[#202526] sm:px-6 lg:px-10 lg:py-16">
                <div className="mx-auto w-full max-w-[1180px]">
                    <section className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:p-10">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Commande confirmée</span>
                        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <h1 className="break-words font-serif text-3xl font-semibold leading-tight sm:text-5xl">Commande passée avec succès</h1>
                                <p className="mt-4 max-w-2xl text-base leading-7 text-[#687074]">
                                    Merci pour votre achat. Votre commande a bien été enregistrée.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <a href="#facture" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white">
                                    <FiFileText /> Voir ma facture
                                </a>
                                <a href={order.invoice_url} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100">
                                    <FiDownload /> Télécharger la facture
                                </a>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            <Info label="Numéro" value={order.order_number} />
                            <Info label="Date" value={order.created_at || '-'} />
                            <Info label="Statut" value={statusLabel(order.status)} />
                            <Info label="Total" value={money(order.total)} />
                        </div>
                    </section>

                    <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                        <article id="facture" className="min-w-0 rounded-lg border border-black/10 bg-white p-4 shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:p-8">
                            <div className="flex flex-col gap-4 border-b-2 border-[#202526] pb-6 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h2 className="font-serif text-3xl font-semibold">MATJARI</h2>
                                    <p className="mt-2 text-sm text-[#687074]">Facture</p>
                                </div>
                                <div className="text-sm sm:text-right">
                                    <strong>{order.invoice_number || 'Facture en préparation'}</strong>
                                    <p className="mt-1 text-[#687074]">Commande {order.order_number}</p>
                                    <p className="text-[#687074]">{order.created_at || '-'}</p>
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <Box title="Client">
                                    {order.customer_name}<br />
                                    {order.customer_email}<br />
                                    {order.customer_phone || '-'}
                                </Box>
                                <Box title="Livraison">
                                    {order.delivery_address || '-'}<br />
                                    {order.city || '-'}
                                </Box>
                            </div>

                            <div className="mt-8 overflow-x-auto">
                                <table className="w-full min-w-[720px] border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-[#202526] text-left text-white">
                                            <th className="p-3">Produit</th>
                                            <th className="p-3">SKU</th>
                                            <th className="p-3">Marchand</th>
                                            <th className="p-3">Qté</th>
                                            <th className="p-3">Prix</th>
                                            <th className="p-3">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.items.map((item) => (
                                            <tr key={item.id} className="border-b border-[#ece7e1]">
                                                <td className="p-3 font-semibold">{item.product_name}</td>
                                                <td className="p-3 text-[#687074]">{item.product_sku || '-'}</td>
                                                <td className="p-3 text-[#687074]">{item.company_name || item.merchant_name || '-'}</td>
                                                <td className="p-3">{item.quantity}</td>
                                                <td className="p-3">{money(item.unit_price)}</td>
                                                <td className="p-3 font-semibold">{money(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="ml-auto mt-6 w-full max-w-sm space-y-3 text-sm">
                                <Line label="Mode de paiement" value={paymentLabel(order.payment_method)} />
                                {order.is_demo_payment ? <Line label="Simulation" value="Paiement Stripe simulé" /> : null}
                                <Line label="Sous-total" value={money(order.subtotal)} />
                                <Line label="Frais de livraison" value={money(order.shipping_total)} />
                                <Line label="Total" value={money(order.total)} strong />
                            </div>
                        </article>

                        <aside className="min-w-0 space-y-6">
                            <article className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(32,37,38,0.07)]">
                                <h2 className="font-serif text-2xl font-semibold">Récapitulatif</h2>
                                <div className="mt-5 grid gap-4">
                                    <Info label="Client" value={order.customer_name} />
                                    <Info label="Email" value={order.customer_email} />
                                    <Info label="Téléphone" value={order.customer_phone || '-'} />
                                    <Info label="Adresse" value={order.delivery_address || '-'} />
                                    <Info label="Ville" value={order.city || '-'} />
                                    <Info label="Paiement" value={paymentLabel(order.payment_method)} />
                                    <Info label="Statut paiement" value={paymentStatusLabel(order.payment_status)} />
                                </div>
                                {order.is_demo_payment ? (
                                    <span className="mt-4 inline-flex rounded-full border border-[#f1c7c7] bg-[#fff5f5] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#b91f2c]">
                                        Paiement Stripe simulé
                                    </span>
                                ) : null}
                            </article>

                            <article className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_45px_rgba(32,37,38,0.07)]">
                                <h2 className="font-serif text-2xl font-semibold">Livraison</h2>
                                <p className="mt-3 text-sm leading-7 text-[#687074]">
                                    {order.delivery?.message || 'Livreur non assigné pour le moment.'}
                                </p>
                            </article>

                            <div className="grid gap-3">
                                <button type="button" onClick={() => window.print()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white">
                                    <FiPrinter /> Imprimer la facture
                                </button>
                                <Link href="/account/orders" className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100">
                                    Voir mes commandes
                                </Link>
                                <Link href="/shop" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100">
                                    <FiShoppingBag /> Retour à la boutique
                                </Link>
                            </div>
                        </aside>
                    </section>
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-md border border-black/10 bg-[#fbfaf8] p-4">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#687074]">{label}</span>
            <strong className="mt-2 block break-words text-[#202526]">{value}</strong>
        </div>
    );
}

function Box({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="rounded-lg border border-[#ece7e1] bg-[#fbf7f2] p-4 sm:p-5">
            <h3 className="font-serif text-2xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#687074]">{children}</p>
        </section>
    );
}

function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
    return (
        <div className={`flex flex-wrap items-center justify-between gap-2 border-b border-[#ece7e1] py-2 ${strong ? 'text-lg' : ''}`}>
            <span>{label}</span>
            <strong className="break-words text-right">{value}</strong>
        </div>
    );
}

function statusLabel(status: string): string {
    const labels: Record<string, string> = {
        pending: 'En attente',
        confirmed: 'Confirmée',
        processing: 'En préparation',
        delivered: 'Livrée',
        cancelled: 'Annulée',
    };

    return labels[status] || status;
}

function paymentLabel(method: string): string {
    if (method === 'cash_on_delivery') return 'Paiement à la livraison';
    if (method === 'stripe' || method === 'card') return 'Paiement par carte bancaire';
    return method;
}

function paymentStatusLabel(status: string): string {
    if (status === 'unpaid') return 'Non payé';
    if (status === 'paid') return 'Payé';
    if (status === 'pending') return 'En attente';
    if (status === 'failed') return 'Échoué';
    if (status === 'cancelled') return 'Annulé';

    return status;
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
