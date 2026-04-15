import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CategoryList from '../Components/store/CategoryList';
import Footer from '../Components/store/Footer';
import Header from '../Components/store/Header';
import ProductCard from '../Components/store/ProductCard';
import { categories, mockProducts } from '../data/products';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Matjari" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <Header
                    title="Welcome to Ecomerce"
                    subtitle="Discover our best products with a storefront layout that matches the React design you shared."
                    right={
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Link
                                href="/shop"
                                className="inline-flex h-12 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
                            >
                                Shop now
                            </Link>

                            {!auth?.user ? (
                                <Link
                                    href={route('register')}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-semibold text-white transition hover:bg-white hover:text-stone-950"
                                >
                                    Create account
                                </Link>
                            ) : null}
                        </div>
                    }
                />

                <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Categories
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                Shop by department
                            </h2>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                A category area inspired by your dropdown list, presented as a
                                clean card grid on the home page.
                            </p>

                            <div className="mt-8">
                                <CategoryList items={categories} />
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-900 p-8 text-white shadow-sm">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,191,36,0.35),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.08),_transparent_35%)]" />
                            <div className="relative">
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
                                    Featured
                                </p>
                                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                                    Clean, modern and product-first
                                </h2>
                                <p className="mt-4 max-w-lg text-sm leading-7 text-stone-300">
                                    The layout keeps the same mood as your sample app: bold header,
                                    category access, product cards, and a strong footer.
                                </p>

                                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                        <p className="text-3xl font-semibold">7+</p>
                                        <p className="mt-2 text-sm text-stone-300">Demo products ready</p>
                                    </div>
                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                                        <p className="text-3xl font-semibold">12</p>
                                        <p className="mt-2 text-sm text-stone-300">Home categories added</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Products
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                                Discover our best products
                            </h2>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            View all products
                        </Link>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                        {mockProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
