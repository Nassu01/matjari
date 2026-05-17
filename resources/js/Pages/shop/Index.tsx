import { FormEvent, useMemo, useState } from 'react';
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

const fallbackCategories: Category[] = [
    { name: 'TV & High Tech', slug: 'tv-high-tech' },
    { name: 'Sports & Leisure', slug: 'sports-leisure' },
    { name: 'Phone & Tablet', slug: 'phone-tablet' },
    { name: 'Clothing & Shoes', slug: 'clothing-shoes' },
    { name: 'Home & Kitchen', slug: 'home-kitchen' },
    { name: 'Beauty & Health', slug: 'beauty-health' },
    { name: 'Fast Delivery', slug: 'fast-delivery' },
    { name: "Men's Watch", slug: 'mens-watch' },
    { name: "Women's Watch", slug: 'womens-watch' },
];

const discountOptions = [
    { label: '50% et plus', value: '50' },
    { label: '40% et plus', value: '40' },
    { label: '30% et plus', value: '30' },
    { label: '20% et plus', value: '20' },
];

const sortOptions = [
    { label: 'Les plus demandes', value: 'most_demanded' },
    { label: 'Prix croissant', value: 'price_asc' },
    { label: 'Prix decroissant', value: 'price_desc' },
    { label: 'Nouveautes', value: 'newest' },
    { label: 'Meilleures notes', value: 'best_rated' },
];

export default function ShopIndex() {
    const { auth, products, filters = {}, categories = [] } = usePage<ShopProps>().props;
    const productList = products?.data || [];
    const resultCount = products?.total || productList.length;
    const visibleCategories = categories.length > 0 ? categories : fallbackCategories;
    const [search, setSearch] = useState(filters.search || '');
    const [minPrice, setMinPrice] = useState(filters.min_price || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price || '');
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
    const [showFavoritePrompt, setShowFavoritePrompt] = useState(false);
    const activeFilters = useMemo(() => cleanFilters(filters), [filters]);

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
            setShowFavoritePrompt(true);
            return;
        }

        setFavoriteIds((current) =>
            current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id],
        );
    };

    return (
        <AuthStorefrontLayout>
            <Head title="Boutique" />

            <main className="bg-[#f4f4f3] px-4 py-10 text-[#202526] sm:px-6 lg:px-10 lg:py-14">
                <div className="mx-auto w-full max-w-[1500px]">
                    <header className="mb-10 text-center">
                        <span className="font-['Great_Vibes',cursive] text-[48px] leading-none text-[#cfd0d1]">
                            Boutique
                        </span>
                        <h1 className="-mt-1 font-serif text-[38px] font-bold leading-tight text-[#050505] sm:text-5xl">
                            Tous les produits
                        </h1>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#687074] sm:text-lg">
                            Decouvrez notre selection de produits et trouvez ce dont vous avez besoin.
                        </p>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                        <aside className="h-fit rounded-lg border border-black/10 bg-[#eee4dc] p-4 shadow-[0_16px_38px_rgba(32,37,38,0.06)] lg:sticky lg:top-24">
                            <FilterSection title="Categories">
                                <div className="grid gap-1">
                                    <FilterLink active={!filters.category} href="/shop">
                                        Tous les produits
                                    </FilterLink>
                                    {visibleCategories.map((category) => (
                                        <FilterLink
                                            key={category.slug}
                                            active={filters.category === category.slug}
                                            href={shopUrl({ ...activeFilters, category: category.slug })}
                                        >
                                            {category.name}
                                        </FilterLink>
                                    ))}
                                </div>
                            </FilterSection>

                            <FilterSection title="Prix (DH)">
                                <form className="grid gap-3" onSubmit={submitPrice}>
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            className="min-h-11 rounded-md border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[#202526]"
                                            inputMode="decimal"
                                            placeholder="Min"
                                            value={minPrice}
                                            onChange={(event) => setMinPrice(event.target.value)}
                                        />
                                        <input
                                            className="min-h-11 rounded-md border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[#202526]"
                                            inputMode="decimal"
                                            placeholder="Max"
                                            value={maxPrice}
                                            onChange={(event) => setMaxPrice(event.target.value)}
                                        />
                                    </div>
                                    <button className="min-h-11 rounded-md bg-black px-4 text-sm font-semibold text-white transition hover:bg-neutral-800 hover:text-white" type="submit">
                                        OK
                                    </button>
                                </form>
                            </FilterSection>

                            <FilterSection title="Reduction (%)">
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
                            <div className="mb-5 rounded-lg border border-black/10 bg-white p-4 shadow-[0_16px_38px_rgba(32,37,38,0.05)]">
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
                                        Reinitialiser
                                    </Link>
                                </form>
                            </div>

                            <div className="mb-6 flex flex-col gap-3 rounded-lg border border-black/10 bg-white px-4 py-3 shadow-[0_16px_38px_rgba(32,37,38,0.05)] sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm font-semibold text-[#202526]">{resultCount} resultats</p>
                                <label className="flex items-center gap-3 text-sm text-[#687074]">
                                    Trier par :
                                    <select
                                        className="min-h-10 rounded-md border border-black/10 bg-[#f8f6f3] px-3 text-sm font-semibold text-[#202526] outline-none transition focus:border-[#202526]"
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
                                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                        {productList.map((product) => (
                                            <ShopProductCard
                                                key={product.id}
                                                favorite={favoriteIds.includes(product.id)}
                                                product={product}
                                                onAddToCart={addProductToCart}
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

            {showFavoritePrompt ? <FavoriteAuthPrompt onClose={() => setShowFavoritePrompt(false)} /> : null}
        </AuthStorefrontLayout>
    );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-lg border border-black/10 bg-white p-4 shadow-sm [&+&]:mt-4">
            <h2 className="mb-3 font-serif text-2xl font-semibold text-[#202526]">{title}</h2>
            {children}
        </section>
    );
}

function FilterLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
    return (
        <Link
            className={`rounded-md px-3 py-2 text-sm transition ${
                active ? 'bg-[#202526] font-semibold text-white' : 'text-[#4f5659] hover:bg-[#eee4dc] hover:text-[#202526]'
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
    return (
        <article className="group relative flex min-h-[418px] flex-col overflow-hidden rounded-md border border-black/10 bg-white p-4 pb-0 shadow-[0_12px_30px_rgba(32,37,38,0.04)] transition hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(32,37,38,0.12)]">
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

            <Link className="grid h-[218px] place-items-center overflow-hidden bg-[#f4f4f3]" href={product.url || `/products/${product.slug}`}>
                {product.image ? (
                    <img
                        className="h-[176px] w-[176px] object-contain mix-blend-multiply drop-shadow-[0_14px_16px_rgba(0,0,0,0.15)] transition duration-300 group-hover:scale-[1.04]"
                        src={product.image}
                        alt={product.name}
                    />
                ) : (
                    <FiShoppingBag className="h-12 w-12 text-[#687074]" />
                )}
            </Link>

            <div className="flex flex-1 flex-col pt-3">
                <span className="text-xs text-[#697175] underline">{product.brand || product.category || 'Produit'}</span>
                <h3 className="mt-2 min-h-[42px] font-serif text-lg leading-tight text-[#202526]">
                    <Link className="transition hover:text-[#b91f2c]" href={product.url || `/products/${product.slug}`}>
                        {product.name}
                    </Link>
                </h3>
                <p className="mt-1 font-serif text-lg text-[#202526]">
                    <strong>{money(product.price)}</strong>
                    {product.old_price ? <del className="ml-2 text-sm text-[#e25348]">{money(product.old_price)}</del> : null}
                </p>
            </div>

            <div className="-mx-4 mt-auto grid min-h-[54px] grid-cols-[1fr_auto_auto] items-center gap-2 border-t border-[#dbd9d6] px-4">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 text-left text-sm font-semibold text-[#252b2c] transition hover:-translate-y-0.5 hover:text-[#b91f2c]"
                    onClick={() => onAddToCart(product)}
                >
                    <FiShoppingBag /> Ajouter au panier
                </button>
                <button
                    type="button"
                    className={`grid h-9 w-9 place-items-center text-[#5a6164] transition hover:-translate-y-0.5 hover:text-[#b91f2c] ${
                        favorite ? 'text-[#b91f2c]' : ''
                    }`}
                    aria-label="Ajouter aux favoris"
                    onClick={() => onToggleFavorite(product.id)}
                >
                    <FiHeart />
                </button>
                <Link
                    className="grid h-9 w-9 place-items-center text-[#5a6164] transition hover:-translate-y-0.5 hover:text-[#b91f2c]"
                    href={product.url || `/products/${product.slug}`}
                    aria-label="Voir le produit"
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
            <h2 className="mt-6 font-serif text-3xl font-semibold text-[#202526]">Aucun produit trouve</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#687074]">
                Essayez un autre mot-cle ou modifiez vos filtres.
            </p>
            <Link className="mt-8 inline-flex min-h-12 items-center justify-center rounded-md bg-black px-7 text-sm font-semibold text-white hover:bg-neutral-800 hover:text-white" href="/shop">
                Voir tous les produits
            </Link>
        </section>
    );
}

function FavoriteAuthPrompt({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-[120] grid place-items-center bg-black/45 px-5 backdrop-blur-sm" role="dialog" aria-modal="true">
            <div className="relative w-full max-w-md rounded-lg border border-black/10 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
                <button className="absolute right-4 top-3 text-2xl leading-none text-[#202526] transition hover:text-[#b91f2c]" type="button" onClick={onClose} aria-label="Fermer">
                    x
                </button>
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">Favoris</span>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#202526]">Connexion requise</h2>
                <p className="mt-4 text-sm leading-7 text-[#687074]">
                    Vous devez vous connecter ou creer un compte pour ajouter ce produit aux favoris.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-semibold text-white hover:bg-neutral-800 hover:text-white" href="/login">
                        Se connecter
                    </Link>
                    <Link className="inline-flex min-h-11 items-center justify-center rounded-md border border-neutral-300 bg-white px-5 text-sm font-semibold text-[#202526] hover:bg-neutral-100" href="/register">
                        Creer un compte
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
                  image: product.image,
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
