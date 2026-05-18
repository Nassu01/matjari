import { FormEvent, useMemo, useState } from 'react';
import type { ReactElement } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FiShoppingBag } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type CartProduct = {
    id: number | string;
    name?: string;
    price?: number | string;
    image?: string | null;
    category?: string | null;
    quantity?: number;
};

type CheckoutProps = PageProps<{
    customer: {
        name?: string | null;
        email?: string | null;
        phone?: string | null;
    };
    errors?: Record<string, string>;
}>;

const CART_STORAGE_KEY = 'matjari_cart';

export default function Checkout() {
    const { customer, errors = {} } = usePage<CheckoutProps>().props;
    const [items] = useState<CartProduct[]>(() => readCart());
    const [processing, setProcessing] = useState(false);
    const [form, setForm] = useState({
        customer_name: customer?.name || '',
        customer_email: customer?.email || '',
        customer_phone: customer?.phone || '',
        delivery_address: '',
        city: '',
        notes: '',
        payment_method: 'cash_on_delivery',
    });

    const totals = useMemo(
        () =>
            items.reduce(
                (summary, item) => {
                    const quantity = Number(item.quantity || 1);
                    const price = Number(item.price || 0);
                    summary.quantity += quantity;
                    summary.subtotal += price * quantity;
                    return summary;
                },
                { quantity: 0, subtotal: 0 },
            ),
        [items],
    );

    const submit = (event: FormEvent) => {
        event.preventDefault();

        if (!items.length) return;

        setProcessing(true);
        router.post(
            '/checkout',
            {
                ...form,
                cart_items: items.map((item) => ({
                    id: Number(item.id),
                    quantity: Number(item.quantity || 1),
                })),
            },
            {
                onSuccess: () => {
                    window.localStorage.removeItem(CART_STORAGE_KEY);
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AuthStorefrontLayout>
            <Head title="Checkout" />

            <main className="bg-[#f4f4f3] px-5 py-12 text-[#202526] sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto grid w-full max-w-[1180px] gap-7 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <form onSubmit={submit} className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:p-8">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Commande</span>
                        <h1 className="mt-3 font-serif text-4xl font-semibold">Finaliser la commande</h1>
                        <p className="mt-3 text-sm leading-7 text-[#687074]">Paiement à la livraison. Vos produits seront validés côté serveur avant la création de la commande.</p>

                        <div className="mt-8 grid gap-5 sm:grid-cols-2">
                            <Field label="Nom complet" error={errors.customer_name}>
                                <input value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} />
                            </Field>
                            <Field label="Email" error={errors.customer_email}>
                                <input type="email" value={form.customer_email} onChange={(event) => setForm({ ...form, customer_email: event.target.value })} />
                            </Field>
                            <Field label="Téléphone" error={errors.customer_phone}>
                                <input value={form.customer_phone} onChange={(event) => setForm({ ...form, customer_phone: event.target.value })} />
                            </Field>
                            <Field label="Ville" error={errors.city}>
                                <input value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })} />
                            </Field>
                            <Field label="Adresse de livraison" error={errors.delivery_address} wide>
                                <textarea rows={4} value={form.delivery_address} onChange={(event) => setForm({ ...form, delivery_address: event.target.value })} />
                            </Field>
                            <Field label="Notes" error={errors.notes} wide>
                                <textarea rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
                            </Field>
                        </div>

                        {errors.cart_items ? <p className="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{errors.cart_items}</p> : null}

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="submit"
                                disabled={processing || !items.length}
                                className="inline-flex min-h-12 items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? 'Validation...' : 'Passer la commande'}
                            </button>
                            <Link href="/cart" className="inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-300 bg-white px-7 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100">
                                Retour au panier
                            </Link>
                        </div>
                    </form>

                    <aside className="h-fit rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)]">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Résumé</span>
                        <h2 className="mt-3 font-serif text-2xl font-semibold">Votre panier</h2>
                        {items.length ? (
                            <div className="mt-6 grid gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 border-b border-black/10 pb-4">
                                        <div className="grid h-16 w-16 flex-none place-items-center rounded-md bg-[#eee4dc]">
                                            {item.image ? <img src={item.image} alt={item.name || 'Produit'} className="h-full w-full object-contain" /> : <FiShoppingBag />}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-semibold">{item.name || 'Produit'}</p>
                                            <p className="text-sm text-[#687074]">Qté {Number(item.quantity || 1)}</p>
                                        </div>
                                        <strong>{money(Number(item.price || 0) * Number(item.quantity || 1))}</strong>
                                    </div>
                                ))}
                                <div className="flex justify-between text-sm text-[#687074]"><span>Articles</span><strong className="text-[#202526]">{totals.quantity}</strong></div>
                                <div className="flex justify-between text-sm text-[#687074]"><span>Sous-total</span><strong className="text-[#202526]">{money(totals.subtotal)}</strong></div>
                                <div className="flex justify-between border-t border-black/10 pt-4 text-lg"><span>Total</span><strong>{money(totals.subtotal)}</strong></div>
                            </div>
                        ) : (
                            <div className="mt-6 text-sm leading-7 text-[#687074]">
                                Votre panier est vide. <Link href="/shop" className="font-semibold text-[#202526] underline">Retour à la boutique</Link>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}

function Field({ label, error, wide, children }: { label: string; error?: string; wide?: boolean; children: ReactElement }) {
    return (
        <label className={`block ${wide ? 'sm:col-span-2' : ''}`}>
            <span className="text-sm font-semibold">{label}</span>
            <div className="mt-2 [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-black/10 [&_input]:bg-[#f8f6f3] [&_input]:px-4 [&_input]:py-3 [&_textarea]:w-full [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-black/10 [&_textarea]:bg-[#f8f6f3] [&_textarea]:px-4 [&_textarea]:py-3">
                {children}
            </div>
            {error ? <p className="mt-2 text-sm font-semibold text-red-600">{error}</p> : null}
        </label>
    );
}

function readCart(): CartProduct[] {
    if (typeof window === 'undefined') return [];

    try {
        const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '{}');
        return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
        return [];
    }
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
