import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { FiEye, FiHeart, FiRefreshCw, FiSearch, FiShoppingBag } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type ShopProduct = {
    id: number;
    name: string;
    slug: string;
    category?: string | null;
    brand?: string | null;
    price: number;
    old_price?: number | null;
    discount?: number | null;
    sale?: boolean;
    top?: boolean;
    stock?: number;
    image?: string | null;
    thumbnail?: string | null;
    images?: string[];
    description?: string | null;
    url?: string | null;
};

type Category = {
    id?: number;
    name: string;
    slug: string;
};

type Filters = {
    search?: string;
    category?: string;
    min_price?: string;
    max_price?: string;
    discount?: string;
    sort?: string;
    page?: string;
};

type PaginatedProducts = {
    data: ShopProduct[];
    total: number;
    links?: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
};

type ShopProps = PageProps<{
    products: PaginatedProducts;
    filters: Filters;
    categories: Category[];
    favoriteIds: number[];
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
const FALLBACK_PRODUCT_IMAGE = '/images/logomatjari.png';

const discountOptions = [
    { label: '50% et plus', value: '50' },
    { label: '40% et plus', value: '40' },
    { label: '30% et plus', value: '30' },
    { label: '20% et plus', value: '20' },
];

const sortOptions = [
    { label: 'Les plus demandés', value: 'most_demanded' },
    { label: 'Prix croissant', value: 'price_asc' },
    { label: 'Prix décroissant', value: 'price_desc' },
    { label: 'Nouveautés', value: 'newest' },
    { label: 'Meilleures notes', value: 'best_rated' },
];

export default function ShopIndex() {
    const { auth, products, filters = {}, categories = [], favoriteIds: pageFavoriteIds = [] } = usePage<ShopProps>().props;
    const productList = products?.data || [];
    const resultCount = products?.total || productList.length;
    const visibleCategories = categories;
    const [search, setSearch] = useState(filters.search || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [favoriteIds, setFavoriteIds] = useState<number[]>(pageFavoriteIds);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [cartNotice, setCartNotice] = useState('');
    const activeFilters = useMemo(() => cleanFilters(filters), [filters]);

    useEffect(() => {
        setFavoriteIds(pageFavoriteIds);
    }, [pageFavoriteIds]);

    const visitShop = (nextFilters: Filters = {}) => {
        router.get('/shop', cleanFilters({ ...activeFilters, ...nextFilters }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const submitSearch = (event: FormEvent) => {
        event.preventDefault();
        visitShop({ search, page: undefined } as Filters);
    };

    const submitPrice = (event: FormEvent) => {
        event.preventDefault();
        visitShop({ min_price: minPrice, max_price: maxPrice, page: undefined } as Filters);
    };

    const toggleFavorite = (id: number) => {
        if (!auth?.user) {
            setShowLoginPrompt(true);
            return;
        }

        router.post('/favorites/toggle', { product_id: id }, {
            preserveScroll: true,
            onSuccess: () => router.reload({ only: ['favoriteIds'] }),
        });
    };

    const addToCart = (product: ShopProduct) => {
        if (!auth?.user) {
            setShowLoginPrompt(true);
            return;
        }

        addProductToCart(product);
        setCartNotice('Produit ajouté au panier.');
        window.setTimeout(() => setCartNotice(''), 2200);
    };

    return (
        <AuthStorefrontLayout>
            <Head title="Boutique" />

            <main className="w-full bg-[#f4f4f3] px-4 py-10 text-[#202526] sm:px-6 lg:px-10 lg:py-14">
                <div className="mx-auto w-full max-w-[1600px]">
                    <header className="mb-9 text-center">
                        <span className="font-['Great_Vibes',cursive] text-[50px] leading-none text-[#c9cacc]">
                            Boutique
                        </span>
                        <h1 className="-mt-1 font-serif text-[38px] font-bold leading-tight text-[#050505] sm:text-5xl">
                            Tous les produits
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#687074] sm:text-lg">
                            Découvrez notre sélection de produits et trouvez ce dont vous avez besoin.
                        </p>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-[264px_minmax(0,1fr)] xl:grid-cols-[282px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-lg border border-black/10 bg-[#eee4dc] p-3 shadow-[0_18px_42px_rgba(32,37,38,0.07)] sm:p-4 lg:sticky lg:top-24">
                            <CategoryFilterSection title="Catégories">
                                <div className="grid gap-1.5">
                                    <CategoryFilterLink active={!filters.category} href="/shop">
                                        Toutes les catégories
                                    </CategoryFilterLink>
                                    {visibleCategories.map((category) => (
                                        <CategoryFilterLink
                                            key={category.slug}
                                            active={filters.category === category.slug}
                                            href={`/shop?category=${category.slug}`}
                                        >
                                            {category.name}
                                        </CategoryFilterLink>
                                    ))}
                                </div>
                            </CategoryFilterSection>

                            <FilterSection title="Prix (DH)">
                                <form className="grid gap-2.5" onSubmit={submitPrice}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            className="h-[42px] min-w-0 rounded-md border border-black/10 bg-[#fbfaf8] px-3 text-sm outline-none transition placeholder:text-[#9a928a] focus:border-[#202526] focus:bg-white focus:shadow-[0_0_0_3px_rgba(32,37,38,0.06)]"
                                            inputMode="decimal"
                                            placeholder="Min"
                                            value={minPrice}
                                            onChange={(event) => setMinPrice(event.target.value)}
                                        />
                                        <input
                                            className="h-[42px] min-w-0 rounded-md border border-black/10 bg-[#fbfaf8] px-3 text-sm outline-none transition placeholder:text-[#9a928a] focus:border-[#202526] focus:bg-white focus:shadow-[0_0_0_3px_rgba(32,37,38,0.06)]"
                                            inputMode="decimal"
                                            placeholder="Max"
                                            value={maxPrice}
                                            onChange={(event) => setMaxPrice(event.target.value)}
                                        />
                                    </div>
                                    <button className="h-11 rounded-md bg-[#202526] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(32,37,38,0.14)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white" type="submit">
                                        OK
                                    </button>
                                </form>
                            </FilterSection>

                            <FilterSection title="Réduction (%)">
                                <div className="grid gap-1">
                                    {discountOptions.map((option) => (
                                        <FilterLink
                                            key={option.value}
                                            active={filters.discount === option.value}
                                            href={shopUrl({ ...activeFilters, discount: option.value })}
                                        >
                                            {option.label}
                                        </FilterLink>
                                    ))}
                                </div>
                            </FilterSection>
                        </aside>

                        <section className="min-w-0">
                            <div className="mb-5 rounded-lg border border-black/10 bg-white p-4 shadow-[0_18px_42px_rgba(32,37,38,0.05)]">
                                <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto_auto]" onSubmit={submitSearch}>
                                    <div className="relative">
                                        <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#687074]" />
                                        <input
                                            className="min-h-12 w-full rounded-md border border-black/10 bg-[#f8f6f3] px-12 text-sm outline-none transition placeholder:text-[#8a8f92] focus:border-[#202526] focus:bg-white"
                                            value={search}
                                            onChange={(event) => setSearch(event.target.value)}
                                            placeholder="Rechercher un produit..."
                                        />
                                    </div>
                                    <button className="min-h-12 rounded-md bg-black px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white" type="submit">
                                        Rechercher
                                    </button>
                                    <Link
                                        className="inline-flex min-h-12 items-center justify-center rounded-md border border-black/10 bg-white px-6 text-sm font-semibold text-[#202526] transition hover:bg-neutral-100"
                                        href="/shop"
                                    >
                                        Réinitialiser
                                    </Link>
                                </form>
                            </div>

                            <div className="mb-6 flex flex-col gap-3 rounded-lg border border-black/10 bg-white px-5 py-4 shadow-[0_18px_42px_rgba(32,37,38,0.05)] sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-semibold text-[#202526]">{resultCount} résultats</p>
                                <label className="flex flex-col gap-2 text-sm text-[#687074] sm:flex-row sm:items-center sm:gap-3">
                                    Trier par :
                                    <select
                                        className="min-h-10 w-full rounded-md border border-black/10 bg-[#f8f6f3] px-3 text-sm font-semibold text-[#202526] outline-none transition focus:border-[#202526] sm:w-auto"
                                        value={filters.sort || 'most_demanded'}
                                        onChange={(event) => visitShop({ sort: event.target.value, page: undefined } as Filters)}
                                    >
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {productList.length > 0 ? (
                                <>
                                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 min-[1530px]:grid-cols-4">
                                        {productList.map((product) => (
                                            <ShopProductCard
                                                key={product.id}
                                                favorite={favoriteIds.includes(product.id)}
                                                product={product}
                                                onAddToCart={addToCart}
                                                onToggleFavorite={toggleFavorite}
                                            />
                                        ))}
                                    </div>

                                    {products.links && products.links.length > 3 ? (
                                        <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Pagination">
                                            {products.links.map((link, index) => (
                                                <Link
                                                    key={`${link.label}-${index}`}
                                                    href={link.url || '#'}
                                                    preserveScroll
                                                    className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-semibold transition ${
                                                        link.active
                                                            ? 'border-black bg-black text-white'
                                                            : 'border-black/10 bg-white text-[#202526] hover:bg-neutral-100'
                                                    } ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </nav>
                                    ) : null}
                                </>
                            ) : (
                                <EmptyState />
                            )}
                        </section>
                    </div>
                </div>
            </main>

            {showLoginPrompt ? <LoginRequiredPrompt onClose={() => setShowLoginPrompt(false)} /> : null}
            {cartNotice ? <CartNotice message={cartNotice} /> : null}
        </AuthStorefrontLayout>
    );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-md border border-black/10 bg-white p-3.5 shadow-[0_12px_28px_rgba(32,37,38,0.045)] [&+&]:mt-3.5 sm:p-4">
            <div className="mb-3 border-b border-[#eee7df] pb-2.5">
                <h2 className="font-serif text-[21px] font-semibold leading-tight text-[#202526]">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function CategoryFilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-md border border-black/10 bg-white px-3.5 py-4 shadow-[0_14px_30px_rgba(32,37,38,0.055)] sm:px-4">
            <div className="mb-3 border-b border-[#eee7df] pb-2.5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b91f2c]">Filtrer par</span>
                <h2 className="mt-1 font-serif text-[23px] font-semibold leading-none text-[#202526]">{title}</h2>
            </div>
            {children}
        </section>
    );
}

function CategoryFilterLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link
            aria-current={active ? 'page' : undefined}
            className={`group flex min-h-10 items-center rounded-md border px-3 py-2 text-sm font-medium transition duration-200 ${
                active
                    ? 'border-[#202526] bg-[#202526] text-white shadow-[0_10px_20px_rgba(32,37,38,0.16)]'
                    : 'border-transparent text-[#4f5659] hover:border-[#eadfd5] hover:bg-[#f4f0eb] hover:translate-x-1 hover:text-[#202526]'
            }`}
            href={href}
            preserveScroll
        >
            <span className="truncate">{children}</span>
        </Link>
    );
}

function FilterLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link
            className={`rounded-md border px-3 py-2 text-sm transition ${
                active
                    ? 'border-[#202526] bg-[#202526] font-semibold text-white shadow-[0_10px_22px_rgba(32,37,38,0.14)]'
                    : 'border-transparent text-[#4f5659] hover:border-[#eadfd5] hover:bg-[#f4f0eb] hover:translate-x-1 hover:text-[#202526]'
            }`}
            href={href}
            preserveScroll
        >
            {children}
        </Link>
    );
}

function ShopProductCard({
    product,
    favorite,
    onAddToCart,
    onToggleFavorite,
}: {
    product: ShopProduct;
    favorite: boolean;
    onAddToCart: (product: ShopProduct) => void;
    onToggleFavorite: (id: number) => void;
}) {
    const detailsUrl = product.url || `/products/${product.slug || product.id}`;
    const image = productImage(product);

    return (
        <article
            className="group relative flex min-h-[470px] cursor-pointer flex-col overflow-hidden rounded-md border border-black/10 bg-white p-4 pb-0 shadow-[0_12px_30px_rgba(32,37,38,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(32,37,38,0.13)]"
            role="link"
            tabIndex={0}
            onClick={() => router.visit(detailsUrl)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    router.visit(detailsUrl);
                }
            }}
        >
            {product.sale || product.discount ? (
                <span className="absolute left-4 top-4 z-10 bg-[#b91f2c] px-2 py-1 text-xs font-extrabold text-white">
                    {product.discount ? `-${product.discount}%` : '%'}
                </span>
            ) : null}
            {product.top ? (
                <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded border border-black/30 bg-[#fafafa] px-2 py-1 text-[11px] font-semibold text-[#202526]">
                    <FaStar className="text-[#f5bf22]" /> Top Brand
                </span>
            ) : null}

            <Link className="grid h-[280px] place-items-center overflow-hidden rounded-sm bg-[#f6f4f1]" href={detailsUrl} onClick={(event) => event.stopPropagation()}>
                <SafeProductImage
                    className="max-h-[245px] max-w-[86%] object-contain mix-blend-multiply drop-shadow-[0_14px_16px_rgba(0,0,0,0.14)] transition duration-300 group-hover:scale-[1.035]"
                    src={image}
                    alt={product.name}
                />
            </Link>

            <div className="flex flex-1 flex-col pt-4">
                <span className="text-xs font-medium text-[#697175] underline">{product.brand || product.category || 'Produit'}</span>
                <h3 className="mt-2 min-h-[48px] break-words font-serif text-[19px] leading-tight text-[#202526]">
                    <Link className="transition hover:text-[#b91f2c]" href={detailsUrl} onClick={(event) => event.stopPropagation()}>
                        {product.name}
                    </Link>
                </h3>
                <p className="mt-1 font-serif text-xl text-[#202526]">
                    <strong>{money(product.price)}</strong>
                    {product.old_price ? <del className="ml-2 text-sm text-[#e25348]">{money(product.old_price)}</del> : null}
                </p>
            </div>

            <div className="-mx-4 mt-auto grid min-h-[58px] grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-t border-[#dbd9d6] px-4">
                <button
                    type="button"
                    className="inline-flex min-w-0 items-center gap-2 text-left text-sm font-semibold text-[#252b2c] transition hover:-translate-y-0.5 hover:text-[#b91f2c]"
                    onClick={(event) => {
                        event.stopPropagation();
                        onAddToCart(product);
                    }}
                >
                    <FiShoppingBag className="h-4 w-4 shrink-0" /> <span className="truncate">Ajouter au panier</span>
                </button>
                <button
                    type="button"
                    className={`grid h-10 w-10 place-items-center rounded-full text-[#5a6164] transition hover:-translate-y-0.5 hover:bg-[#f4f4f3] hover:text-[#b91f2c] ${
                        favorite ? 'text-[#b91f2c]' : ''
                    }`}
                    aria-label="Ajouter aux favoris"
                    onClick={(event) => {
                        event.stopPropagation();
                        onToggleFavorite(product.id);
                    }}
                >
                    <FiHeart />
                </button>
                <Link
                    className="grid h-10 w-10 place-items-center rounded-full text-[#5a6164] transition hover:-translate-y-0.5 hover:bg-[#f4f4f3] hover:text-[#b91f2c]"
                    href={detailsUrl}
                    aria-label="Voir le produit"
                    onClick={(event) => event.stopPropagation()}
                >
                    <FiEye />
                </Link>
            </div>
        </article>
    );
}

function EmptyState() {
    return (
        <section className="rounded-lg border border-black/10 bg-white px-6 py-16 text-center shadow-[0_22px_60px_rgba(32,37,38,0.08)]">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#dedbd8] bg-[#eee4dc] text-[#202526]">
                <FiRefreshCw className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-semibold text-[#202526]">Aucun produit trouvé</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#687074]">
                Essayez un autre mot-clé ou modifiez vos filtres.
            </p>
            <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white hover:bg-neutral-800 hover:text-white" href="/shop">
                Voir tous les produits
            </Link>
        </section>
    );
}

function SafeProductImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
    const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_PRODUCT_IMAGE);

    return (
        <img
            className={className}
            src={currentSrc}
            alt={alt}
            loading="lazy"
            onError={() => {
                if (currentSrc !== FALLBACK_PRODUCT_IMAGE) {
                    setCurrentSrc(FALLBACK_PRODUCT_IMAGE);
                }
            }}
        />
    );
}

function productImage(product: ShopProduct): string {
    const image = product.image || product.thumbnail || product.images?.find(Boolean) || FALLBACK_PRODUCT_IMAGE;
    return normalizeImagePath(image);
}

function normalizeImagePath(path: string): string {
    const value = String(path || '').trim();

    if (!value) return FALLBACK_PRODUCT_IMAGE;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (value.startsWith('/storage') || value.startsWith('/images')) return value;
    if (value.startsWith('storage/')) return `/${value}`;
    if (value.startsWith('images/')) return `/${value}`;

    return `/storage/${value.replace(/^\/+/, '')}`;
}

function CartNotice({ message }: { message: string }) {
    return (
        <div className="fixed bottom-6 left-1/2 z-[120] w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-md border border-black/10 bg-[#202526] px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]">
            {message}
        </div>
    );
}

function LoginRequiredPrompt({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/45 px-5 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                <button className="absolute right-4 top-3 text-2xl leading-none text-[#202526] transition hover:text-[#b91f2c]" type="button" onClick={onClose} aria-label="Fermer">
                    x
                </button>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Connexion</span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#202526]">Connexion requise</h2>
                <p className="mt-4 text-sm leading-7 text-[#687074]">
                    Vous devez vous connecter d'abord pour effectuer cette action.
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

function addProductToCart(product: ShopProduct) {
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
                  image: productImage(product),
                  category: product.category,
                  quantity: 1,
                  totalPrice: Number(product.price || 0),
              },
          ];

    writeStoredCart(next);
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

function shopUrl(filters: Filters): string {
    const params = new URLSearchParams();

    Object.entries(cleanFilters(filters)).forEach(([key, value]) => {
        params.set(key, String(value));
    });

    const query = params.toString();
    return query ? `/shop?${query}` : '/shop';
}

function cleanFilters(filters: Filters): Filters {
    return Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    ) as Filters;
}

function money(value: number | string | null | undefined): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
