import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/store/Footer';
import ProductCard from '../Components/store/ProductCard';
import { mockProducts } from '../data/products';

export default function Shop({ auth }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');

    const categories = useMemo(
        () => ['all', ...new Set(mockProducts.map((product) => product.category))],
        [],
    );

    const filtered = useMemo(() => {
        return mockProducts.filter((product) => {
            const matchesCategory = category === 'all' || product.category === category;
            const search = query.trim().toLowerCase();
            const matchesSearch =
                !search ||
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search);

            return matchesCategory && matchesSearch;
        });
    }, [category, query]);

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
                        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search by name or category..."
                                className="h-12 rounded-full border border-stone-200 px-5 text-sm outline-none transition focus:border-stone-900"
                            />

                            <div className="flex flex-wrap gap-3">
                                {categories.map((item) => {
                                    const active = item === category;
                                    return (
                                        <button
                                            key={item}
                                            type="button"
                                            onClick={() => setCategory(item)}
                                            className={`rounded-full px-4 py-3 text-sm font-medium transition ${
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

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {filtered.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
