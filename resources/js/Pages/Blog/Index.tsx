import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type BlogArticle = {
    title: string;
    slug: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
    url?: string;
};

type BlogIndexProps = PageProps<{
    articles: BlogArticle[];
}>;

const FALLBACK_IMAGE = '/images/logomatjari.png';

export default function BlogIndex() {
    const { articles = [] } = usePage<BlogIndexProps>().props;

    return (
        <AuthStorefrontLayout>
            <Head title="Blog - MATJARI" />

            <main className="bg-[#f4f4f3] px-4 py-12 text-[#202526] sm:px-6 lg:px-8 lg:py-16">
                <section className="mx-auto max-w-[980px] text-center">
                    <span className="font-['Great_Vibes',cursive] text-[58px] leading-none text-[#c7c4bf]">Blog</span>
                    <h1 className="-mt-1 font-serif text-[40px] font-semibold leading-tight text-[#111827] sm:text-5xl">Latest News</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#687074] sm:text-lg">
                        Decouvrez nos conseils, inspirations et nouveautes pour mieux choisir vos produits.
                    </p>
                </section>

                {articles.length > 0 ? (
                    <section className="mx-auto mt-10 grid max-w-[1320px] gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {articles.map((article) => (
                            <BlogCard key={article.slug} article={article} />
                        ))}
                    </section>
                ) : (
                    <section className="mx-auto mt-10 max-w-2xl rounded-lg border border-black/10 bg-white p-8 text-center shadow-[0_18px_42px_rgba(32,37,38,0.06)]">
                        <h2 className="font-serif text-3xl font-semibold">Aucun article publie</h2>
                        <p className="mt-3 text-[#687074]">Les prochains conseils MATJARI seront disponibles bientot.</p>
                    </section>
                )}
            </main>
        </AuthStorefrontLayout>
    );
}

function BlogCard({ article }: { article: BlogArticle }) {
    const href = article.url || `/blog/${article.slug}`;

    return (
        <article className="group flex min-h-[510px] flex-col overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_14px_34px_rgba(32,37,38,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_58px_rgba(32,37,38,0.13)]">
            <Link className="block overflow-hidden bg-[#eee4dc]" href={href}>
                <SafeImage
                    src={article.image}
                    alt={article.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                />
            </Link>
            <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91f2c]">
                    {article.category} / {article.date}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-[#202526]">
                    <Link className="transition hover:text-[#b91f2c]" href={href}>{article.title}</Link>
                </h2>
                <p className="mt-3 line-clamp-3 leading-7 text-[#687074]">{article.excerpt}</p>
                <Link
                    href={href}
                    className="mt-auto inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md bg-[#202526] px-5 text-sm font-bold text-white shadow-[0_12px_26px_rgba(32,37,38,0.14)] transition hover:-translate-y-0.5 hover:bg-black hover:text-white"
                >
                    Lire l'article <FiArrowRight />
                </Link>
            </div>
        </article>
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
