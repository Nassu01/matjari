import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/store/Footer';
import useStorefront from '../hooks/useStorefront';

export default function StorefrontCart({ auth }) {
    const { cart, cartCount, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
        useStorefront();

    const money = (value) => `${Number(value || 0).toFixed(2)} DH`;

    if (cart.length === 0) {
        return (
            <>
                <Head title="Cart" />

                <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                    <Navbar auth={auth} />

                    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                        <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold">
                                CART
                            </div>
                            <h1 className="mt-6 text-3xl font-semibold">Your cart is empty</h1>
                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
                                Browse products, add the ones you love, and come back here to
                                review your order summary.
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
            <Head title="Cart" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Cart
                            </p>
                            <h1 className="mt-2 text-4xl font-semibold tracking-tight">Shopping Cart</h1>
                            <p className="mt-3 text-sm leading-7 text-stone-600">
                                Review your items, update quantities, and continue to checkout.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={clearCart}
                            className="inline-flex h-12 items-center justify-center rounded-full border border-stone-900 px-6 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            Clear Cart
                        </button>
                    </div>

                    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <article
                                    key={item.id}
                                    className="grid gap-4 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:grid-cols-[130px_1fr_auto]"
                                >
                                    <div className="overflow-hidden rounded-[1.5rem] bg-stone-100">
                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <h2 className="text-xl font-semibold text-stone-900">{item.name}</h2>
                                            <p className="mt-1 text-sm text-stone-500">
                                                {item.description || 'Selected from the Matjari collection.'}
                                            </p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600">
                                                {item.category}
                                            </span>
                                            <span className="text-sm font-medium text-stone-700">
                                                {money(item.price)} each
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => decreaseQuantity(item.id)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-lg font-semibold text-stone-700 transition hover:border-stone-900"
                                            >
                                                -
                                            </button>
                                            <div className="min-w-10 text-center text-sm font-semibold">
                                                {item.quantity}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => increaseQuantity(item.id)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-lg font-semibold text-stone-700 transition hover:border-stone-900"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                                        <p className="text-xl font-semibold text-stone-950">
                                            {money(item.totalPrice)}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(item.id)}
                                            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        <aside className="h-fit rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Summary
                            </p>
                            <h2 className="mt-2 text-2xl font-semibold">Order Summary</h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between text-sm text-stone-600">
                                    <span>Total Items</span>
                                    <span className="font-semibold text-stone-900">{cartCount}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-stone-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-emerald-600">Free</span>
                                </div>
                                <div className="flex items-center justify-between border-t border-dashed border-stone-200 pt-4 text-base">
                                    <span className="font-medium text-stone-700">Total</span>
                                    <span className="text-2xl font-semibold text-stone-950">
                                        {money(cartTotal)}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/shop"
                                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-stone-900 px-6 text-sm font-semibold text-white transition hover:bg-stone-800"
                            >
                                Continue Shopping
                            </Link>
                        </aside>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
