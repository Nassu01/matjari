import { Head, Link, router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { FiChevronDown, FiHeart, FiMinus, FiPlus, FiShoppingBag, FiStar } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type ProductSummary = {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    brand?: string | null;
    price: number;
    image?: string | null;
    description?: string | null;
    url?: string | null;
};

type ProductDetail = ProductSummary & {
    sku?: string | null;
    stock?: number;
    short_description?: string | null;
    images: string[];
    options?: Record<string, string | number | null | undefined>;
};

type Review = {
    id: number;
    customer: string;
    rating: number;
    text: string;
    date?: string | null;
};

type ShowProps = PageProps<{
    product: ProductDetail;
    reviews: Review[];
    relatedProducts: ProductSummary[];
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

export default function ProductShow() {
    const { auth, product, reviews = [], relatedProducts = [] } = usePage<ShowProps>().props;
    const gallery = useMemo(() => (product.images?.length ? product.images : product.image ? [product.image] : []), [product]);
    const [mainImage, setMainImage] = useState(gallery[0] || '');
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);
    const [cartMessage, setCartMessage] = useState('');

    const addToCart = () => {
        if (typeof window === 'undefined') return;

        const stored = readStoredCart();
        const existing = stored.find((item) => item.id === product.id);
        const next = existing
            ? stored.map((item) =>
                  item.id === product.id
                      ? {
                            ...item,
                            quantity: item.quantity + quantity,
                            totalPrice: Number(product.price || 0) * (item.quantity + quantity),
                        }
                      : item,
              )
            : [
                  ...stored,
                  {
                      id: product.id,
                      name: product.name,
                      price: Number(product.price || 0),
                      image: mainImage || product.image,
                      category: product.category,
                      quantity,
                      totalPrice: Number(product.price || 0) * quantity,
                  },
              ];

        writeStoredCart(next);
        setCartMessage('Produit ajouté au panier.');
    };

    const toggleFavorite = () => {
        if (!auth?.user) {
            setShowFavoritePrompt(true);
            return;
        }

        setIsFavorite((current) => !current);
    };

    return (
        <AuthStorefrontLayout>
            <Head title={product.name} />

            <main className="bg-[#f4f4f3] text-[#202526]">
                <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                    <div className="mx-auto grid w-full max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-start">
                        <div>
                            <div className="grid min-h-[520px] place-items-center rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)]">
                                {mainImage ? (
                                    <img src={mainImage} alt={product.name} className="max-h-[470px] w-full object-contain mix-blend-multiply" />
                                ) : (
                                    <FiShoppingBag className="h-16 w-16 text-[#687074]" />
                                )}
                            </div>

                            <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                                {(gallery.length ? gallery : ['']).map((image, index) => (
                                    <button
                                        key={`${image || 'empty'}-${index}`}
                                        type="button"
                                        className={`grid aspect-square place-items-center rounded-lg border bg-white p-2 transition hover:-translate-y-0.5 ${
                                            image === mainImage ? 'border-[#202526] shadow-[0_12px_30px_rgba(32,37,38,0.12)]' : 'border-black/10'
                                        }`}
                                        onClick={() => setMainImage(image)}
                                    >
                                        {image ? <img src={image} alt="" className="h-full w-full object-contain mix-blend-multiply" /> : <FiShoppingBag />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <aside className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)] sm:p-8">
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                {product.category || 'Produit'}
                            </span>
                            <h1 className="mt-4 font-serif text-[40px] font-semibold leading-tight text-[#202526] sm:text-5xl">
                                {product.name}
                            </h1>
                            <p className="mt-5 text-2xl font-semibold text-[#202526]">{money(product.price)}</p>

                            {product.description ? (
                                <p className="mt-5 text-base leading-8 text-[#687074]">{product.description}</p>
                            ) : null}

                            <dl className="mt-7 grid gap-3 rounded-lg border border-black/10 bg-[#f4f4f3] p-4 text-sm sm:grid-cols-2">
                                {Object.entries(product.options || {}).map(([label, value]) =>
                                    value ? (
                                        <div key={label}>
                                            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[#687074]">{optionLabel(label)}</dt>
                                            <dd className="mt-1 font-semibold text-[#202526]">{value}</dd>
                                        </div>
                                    ) : null,
                                )}
                            </dl>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex w-full items-center justify-between rounded-md border border-black/15 bg-white sm:w-36">
                                    <button
                                        type="button"
                                        className="grid h-11 w-11 place-items-center text-[#202526] transition hover:bg-[#eee4dc] hover:text-[#b91f2c]"
                                        aria-label="Diminuer la quantite"
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                    >
                                        <FiMinus />
                                    </button>
                                    <span className="font-semibold">{quantity}</span>
                                    <button
                                        type="button"
                                        className="grid h-11 w-11 place-items-center text-[#202526] transition hover:bg-[#eee4dc] hover:text-[#b91f2c]"
                                        aria-label="Augmenter la quantite"
                                        onClick={() => setQuantity((current) => current + 1)}
                                    >
                                        <FiPlus />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="inline-flex min-h-12 flex-1 items-center justify-center rounded-md bg-black px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-white"
                                    onClick={addToCart}
                                >
                                    Ajouter au panier
                                </button>

                                <button
                                    type="button"
                                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-neutral-100 ${
                                        isFavorite ? 'text-[#b91f2c]' : 'text-[#202526]'
                                    }`}
                                    onClick={toggleFavorite}
                                >
                                    <FiHeart />
                                    Ajouter aux favoris
                                </button>
                            </div>

                            {cartMessage ? <p className="mt-4 text-sm font-semibold text-[#202526]">{cartMessage}</p> : null}

                            <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
                                <InfoRow title="Description">{product.description || 'Information produit non disponible.'}</InfoRow>
                                <InfoRow title="Livraison">Livraison standard disponible. Les délais peuvent varier selon votre adresse.</InfoRow>
                                <InfoRow title="Retours">Retours acceptés selon les conditions de la boutique MATJARI.</InfoRow>
                                <InfoRow title="Détails du produit">
                                    {product.sku ? `Référence : ${product.sku}` : 'Détails complémentaires bientôt disponibles.'}
                                </InfoRow>
                            </div>
                        </aside>
                    </div>
                </section>

                <section className="border-t border-black/10 bg-white px-5 py-12 sm:px-8 lg:px-10">
                    <div className="mx-auto max-w-[1180px]">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Avis</span>
                        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <h2 className="font-serif text-4xl font-semibold text-[#202526]">Avis clients</h2>
                            <button className="inline-flex min-h-11 w-fit items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100" type="button">
                                Écrire un avis
                            </button>
                        </div>

                        {reviews.length > 0 ? (
                            <div className="mt-7 grid gap-4 md:grid-cols-2">
                                {reviews.map((review) => (
                                    <article key={review.id} className="rounded-lg border border-black/10 bg-[#f4f4f3] p-5">
                                        <div className="flex items-center justify-between gap-4">
                                            <strong>{review.customer}</strong>
                                            <span className="text-sm text-[#687074]">{review.date}</span>
                                        </div>
                                        <Rating value={review.rating} />
                                        <p className="mt-3 text-sm leading-7 text-[#687074]">{review.text}</p>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <p className="mt-7 rounded-lg border border-black/10 bg-[#f4f4f3] p-5 text-[#687074]">Aucun avis pour le moment.</p>
                        )}
                    </div>
                </section>

                <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
                    <div className="mx-auto max-w-[1180px]">
                        <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Sélection</span>
                        <h2 className="mt-3 font-serif text-4xl font-semibold text-[#202526]">Vous aimerez aussi</h2>

                        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <article
                                    key={relatedProduct.id}
                                    className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_45px_rgba(32,37,38,0.07)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(32,37,38,0.12)]"
                                >
                                    <button
                                        type="button"
                                        className="grid h-64 w-full place-items-center bg-[#eee4dc] p-5"
                                        onClick={() => router.visit(relatedProduct.url || `/products/${relatedProduct.slug}`)}
                                    >
                                        {relatedProduct.image ? (
                                            <img src={relatedProduct.image} alt={relatedProduct.name} className="h-full w-full object-contain mix-blend-multiply" />
                                        ) : (
                                            <FiShoppingBag className="h-10 w-10 text-[#687074]" />
                                        )}
                                    </button>
                                    <div className="p-5">
                                        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91f2c]">{relatedProduct.category || 'Produit'}</span>
                                        <h3 className="mt-2 font-serif text-xl font-semibold text-[#202526]">{relatedProduct.name}</h3>
                                        <p className="mt-3 font-semibold">{money(relatedProduct.price)}</p>
                                        <Link
                                            href={relatedProduct.url || `/products/${relatedProduct.slug}`}
                                            className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-4 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100"
                                        >
                                            Voir le produit
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {showFavoritePrompt ? <FavoriteAuthPrompt onClose={() => setShowFavoritePrompt(false)} /> : null}
        </AuthStorefrontLayout>
    );
}

function InfoRow({ title, children }: { title: string; children: ReactNode }) {
    return (
        <details className="group py-4" open={title === 'Description'}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold uppercase tracking-[0.14em] text-[#202526]">
                {title}
                <FiChevronDown className="transition group-open:rotate-180" />
            </summary>
            <div className="pt-3 text-sm leading-7 text-[#687074]">{children}</div>
        </details>
    );
}

function Rating({ value }: { value: number }) {
    return (
        <div className="mt-3 flex gap-1 text-[#b91f2c]" aria-label={`${value} étoiles`}>
            {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={index} className={index < value ? 'fill-current' : ''} />
            ))}
        </div>
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

function optionLabel(label: string): string {
    const labels: Record<string, string> = {
        brand: 'Marque',
        category: 'Catégorie',
        sku: 'SKU',
        stock: 'Disponibilité',
    };

    return labels[label] || label;
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
    const totalQuantity = products.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const totalAmount = products.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);

    window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
            products,
            totalQuantity,
            totalAmount: Number(totalAmount.toFixed(2)),
        }),
    );
}
