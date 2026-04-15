import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/store/Footer';
import useStorefront from '../hooks/useStorefront';

export default function StorefrontFavorite({ auth }) {
    const { favorites, addToCart, clearFavorites, removeFavorite } = useStorefront();

    if (favorites.length === 0) {
        return (
            <>
                <Head title="Favorite" />

                <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                    <Navbar auth={auth} />

                    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-sm font-semibold text-rose-500">
                                SAVE
                            </div>
                            <h1 className="mt-6 text-3xl font-semibold">No favorites yet</h1>
                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
                                Save products you love and they will appear here for quick access.
                            </p>
                            <Link
                                href="/shop"
                                className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
                            >
                                Go to Shop
                            </Link>
                        </div>
                    </section>

                    <Footer />
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="Favorite" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Favorites
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Saved Products</h1>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Keep your favorite items close and move them into your cart anytime.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={clearFavorites}
                            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-900 px-6 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            Clear Favorites
                        </button>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {favorites.map((item) => (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-stone-100">
                                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>

                                <div className="space-y-4 p-5">
                                    <div>
                                        <h2 className="text-xl font-semibold text-stone-900">{item.name}</h2>
                                        <p className="mt-2 text-sm text-stone-500">
                                            {item.description || 'Saved from the storefront collection.'}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold text-stone-950">
                                            {Number(item.price || 0).toFixed(2)} DH
                                        </span>
                                        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => addToCart(item)}
                                            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-stone-900 px-4 text-sm font-semibold text-white transition hover:bg-stone-800"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => removeFavorite(item.id)}
                                            className="inline-flex h-11 items-center justify-center rounded-full border border-rose-200 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
