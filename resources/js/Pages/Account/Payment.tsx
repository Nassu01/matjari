import { Head } from '@inertiajs/react';
import { FiCreditCard } from 'react-icons/fi';

import AccountPageLayout from './AccountPageLayout';

export default function Payment() {
    return (
        <>
            <Head title="Informations de paiement" />
            <AccountPageLayout
                title="Informations de paiement"
                subtitle="Gérez vos préférences de paiement."
                eyebrow="Paiement"
            >
                <div className="account-dashboard-grid">
                    <article className="account-card">
                        <div className="account-payment-method">
                            <div className="account-empty-state__icon">
                                <FiCreditCard />
                            </div>
                            <div>
                                <span>Méthode préférée</span>
                                <h2>Paiement à la livraison</h2>
                                <p>Vous pouvez payer en espèces lors de la livraison de votre commande.</p>
                            </div>
                        </div>
                        <dl className="account-summary-grid">
                            <div className="account-summary-item">
                                <dt>Statut</dt>
                                <dd>Disponible</dd>
                            </div>
                            <div className="account-summary-item">
                                <dt>Type</dt>
                                <dd>Espèces à la livraison</dd>
                            </div>
                        </dl>
                    </article>

                    <article className="account-card">
                        <div className="account-card__head">
                            <div>
                                <span>Bientôt</span>
                                <h2>Carte bancaire</h2>
                            </div>
                        </div>
                        <p className="account-muted-text">
                            Le paiement par carte bancaire sera disponible prochainement. Aucune carte n’est stockée
                            pour le moment.
                        </p>
                    </article>
                </div>
            </AccountPageLayout>
        </>
    );
}
