import { Head, Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiCreditCard, FiTruck, FiLock, FiCheckCircle } from 'react-icons/fi';
import AuthStorefrontLayout from '@/layouts/AuthStorefrontLayout';

type CartProduct = {
    id: string | number;
    name?: string;
    titre?: string;
    category?: string;
    image?: string;
    img?: string;
    price?: number | string;
    quantity?: number;
    totalPrice?: number | string;
};

const CART_STORAGE_KEY = 'matjari_cart';

function readStoredCart(): CartProduct[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!stored) return [];
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed.products) ? parsed.products : [];
    } catch {
        return [];
    }
}

function money(value: number | string | undefined) {
    return `${Number(value || 0).toFixed(2)} DH`;
}

export default function Checkout() {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
    });

    useEffect(() => {
        setProducts(readStoredCart());
    }, []);

    const totals = useMemo(() => {
        return products.reduce(
            (summary, product) => {
                const quantity = Number(product.quantity || 0);
                const price = Number(product.price || 0);
                summary.amount += price * quantity;
                return summary;
            },
            { amount: 0 },
        );
    }, [products]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // هنا يتم ربط الـ Backend لاحقاً لإرسال الطلب عبر Inertia.post
        alert('طلبك قيد المعالجة في متجر Matjari! سيتم تحويلك لصفحة النجاح.');
    };

    return (
        <AuthStorefrontLayout>
            <Head title="Passer la commande - Matjari" />

            <main className="bg-[#f4f4f3] px-5 py-12 text-[#202526] sm:px-8 lg:px-10 lg:py-16">
                <div className="mx-auto w-full max-w-[1180px]">
                    
                    {/* زر العودة إلى السلة */}
                    <div className="mb-8">
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#687074] transition hover:text-black"
                        >
                            <FiArrowLeft className="h-4 w-4" />
                            Retour au panier
                        </Link>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                        
                        {/* القسم الأيسر: استمارات الشحن والدفع */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            {/* 1. تفاصيل الشحن */}
                            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(32,37,38,0.05)] sm:p-8">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                    ÉTAPPE 1
                                </span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">
                                    Informations de livraison
                                </h2>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Prénom</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="Ahmed"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Nom</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="Alami"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Adresse e-mail</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="ahmed@example.com"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Téléphone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="+212 600-000000"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Adresse complète</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="Rue, Numéro d'appartement, Quartier..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Ville</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="Casablanca"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Code Postal</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            required
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-neutral-300 bg-[#fffdfb] px-4 py-3 text-sm shadow-sm focus:border-black focus:ring-black"
                                            placeholder="20000"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* 2. طرق الدفع */}
                            <section className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_14px_35px_rgba(32,37,38,0.05)] sm:p-8">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                    ÉTAPPE 2
                                </span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">
                                    Mode de paiement
                                </h2>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {/* الدفع عند الاستلام */}
                                    <div
                                        onClick={() => setPaymentMethod('cod')}
                                        className={`relative flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
                                            paymentMethod === 'cod'
                                                ? 'border-black bg-[#fffdfb] ring-1 ring-black'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className="flex h-5 items-center">
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'cod'}
                                                onChange={() => setPaymentMethod('cod')}
                                                className="h-4 w-4 border-neutral-300 text-black focus:ring-black"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <FiTruck className="mt-1 h-5 w-5 text-[#687074]" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#202526]">Paiement à la livraison (COD)</p>
                                                <p className="mt-1 text-xs text-[#687074]">Payez en espèces dès réception de votre colis.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* الدفع بالبطاقة البنكية */}
                                    <div
                                        onClick={() => setPaymentMethod('card')}
                                        className={`relative flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition ${
                                            paymentMethod === 'card'
                                                ? 'border-black bg-[#fffdfb] ring-1 ring-black'
                                                : 'border-neutral-200 bg-white hover:border-neutral-300'
                                        }`}
                                    >
                                        <div className="flex h-5 items-center">
                                            <input
                                                type="radio"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="h-4 w-4 border-neutral-300 text-black focus:ring-black"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <FiCreditCard className="mt-1 h-5 w-5 text-[#687074]" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#202526]">Carte Bancaire</p>
                                                <p className="mt-1 text-xs text-[#687074]">Payez en ligne de manière sécurisée (CMI).</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* حقول البطاقة البنكية تظهر فقط عند اختيارها */}
                                {paymentMethod === 'card' && (
                                    <div className="mt-6 grid gap-4 rounded-md bg-[#fdfbf9] p-4 border border-dashed border-neutral-200 transition-all">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Numéro de carte</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-md border-neutral-300 bg-white px-4 py-3 text-sm focus:border-black focus:ring-black"
                                                placeholder="0000 0000 0000 0000"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">Date d'expiration</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-md border-neutral-300 bg-white px-4 py-3 text-sm focus:border-black focus:ring-black"
                                                    placeholder="MM/AA"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-[#687074] mb-2">CVC / CVC2</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-md border-neutral-300 bg-white px-4 py-3 text-sm focus:border-black focus:ring-black"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </form>

                        {/* القسم الأيمن: ملخص المنتجات والـ Checkout */}
                        <aside className="h-fit space-y-4 lg:sticky lg:top-6">
                            <div className="rounded-lg border border-black/10 bg-white p-6 shadow-[0_22px_60px_rgba(32,37,38,0.08)]">
                                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#b91f2c]">
                                    VOTRE COMMANDE
                                </span>
                                <h2 className="mb-6 mt-2 font-serif text-2xl font-semibold text-[#202526]">
                                    Résumé de la commande
                                </h2>

                                {/* قائمة المنتجات المصغرة داخل الـ Checkout */}
                                <div className="max-h-[240px] overflow-y-auto divide-y divide-neutral-100 pr-2 custom-scrollbar">
                                    {products.map((product) => {
                                        const qty = Number(product.quantity || 1);
                                        const prc = Number(product.price || 0);
                                        const title = product.name || product.titre || 'Produit';
                                        const imgUrl = product.image || product.img || '';

                                        return (
                                            <div key={product.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                                                <div className="h-14 w-14 flex-none overflow-hidden rounded-md border border-[#dedbd8] bg-[#eee4dc]">
                                                    {imgUrl ? (
                                                        <img src={imgUrl} alt={title} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-[#687074]">Matjari</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate text-sm font-semibold text-[#202526]">{title}</h3>
                                                    <p className="mt-1 text-xs text-[#687074]">Qté: {qty} × {money(prc)}</p>
                                                </div>
                                                <span className="text-sm font-semibold text-[#202526]">{money(prc * qty)}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* الحسابات المالية */}
                                <div className="mt-6 space-y-4 border-t border-black/10 pt-4 text-sm text-[#687074]">
                                    <div className="flex items-center justify-between">
                                        <span>Sous-total</span>
                                        <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Frais de livraison</span>
                                        <strong className="text-green-600 font-semibold">Gratuit</strong>
                                    </div>
                                    <div className="border-t border-black/10 pt-4">
                                        <div className="flex items-center justify-between text-lg">
                                            <span>Total à payer</span>
                                            <strong className="text-[#202526]">{money(totals.amount)}</strong>
                                        </div>
                                    </div>
                                </div>

                                {/* زر تأكيد الطلب النهائي */}
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-[#b91f2c] px-6 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(185,31,44,0.16)] transition hover:-translate-y-0.5 hover:bg-red-800"
                                >
                                    Confirmer la commande ({money(totals.amount)})
                                </button>

                                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#687074]">
                                    <FiLock className="h-3 w-3" />
                                    <span>Paiement 100% Sécurisé crypté SSL</span>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </main>
        </AuthStorefrontLayout>
    );
}