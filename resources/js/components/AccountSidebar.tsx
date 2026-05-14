import { Link, router, usePage } from '@inertiajs/react';
import {
    FiCreditCard,
    FiHeart,
    FiLock,
    FiLogOut,
    FiMapPin,
    FiPackage,
    FiUser,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';
import type { PageProps, User } from '@/types';

type SidebarItem = {
    label: string;
    href: string;
    icon: IconType;
};

const menuItems: SidebarItem[] = [
    { label: 'Informations du compte', href: '/dashboard', icon: FiUser },
    { label: 'Mes commandes', href: '/account/orders', icon: FiPackage },
    { label: 'Mes favoris', href: '/account/favorites', icon: FiHeart },
    { label: 'Mes adresses', href: '/account/addresses', icon: FiMapPin },
    { label: 'Informations de paiement', href: '/account/payment', icon: FiCreditCard },
    { label: 'Changer le mot de passe', href: '/account/password', icon: FiLock },
];

export default function AccountSidebar() {
    const { auth, ziggy } = usePage<PageProps>().props;
    const user = auth.user as User;
    const displayName = user.display_name || user.name || 'Client';
    const avatar = user.profile_picture_url || user.google_avatar;
    const currentPath = pathnameFromUrl(ziggy.location);

    const logout = () => {
        router.post(route('logout'), {}, { preserveScroll: false });
    };

    return (
        <aside className="account-sidebar" aria-label="Navigation du compte">
            <div className="account-sidebar__identity">
                <div className="account-sidebar__avatar" aria-hidden="true">
                    {avatar ? <img src={avatar} alt="" /> : <FiUser />}
                </div>
                <div>
                    <span>COMPTE</span>
                    <strong>INFORMATIONS</strong>
                </div>
            </div>

            <div className="account-sidebar__name">{displayName}</div>
            <p className="account-sidebar__section">MES INFORMATIONS PERSONNELLES</p>

            <nav className="account-sidebar__nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = item.href === '/dashboard'
                        ? currentPath === item.href
                        : currentPath === item.href || currentPath.startsWith(`${item.href}/`);

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`account-sidebar__link${active ? ' is-active' : ''}`}
                        >
                            <span className="account-sidebar__icon">
                                <Icon />
                            </span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}

                <button
                    type="button"
                    onClick={logout}
                    className="account-sidebar__link account-sidebar__logout"
                >
                    <span className="account-sidebar__icon">
                        <FiLogOut />
                    </span>
                    <span>Se déconnecter</span>
                </button>
            </nav>
        </aside>
    );
}

function pathnameFromUrl(value: string): string {
    try {
        return new URL(value).pathname;
    } catch {
        return value || '/dashboard';
    }
}
