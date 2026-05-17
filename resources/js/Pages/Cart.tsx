import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';

type CartProduct = {
    id: string | number;
    name?: string;
    titre?: string;
    category?: string;
    image?: string;
    img?: string;
    price?: number | string;
    quantity?: number;
    totalPrice?: number | string;
};

type StoredCart = {
    products?: CartProduct[];
};

const CART_STORAGE_KEY = 'matjari_cart';

function readStoredCart(): CartProduct[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored) as StoredCart;
        return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
        return [];
    }
}

function writeStoredCart(products: CartProduct[]) {
    if (typeof window === 'undefined') return;

    const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
    const totalAmount = products.reduce((sum, product) => {
        const quantity = Number(product.quantity || 0);
        const price = Number(product.price || 0);
        return sum + price * quantity;
    }, 0);

    window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
            products: products.map((product) => ({
                ...product,
                quantity: Number(product.quantity || 0),
                totalPrice: Number(product.price || 0) * Number(product.quantity || 0),
            })),
            totalQuantity,
            totalAmount: Number(totalAmount.toFixed(2)),
        }),
    );
}

function money(value: number | string | undefined) {
    return `${Number(value || 0).toFixed(2)} DH`;
}

export default function Cart() {
    const [products, setProducts] = useState<CartProduct[]>([]);

    useEffect(() => {
        setProducts(readStoredCart());
    }, []);

    const totals = useMemo(() => {
        return products.reduce(
            (summary, product) => {
                const quantity = Number(product.quantity || 0);
                const price = Number(product.price || 0);
                summary.quantity += quantity;
                summary.amount += price * quantity;
                return summary;
            },
            { quantity: 0, amount: 0 },
        );
    }, [products]);

    const removeProduct = (id: CartProduct['id']) => {
        setProducts((current) => {
            const next = current.filter((product) => product.id !== id);
            writeStoredCart(next);
            return next;
        });
    };

    const clearCart = () => {
        setProducts([]);
        writeStoredCart([]);
    };

    const updateQuantity = (id: CartProduct['id'], nextQuantity: number) => {
        setProducts((current) => {
            const next = current
                .map((product) =>
                    product.id === id
                        ? {
                              ...product,
                              quantity: Math.max(1, nextQuantity),
                          }
                        : product,
                )
                .map((product) => ({
                    ...product,
                    totalPrice: Number(product.price || 0) * Number(product.quantity || 0),
                }));

            writeStoredCart(next);
            return next;
        });
    };

    const isEmpty = products.length === 0;

    return (
        <AuthStorefrontLayout>
            <Head title="Mon panier" />

            <main className="bg-[#f4f4f3] px-5 py-12 text-[#202526] sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto w-full max-w-[1180px]">
                    <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                PANIER
                            </span>
                            <h1 className="mt-3 font-serif text-[38px] font-semibold leading-tight text-[#202526] sm:text-5xl">
                                Mon panier
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#687074]">
                                Retrouvez ici les produits que vous avez ajoutés à votre panier.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-100 hover:text-[#202526]"
                        >
                            Continuer mes achats
                        </Link>
                    </div>

                    {isEmpty ? (
                        <section className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-white px-6 py-14 text-center shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:px-10 sm:py-16">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#dedbd8] bg-[#eee4dc] text-[#202526] shadow-[0_14px_35px_rgba(32,37,38,0.08)]">
                                <FiShoppingBag className="h-7 w-7" />
                            </div>
                            <span className="mt-8 block text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                PANIER VIDE
                            </span>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#202526] sm:text-[36px]">
                                Votre panier est vide.
                            </h2>
                            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#687074]">
                                Découvrez nos produits et ajoutez vos articles préférés à votre panier.
                            </p>
                            <Link
                                href="/shop"
                                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white sm:w-auto"
                            >
                                Découvrir les produits
                            </Link>
                        </section>
                    ) : (
                        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_340px]">
                            <section>
                                <div className="mb-4 flex flex-col gap-3 rounded-lg border border-black/10 bg-white px-5 py-4 shadow-[0_14px_35px_rgba(32,37,38,0.06)] sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#b91f2c]">
                                            Articles
                                        </span>
                                        <p className="mt-1 text-sm text-[#687074]">
                                            {totals.quantity} produit{totals.quantity > 1 ? 's' : ''} dans votre panier
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-black px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white sm:w-fit"
                                        onClick={clearCart}
                                    >
                                        Vider le panier
                                    </button>
                                </div>

                                <div className="hidden">
                                    <span>Produit</span>
                                    <span>Prix</span>
                                    <span>Quantité</span>
                                    <span>Total</span>
                                    <span>Action</span>
                                </div>

                                <div className="grid gap-4">
                                    {products.map((product) => {
                                        const quantity = Number(product.quantity || 1);
                                        const price = Number(product.price || 0);
                                        const name = product.name || product.titre || 'Produit';
                                        const image = product.image || product.img || '';

                                        return (
                                            <article
                                                key={product.id}
                                                className="grid gap-5 rounded-lg border border-black/10 bg-white p-4 shadow-[0_18px_45px_rgba(32,37,38,0.07)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(32,37,38,0.1)] lg:grid-cols-[minmax(0,1fr)_96px_126px_96px_128px] lg:items-center lg:p-5"
                                            >
                                                <div className="flex min-w-0 gap-4">
                                                    <div className="h-24 w-24 flex-none overflow-hidden rounded-lg border border-[#dedbd8] bg-[#eee4dc] sm:h-28 sm:w-28">
                                                        {image ? (
                                                            <img
                                                                src={image}
                                                                alt={name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-xs font-semibold uppercase tracking-[0.12em] text-[#687074]">
                                                                Image
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 self-center">
                                                        <h2 className="font-serif text-xl font-semibold leading-tight text-[#202526]">
                                                            {name}
                                                        </h2>
                                                        <p className="mt-2 text-sm text-[#687074]">
                                                            {product.category || 'Catégorie'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-base font-semibold text-[#202526]">
                                                    {money(price)}
                                                </div>

                                                <div className="flex w-fit items-center rounded-md border border-black/15 bg-[#fffdfb]">
                                                    <button
                                                        type="button"
                                                        className="flex h-10 w-10 items-center justify-center text-[#202526] transition hover:bg-[#eee4dc] hover:text-[#b91f2c]"
                                                        aria-label="Diminuer la quantite"
                                                        onClick={() => updateQuantity(product.id, quantity - 1)}
                                                    >
                                                        <FiMinus className="h-4 w-4" />
                                                    </button>
                                                    <span className="min-w-10 text-center text-sm font-semibold">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="flex h-10 w-10 items-center justify-center text-[#202526] transition hover:bg-[#eee4dc] hover:text-[#b91f2c]"
                                                        aria-label="Augmenter la quantite"
                                                        onClick={() => updateQuantity(product.id, quantity + 1)}
                                                    >
                                                        <FiPlus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="text-base font-semibold text-[#202526]">
                                                    {money(price * quantity)}
                                                </div>

                                                <button
                                                    type="button"
                                                    className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-black/15 bg-white px-4 text-sm font-semibold text-[#202526] transition hover:border-[#b91f2c] hover:bg-[#fff7f7] hover:text-[#b91f2c]"
                                                    onClick={() => removeProduct(product.id)}
                                                >
                                                    <FiTrash2 />
                                                    Supprimer
                                                </button>
                                            </article>
                                        );
                                    })}
                                </div>
                            </section>

                            <aside className="h-fit rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)] lg:sticky lg:top-6">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                    Résumé
                                </span>
                                <h2 className="mt-3 font-serif text-2xl font-semibold text-[#202526]">
                                    Total du panier
                                </h2>

                                <div className="mt-6 space-y-4 text-sm text-[#687074]">
                                    <div className="flex items-center justify-between">
                                        <span>Sous-total</span>
                                        <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Livraison</span>
                                        <strong className="text-[#202526]">Gratuite</strong>
                                    </div>
                                    <div className="border-t border-black/10 pt-4">
                                        <div className="flex items-center justify-between text-lg">
                                            <span>Total</span>
                                            <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7 grid gap-3">
                                    <Link
                                        href="/checkout"
                                        className="inline-flex min-h-12 items-center justify-center rounded-md bg-black px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white"
                                    >
                                        Passer au checkout
                                    </Link>
                                    <Link
                                        href="/shop"
                                        className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-6 text-sm font-semibold text-[#202526] transition hover:-translate-y-0.5 hover:bg-neutral-100 hover:text-[#202526]"
                                    >
                                        Continuer mes achats
                                    </Link>
                                </div>
                            </aside>
                        </div>
                    )}
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}
