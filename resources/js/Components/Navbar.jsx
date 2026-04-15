import { Link } from '@inertiajs/react';

export default function Navbar({ auth }) {
    return (
        <div className="navbar border-b border-gray-200 bg-white px-6 py-3">
            <div className="navbar-start">
                <Link href="/" className="text-2xl font-normal tracking-tight text-black">
                    Matjari
                </Link>
            </div>

            <div className="navbar-center hidden w-full max-w-2xl px-6 lg:flex">
                <label className="input input-bordered flex w-full items-center gap-2 rounded-full border-gray-300 bg-white shadow-none">
                    <input
                        type="text"
                        className="grow bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                        placeholder="Search products..."
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5 text-gray-600"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </label>
            </div>

            <div className="navbar-end gap-3">
                <Link
                    href="/"
                    className="btn btn-ghost btn-circle border border-gray-200 bg-white text-black hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path d="M12 3.172 3 10v10a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1V10l-9-6.828Z" />
                    </svg>
                </Link>

                <Link
                    href="/shop"
                    className="btn btn-ghost btn-circle border border-gray-200 bg-white text-black hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path d="M6 7a3 3 0 1 1 6 0h4a3 3 0 1 1 6 0v2H2V7a3 3 0 1 1 4 0Zm14 4H4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8Z" />
                    </svg>
                </Link>

                <Link
                    href="/cart"
                    className="btn btn-ghost btn-circle border border-gray-200 bg-white text-black hover:bg-gray-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path d="M3 4h2l1.2 6.1A2 2 0 0 0 8.16 12H18a2 2 0 0 0 1.94-1.51L21 6H7" />
                        <circle cx="9" cy="19" r="1.5" />
                        <circle cx="17" cy="19" r="1.5" />
                    </svg>
                </Link>

                {auth?.user ? (
                    <Link
                        href={route('dashboard')}
                        className="btn btn-ghost btn-circle border border-gray-200 bg-white text-black hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                        </svg>
                    </Link>
                ) : (
                    <Link
                        href={route('login')}
                        className="btn btn-ghost btn-circle border border-gray-200 bg-white text-black hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-5 w-5"
                        >
                            <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    );
}