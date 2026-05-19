import { Head, Link, usePage } from '@inertiajs/react';
import { FiBox, FiClock, FiMapPin, FiPackage, FiTruck } from 'react-icons/fi';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import DeliverySidebar from '@/components/DeliverySidebar';
import type { PageProps, User } from '@/types';

type DeliveryDashboardProps = PageProps<{
    deliveryProfile?: {
        city: string;
        delivery_zone: string;
        vehicle_type: string;
        status: string;
    };
    summary: {
        total_deliveries: number;
        today_deliveries: number;
        ongoing_deliveries: number;
        completed_deliveries: number;
    };
    availableOrders: { id: number; order_number: string; customer_name: string; customer_phone: string; shipping_address: string; total: number; status: string }[];
    currentOrders: { id: number; order_number: string; customer_name: string; shipping_address: string; total: number; status: string }[];
    historyOrders: { id: number; order_number: string; customer_name: string; shipping_address: string; total: number; status: string; delivered_at?: string }[];
}>;

export default function Dashboard() {
    const { auth, deliveryProfile, summary, availableOrders, currentOrders, historyOrders } = usePage<DeliveryDashboardProps>().props;
    const user = auth.user as User;
    const displayName = user.display_name || user.name || 'Livreur';
    const status = deliveryProfile?.status || user.status || 'pending';

    return (
        <>
            <Head title="Tableau de bord livreur" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="mx-auto grid w-full max-w-[1580px] gap-6 xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] xl:gap-8">
                        <DeliverySidebar />

                        <section className="min-w-0 space-y-8">
                            <header className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-8">
                                <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-500">Bienvenue</p>
                                <h1 className="break-words text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">Bonjour, {displayName}</h1>
                                <p className="mt-3 max-w-2xl text-base text-slate-600">Bienvenue dans votre espace livreur. Suivez vos livraisons et gérez vos tournées.</p>
                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    <StatusBadge label={status === 'active' ? 'Compte livreur validé' : status === 'pending' ? 'En attente de validation' : 'Refusé'} status={status} />
                                    <InfoCard label="Ville" value={deliveryProfile?.city || 'Non définie'} />
                                    <InfoCard label="Zone de livraison" value={deliveryProfile?.delivery_zone || 'Non définie'} />
                                </div>
                            </header>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <DashboardCard title="Résumé livreur" eyebrow="Profil livreur">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Nom complet" value={displayName} />
                                        <SummaryItem label="Email" value={user.email} />
                                        <SummaryItem label="Téléphone" value={user.phone || 'Non ajouté'} />
                                        <SummaryItem label="Type de véhicule" value={deliveryProfile?.vehicle_type || 'Non défini'} />
                                        <SummaryItem label="Statut du compte" value={status === 'active' ? 'Actif' : status === 'pending' ? 'En attente' : 'Refusé'} />
                                    </div>
                                </DashboardCard>

                                <DashboardCard title="Commandes à livrer" eyebrow="Tournées">
                                    {availableOrders.length > 0 ? (
                                        <div className="space-y-4">
                                            {availableOrders.map((order) => (
                                                <div key={order.id} className="rounded-3xl border border-black/10 bg-slate-50 p-4">
                                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                        <div className="min-w-0">
                                                            <p className="text-xs uppercase tracking-[0.3em] text-red-500">{order.order_number}</p>
                                                            <p className="mt-2 text-sm text-slate-700">{order.customer_name} — {order.customer_phone}</p>
                                                            <p className="mt-1 text-sm text-slate-500">{order.shipping_address}</p>
                                                        </div>
                                                        <Link href={`/delivery/orders/${order.id}`} className="inline-flex min-h-10 items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">Accepter la livraison</Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <EmptyState title="Aucune commande disponible pour livraison." text="Les commandes prêtes seront affichées ici." action={{ href: '/delivery/orders/available', label: 'Actualiser' }} />
                                    )}
                                </DashboardCard>
                            </div>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <DashboardCard title="Livraisons en cours" eyebrow="En cours">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Acceptées" value={String(summary.ongoing_deliveries)} />
                                        <SummaryItem label="Statut" value="On delivery" />
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/delivery/orders/current" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-slate-900 sm:w-auto">
                                            Voir les livraisons en cours
                                        </Link>
                                    </div>
                                </DashboardCard>

                                <DashboardCard title="Livraisons terminées" eyebrow="Historique">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Terminées" value={String(summary.completed_deliveries)} />
                                        <SummaryItem label="Aujourd’hui" value={String(summary.today_deliveries)} />
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/delivery/orders/history" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-black bg-white px-6 text-sm font-semibold text-black transition hover:border-slate-900 sm:w-auto">
                                            Voir l’historique
                                        </Link>
                                    </div>
                                </DashboardCard>
                            </div>

                            <DashboardCard title="Statistiques livreur" eyebrow="Performance">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <SummaryItem label="Total livraisons" value={String(summary.total_deliveries)} />
                                    <SummaryItem label="Livraisons aujourd’hui" value={String(summary.today_deliveries)} />
                                    <SummaryItem label="En cours" value={String(summary.ongoing_deliveries)} />
                                    <SummaryItem label="Terminées" value={String(summary.completed_deliveries)} />
                                </div>
                            </DashboardCard>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}

function DashboardCard({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
    return (
        <article className="min-w-0 rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                    <span className="block text-sm uppercase tracking-[0.3em] text-red-500">{eyebrow}</span>
                    <h2 className="mt-3 break-words text-2xl font-semibold text-slate-900">{title}</h2>
                </div>
                <FiTruck className="h-5 w-5 text-slate-500" />
            </div>
            {children}
        </article>
    );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-3xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">{label}</dt>
            <dd className="mt-2 break-words text-lg font-semibold text-slate-900">{value}</dd>
        </div>
    );
}

function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-3xl border border-black/10 bg-slate-50 p-4 text-sm text-slate-700">
            <dt className="font-semibold text-slate-900">{label}</dt>
            <dd className="mt-2">{value}</dd>
        </div>
    );
}

function StatusBadge({ label, status }: { label: string; status: string }) {
    const color = status === 'active' ? 'bg-emerald-500/10 text-emerald-700' : status === 'pending' ? 'bg-amber-500/10 text-amber-700' : 'bg-rose-500/10 text-rose-700';

    return (
        <div className={`rounded-3xl border border-black/10 p-4 ${color}`}>
            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Statut livreur</span>
            <p className="mt-2 text-xl font-semibold text-slate-900">{label}</p>
        </div>
    );
}

function EmptyState({ title, text, action }: { title: string; text: string; action: { href: string; label: string } }) {
    return (
        <div className="rounded-3xl border border-black/10 bg-slate-50 p-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-red-500">Aucun résultat</p>
            <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-600">{text}</p>
            <Link href={action.href} className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white">
                {action.label}
            </Link>
        </div>
    );
}
