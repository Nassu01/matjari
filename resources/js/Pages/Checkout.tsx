import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { FiArrowLeft, FiCreditCard, FiLock, FiTruck } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type CartProduct = {
    id: string | number;
    name?: string;
    titre?: string;
    category?: string;
    image?: string;
    img?: string;
    price?: number | string;
    quantity?: number;
};

type CheckoutProps = PageProps<{
    customer?: {
        name?: string | null;
        email?: string | null;
        phone?: string | null;
    };
    errorMessage?: string | null;
    errors?: Record<string, string>;
}>;

const CART_STORAGE_KEY = 'matjari_cart';

function readStoredCart(): CartProduct[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
        return [];
    }
}

function money(value: number | string | undefined) {
    return `${Number(value || 0).toFixed(2)} DH`;
}

export default function Checkout() {
    const { customer, errorMessage, errors = {} } = usePage<CheckoutProps>().props;
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [hydrated, setHydrated] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: customer?.email || '',
        phone: customer?.phone || '',
        address: '',
        city: '',
        postalCode: '',
    });

    useEffect(() => {
        setProducts(readStoredCart());
        setHydrated(true);
    }, []);

    const totals = useMemo(() => {
        return products.reduce(
            (summary, product) => {
                const quantity = Number(product.quantity || 0);
                const price = Number(product.price || 0);
                summary.amount += price * quantity;
                return summary;
            },
            { amount: 0 },
        );
    }, [products]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (products.length === 0 || processing) return;

        setProcessing(true);

        router.post(
            '/checkout',
            {
                first_name: formData.firstName,
                last_name: formData.lastName,
                customer_email: formData.email,
                customer_phone: formData.phone,
                delivery_address: formData.address,
                city: formData.city,
                postal_code: formData.postalCode,
                payment_method: paymentMethod === 'cod' ? 'cash_on_delivery' : 'stripe',
                cart_items: products.map((product) => ({
                    id: Number(product.id),
                    quantity: Number(product.quantity || 1),
                })),
            },
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            },
        );
    };

    if (hydrated && products.length === 0) {
        return (
            <AuthStorefrontLayout>
                <Head title="Panier vide - Matjari" />
                <main className="bg-[#f4f4f3] px-4 py-12 text-[#202526] sm:px-6 sm:py-16 lg:px-10">
                    <section className="mx-auto w-full max-w-3xl rounded-lg border border-black/10 bg-white px-5 py-12 text-center shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:px-6 sm:py-14">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Checkout</span>
                        <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">Votre panier est vide.</h1>
                        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#687074]">
                            Ajoutez des produits au panier avant de confirmer une commande.
                        </p>
                        <Link
                            href="/shop"
                            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:bg-neutral-800 hover:text-white"
                        >
                            Retour à la boutique
                        </Link>
                    </section>
                </main>
            </AuthStorefrontLayout>
        );
    }

    if (!hydrated) {
        return (
            <AuthStorefrontLayout>
                <Head title="Passer la commande - Matjari" />
                <main className="bg-[#f4f4f3] px-4 py-16 text-center text-[#202526] sm:px-6 lg:px-10">
                    <p className="text-sm font-semibold text-[#687074]">Chargement du panier...</p>
                </main>
            </AuthStorefrontLayout>
        );
    }

    const cartError = errors.cart_items || errors['cart_items.0.id'];

    return (
        <AuthStorefrontLayout>
            <Head title="Passer la commande - Matjari" />

            <main className="bg-[#f4f4f3] px-4 py-12 text-[#202526] sm:px-6 lg:px-10 lg:py-16">
                <div className="mx-auto w-full max-w-[1180px]">
                    <div className="mb-8">
                        <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-semibold text-[#687074] transition hover:text-black">
                            <FiArrowLeft className="h-4 w-4" />
                            Retour au panier
                        </Link>
                        {errorMessage ? (
                            <div className="mt-4 rounded-lg border border-[#f1c7c7] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#b91f2c]">
                                {errorMessage}
                            </div>
                        ) : null}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)]">
                        <form id="checkout-form" onSubmit={handleSubmit} className="min-w-0 space-y-6">
                            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(32,37,38,0.05)] sm:p-8">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Étape 1</span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">Informations de livraison</h2>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <InputField label="Prénom" name="firstName" value={formData.firstName} onChange={handleInputChange} error={errors.first_name} placeholder="Ahmed" />
                                    <InputField label="Nom" name="lastName" value={formData.lastName} onChange={handleInputChange} error={errors.last_name} placeholder="Alami" />
                                    <InputField className="sm:col-span-2" label="Adresse e-mail" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.customer_email} placeholder="ahmed@example.com" />
                                    <InputField className="sm:col-span-2" label="Téléphone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.customer_phone} placeholder="+212 600-000000" />
                                    <InputField className="sm:col-span-2" label="Adresse complète" name="address" value={formData.address} onChange={handleInputChange} error={errors.delivery_address} placeholder="Rue, numéro d'appartement, quartier..." />
                                    <InputField label="Ville" name="city" value={formData.city} onChange={handleInputChange} error={errors.city} placeholder="Casablanca" />
                                    <InputField label="Code postal" name="postalCode" value={formData.postalCode} onChange={handleInputChange} error={errors.postal_code} placeholder="20000" />
                                </div>
                            </section>

                            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(32,37,38,0.05)] sm:p-8">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Étape 2</span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">Mode de paiement</h2>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <PaymentOption
                                        active={paymentMethod === 'cod'}
                                        icon={<FiTruck className="mt-1 h-5 w-5 text-[#687074]" />}
                                        title="Paiement à la livraison"
                                        text="Payez en espèces dès réception de votre colis."
                                        onClick={() => setPaymentMethod('cod')}
                                    />
                                    <PaymentOption
                                        active={paymentMethod === 'card'}
                                        icon={<FiCreditCard className="mt-1 h-5 w-5 text-[#687074]" />}
                                        title="Carte bancaire"
                                        text="Paiement carte bancaire simulé pour démonstration."
                                        onClick={() => setPaymentMethod('card')}
                                    />
                                </div>
                                <ErrorText message={errors.payment_method} />
                            </section>
                        </form>

                        <aside className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:h-fit">
                            <div className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)]">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Votre commande</span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">Résumé de la commande</h2>

                                <div className="max-h-[240px] divide-y divide-neutral-100 overflow-y-auto pr-2">
                                    {products.map((product) => {
                                        const qty = Number(product.quantity || 1);
                                        const price = Number(product.price || 0);
                                        const title = product.name || product.titre || 'Produit';
                                        const imgUrl = product.image || product.img || '';

                                        return (
                                            <div key={product.id} className="flex min-w-0 items-center gap-4 py-3 first:pt-0 last:pb-0">
                                                <div className="h-14 w-14 flex-none overflow-hidden rounded-md border border-[#dedbd8] bg-[#eee4dc]">
                                                    {imgUrl ? <img src={imgUrl} alt={title} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-[10px] font-bold text-[#687074]">Matjari</div>}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-sm font-semibold text-[#202526]">{title}</h3>
                                                    <p className="mt-1 text-xs text-[#687074]">Qté: {qty} x {money(price)}</p>
                                                </div>
                                                <span className="shrink-0 text-sm font-semibold text-[#202526]">{money(price * qty)}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="mt-6 space-y-4 border-t border-black/10 pt-4 text-sm text-[#687074]">
                                    <div className="flex items-center justify-between">
                                        <span>Sous-total</span>
                                        <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Frais de livraison</span>
                                        <strong className="font-semibold text-green-600">Gratuit</strong>
                                    </div>
                                    <div className="border-t border-black/10 pt-4">
                                        <div className="flex flex-wrap items-center justify-between gap-2 text-lg">
                                            <span>Total à payer</span>
                                            <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    form="checkout-form"
                                    disabled={processing}
                                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? 'Confirmation en cours...' : `Confirmer la commande (${money(totals.amount)})`}
                                </button>
                                <ErrorText message={cartError} center />

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#687074]">
                                    <FiLock className="h-3 w-3" />
                                    <span>{paymentMethod === 'card' ? 'Paiement Stripe simulé' : 'Paiement sécurisé'}</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    className = '',
}: {
    label: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    type?: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#687074]">{label}</label>
            <input
                type={type}
                name={name}
                required={name !== 'postalCode'}
                value={value}
                onChange={onChange}
                className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                placeholder={placeholder}
            />
            <ErrorText message={error} />
        </div>
    );
}

function PaymentOption({
    active,
    icon,
    title,
    text,
    onClick,
}: {
    active: boolean;
    icon: ReactNode;
    title: string;
    text: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative flex cursor-pointer items-start gap-4 rounded-lg border p-4 text-left transition ${
                active ? 'border-black bg-[#fffdfb] ring-1 ring-black' : 'border-neutral-200 bg-white hover:border-neutral-300'
            }`}
        >
            <span className={`mt-1 h-4 w-4 rounded-full border ${active ? 'border-black bg-black shadow-[inset_0_0_0_4px_white]' : 'border-neutral-300 bg-white'}`} />
            <span className="flex gap-3">
                {icon}
                <span>
                    <span className="block text-sm font-semibold text-[#202526]">{title}</span>
                    <span className="mt-1 block text-xs text-[#687074]">{text}</span>
                </span>
            </span>
        </button>
    );
}

function ErrorText({ message, center = false }: { message?: string; center?: boolean }) {
    if (!message) return null;

    return <p className={`mt-2 text-sm font-semibold text-[#b91f2c] ${center ? 'text-center' : ''}`}>{message}</p>;
}
