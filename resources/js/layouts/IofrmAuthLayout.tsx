import type { InputHTMLAttributes, ReactNode } from 'react';

type IofrmAuthLayoutProps = {
    children: ReactNode;
};

type IofrmAuthCardProps = {
    children: ReactNode;
    title: ReactNode;
    subtitle: ReactNode;
    compact?: boolean;
};

type IofrmInputProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export function IofrmAuthLayout({ children }: IofrmAuthLayoutProps) {
    return (
        <main className="min-h-screen bg-[#dc986f] text-[#3d332f] lg:grid lg:grid-cols-[45%_55%]">
            <section className="hidden min-h-screen items-center justify-center bg-white px-10 lg:flex">
                <img
                    src="/images/graphic10.svg"
                    alt="Authentication illustration"
                    className="w-full max-w-xl"
                />
            </section>

            <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
                {children}
            </section>
        </main>
    );
}

export function IofrmAuthCard({
    children,
    title,
    subtitle,
    compact = false,
}: IofrmAuthCardProps) {
    return (
        <div
            className={`w-full max-w-[525px] rounded-[10px] bg-white px-7 shadow-[0_20px_60px_rgba(62,45,35,0.16)] sm:px-11 ${
                compact ? 'py-9' : 'py-12'
            }`}
        >
            <a href="/" className="mx-auto mb-8 flex w-fit items-center gap-3" aria-label="Go to Matjari home">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-[#a8a19d] text-sm font-bold text-[#3d332f]">
                    M
                </span>
                <span className="text-3xl font-bold tracking-normal text-[#252525]">Matjari</span>
            </a>

            <div className="mb-8 text-center">
                <h1 className="text-[28px] font-bold leading-tight text-[#3b332f] sm:text-[30px]">
                    {title}
                </h1>
                <p className="mx-auto mt-4 max-w-[390px] text-base leading-6 text-[#6b5550] sm:text-lg">
                    {subtitle}
                </p>
            </div>

            {children}
        </div>
    );
}

export function IofrmInput({ error, className = '', ...props }: IofrmInputProps) {
    return (
        <div>
            <input
                {...props}
                className={`h-14 w-full rounded-xl border bg-white px-6 text-base text-[#5b4a45] outline-none transition placeholder:text-[#7b6b66] focus:ring-0 ${
                    error
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#b8aaa5] focus:border-[#58463e]'
                } ${className}`}
            />
            {error ? <p className="mt-2 text-sm font-medium text-red-600">{error}</p> : null}
        </div>
    );
}

export function IofrmSocialLinks({
    label,
    googleEnabled = false,
}: {
    label: string;
    googleEnabled?: boolean;
}) {
    return (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <span className="text-base text-[#3b332f]">{label}</span>

            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#36549d] text-lg font-bold text-white transition hover:brightness-95"
                aria-label="Continue with Facebook"
            >
                f
            </button>

            {googleEnabled ? (
                <a
                    href={route('auth.google.redirect')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dd4c3b] text-lg font-bold text-white transition hover:brightness-95"
                    aria-label="Continue with Google"
                >
                    G
                </a>
            ) : (
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dd4c3b] text-lg font-bold text-white transition hover:brightness-95"
                    aria-label="Continue with Google"
                >
                    G
                </button>
            )}

            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0b79a8] text-sm font-bold text-white transition hover:brightness-95"
                aria-label="Continue with LinkedIn"
            >
                in
            </button>
        </div>
    );
}
