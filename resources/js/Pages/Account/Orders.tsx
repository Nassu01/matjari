import { Head, Link, usePage } from '@inertiajs/react';
import { FiShoppingBag } from 'react-icons/fi';

import AccountPageLayout from './AccountPageLayout';
import type { PageProps } from '@/types';

type OrderSummary = {
    id: number;
    order_number: string;
    status: string;
    payment_status?: string | null;
    total: number;
    created_at?: string | null;
};

type OrdersProps = PageProps<{
    orders: OrderSummary[];
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

export default function Orders() {
    const { orders = [] } = usePage<OrdersProps>().props;

    return (
        <>
            <Head title="Mes commandes" />
            <AccountPageLayout
                title="Mes commandes"
                subtitle="Consultez l’historique de vos commandes et suivez leur statut."
                eyebrow="Commandes"
            >
                <article className="account-card">
                    {orders.length > 0 ? (
                        <div className="account-orders-list">
                            {orders.map((order) => (
                                <div className="account-order-row" key={order.id}>
                                    <Field label="Numéro de commande" value={order.order_number} />
                                    <Field label="Date" value={order.created_at || 'Récente'} />
                                    <Field label="Total" value={money(order.total)} />
                                    <Field label="Méthode de paiement" value={paymentLabel(order.payment_status)} />
                                    <div>
                                        <span>Statut</span>
                                        <strong>{statusLabel(order.status)}</strong>
                                    </div>
                                    <Link className="account-outline-button" href={`/account/orders/${order.id}`}>
                                        Voir détails
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="account-empty-state">
                            <div className="account-empty-state__icon">
                                <FiShoppingBag />
                            </div>
                            <div>
                                <h3>Aucune commande pour le moment.</h3>
                                <p>Lorsque vous passez une commande, elle apparaîtra ici.</p>
                                <div className="account-empty-state__action">
                                    <Link href="/shop">Commencer vos achats</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </AccountPageLayout>
        </>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span>{label}</span>
            <strong>{value}</strong>
        </div>
    );
}

function statusLabel(status: string): string {
    return statusLabels[String(status || '').toLowerCase()] || status || 'En attente';
}

function paymentLabel(status?: string | null): string {
    return status ? status.replace(/_/g, ' ') : 'Non renseignée';
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
