import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import MerchantSidebar from '@/components/MerchantSidebar';
import type { PageProps } from '@/types';

type Category = {
    id: number;
    name: string;
};

type Props = PageProps<{
    categories: Category[];
}>;

export default function CreateProduct({ categories }: Props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');

    return (
        <>
            <Head title="Ajouter un produit" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                        <MerchantSidebar />
                        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
                            <div className="mb-6">
                                <span className="text-sm uppercase tracking-[0.3em] text-red-500">Produit</span>
                                <h1 className="mt-3 text-4xl font-semibold text-slate-900">Ajouter un produit</h1>
                                <p className="mt-3 text-slate-600">Créez un nouveau produit pour votre boutique. Les champs suivants sont les informations de base requises.</p>
                            </div>

                            <div className="grid gap-6">
                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-700">Nom du produit</span>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-3xl border border-black/10 bg-slate-50 px-4 py-3 outline-none" placeholder="Nom du produit" />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-700">Catégorie</span>
                                    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="mt-2 w-full rounded-3xl border border-black/10 bg-slate-50 px-4 py-3 outline-none">
                                        <option value="">Sélectionnez une catégorie</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </label>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Prix</span>
                                        <input value={price} onChange={(e) => setPrice(e.target.value)} className="mt-2 w-full rounded-3xl border border-black/10 bg-slate-50 px-4 py-3 outline-none" placeholder="0,00" />
                                    </label>

                                    <label className="block">
                                        <span className="text-sm font-semibold text-slate-700">Stock</span>
                                        <input value={stock} onChange={(e) => setStock(e.target.value)} className="mt-2 w-full rounded-3xl border border-black/10 bg-slate-50 px-4 py-3 outline-none" placeholder="0" />
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <button type="button" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white">Enregistrer</button>
                                <Link href="/merchant/products" className="inline-flex h-12 items-center justify-center rounded-full border border-black bg-white px-6 text-sm font-semibold text-black">
                                    Annuler
                                </Link>
                            </div>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}
