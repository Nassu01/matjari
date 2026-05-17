import { Link } from '@inertiajs/react';
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
        <main className="min-h-screen bg-[#eee4dc] text-[#202526] lg:grid lg:grid-cols-[45%_55%]">
            <section className="hidden min-h-screen items-center justify-center bg-white px-10 lg:flex">
                <img
                    src="/images/graphic10.svg"
                    alt="Authentication illustration"
                    className="w-full max-w-xl"
                />
            </section>

            <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8">
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
            className={`w-full max-w-[525px] rounded-[10px] border border-black/10 bg-white px-7 shadow-[0_24px_70px_rgba(32,37,38,0.10)] sm:px-11 ${
                compact ? 'py-9' : 'py-12'
            }`}
        >
            <Link href="/" className="mx-auto mb-5 flex w-fit items-center justify-center" aria-label="Go to Matjari home">
                <img
                    src="/images/Fichier%20logomatjari.PNG"
                    alt="MATJARI"
                    className="h-14 w-auto object-contain"
                    onError={(event) => {
                        event.currentTarget.src = '/images/logomatjari.png';
                    }}
                />
            </Link>

            <div className="mb-8 text-center">
                <h1 className="font-serif text-[30px] font-semibold leading-tight text-[#202526] sm:text-[34px]">
                    {title}
                </h1>
                <p className="mx-auto mt-3 max-w-[410px] text-base leading-7 text-[#687074]">
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
                className={`h-14 w-full rounded-lg border bg-[#fffdfb] px-5 text-base text-[#202526] outline-none transition placeholder:text-[#687074]/70 focus:ring-0 ${
                    error
                        ? 'border-[#b91f2c] focus:border-[#b91f2c]'
                        : 'border-black/15 focus:border-[#202526]'
                } ${className}`}
            />
            {error ? <p className="mt-2 text-sm font-semibold text-[#b91f2c]">{error}</p> : null}
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
            <span className="text-base text-[#687074]">{label}</span>

            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#202526] text-lg font-bold text-white transition hover:bg-[#b91f2c]"
                aria-label="Continue with Facebook"
            >
                f
            </button>

            {googleEnabled ? (
                <a
                    href={route('auth.google.redirect')}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b91f2c] text-lg font-bold text-white transition hover:bg-[#202526]"
                    aria-label="Continue with Google"
                >
                    G
                </a>
            ) : (
                <button
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#b91f2c] text-lg font-bold text-white transition hover:bg-[#202526]"
                    aria-label="Continue with Google"
                >
                    G
                </button>
            )}

            <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#202526] text-sm font-bold text-white transition hover:bg-[#b91f2c]"
                aria-label="Continue with LinkedIn"
            >
                in
            </button>
        </div>
    );
}
