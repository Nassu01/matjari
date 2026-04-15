export default function Header({ title, subtitle, right }) {
    return (
        <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white shadow-[0_30px_80px_rgba(28,25,23,0.18)]">
                <div className="flex flex-col gap-8 px-6 py-10 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:py-14">
                    <div className="max-w-2xl">
                        <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-amber-200">
                            Matjari Collection
                        </p>
                        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                            {title}
                        </h1>
                        {subtitle ? (
                            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">
                                {subtitle}
                            </p>
                        ) : null}
                    </div>

                    {right ? <div className="shrink-0">{right}</div> : null}
                </div>
            </div>
        </section>
    );
}
