import { Link, router, usePage } from '@inertiajs/react';
import { FiArrowRightCircle, FiClipboard, FiHeadphones, FiMapPin, FiMap, FiSettings, FiTruck, FiUser, FiXCircle } from 'react-icons/fi';
import type { PageProps, User } from '@/types';

const menuItems = [
    { label: 'Tableau de bord', href: '/delivery/dashboard', icon: FiTruck },
    { label: 'Commandes à livrer', href: '/delivery/orders/available', icon: FiMapPin },
    { label: 'Mes livraisons', href: '/delivery/orders/current', icon: FiMap },
    { label: 'Livraisons terminées', href: '/delivery/orders/history', icon: FiArrowRightCircle },
    { label: 'Mon profil livreur', href: '/delivery/profile', icon: FiUser },
    { label: 'Paramètres', href: '/delivery/profile', icon: FiSettings },
];

export default function DeliverySidebar() {
    const { auth, ziggy } = usePage<PageProps>().props;
    const user = auth.user as User;
    const currentPath = pathnameFromUrl(ziggy.location);

    const logout = () => {
        router.post(route('logout'), {}, { preserveScroll: false });
    };

    return (
        <aside className="max-w-[320px] rounded-3xl bg-black px-6 py-8 text-white shadow-xl shadow-black/10 sm:sticky sm:top-8 sm:self-start">
            <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white">
                    <FiTruck />
                </div>
                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-500">Espace livreur</span>
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
                            <span className="flex items-center gap-3">
                                <Icon className="text-base" />
                                {item.label}
                            </span>
                            <FiClipboard className="text-base" />
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
        return value || '/delivery/dashboard';
    }
}
