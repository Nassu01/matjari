import type { FormEventHandler, ReactNode } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <AuthShell
                title="Create your account"
                subtitle="Register, verify your email, and unlock your dashboard."
            >
                <form onSubmit={submit} className="auth-form">
                    <AuthField
                        label="Name"
                        type="text"
                        value={data.name}
                        onChange={(value) => setData('name', value)}
                        error={errors.name}
                    />
                    <AuthField
                        label="Email"
                        type="email"
                        value={data.email}
                        onChange={(value) => setData('email', value)}
                        error={errors.email}
                    />
                    <AuthField
                        label="Password"
                        type="password"
                        value={data.password}
                        onChange={(value) => setData('password', value)}
                        error={errors.password}
                    />
                    <AuthField
                        label="Confirm password"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(value) => setData('password_confirmation', value)}
                        error={errors.password_confirmation}
                    />

                    <button className="auth-button" type="submit" disabled={processing}>
                        {processing ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link href={route('login')}>Already have an account?</Link>
                </div>
            </AuthShell>
        </>
    );
}

type ShellProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
};

function AuthShell({ title, subtitle, children }: ShellProps) {
    return (
        <main className="auth-page">
            <div className="auth-shell">
                <section className="auth-panel auth-panel--brand auth-panel--brand-alt">
                    <Link href="/" className="auth-back auth-back--light">
                        Back to store
                    </Link>

                    <div className="auth-brand-copy">
                        <span className="auth-eyebrow">Create Account</span>
                        <h1>Join Matjari and unlock a smarter storefront experience.</h1>
                        <p>
                            Register once, verify your email, and manage orders, favorites, and
                            account details with ease.
                        </p>
                    </div>

                    <div className="auth-feature-list">
                        <div className="auth-feature-card">
                            <strong>Email verification</strong>
                            <span>Protect your account and enable secured access.</span>
                        </div>
                        <div className="auth-feature-card">
                            <strong>Personal dashboard</strong>
                            <span>Access profile settings and future order history.</span>
                        </div>
                    </div>
                </section>

                <section className="auth-panel auth-panel--form">
                    <Link href="/" className="auth-back">
                        Back to store
                    </Link>
                    <h2>{title}</h2>
                    <p>{subtitle}</p>
                    {children}
                </section>
            </div>
        </main>
    );
}

type FieldProps = {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
};

function AuthField({ label, type, value, onChange, error }: FieldProps) {
    return (
        <label className="auth-field">
            <span>{label}</span>
            <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
            {error ? <small>{error}</small> : null}
        </label>
    );
}
