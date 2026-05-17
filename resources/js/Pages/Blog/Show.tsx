import { Head, Link, usePage } from '@inertiajs/react';
import { FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type BlogArticle = {
    title: string;
    slug: string;
    category: string;
    author: string;
    date: string;
    image: string;
    excerpt: string;
    content: string[];
    views?: number;
    comments_count?: number;
};

type BlogShowProps = PageProps<{
    article: BlogArticle;
    relatedArticles: BlogArticle[];
}>;

export default function BlogShow() {
    const { article, relatedArticles = [] } = usePage<BlogShowProps>().props;

    return (
        <AuthStorefrontLayout>
            <Head title={`${article.title} - Blog MATJARI`} />

            <main className="bg-white text-[#202526]">
                <section className="bg-[#f7f2ec] px-5 py-16 text-center sm:py-20">
                    <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#b91f2c]">Blog</span>
                    <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl lg:text-6xl">
                        {article.title}
                    </h1>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[#687074]">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#b91f2c]" />
                        <span>{article.author}</span>
                        <span className="h-1 w-1 rounded-full bg-[#b91f2c]" />
                        <span>{article.date}</span>
                    </div>
                </section>

                <article className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
                    <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_24px_70px_rgba(32,37,38,0.12)]">
                        <img src={article.image} alt={article.title} className="h-[320px] w-full object-cover sm:h-[460px] lg:h-[560px]" />
                    </div>

                    <div className="mx-auto mt-12 max-w-3xl">
                        <p className="border-l-4 border-[#b91f2c] bg-[#f7f2ec] px-6 py-5 text-lg leading-8 text-[#3f4649]">
                            {article.excerpt}
                        </p>

                        <div className="mt-9 space-y-7 text-[17px] leading-8 text-[#4b5357]">
                            {article.content.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-8 sm:flex-row">
                            <Link
                                href="/blog"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-black/15 bg-white px-5 text-sm font-bold text-[#202526] transition hover:-translate-y-0.5 hover:border-[#202526] hover:bg-[#f7f2ec]"
                            >
                                <FiArrowLeft /> Retour aux articles
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#202526] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#b91f2c]"
                            >
                                <FiShoppingBag /> Retour à la boutique
                            </Link>
                        </div>
                    </div>
                </article>

                {relatedArticles.length > 0 ? (
                    <section className="bg-[#f4f4f3] px-5 py-14 sm:px-8">
                        <div className="mx-auto max-w-6xl">
                            <div className="mb-8 text-center">
                                <span className="font-['Great_Vibes',cursive] text-5xl text-[#c7c4bf]">Blog</span>
                                <h2 className="font-serif text-3xl font-semibold text-[#111827]">Articles similaires</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.slug}
                                        href={`/blog/${related.slug}`}
                                        className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_12px_30px_rgba(32,37,38,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(32,37,38,0.12)]"
                                    >
                                        <img src={related.image} alt={related.title} className="h-44 w-full object-cover transition duration-300 group-hover:scale-105" />
                                        <div className="p-5">
                                            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91f2c]">{related.category}</span>
                                            <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#202526]">{related.title}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                ) : null}
            </main>
        </AuthStorefrontLayout>
    );
}
