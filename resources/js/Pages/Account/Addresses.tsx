import { Head, Link, usePage } from '@inertiajs/react';
import { FiMapPin } from 'react-icons/fi';

import AccountPageLayout from './AccountPageLayout';
import type { PageProps } from '@/types';

type Address = {
    id: number;
    full_name: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    is_main?: boolean;
};

type AddressesProps = PageProps<{
    addresses: Address[];
}>;

export default function Addresses() {
    const { addresses = [] } = usePage<AddressesProps>().props;

    return (
        <>
            <Head title="Mes adresses" />
            <AccountPageLayout
                title="Mes adresses"
                subtitle="Gérez vos adresses de livraison."
                eyebrow="Livraison"
                action={<Link href="/account/addresses">Ajouter une adresse</Link>}
            >
                <article className="account-card">
                    {addresses.length > 0 ? (
                        <div className="account-address-grid">
                            {addresses.map((address) => (
                                <section className="account-address-card" key={address.id}>
                                    <div>
                                        <h2>{address.full_name}</h2>
                                        {address.is_main ? <span>Adresse principale</span> : null}
                                    </div>
                                    <p>{address.phone}</p>
                                    <p>{address.address}</p>
                                    <p>
                                        {address.city} {address.postal_code}
                                    </p>
                                    <div className="account-card-actions">
                                        <button type="button">Modifier</button>
                                        <button type="button">Supprimer</button>
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="account-empty-state">
                            <div className="account-empty-state__icon">
                                <FiMapPin />
                            </div>
                            <div>
                                <h3>Aucune adresse ajoutée.</h3>
                                <p>Ajoutez une adresse pour faciliter vos commandes.</p>
                                <div className="account-empty-state__action">
                                    <Link href="/account/addresses">Ajouter une adresse</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </AccountPageLayout>
        </>
    );
}
