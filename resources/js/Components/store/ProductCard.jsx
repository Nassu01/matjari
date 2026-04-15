export default function ProductCard({ product }) {
    const price = Number(product?.price || 0);

    return (
        <article className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="relative aspect-[4/4.2] overflow-hidden bg-stone-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-700 backdrop-blur">
                    {product.category}
                </span>
            </div>

            <div className="space-y-4 px-5 py-5">
                <div>
                    <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">Curated everyday essential.</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-stone-950">{price.toFixed(2)} DH</p>
                    <button
                        type="button"
                        className="rounded-full border border-stone-900 px-4 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-900 hover:text-white"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </article>
    );
}
