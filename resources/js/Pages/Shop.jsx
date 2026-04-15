import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/store/Footer';
import ProductCard from '../Components/store/ProductCard';
import { mockProducts } from '../data/storefrontData';

const PER_PAGE = 6;

export default function Shop({ auth }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('featured');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [page, setPage] = useState(1);

    const categories = useMemo(
        () => ['all', ...new Set(mockProducts.map((product) => product.category))],
        [],
    );

    const filtered = useMemo(() => {
        const min = minPrice === '' ? null : Number(minPrice);
        const max = maxPrice === '' ? null : Number(maxPrice);

        const results = mockProducts.filter((product) => {
            const matchesCategory = category === 'all' || product.category === category;
            const search = query.trim().toLowerCase();
            const matchesSearch =
                !search ||
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search);

            const matchesMin = min == null || product.price >= min;
            const matchesMax = max == null || product.price <= max;

            return matchesCategory && matchesSearch && matchesMin && matchesMax;
        });

        switch (sort) {
            case 'price-asc':
                return [...results].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...results].sort((a, b) => b.price - a.price);
            case 'name':
                return [...results].sort((a, b) => a.name.localeCompare(b.name));
            default:
                return results;
        }
    }, [category, maxPrice, minPrice, query, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const paginated = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return filtered.slice(start, start + PER_PAGE);
    }, [filtered, page]);

    const clearFilters = () => {
        setQuery('');
        setCategory('all');
        setSort('featured');
        setMinPrice('');
        setMaxPrice('');
        setPage(1);
    };

    return (
        <>
            <Head title="Shop" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Shop
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Browse Products</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
                                The same shopping feel from your React example, adapted to the
                                Matjari Inertia app.
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-900 px-6 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            Back Home
                        </Link>
                    </div>

                    <div className="mt-8 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
                        <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search by name or category..."
                                className="h-12 rounded-full border border-stone-200 px-5 text-sm outline-none transition focus:border-stone-900"
                            />

                            <div className="grid gap-3 sm:grid-cols-3">
                                <select
                                    value={sort}
                                    onChange={(event) => setSort(event.target.value)}
                                    className="h-12 rounded-full border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-900"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name">Name</option>
                                </select>
                                <input
                                    value={minPrice}
                                    onChange={(event) => setMinPrice(event.target.value)}
                                    placeholder="Min DH"
                                    className="h-12 rounded-full border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-900"
                                />
                                <input
                                    value={maxPrice}
                                    onChange={(event) => setMaxPrice(event.target.value)}
                                    placeholder="Max DH"
                                    className="h-12 rounded-full border border-stone-200 px-4 text-sm outline-none transition focus:border-stone-900"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <button
                                type="button"
                                onClick={clearFilters}
                                className="rounded-full border border-stone-900 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                            >
                                Clear
                            </button>
                            <div className="flex flex-wrap gap-3">
                                {categories.map((item) => {
                                    const active = item === category;
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setCategory(item)}
                                            className={`rounded-full px-4 py-3 text-sm font-medium capitalize transition ${
                                                active
                                                    ? 'bg-stone-900 text-white'
                                                    : 'border border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-900'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                        <p className="text-sm text-stone-600">
                            <span className="font-semibold text-stone-950">{filtered.length}</span> results
                        </p>
                    </div>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {paginated.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            type="button"
                            disabled={page <= 1}
                            onClick={() => setPage((current) => Math.max(1, current - 1))}
                            className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <div className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white">
                            Page {page} / {totalPages}
                        </div>
                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                            className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
