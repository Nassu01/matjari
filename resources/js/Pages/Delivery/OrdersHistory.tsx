import { Head } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import DeliverySidebar from '@/components/DeliverySidebar';

export default function OrdersHistory() {
    return (
        <>
            <Head title="Historique des livraisons" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                        <DeliverySidebar />
                        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Historique</span>
                            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Livraisons terminées</h1>
                            <p className="mt-4 text-slate-600">Retrouvez vos livraisons achevées et consultez les détails de chaque course.</p>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}
