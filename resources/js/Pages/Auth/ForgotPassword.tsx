import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

type ForgotPasswordProps = {
    status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot password" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>Forgot password?</h1>
                    <p>Enter your email address and we will send you a reset link.</p>
                    {status ? <div className="auth-status">{status}</div> : null}

                    <form onSubmit={submit} className="auth-form">
                        <label className="auth-field">
                            <span>Email</span>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email ? <small>{errors.email}</small> : null}
                        </label>

                        <button className="auth-button" type="submit" disabled={processing}>
                            {processing ? 'Sending...' : 'Email reset link'}
                        </button>
                    </form>

                    <div className="auth-links">
                        <Link href={route('login')}>Back to login</Link>
                    </div>
                </div>
            </main>
        </>
    );
}
