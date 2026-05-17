import { Head, usePage } from '@inertiajs/react';
import { FiLock, FiXCircle } from 'react-icons/fi';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps, User } from '@/types';

export default function Pending() {
    const { auth, deliveryProfile } = usePage<PageProps<{ deliveryProfile?: { status?: string } }>>().props;
    const user = auth.user as User;
    const status = deliveryProfile?.status || user.status || 'pending';
    const isRejected = status === 'rejected';

    return (
        <>
            <Head title="Compte livreur" />
            <AuthStorefrontLayout>
                <main className="min-h-[calc(100vh-200px)] px-4 py-20 sm:px-6 lg:px-10">
                    <div className="mx-auto max-w-3xl rounded-[40px] border border-black/10 bg-white p-10 shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
                        <div className="flex flex-col items-center gap-6 text-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-black text-4xl text-white">
                                {isRejected ? <FiXCircle /> : <FiLock />}
                            </div>
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Espace livreur</span>
                            <h1 className="text-4xl font-semibold text-slate-900">{isRejected ? 'Compte refusé' : 'Compte en attente de validation'}</h1>
                            <p className="max-w-2xl text-base leading-7 text-slate-600">
                                {isRejected
                                    ? 'Votre accès livreur a été refusé par l’administrateur. Contactez le support pour plus d’informations.'
                                    : 'Votre compte livreur est en attente de validation par l’administrateur. Vous serez averti dès que votre accès sera activé.'}
                            </p>
                            <div className="grid w-full gap-4 sm:grid-cols-2">
                                <div className="rounded-3xl border border-black/10 bg-slate-50 p-6 text-left">
                                    <span className="text-sm uppercase tracking-[0.3em] text-red-500">Statut du compte</span>
                                    <p className="mt-3 text-2xl font-semibold text-slate-900">{status === 'rejected' ? 'Refusé' : 'En attente'}</p>
                                </div>
                                <div className="rounded-3xl border border-black/10 bg-slate-50 p-6 text-left">
                                    <span className="text-sm uppercase tracking-[0.3em] text-red-500">Prochaine étape</span>
                                    <p className="mt-3 text-base text-slate-700">
                                        {isRejected ? 'Vérifiez votre dossier et contactez le service client.' : 'Un administrateur examine votre profil et vous contactera bientôt.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}
