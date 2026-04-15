import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import CategoryList from '../Components/store/CategoryList';
import Footer from '../Components/store/Footer';
import ProductCard from '../Components/store/ProductCard';
import { categories, mockProducts } from '../data/storefrontData';

export default function Welcome({ auth }) {
    const { siteSettings = {} } = usePage().props;
    const popularProducts = mockProducts.slice(0, 5);
    const newArrivals = [...mockProducts].reverse().slice(0, 5);

    return (
        <>
            <Head title="Welcome to Matjari" />

            <div className="min-h-screen bg-[#f7f3ee] text-stone-900">
                <Navbar auth={auth} />

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-3 sm:px-4 lg:px-6">
                    <div className="overflow-hidden rounded-[2rem] border border-[#8ca3b4] bg-[linear-gradient(135deg,#224259_0%,#335f7d_52%,#5f88a6_100%)] shadow-[0_24px_70px_rgba(51,95,125,0.22)]">
                        <div className="grid gap-8 px-6 py-8 sm:px-10 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:px-14 lg:py-12">
                            <div className="relative z-10 max-w-2xl">
                                <p className="inline-flex rounded-full border border-white/25 bg-white/12 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-100">
                                    {siteSettings.hero_badge || 'Limited Offer'}
                                </p>
                                <h1 className="mt-5 text-4xl font-black uppercase leading-none text-white sm:text-5xl lg:text-6xl">
                                    {siteSettings.hero_title || 'Seasonal'}
                                    <span className="block text-sky-100">
                                        {siteSettings.hero_title_accent || 'Style Sale'}
                                    </span>
                                </h1>
                                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-100/90 sm:text-base">
                                    {siteSettings.hero_description ||
                                        'Refresh your wardrobe and accessories with curated daily picks, sharp discounts, and a cleaner shopping experience inspired by the layout you shared.'}
                                </p>

                                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={siteSettings.hero_primary_button_url || '/shop'}
                                        className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#274a63] transition hover:bg-sky-50"
                                    >
                                        {siteSettings.hero_primary_button_label || 'Shop Now'}
                                    </Link>

                                    {!auth?.user && (siteSettings.hero_secondary_button_label || 'Create Account') ? (
                                        <Link
                                            href={siteSettings.hero_secondary_button_url || route('register')}
                                            className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition hover:bg-white/10"
                                        >
                                            {siteSettings.hero_secondary_button_label || 'Create Account'}
                                        </Link>
                                    ) : null}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-6 text-white">
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {siteSettings.hero_stat_one_value || 'Up to 50%'}
                                        </p>
                                        <p className="text-sm text-slate-100/80">
                                            {siteSettings.hero_stat_one_label || 'off selected items'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold">
                                            {siteSettings.hero_stat_two_value || 'Fast'}
                                        </p>
                                        <p className="text-sm text-slate-100/80">
                                            {siteSettings.hero_stat_two_label || 'delivery nationwide'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative min-h-[280px]">
                                <div className="absolute -left-4 top-8 h-20 w-20 rounded-full bg-white/18 blur-md" />
                                <div className="absolute right-4 top-0 h-24 w-24 rounded-full bg-sky-200/20 blur-md" />
                                <div className="absolute left-0 top-10 rotate-[-10deg] rounded-[2rem] bg-white/12 px-5 py-4 text-white shadow-lg backdrop-blur">
                                    <p className="text-xs uppercase tracking-[0.3em] text-sky-100">Gift Pick</p>
                                    <p className="mt-2 text-lg font-semibold">Holiday-ready finds</p>
                                </div>
                                <div className="absolute bottom-0 right-0 overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur">
                                    <img
                                        src={siteSettings.hero_image_path || '/images/HeroPage.png'}
                                        alt="Matjari collection"
                                        className="h-[320px] w-full object-cover object-center md:w-[520px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-10 sm:px-4 lg:px-6">
                    <div className="rounded-[2rem] border border-stone-200 bg-white px-5 py-8 shadow-sm sm:px-8">
                        <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                    Categories
                                </p>
                                <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                                    Shop By Category
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-stone-600">
                                    Explore our catalogue of womenswear, accessories, electronics,
                                    and everyday essentials in a softer, more editorial layout.
                                </p>
                            </div>

                            <Link
                                href="/shop"
                                className="inline-flex h-11 items-center justify-center rounded-full border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                            >
                                Browse All
                            </Link>
                        </div>

                        <CategoryList items={categories} />
                    </div>
                </section>

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-8 sm:px-4 lg:px-6">
                    <div className="overflow-hidden rounded-[2rem] border border-rose-200 bg-[linear-gradient(135deg,#991b1b_0%,#dc2626_45%,#b91c1c_100%)] px-6 py-8 shadow-[0_24px_70px_rgba(153,27,27,0.18)] sm:px-8">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="text-white">
                                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-rose-100">
                                    {siteSettings.promo_badge || 'Festive Capsule'}
                                </p>
                                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                                    {siteSettings.promo_title || 'Merry Shopping'}
                                </h2>
                                <p className="mt-2 max-w-2xl text-sm leading-7 text-rose-50/90">
                                    {siteSettings.promo_description ||
                                        'Discover bold essentials, statement accessories, and fresh arrivals curated to feel premium, warm, and gift-ready.'}
                                </p>
                            </div>

                            <Link
                                href={siteSettings.promo_button_url || '/shop'}
                                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                            >
                                {siteSettings.promo_button_label || 'Explore Collection'}
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-10 sm:px-4 lg:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Shop Now
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                                Most Popular
                            </h2>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            View all products
                        </Link>
                    </div>

                    <div className="mt-6 rounded-[2rem] bg-[#d7c7b8] p-4 shadow-sm sm:p-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            {popularProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-8 sm:px-4 lg:px-6">
                    <div className="rounded-[2rem] border border-stone-200 bg-white px-6 py-8 shadow-sm">
                        <div className="text-center">
                            <h3 className="text-3xl font-semibold tracking-tight text-stone-900">
                                Get 10% Off Your First Order
                            </h3>
                            <p className="mt-2 text-sm text-stone-500">
                                Start your shopping journey with curated picks and a warm welcome discount.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-[95%] max-w-[1500px] px-2 pt-8 sm:px-4 lg:px-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-stone-500">
                                Fresh Picks
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                                New Arrivals
                            </h2>
                        </div>

                        <Link
                            href="/shop"
                            className="inline-flex h-11 items-center justify-center rounded-full border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:bg-stone-900 hover:text-white"
                        >
                            See New In
                        </Link>
                    </div>

                    <div className="mt-6 rounded-[2rem] bg-[#d7c7b8] p-4 shadow-sm sm:p-6">
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                            {newArrivals.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
