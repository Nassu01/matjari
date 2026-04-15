import { useEffect, useMemo, useState } from 'react';

const CART_KEY = 'matjari.cart';
const FAVORITES_KEY = 'matjari.favorites';
const EVENT_NAME = 'matjari:storefront-sync';

function readStorage(key) {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(key);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function writeStorage(key, value) {
    if (typeof window === 'undefined') {
        return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
}

function emitChange() {
    if (typeof window === 'undefined') {
        return;
    }

    window.dispatchEvent(new window.Event(EVENT_NAME));
}

export default function useStorefront() {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const sync = () => {
            setCart(readStorage(CART_KEY));
            setFavorites(readStorage(FAVORITES_KEY));
        };

        sync();
        window.addEventListener(EVENT_NAME, sync);
        window.addEventListener('storage', sync);

        return () => {
            window.removeEventListener(EVENT_NAME, sync);
            window.removeEventListener('storage', sync);
        };
    }, []);

    const persistCart = (updater) => {
        const next = typeof updater === 'function' ? updater(readStorage(CART_KEY)) : updater;
        writeStorage(CART_KEY, next);
        setCart(next);
        emitChange();
    };

    const persistFavorites = (updater) => {
        const next = typeof updater === 'function' ? updater(readStorage(FAVORITES_KEY)) : updater;
        writeStorage(FAVORITES_KEY, next);
        setFavorites(next);
        emitChange();
    };

    const addToCart = (product) => {
        persistCart((current) => {
            const existing = current.find((item) => item.id === product.id);

            if (existing) {
                return current.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                              totalPrice: Number(((item.quantity + 1) * item.price).toFixed(2)),
                          }
                        : item,
                );
            }

            return [
                ...current,
                {
                    ...product,
                    quantity: 1,
                    totalPrice: Number(product.price.toFixed(2)),
                },
            ];
        });
    };

    const increaseQuantity = (id) => {
        persistCart((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          quantity: item.quantity + 1,
                          totalPrice: Number(((item.quantity + 1) * item.price).toFixed(2)),
                      }
                    : item,
            ),
        );
    };

    const decreaseQuantity = (id) => {
        persistCart((current) =>
            current
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: item.quantity - 1,
                              totalPrice: Number(((item.quantity - 1) * item.price).toFixed(2)),
                          }
                        : item,
                )
                .filter((item) => item.quantity > 0),
        );
    };

    const removeFromCart = (id) => {
        persistCart((current) => current.filter((item) => item.id !== id));
    };

    const clearCart = () => persistCart([]);

    const toggleFavorite = (product) => {
        persistFavorites((current) => {
            const exists = current.some((item) => item.id === product.id);
            return exists ? current.filter((item) => item.id !== product.id) : [...current, product];
        });
    };

    const removeFavorite = (id) => {
        persistFavorites((current) => current.filter((item) => item.id !== id));
    };

    const clearFavorites = () => persistFavorites([]);

    const cartCount = useMemo(
        () => cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
        [cart],
    );

    const cartTotal = useMemo(
        () =>
            Number(
                cart
                    .reduce((sum, item) => sum + Number(item.totalPrice || item.price || 0), 0)
                    .toFixed(2),
            ),
        [cart],
    );

    const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.id)), [favorites]);

    return {
        cart,
        favorites,
        cartCount,
        cartTotal,
        favoriteIds,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
    };
}
