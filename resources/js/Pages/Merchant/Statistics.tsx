import { Head, usePage } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import MerchantSidebar from '@/components/MerchantSidebar';
import type { PageProps } from '@/types';

type Props = PageProps<{
    products: number;
    orders: number;
    revenue: number;
}>;

export default function Statistics() {
    const { products, orders, revenue } = usePage<Props>().props;

    return (
        <>
            <Head title="Statistiques" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                        <MerchantSidebar />
                        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Statistiques</span>
                            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Statistiques commerçant</h1>
                            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                <StatCard label="Produits" value={String(products)} />
                                <StatCard label="Commandes" value={String(orders)} />
                                <StatCard label="Revenus estimés" value={`${revenue.toFixed(2)} €`} />
                            </div>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-3xl border border-black/10 bg-slate-50 p-6">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-500">{label}</span>
            <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
        </div>
    );
}
