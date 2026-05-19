import { Link, router, usePage } from '@inertiajs/react';
import { FiBarChart2, FiBox, FiBriefcase, FiChevronRight, FiClipboard, FiHome, FiSettings, FiShoppingCart, FiXCircle } from 'react-icons/fi';
import type { PageProps, User } from '@/types';

const menuItems = [
    { label: 'Tableau de bord', href: '/merchant/dashboard', icon: FiHome },
    { label: 'Mon entreprise', href: '/merchant/company', icon: FiBriefcase },
    { label: 'Mes produits', href: '/merchant/products', icon: FiBox },
    { label: 'Ajouter un produit', href: '/merchant/products/create', icon: FiShoppingCart },
    { label: 'Commandes reçues', href: '/merchant/orders', icon: FiClipboard },
    { label: 'Stock', href: '/merchant/products', icon: FiBox },
    { label: 'Statistiques', href: '/merchant/statistics', icon: FiBarChart2 },
    { label: 'Paramètres', href: '/merchant/company', icon: FiSettings },
];

export default function MerchantSidebar() {
    const { auth, ziggy } = usePage<PageProps>().props;
    const user = auth.user as User;
    const currentPath = pathnameFromUrl(ziggy.location);

    const logout = () => {
        router.post(route('logout'), {}, { preserveScroll: false });
    };

    return (
        <aside className="w-full rounded-3xl bg-black px-4 py-6 text-white shadow-xl shadow-black/10 sm:px-6 sm:py-8 xl:sticky xl:top-8 xl:max-w-[320px] xl:self-start">
            <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white">
                    <FiBriefcase />
                </div>
                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-500">Espace commerçant</span>
                    <h2 className="mt-2 text-xl font-semibold">{user.display_name || user.name}</h2>
                </div>
            </div>

            <nav className="space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = currentPath === item.href || currentPath.startsWith(item.href + '/');

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between rounded-3xl border px-4 py-4 text-sm font-semibold transition ${
                                active ? 'border-white bg-white/10 text-white' : 'border-white/10 text-white/80 hover:border-white/30 hover:text-white'
                            }`}
                        >
                            <span className="flex min-w-0 items-center gap-3">
                                <Icon className="shrink-0 text-base" />
                                <span className="truncate">{item.label}</span>
                            </span>
                            <FiChevronRight className="shrink-0 text-base" />
                        </Link>
                    );
                })}
            </nav>

            <button
                type="button"
                onClick={logout}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
                <FiXCircle />
                Se déconnecter
            </button>
        </aside>
    );
}

function pathnameFromUrl(value: string): string {
    try {
        return new URL(value).pathname;
    } catch {
        return value || '/merchant/dashboard';
    }
}
