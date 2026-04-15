import { Link } from '@inertiajs/react';

export default function CategoryList({ items }) {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {items.map((item) => (
                <Link
                    key={item.name}
                    href="/shop"
                    className="group flex flex-col items-center gap-3 rounded-[1.75rem] border border-stone-200 bg-white px-4 py-5 text-center text-sm font-medium text-stone-700 transition hover:-translate-y-1 hover:border-stone-900 hover:text-stone-950 hover:shadow-md"
                >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-100 text-sm font-semibold tracking-[0.2em] text-stone-600 transition group-hover:bg-stone-900 group-hover:text-white">
                        {item.icon}
                    </span>
                    <span className="max-w-[9rem] leading-5">{item.name}</span>
                </Link>
            ))}
        </div>
    );
}
