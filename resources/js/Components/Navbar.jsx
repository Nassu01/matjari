import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

function IconButton({ href, children, label }) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-800 transition hover:border-stone-900 hover:bg-stone-900 hover:text-white"
        >
            {children}
        </Link>
    );
}

export default function Navbar({ auth }) {
    const [hover, setHover] = useState(false);
    const { siteSettings = {} } = usePage().props;
    const categories = Array.isArray(siteSettings.navbar_links) ? siteSettings.navbar_links : [];
    const siteName = siteSettings.site_name || 'Matjari';
    const logoPath = siteSettings.navbar_logo_path || '';
    const homeLabel = siteSettings.navbar_home_label || 'HOME';
    const categoryLabel = siteSettings.navbar_category_label || 'CATEGORY';
    const searchPlaceholder = siteSettings.navbar_search_placeholder || 'Search products...';

    return (
        <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#f7f3ee]/90 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 rounded-full border border-stone-200 bg-white/90 px-4 py-3 shadow-sm sm:px-6">
                    <div className="flex items-center gap-5">
                        <Link href="/" className="flex items-center gap-3 text-sm font-semibold tracking-[0.32em] text-stone-900">
                            {logoPath ? (
                                <img src={logoPath} alt={siteName} className="h-9 w-9 rounded-full object-cover" />
                            ) : null}
                            <span>{siteName.toUpperCase()}</span>
                        </Link>

                        <div className="hidden items-center gap-5 lg:flex">
                            <Link href="/" className="text-sm font-medium text-stone-700 transition hover:text-stone-950">
                                {homeLabel}
                            </Link>

                            <div
                                className="relative"
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                            >
                                <button
                                    type="button"
                                    className="flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-950"
                                >
                                    {categoryLabel}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M6 9l6 6 6-6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {hover ? (
                                    <div className="absolute left-0 top-full mt-4 w-72 rounded-3xl border border-stone-200 bg-white p-3 shadow-xl">
                                        <div className="grid gap-2">
                                            {categories.map((item) => (
                                                <Link
                                                    key={`${item.label}-${item.url}`}
                                                    href={item.url || '/shop'}
                                                    className="rounded-2xl px-4 py-3 text-sm text-stone-700 transition hover:bg-stone-100 hover:text-stone-950"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="hidden max-w-xl flex-1 lg:block">
                        <label className="flex h-11 items-center gap-3 rounded-full border border-stone-200 bg-stone-50 px-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-stone-500">
                                <path
                                    d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M21 21l-4.35-4.35"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                            />
                        </label>
                    </div>

                    <div className="flex items-center gap-2">
                        <IconButton href="/shop" label="Shop">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M3 10l2-6h14l2 6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M5 10v10h14V10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10 20v-5h4v5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </IconButton>

                        <IconButton href="/favorite" label="Favorite">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M12 21s-7-4.6-9.2-9A5.5 5.5 0 0 1 12 5.6 5.5 5.5 0 0 1 21.2 12c-2.2 4.4-9.2 9-9.2 9Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </IconButton>

                        <IconButton href="/cart" label="Cart">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M6 6h15l-1.5 9h-12L6 6Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M6 6 5 3H2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </IconButton>

                        <IconButton href={auth?.user ? route('dashboard') : route('login')} label="Account">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M20 21a8 8 0 0 0-16 0"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                            </svg>
                        </IconButton>
                    </div>
                </div>
            </div>
        </header>
    );
}
