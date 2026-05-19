import { Head, usePage } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import DeliverySidebar from '@/components/DeliverySidebar';
import type { PageProps } from '@/types';

type Props = PageProps<{
    deliveryProfile?: {
        city: string;
        delivery_zone: string;
        vehicle_type: string;
        cin: string;
        status: string;
    };
}>;

export default function Profile() {
    const { deliveryProfile } = usePage<Props>().props;

    return (
        <>
            <Head title="Profil livreur" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="mx-auto grid w-full max-w-[1580px] gap-6 xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] xl:gap-8">
                        <DeliverySidebar />
                        <section className="min-w-0 rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-8">
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Profil livreur</span>
                            <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Mon profil livreur</h1>
                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <Summary label="Ville" value={deliveryProfile?.city || 'Non défini'} />
                                <Summary label="Zone de livraison" value={deliveryProfile?.delivery_zone || 'Non défini'} />
                                <Summary label="Type de véhicule" value={deliveryProfile?.vehicle_type || 'Non défini'} />
                                <Summary label="CIN" value={deliveryProfile?.cin || 'Non défini'} />
                                <Summary label="Statut" value={deliveryProfile?.status === 'active' ? 'Actif' : deliveryProfile?.status === 'pending' ? 'En attente' : 'Refusé'} />
                            </div>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}

function Summary({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-3xl border border-black/10 bg-slate-50 p-6">
            <dt className="text-sm uppercase tracking-[0.2em] text-slate-500">{label}</dt>
            <dd className="mt-3 break-words text-lg font-semibold text-slate-900">{value}</dd>
        </div>
    );
}
