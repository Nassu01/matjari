import { Head, Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { FiArrowRight, FiHeart, FiMapPin, FiShoppingBag, FiShoppingCart } from 'react-icons/fi';

import AccountSidebar from '@/components/AccountSidebar';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps, User } from '@/types';

type OrderSummary = {
    id: number;
    order_number: string;
    status: string;
    payment_status?: string | null;
    total: number;
    items_count: number;
    created_at?: string | null;
};

type ProductPreview = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    category?: string | null;
    brand?: string | null;
};

type DashboardProps = PageProps<{
    recentOrders: OrderSummary[];
    favoritePreview: ProductPreview[];
    accountCreatedAt?: string | null;
}>;

const statusLabels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    processing: 'En préparation',
    preparing: 'En préparation',
    shipping: 'En livraison',
    shipped: 'En livraison',
    delivered: 'Livrée',
    cancelled: 'Annulée',
    canceled: 'Annulée',
};

export default function Dashboard() {
    const { auth, recentOrders = [], favoritePreview = [], accountCreatedAt } = usePage<DashboardProps>().props;
    const user = auth.user as User;
    const displayName = user.display_name || user.name || 'Client';

    return (
        <>
            <Head title="Mon compte" />
            <AuthStorefrontLayout>
                <main className="account-dashboard-page">
                    <div className="account-dashboard-shell">
                        <AccountSidebar />

                        <section className="account-dashboard-content" aria-label="Tableau de bord du compte">
                            <div className="account-dashboard-heading">
                                <span>Bienvenue</span>
                                <h1>Bonjour, {displayName}</h1>
                                <p>Retrouvez vos informations, vos commandes et vos raccourcis client.</p>
                            </div>

                            <DashboardCard title="Résumé du compte" eyebrow="Profil client">
                                <dl className="account-summary-grid">
                                    <SummaryItem label="Nom complet" value={displayName} />
                                    <SummaryItem label="Email" value={user.email} />
                                    <SummaryItem label="Téléphone" value={user.phone || 'Non ajouté'} />
                                    <SummaryItem label="Adresse principale" value="Non ajoutée" />
                                    <SummaryItem label="Date de création du compte" value={accountCreatedAt || 'Non disponible'} />
                                    <SummaryItem label="Rôle" value="Client" />
                                </dl>
                            </DashboardCard>

                            <DashboardCard
                                title="Commandes récentes"
                                eyebrow="Commandes"
                                action={<Link href="/account/orders">Voir mes commandes</Link>}
                            >
                                {recentOrders.length > 0 ? (
                                    <div className="account-orders-list">
                                        {recentOrders.map((order) => (
                                            <article className="account-order-row" key={order.id}>
                                                <div>
                                                    <span>Numéro de commande</span>
                                                    <strong>{order.order_number}</strong>
                                                </div>
                                                <div>
                                                    <span>Date</span>
                                                    <strong>{order.created_at || 'Récente'}</strong>
                                                </div>
                                                <div>
                                                    <span>Montant total</span>
                                                    <strong>{money(order.total)}</strong>
                                                </div>
                                                <div>
                                                    <span>Méthode de paiement</span>
                                                    <strong>{paymentLabel(order.payment_status)}</strong>
                                                </div>
                                                <div>
                                                    <span>Statut</span>
                                                    <Badge label={statusLabel(order.status)} />
                                                </div>
                                                <Link className="account-outline-button" href={`/account/orders/${order.id}`}>
                                                    Voir détails
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={<FiShoppingBag />}
                                        title="Aucune commande pour le moment."
                                        text="Lorsque vous passez une commande, elle apparaîtra ici."
                                        action={<Link href="/shop">Commencer vos achats</Link>}
                                    />
                                )}
                            </DashboardCard>

                            <div className="account-dashboard-grid">
                                <DashboardCard title="Résumé du panier" eyebrow="Panier">
                                    <div className="account-cart-summary">
                                        <SummaryItem label="Produits dans le panier" value="0" />
                                        <SummaryItem label="Total estimé" value={money(0)} />
                                    </div>
                                    <EmptyState
                                        icon={<FiShoppingCart />}
                                        title="Votre panier est vide."
                                        text="Découvrez nos produits et ajoutez vos articles préférés."
                                        action={<Link href="/shop">Voir la boutique</Link>}
                                        compact
                                    />
                                    <div className="account-card-actions">
                                        <Link href="/cart">Voir panier</Link>
                                        <Link href="/checkout">Aller au checkout</Link>
                                    </div>
                                </DashboardCard>

                                <DashboardCard title="Adresse principale" eyebrow="Livraison">
                                    <EmptyState
                                        icon={<FiMapPin />}
                                        title="Aucune adresse ajoutée."
                                        text="Ajoutez une adresse pour faciliter vos commandes."
                                        action={<Link href="/account/addresses">Ajouter une adresse</Link>}
                                        compact
                                    />
                                </DashboardCard>
                            </div>

                            <DashboardCard
                                title="Produits favoris"
                                eyebrow="Favoris"
                                action={<Link href="/account/favorites">Voir tous</Link>}
                            >
                                {favoritePreview.length > 0 ? (
                                    <div className="account-favorites-grid">
                                        {favoritePreview.map((product) => (
                                            <article className="account-favorite-card" key={product.id}>
                                                <div className="account-favorite-image">
                                                    {product.image ? <img src={product.image} alt={product.name} /> : <FiHeart />}
                                                </div>
                                                <div>
                                                    <span>{product.category || product.brand || 'Produit'}</span>
                                                    <h3>{product.name}</h3>
                                                    <p>{money(product.price)}</p>
                                                </div>
                                                <div className="account-card-actions">
                                                    <Link href={`/shop?product=${product.id}`}>Voir produit</Link>
                                                    <Link href="/cart">Ajouter au panier</Link>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                ) : (
                                    <EmptyState
                                        icon={<FiHeart />}
                                        title="Vous n’avez pas encore ajouté de produits aux favoris."
                                        text="Vos produits enregistrés seront affichés dans cette section."
                                        action={<Link href="/shop">Découvrir les produits</Link>}
                                    />
                                )}
                            </DashboardCard>

                            <DashboardCard title="Support / Aide" eyebrow="Assistance">
                                <div className="account-support-box">
                                    <div>
                                        <h3>Besoin d’aide ?</h3>
                                        <p>Contactez le support ou consultez vos commandes pour suivre votre livraison.</p>
                                    </div>
                                    <div className="account-card-actions">
                                        <Link href="/support">Contacter le support</Link>
                                        <Link href="/account/orders">
                                            Voir mes commandes
                                            <FiArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            </DashboardCard>
                        </section>
                    </div>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}

function DashboardCard({
    title,
    eyebrow,
    action,
    children,
}: {
    title: string;
    eyebrow: string;
    action?: ReactNode;
    children: ReactNode;
}) {
    return (
        <article className="account-card">
            <div className="account-card__head">
                <div>
                    <span>{eyebrow}</span>
                    <h2>{title}</h2>
                </div>
                {action && <div className="account-card__action">{action}</div>}
            </div>
            {children}
        </article>
    );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="account-summary-item">
            <dt>{label}</dt>
            <dd>{value}</dd>
        </div>
    );
}

function Badge({ label }: { label: string }) {
    return <span className="account-status-badge">{label}</span>;
}

function EmptyState({
    icon,
    title,
    text,
    action,
    compact = false,
}: {
    icon: ReactNode;
    title: string;
    text: string;
    action?: ReactNode;
    compact?: boolean;
}) {
    return (
        <div className={`account-empty-state${compact ? ' is-compact' : ''}`}>
            <div className="account-empty-state__icon">{icon}</div>
            <div>
                <h3>{title}</h3>
                <p>{text}</p>
                {action && <div className="account-empty-state__action">{action}</div>}
            </div>
        </div>
    );
}

function statusLabel(status: string): string {
    return statusLabels[String(status || '').toLowerCase()] || status || 'En attente';
}

function paymentLabel(status?: string | null): string {
    if (!status) {
        return 'Non renseignée';
    }

    return status.replace(/_/g, ' ');
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
