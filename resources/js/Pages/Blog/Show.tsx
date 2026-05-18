import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
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
    url?: string;
};

type BlogShowProps = PageProps<{
    article: BlogArticle;
    relatedArticles: BlogArticle[];
}>;

const FALLBACK_IMAGE = '/images/logomatjari.png';

export default function BlogShow() {
    const { article, relatedArticles = [] } = usePage<BlogShowProps>().props;

    return (
        <AuthStorefrontLayout>
            <Head title={`${article.title} - Blog MATJARI`} />

            <main className="bg-[#f4f4f3] text-[#202526]">
                <section className="px-5 pb-8 pt-14 text-center sm:px-8 lg:pt-16">
                    <span className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#b91f2c]">Blog</span>
                    <h1 className="mx-auto mt-4 max-w-[980px] font-serif text-4xl font-semibold leading-tight text-[#111827] sm:text-5xl">
                        {article.title}
                    </h1>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[#687074]">
                        <span>{article.category}</span>
                        <span className="h-1 w-1 rounded-full bg-[#b91f2c]" />
                        <span>{article.author}</span>
                        <span className="h-1 w-1 rounded-full bg-[#b91f2c]" />
                        <span>{article.date}</span>
                    </div>
                </section>

                <article className="mx-auto w-full max-w-[1080px] px-4 pb-14 sm:px-6 lg:pb-16">
                    <div className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_24px_70px_rgba(32,37,38,0.11)]">
                        <SafeImage src={article.image} alt={article.title} className="h-[280px] w-full object-cover sm:h-[360px] lg:h-[420px]" />
                    </div>

                    <div className="mx-auto mt-9 max-w-[900px] rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_42px_rgba(32,37,38,0.055)] sm:p-8">
                        <p className="border-l-4 border-[#b91f2c] bg-[#f7f2ec] px-5 py-4 text-lg leading-8 text-[#3f4649]">
                            {article.excerpt}
                        </p>

                        <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#4b5357]">
                            {article.content.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="mt-9 flex flex-col gap-3 border-t border-black/10 pt-7 sm:flex-row">
                            <Link
                                href="/blog"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-black/15 bg-white px-5 text-sm font-bold text-[#202526] transition hover:-translate-y-0.5 hover:border-[#202526] hover:bg-[#f7f2ec]"
                            >
                                <FiArrowLeft /> Retour aux articles
                            </Link>
                            <Link
                                href="/shop"
                                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#202526] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                            >
                                <FiShoppingBag /> Retour a la boutique
                            </Link>
                        </div>
                    </div>
                </article>

                {relatedArticles.length > 0 ? (
                    <section className="border-t border-black/10 bg-white px-5 py-12 sm:px-8">
                        <div className="mx-auto max-w-[1180px]">
                            <div className="mb-7 text-center">
                                <span className="font-['Great_Vibes',cursive] text-5xl text-[#c7c4bf]">Blog</span>
                                <h2 className="font-serif text-3xl font-semibold text-[#111827]">Articles similaires</h2>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedArticles.map((related) => (
                                    <RelatedCard key={related.slug} article={related} />
                                ))}
                            </div>
                        </div>
                    </section>
                ) : null}
            </main>
        </AuthStorefrontLayout>
    );
}

function RelatedCard({ article }: { article: BlogArticle }) {
    const href = article.url || `/blog/${article.slug}`;

    return (
        <Link
            href={href}
            className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_12px_30px_rgba(32,37,38,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(32,37,38,0.12)]"
        >
            <SafeImage src={article.image} alt={article.title} className="h-48 w-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91f2c]">{article.category}</span>
                <h3 className="mt-3 font-serif text-xl font-semibold leading-snug text-[#202526]">{article.title}</h3>
            </div>
        </Link>
    );
}

function SafeImage({ src, alt, className }: { src?: string | null; alt: string; className?: string }) {
    const [currentSrc, setCurrentSrc] = useState(src || FALLBACK_IMAGE);

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => {
                if (currentSrc !== FALLBACK_IMAGE) {
                    setCurrentSrc(FALLBACK_IMAGE);
                }
            }}
        />
    );
}
