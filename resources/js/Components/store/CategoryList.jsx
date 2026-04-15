import { Link } from '@inertiajs/react';

export default function CategoryList({ items }) {
    return (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
                <Link
                    key={item.name}
                    href="/shop"
                    className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-4 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-950 hover:shadow-md"
                >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-100 text-lg">
                        {item.icon}
                    </span>
                    <span>{item.name}</span>
                </Link>
            ))}
        </div>
    );
}
