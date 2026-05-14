import { Head, Link, usePage } from '@inertiajs/react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';

import AccountPageLayout from './AccountPageLayout';
import type { PageProps } from '@/types';

type FavoriteProduct = {
    id: number;
    name: string;
    price: number;
    image?: string | null;
    category?: string | null;
    url?: string | null;
};

type FavoritesProps = PageProps<{
    favoriteProducts: FavoriteProduct[];
}>;

export default function Favorites() {
    const { favoriteProducts = [] } = usePage<FavoritesProps>().props;

    return (
        <>
            <Head title="Mes favoris" />
            <AccountPageLayout
                title="Mes favoris"
                subtitle="Retrouvez ici tous les produits que vous avez sauvegardés."
                eyebrow="Favoris"
                action={<Link href="/dashboard">Retour au dashboard</Link>}
            >
                {favoriteProducts.length > 0 ? (
                    <section className="account-favorites-catalog" aria-label="Produits favoris">
                        {favoriteProducts.map((product) => (
                            <article className="account-favorites-product" key={product.id}>
                                <div className="account-favorites-product__image">
                                    {product.image ? <img src={product.image} alt={product.name} /> : <FiHeart />}
                                </div>

                                <div className="account-favorites-product__body">
                                    <span>{product.category || 'Produit'}</span>
                                    <h2>{product.name}</h2>
                                    <p>{money(product.price)}</p>
                                </div>

                                <div className="account-favorites-product__actions">
                                    <Link href={product.url || `/shop?product=${product.id}`}>Voir le produit</Link>
                                    <Link href="/cart">
                                        <FiShoppingCart />
                                        Ajouter au panier
                                    </Link>
                                    <button type="button">
                                        <FiTrash2 />
                                        Retirer des favoris
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>
                ) : (
                    <section className="account-favorites-empty" aria-label="Aucun favori">
                        <div className="account-favorites-empty__icon">
                            <FiHeart />
                        </div>
                        <span>COLLECTION SAUVEGARDÉE</span>
                        <h2>Aucun produit favori pour le moment</h2>
                        <p>
                            Vous n’avez pas encore ajouté de produits à vos favoris. Explorez la boutique et
                            sauvegardez les articles que vous aimez.
                        </p>
                        <div className="account-favorites-empty__actions">
                            <Link href="/shop">Découvrir les produits</Link>
                            <Link href="/shop" className="account-favorites-empty__secondary">
                                Retour à la boutique
                            </Link>
                        </div>
                    </section>
                )}
            </AccountPageLayout>
        </>
    );
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
