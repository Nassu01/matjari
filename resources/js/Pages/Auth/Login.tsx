import type { FormEventHandler, ReactNode } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

type LoginProps = {
    canResetPassword: boolean;
    status?: string;
};

export default function Login({ canResetPassword, status }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login" />
            <AuthShell
                title="Login to your account"
                subtitle="Access your dashboard, orders, and profile."
            >
                {status ? <div className="auth-status">{status}</div> : null}

                <form onSubmit={submit} className="auth-form">
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

                    <label className="auth-checkbox">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span>Remember me</span>
                    </label>

                    <button className="auth-button" type="submit" disabled={processing}>
                        {processing ? 'Signing in...' : 'Login'}
                    </button>
                </form>

                <div className="auth-links">
                    {canResetPassword ? (
                        <Link href={route('password.request')}>Forgot password?</Link>
                    ) : null}
                    <Link href={route('register')}>Create an account</Link>
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
                <section className="auth-panel auth-panel--brand">
                    <Link href="/" className="auth-back auth-back--light">
                        Back to store
                    </Link>

                    <div className="auth-brand-copy">
                        <span className="auth-eyebrow">Matjari Access</span>
                        <h1>Welcome back to your curated shopping space.</h1>
                        <p>
                            Sign in to track orders, manage your profile, and keep your favorite
                            products close.
                        </p>
                    </div>

                    <div className="auth-feature-list">
                        <div className="auth-feature-card">
                            <strong>Fast checkout</strong>
                            <span>Saved details and smoother ordering flow.</span>
                        </div>
                        <div className="auth-feature-card">
                            <strong>Order visibility</strong>
                            <span>Follow purchases and account activity in one place.</span>
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
