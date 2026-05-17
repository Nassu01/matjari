import { Head, Link, usePage } from '@inertiajs/react';

import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps } from '@/types';

type BlogArticle = {
    title: string;
    slug: string;
    category: string;
    date: string;
    image: string;
    excerpt: string;
};

type BlogIndexProps = PageProps<{
    articles: BlogArticle[];
}>;

export default function BlogIndex() {
    const { articles = [] } = usePage<BlogIndexProps>().props;

    return (
        <AuthStorefrontLayout>
            <Head title="Blog - MATJARI" />

            <main className="bg-white px-5 py-16 text-[#202526] sm:px-8 lg:py-20">
                <section className="mx-auto max-w-4xl text-center">
                    <span className="font-['Great_Vibes',cursive] text-6xl text-[#c7c4bf]">Blog</span>
                    <h1 className="mt-1 font-serif text-5xl font-semibold leading-tight text-[#111827]">Blog</h1>
                    <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#687074]">
                        Découvrez nos conseils, inspirations et nouveautés pour mieux choisir vos produits.
                    </p>
                </section>

                <section className="mx-auto mt-12 grid max-w-6xl gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <article
                            key={article.slug}
                            className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_12px_30px_rgba(32,37,38,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(32,37,38,0.12)]"
                        >
                            <Link href={`/blog/${article.slug}`}>
                                <img src={article.image} alt={article.title} className="h-56 w-full object-cover" />
                            </Link>
                            <div className="p-6">
                                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#b91f2c]">
                                    {article.category} / {article.date}
                                </p>
                                <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-[#202526]">
                                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                                </h2>
                                <p className="mt-3 leading-7 text-[#687074]">{article.excerpt}</p>
                                <Link
                                    href={`/blog/${article.slug}`}
                                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-[#202526] px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#b91f2c]"
                                >
                                    Lire l'article
                                </Link>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </AuthStorefrontLayout>
    );
}
