import { Head, Link } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/store/Footer';

export default function Favorite({ auth }) {
    return (
        <>
            <Head title="Favorite" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-2xl text-rose-500">
                            ♡
                        </div>
                        <h1 className="mt-6 text-3xl font-semibold">No favorites yet</h1>
                        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
                            Your favorite page is now part of the Matjari storefront and keeps
                            the same clean e-commerce mood as your original React design.
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
