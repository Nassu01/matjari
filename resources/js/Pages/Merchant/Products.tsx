import { Head, Link, usePage } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import MerchantSidebar from '@/components/MerchantSidebar';
import type { PageProps } from '@/types';

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    is_active: boolean;
    category?: string | null;
};

type Props = PageProps<{
    products: Product[];
}>;

export default function Products() {
    const { products } = usePage<Props>().props;

    return (
        <>
            <Head title="Mes produits" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                        <MerchantSidebar />
                        <section className="space-y-6">
                            <header className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
                                <span className="text-sm uppercase tracking-[0.3em] text-red-500">Produits</span>
                                <h1 className="mt-3 text-4xl font-semibold text-slate-900">Mes produits</h1>
                                <p className="mt-4 text-slate-600">Visualisez vos produits, gérez les stocks et activez vos articles pour vos clients.</p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link href="/merchant/products/create" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white">
                                        Ajouter un produit
                                    </Link>
                                </div>
                            </header>

                            {products.length > 0 ? (
                                <div className="grid gap-4">
                                    {products.map((product) => (
                                        <article key={product.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm text-slate-500">{product.category || 'Produit'}</p>
                                                    <h2 className="mt-1 text-xl font-semibold text-slate-900">{product.name}</h2>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{product.is_active ? 'Actif' : 'Inactif'}</span>
                                                    <span className="text-sm text-slate-500">Stock: {product.stock}</span>
                                                    <span className="text-sm text-slate-500">Prix: {product.price.toFixed(2)} €</span>
                                                    <Link href={`/merchant/products/${product.id}/edit`} className="rounded-full border border-black/10 bg-black px-4 py-2 text-sm font-semibold text-white">
                                                        Modifier
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <section className="rounded-3xl border border-black/10 bg-slate-50 p-10 text-center">
                                    <p className="text-sm uppercase tracking-[0.3em] text-red-500">Aucun produit</p>
                                    <h2 className="mt-4 text-2xl font-semibold text-slate-900">Aucun produit ajouté pour le moment.</h2>
                                    <p className="mt-3 text-slate-600">Créez votre premier produit pour commencer à vendre sur Matjari.</p>
                                    <Link href="/merchant/products/create" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white">
                                        Ajouter un produit
                                    </Link>
                                </section>
                            )}
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}
