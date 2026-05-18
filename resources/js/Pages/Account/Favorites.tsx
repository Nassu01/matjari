import { Head, Link, router, usePage } from '@inertiajs/react';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

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

type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    category?: string | null;
    quantity: number;
    totalPrice: number;
};

type FavoritesProps = PageProps<{
    favoriteProducts: FavoriteProduct[];
}>;

const CART_STORAGE_KEY = 'matjari_cart';

export default function Favorites() {
    const { favoriteProducts = [] } = usePage<FavoritesProps>().props;
    const [cartNotice, setCartNotice] = useState('');

    const handleRemoveFavorite = (id: number) => {
        router.post(`/favorites/toggle`, { product_id: id }, {
            preserveScroll: true,
            onSuccess: () => router.reload({ only: ['favoriteProducts'] }),
        });
    };

    const handleAddToCart = (product: FavoriteProduct) => {
        if (typeof window === 'undefined') return;

        const stored = readStoredCart();
        const existing = stored.find((item: CartItem) => item.id === product.id);
        
        const next = existing
            ? stored.map((item: CartItem) =>
                  item.id === product.id
                      ? {
                            ...item,
                            quantity: item.quantity + 1,
                            totalPrice: Number(product.price || 0) * (item.quantity + 1),
                        }
                      : item,
              )
            : [
                  ...stored,
                  {
                      id: product.id,
                      name: product.name,
                      price: Number(product.price || 0),
                      image: product.image || '/images/logomatjari.png',
                      category: product.category,
                      quantity: 1,
                      totalPrice: Number(product.price || 0),
                  },
              ];

        writeStoredCart(next);
        setCartNotice('Produit ajouté au panier.');
        window.setTimeout(() => setCartNotice(''), 2200);
    };

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
                                    <Link href={product.url || '/shop'}>Voir le produit</Link>
                                    
                                    <button type="button" onClick={() => handleAddToCart(product)}>
                                        <FiShoppingCart />
                                        Ajouter au panier
                                    </button>

                                    <button type="button" onClick={() => handleRemoveFavorite(product.id)}>
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
                            <Link href="/shop">Découvrir les Inference</Link>
                            <Link href="/" className="account-favorites-empty__secondary">
                                Retour à la boutique
                            </Link>
                        </div>
                    </section>
                )}
            </AccountPageLayout>

            {cartNotice ? <div className="fixed bottom-6 left-1/2 z-[120] -translate-x-1/2 rounded-md border border-black/10 bg-[#202526] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(0,0,0,0.18)]">{cartNotice}</div> : null}
        </>
    );
}

function readStoredCart(): CartItem[] {
    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        return stored ? (JSON.parse(stored).products || []) : [];
    } catch { return []; }
}

function writeStoredCart(products: CartItem[]) {
    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);
    const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ products, totalQuantity, totalAmount: Number(totalAmount.toFixed(2)) }));
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
