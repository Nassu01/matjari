import { Head, Link, usePage } from '@inertiajs/react';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';
import type { PageProps, User } from '@/types';

type OrderSummary = {
    id: number;
    order_number: string;
    status: string;
    payment_status: string;
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
}>;

const quickLinks = [
    {
        title: 'Home',
        description: 'Return to the storefront home page.',
        href: '/',
        external: true,
    },
    {
        title: 'Shop',
        description: 'Browse products, categories, and search results.',
        href: route('storefront.shop'),
        external: true,
    },
    {
        title: 'Search',
        description: 'Find products from the shop page.',
        href: route('storefront.shop'),
        external: true,
    },
    {
        title: 'Profile',
        description: 'Edit your name, email, bio, and profile image.',
        href: route('profile.edit'),
        external: false,
    },
    {
        title: 'Orders',
        description: 'Review order history and checkout activity.',
        href: route('storefront.order'),
        external: true,
    },
    {
        title: 'Favorites',
        description: 'Open your saved products and add picks to cart.',
        href: route('storefront.favorite'),
        external: true,
    },
    {
        title: 'Panier',
        description: 'Review products currently in your cart.',
        href: route('storefront.cart'),
        external: true,
    },
    {
        title: 'Checkout',
        description: 'Continue to checkout when your cart is ready.',
        href: route('storefront.checkout'),
        external: true,
    },
    {
        title: 'Settings',
        description: 'Manage account details and password options.',
        href: route('profile.edit'),
        external: false,
    },
];

export default function Dashboard() {
    const { auth, recentOrders, favoritePreview } = usePage<DashboardProps>().props;
    const user = auth.user as User;
    const displayName = user.display_name || user.name;
    const avatar = user.profile_picture_url || user.google_avatar;

    return (
        <>
            <Head title="Dashboard" />
            <AuthStorefrontLayout>
                <main className="dashboard-page">
                    <section className="dashboard-hero">
                        <div className="dashboard-profile">
                            <div className="dashboard-avatar" aria-hidden="true">
                                {avatar ? <img src={avatar} alt="" /> : <span>{initials(displayName)}</span>}
                            </div>
                            <div>
                                <p>Account home</p>
                                <h1>{displayName}</h1>
                                <span>{user.email}</span>
                            </div>
                        </div>

                        <div className="dashboard-hero-actions">
                            <a href="/" className="dashboard-link-light">
                                Back to store
                            </a>
                            <a href={route('storefront.shop')}>Shop now</a>
                            <Link href={route('profile.edit')}>Edit profile</Link>
                        </div>
                    </section>

                    <section className="dashboard-store-home" aria-label="Store navigation">
                        <div className="dashboard-store-home-copy">
                            <p>Store shortcuts</p>
                            <h2>Go anywhere from your account</h2>
                        </div>

                        <div className="dashboard-store-actions">
                            <a href="/">Home</a>
                            <a href={route('storefront.shop')}>Shop / Search</a>
                            <a href={route('storefront.favorite')}>Favorites</a>
                            <a href={route('storefront.cart')}>Panier</a>
                            <a href={route('storefront.checkout')}>Checkout</a>
                            <a href={route('storefront.order')}>Orders</a>
                        </div>
                    </section>

                    <section className="dashboard-grid" aria-label="Account shortcuts">
                        {quickLinks.map((item) => (
                            <DashboardShortcut item={item} key={item.title} />
                        ))}
                    </section>

                    <section className="dashboard-content-grid">
                        <div className="dashboard-panel">
                            <div className="dashboard-panel-head">
                                <div>
                                    <p>Recent activity</p>
                                    <h2>Recent orders</h2>
                                </div>
                                <a href={route('storefront.order')}>View all</a>
                            </div>

                            {recentOrders.length > 0 ? (
                                <div className="dashboard-orders">
                                    {recentOrders.map((order) => (
                                        <article className="dashboard-order" key={order.id}>
                                            <div>
                                                <strong>{order.order_number}</strong>
                                                <span>{order.created_at || 'Recent order'}</span>
                                            </div>
                                            <div>
                                                <span>{order.items_count} items</span>
                                                <strong>{money(order.total)}</strong>
                                            </div>
                                            <Badge label={order.status} />
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No orders yet"
                                    text="When you place an order, it will appear here for quick tracking."
                                    href="/shop"
                                    action="Start shopping"
                                />
                            )}
                        </div>

                        <div className="dashboard-panel">
                            <div className="dashboard-panel-head">
                                <div>
                                    <p>Saved picks</p>
                                    <h2>Favorite products</h2>
                                </div>
                                <a href={route('storefront.favorite')}>Open favorites</a>
                            </div>

                            {favoritePreview.length > 0 ? (
                                <div className="dashboard-products">
                                    {favoritePreview.map((product) => (
                                        <article className="dashboard-product" key={product.id}>
                                            <div className="dashboard-product-image">
                                                {product.image ? <img src={product.image} alt={product.name} /> : <span>No image</span>}
                                            </div>
                                            <div>
                                                <span>{product.category || product.brand || 'Featured'}</span>
                                                <strong>{product.name}</strong>
                                                <p>{money(product.price)}</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState
                                    title="No product preview"
                                    text="Add active products in the dashboard to show fresh favorites here."
                                    href="/shop"
                                    action="Browse shop"
                                />
                            )}
                        </div>
                    </section>

                    <section className="dashboard-footer-actions">
                        <Link href={route('logout')} method="post" as="button">
                            Logout
                        </Link>
                    </section>
                </main>
            </AuthStorefrontLayout>
        </>
    );
}

function DashboardShortcut({ item }: { item: { title: string; description: string; href: string; external: boolean } }) {
    const content = (
        <>
            <span>{item.title}</span>
            <p>{item.description}</p>
        </>
    );

    if (item.external) {
        return (
            <a className="dashboard-card dashboard-shortcut" href={item.href}>
                {content}
            </a>
        );
    }

    return (
        <Link className="dashboard-card dashboard-shortcut" href={item.href}>
            {content}
        </Link>
    );
}

function Badge({ label }: { label: string }) {
    return <span className="dashboard-badge">{label}</span>;
}

function EmptyState({ title, text, href, action }: { title: string; text: string; href: string; action: string }) {
    return (
        <div className="dashboard-empty">
            <h3>{title}</h3>
            <p>{text}</p>
            <Link href={href}>{action}</Link>
        </div>
    );
}

function initials(name: string): string {
    return (
        name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join('') || 'U'
    );
}

function money(value: number): string {
    return `${Number(value || 0).toFixed(2)} DH`;
}
