import { Head, usePage } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import MerchantSidebar from '@/components/MerchantSidebar';
import type { PageProps } from '@/types';

type Props = PageProps<{
    company?: {
        company_name: string;
        company_type: string;
        ice?: string;
        patente?: string;
        company_address?: string;
        city?: string;
        company_phone?: string;
        main_category?: string;
        status?: string;
    };
}>;

export default function Company() {
    const { company } = usePage<Props>().props;

    return (
        <>
            <Head title="Mon entreprise" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="grid gap-8 xl:grid-cols-[320px_1fr]">
                        <MerchantSidebar />
                        <section className="rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5">
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Entreprise</span>
                            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Mon entreprise</h1>
                            <p className="mt-3 text-slate-600">Consultez et modifiez les informations de votre entreprise.</p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                <Summary label="Nom de l’entreprise" value={company?.company_name || 'Non renseigné'} />
                                <Summary label="Type" value={company?.company_type || 'Non renseigné'} />
                                <Summary label="ICE" value={company?.ice || 'Non renseigné'} />
                                <Summary label="Patente" value={company?.patente || 'Non renseigné'} />
                                <Summary label="Adresse" value={company?.company_address || 'Non renseigné'} />
                                <Summary label="Ville" value={company?.city || 'Non renseigné'} />
                                <Summary label="Téléphone" value={company?.company_phone || 'Non renseigné'} />
                                <Summary label="Catégorie" value={company?.main_category || 'Non renseigné'} />
                                <Summary label="Statut" value={company?.status === 'active' ? 'Actif' : company?.status === 'pending' ? 'En attente' : company?.status === 'rejected' ? 'Refusé' : 'Non défini'} />
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
            <dd className="mt-3 text-lg font-semibold text-slate-900">{value}</dd>
        </div>
    );
}
