import { Head, Link, usePage } from '@inertiajs/react';
import { FiBriefcase, FiPackage, FiShoppingBag, FiTruck, FiUser } from 'react-icons/fi';
import type { ReactNode } from 'react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import MerchantSidebar from '@/components/MerchantSidebar';
import type { PageProps, User } from '@/types';

type MerchantDashboardProps = PageProps<{
    company?: {
        company_name: string;
        city: string;
        status: string;
    };
    productSummary: {
        total: number;
        active: number;
        pending: number;
        refused: number;
    };
    orderSummary: {
        total: number;
        pending: number;
        preparing: number;
        shipped: number;
        delivered: number;
    };
    stockSummary: {
        in_stock: number;
        out_of_stock: number;
        low_stock: number;
    };
    stats: {
        total_sales: number;
        estimated_revenue: number;
        top_product: string;
        popular_products: { id: number; name: string }[];
    };
}>;

export default function Dashboard() {
    const { auth, company, productSummary, orderSummary, stockSummary, stats } = usePage<MerchantDashboardProps>().props;
    const user = auth.user as User;
    const displayName = user.display_name || user.name || 'Commerçant';
    const companyStatus = company?.status || user.status || 'pending';

    return (
        <>
            <Head title="Tableau de bord commerçant" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page px-4 py-8 lg:px-10 lg:py-12">
                    <div className="mx-auto grid w-full max-w-[1580px] gap-6 xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] xl:gap-8">
                        <MerchantSidebar />

                        <section className="min-w-0 space-y-8">
                            <header className="rounded-3xl border border-black/10 bg-white p-5 shadow-xl shadow-black/5 sm:p-8">
                                <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-500">Bienvenue</p>
                                <h1 className="break-words text-3xl font-semibold tracking-tight text-[#111] sm:text-4xl">Bonjour, {displayName}</h1>
                                <p className="mt-3 max-w-2xl text-base text-slate-600">Bienvenue dans votre espace commerçant. Gérez votre entreprise, vos produits et suivez vos commandes.</p>
                                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                                    <StatusBadge label={companyStatus === 'active' ? 'Entreprise validée' : companyStatus === 'pending' ? 'En attente de validation' : 'Refusée'} status={companyStatus} />
                                    <InfoCard label="Statut du compte" value={companyStatus === 'active' ? 'Actif' : companyStatus === 'pending' ? 'En attente' : 'Refusé'} />
                                    <InfoCard label="Ville" value={company?.city || 'Non définie'} />
                                </div>
                            </header>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <DashboardCard title="Résumé commerçant" eyebrow="Profil commerçant">
                                    <dl className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Nom du commerçant" value={displayName} />
                                        <SummaryItem label="Email" value={user.email} />
                                        <SummaryItem label="Téléphone" value={user.phone || 'Non ajouté'} />
                                        <SummaryItem label="Nom de l’entreprise" value={company?.company_name || 'Non définie'} />
                                        <SummaryItem label="Ville" value={company?.city || 'Non définie'} />
                                        <SummaryItem label="Statut du compte" value={companyStatus === 'active' ? 'Actif' : companyStatus === 'pending' ? 'En attente' : 'Refusé'} />
                                        <SummaryItem label="Date de création" value={new Date(user.id ? user.id : 0).toLocaleDateString('fr-FR')} />
                                    </dl>
                                </DashboardCard>

                                <DashboardCard title="Produits" eyebrow="Inventaire">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Total" value={String(productSummary.total)} />
                                        <SummaryItem label="Actifs" value={String(productSummary.active)} />
                                        <SummaryItem label="En attente" value={String(productSummary.pending)} />
                                        <SummaryItem label="Refusés" value={String(productSummary.refused)} />
                                    </div>
                                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                        <Link href="/merchant/products/create" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-slate-900">
                                            Ajouter un produit
                                        </Link>
                                        <Link href="/merchant/products" className="inline-flex h-12 items-center justify-center rounded-full border border-black bg-white px-6 text-sm font-semibold text-black transition hover:border-slate-900">
                                            Voir mes produits
                                        </Link>
                                    </div>
                                </DashboardCard>
                            </div>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <DashboardCard title="Commandes reçues" eyebrow="Commandes">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="Total" value={String(orderSummary.total)} />
                                        <SummaryItem label="En attente" value={String(orderSummary.pending)} />
                                        <SummaryItem label="En préparation" value={String(orderSummary.preparing)} />
                                        <SummaryItem label="Expédiées" value={String(orderSummary.shipped)} />
                                        <SummaryItem label="Livrées" value={String(orderSummary.delivered)} />
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/merchant/orders" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-slate-900">
                                            Voir les commandes
                                        </Link>
                                    </div>
                                </DashboardCard>

                                <DashboardCard title="Stock" eyebrow="Inventaire">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <SummaryItem label="En stock" value={String(stockSummary.in_stock)} />
                                        <SummaryItem label="Rupture" value={String(stockSummary.out_of_stock)} />
                                        <SummaryItem label="Stock faible" value={String(stockSummary.low_stock)} />
                                    </div>
                                    <div className="mt-6">
                                        <Link href="/merchant/products" className="inline-flex h-12 items-center justify-center rounded-full border border-black bg-white px-6 text-sm font-semibold text-black transition hover:border-slate-900">
                                            Gérer le stock
                                        </Link>
                                    </div>
                                </DashboardCard>
                            </div>

                            <DashboardCard title="Statistiques" eyebrow="Performance">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <SummaryItem label="Ventes totales" value={`${stats.total_sales}`} />
                                    <SummaryItem label="Revenus estimés" value={`${stats.estimated_revenue.toFixed(2)} €`} />
                                    <SummaryItem label="Produit le plus vendu" value={stats.top_product} />
                                    <SummaryItem label="Produits populaires" value={stats.popular_products.map((product) => product.name).join(', ') || 'Aucun'} />
                                </div>
                            </DashboardCard>

                            <DashboardCard title="Actions rapides" eyebrow="Raccourcis">
                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Link href="/merchant/products/create" className="rounded-3xl border border-black bg-black px-5 py-4 text-sm font-semibold text-white text-center transition hover:bg-slate-900">Ajouter un produit</Link>
                                    <Link href="/merchant/company" className="rounded-3xl border border-black bg-white px-5 py-4 text-sm font-semibold text-black text-center transition hover:border-slate-900">Modifier mon entreprise</Link>
                                    <Link href="/merchant/orders" className="rounded-3xl border border-black bg-white px-5 py-4 text-sm font-semibold text-black text-center transition hover:border-slate-900">Voir mes commandes</Link>
                                    <Link href="/merchant/statistics" className="rounded-3xl border border-black bg-white px-5 py-4 text-sm font-semibold text-black text-center transition hover:border-slate-900">Voir mes statistiques</Link>
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
                <div className="text-slate-500">
                    <FiBriefcase className="h-6 w-6" />
                </div>
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
            <span className="text-sm uppercase tracking-[0.3em] text-red-500">Statut entreprise</span>
            <p className="mt-2 text-xl font-semibold text-slate-900">{label}</p>
        </div>
    );
}
