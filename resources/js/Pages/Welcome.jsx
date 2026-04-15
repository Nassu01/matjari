
import { Head, Link } from '@inertiajs/react';
import Navbar from '../components/Navbar';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome to Matjari" />

            <div className="min-h-screen bg-gray-50">
                <Navbar auth={auth} />

                <section className="hero min-h-[calc(100vh-80px)]">
                    <div className="hero-content text-center">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl font-semibold leading-tight text-black">
                                Welcome to <span className="text-black">Matjari</span>
                            </h1>

                            <p className="py-6 text-gray-600">
                                Discover products from trusted vendors, shop easily,
                                and enjoy a clean modern marketplace experience.
                            </p>

                            <div className="flex flex-col justify-center gap-3 sm:flex-row">
                                <Link
                                    href="/shop"
                                    className="btn rounded-full border border-black bg-black text-white hover:border-black hover:bg-gray-900"
                                >
                                    Start Shopping
                                </Link>

                                {!auth?.user && (
                                    <Link
                                        href={route('register')}
                                        className="btn btn-outline rounded-full border-black text-black hover:bg-black hover:text-white"
                                    >
                                        Create Account
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}