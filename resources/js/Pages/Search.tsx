import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FiHeart, FiSearch, FiShoppingBag } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type SearchProduct = {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    price: number;
    image?: string | null;
    description?: string | null;
    url?: string | null;
};

type SearchProps = PageProps<{
    query: string;
    products: SearchProduct[];
}>;

type StoredCartProduct = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    category?: string | null;
    quantity: number;
    totalPrice: number;
};

const CART_STORAGE_KEY = 'matjari_cart';

export default function Search() {
    const { auth, query = '', products = [] } = usePage<SearchProps>().props;
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);

    const addProductToCart = (product: SearchProduct) => {
        if (typeof window === 'undefined') return;

        const stored = readStoredCart();
        const existing = stored.find((item) => item.id === product.id);
        const next = existing
            ? stored.map((item) =>
                  item.id === product.id
                      ? {
                            ...item,
                            quantity: item.quantity + 1,
                            totalPrice: Number(product.price || 0) * (item.quantity + 1),
                        }
                      : item,
              )
            : [
                  ...stored,
                  {
                      id: product.id,
                      name: product.name,
                      price: Number(product.price || 0),
                      image: product.image,
                      category: product.category,
                      quantity: 1,
                      totalPrice: Number(product.price || 0),
                  },
              ];

        writeStoredCart(next);
    };

    const toggleFavorite = (id: number) => {
        if (!auth?.user) {
            setShowFavoritePrompt(true);
            return;
        }

        setFavoriteIds((current) =>
            current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
        );
    };

    return (
        <AuthStorefrontLayout>
            <Head title="Recherche" />

            <main className="bg-[#f4f4f3] px-5 py-12 text-[#202526] sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto w-full max-w-[1180px]">
                    <header className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                RECHERCHE
                            </span>
                            <h1 className="mt-3 font-serif text-[38px] font-semibold leading-tight text-[#202526] sm:text-5xl">
                                Recherche
                            </h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-[#687074]">
                                {query ? `Résultats pour : ${query}` : 'Recherchez un produit, une catégorie ou un mot-clé.'}
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] shadow-sm transition hover:-translate-y-0.5 hover:bg-neutral-100"
                        >
                            Retour à la boutique
                        </Link>
                    </header>

                    {products.length > 0 ? (
                        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Résultats de recherche">
                            {products.map((product) => (
                                <article
                                    key={product.id}
                                    className="group flex min-h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_45px_rgba(32,37,38,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(32,37,38,0.12)]"
                                    onClick={(event) => {
                                        const target = event.target as HTMLElement;
                                        if (target.closest('a, button')) return;

                                        router.visit(product.url || `/products/${product.slug}`);
                                    }}
                                >
                                    <div className="relative grid h-72 place-items-center bg-[#eee4dc] p-6">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-full w-full object-contain mix-blend-multiply transition duration-300 group-hover:scale-[1.03]"
                                            />
                                        ) : (
                                            <FiShoppingBag className="h-12 w-12 text-[#687074]" />
                                        )}
                                        <button
                                            type="button"
                                            className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-white text-[#202526] shadow-sm transition hover:-translate-y-0.5 hover:text-[#b91f2c] ${
                                                favoriteIds.includes(product.id) ? 'text-[#b91f2c]' : ''
                                            }`}
                                            aria-label="Ajouter aux favoris"
                                            onClick={() => toggleFavorite(product.id)}
                                        >
                                            <FiHeart className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#b91f2c]">
                                            {product.category || 'Produit'}
                                        </span>
                                        <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-[#202526] transition group-hover:text-[#b91f2c]">
                                            {product.name}
                                        </h2>
                                        {product.description ? (
                                            <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#687074]">
                                                {product.description}
                                            </p>
                                        ) : null}
                                        <p className="mt-4 text-lg font-semibold text-[#202526]">{money(product.price)}</p>

                                        <div className="mt-auto grid gap-3 pt-5">
                                            <Link
                                                href={product.url || `/products/${product.slug}`}
                                                className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100"
                                            >
                                                Voir le produit
                                            </Link>
                                            <button
                                                type="button"
                                                className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white"
                                                onClick={() => addProductToCart(product)}
                                            >
                                                Ajouter au panier
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>
                    ) : (
                        <section className="mx-auto max-w-3xl rounded-lg border border-black/10 bg-white px-6 py-14 text-center shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:px-10 sm:py-16">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#dedbd8] bg-[#eee4dc] text-[#202526] shadow-[0_14px_35px_rgba(32,37,38,0.08)]">
                                <FiSearch className="h-7 w-7" />
                            </div>
                            <span className="mt-8 block text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                AUCUN RÉSULTAT
                            </span>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[#202526] sm:text-[36px]">
                                Aucun produit trouvé.
                            </h2>
                            <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#687074]">
                                Essayez un autre mot-clé ou explorez notre boutique.
                            </p>
                            <Link
                                href="/"
                                className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white sm:w-auto"
                            >
                                Retour à la boutique
                            </Link>
                        </section>
                    )}
                </div>
            </main>

            {showFavoritePrompt ? <FavoriteAuthPrompt onClose={() => setShowFavoritePrompt(false)} /> : null}
        </AuthStorefrontLayout>
    );
}

function FavoriteAuthPrompt({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/45 px-5 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                <button
                    type="button"
                    className="absolute right-4 top-3 text-2xl leading-none text-[#202526] transition hover:text-[#b91f2c]"
                    aria-label="Fermer"
                    onClick={onClose}
                >
                    x
                </button>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Favoris</span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#202526]">Connexion requise</h2>
                <p className="mt-4 text-sm leading-7 text-[#687074]">
                    Vous devez vous connecter ou créer un compte pour ajouter ce produit aux favoris.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-semibold text-white hover:bg-neutral-800 hover:text-white" href="/login">
                        Se connecter
                    </Link>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] hover:bg-neutral-100" href="/register">
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    );
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}

function readStoredCart(): StoredCartProduct[] {
    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];

        const parsed = JSON.parse(stored) as { products?: StoredCartProduct[] };
        return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
        return [];
    }
}

function writeStoredCart(products: StoredCartProduct[]) {
    const totalQuantity = products.reduce((sum, product) => sum + Number(product.quantity || 0), 0);
    const totalAmount = products.reduce((sum, product) => sum + Number(product.price || 0) * Number(product.quantity || 0), 0);

    window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
            products,
            totalQuantity,
            totalAmount: Number(totalAmount.toFixed(2)),
        }),
    );
}
