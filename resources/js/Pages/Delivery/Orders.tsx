import { Head } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import DeliverySidebar from '@/components/DeliverySidebar';

export default function Orders() {
    return (
        <>
            <Head title="Commandes livreur" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="mx-auto grid w-full max-w-[1580px] gap-6 xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] xl:gap-8">
                        <DeliverySidebar />
                        <section className="min-w-0 rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-8">
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Commandes</span>
                            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Gestion des commandes</h1>
                            <p className="mt-4 text-slate-600">Consultez vos commandes disponibles, en cours et terminées depuis les sections dédiées.</p>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}
