import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

type VerifyEmailProps = {
    status?: string;
};

export default function VerifyEmail({ status }: VerifyEmailProps) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verify email" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>Verify your email</h1>
                    <p>
                        Thanks for signing up. Please check your inbox and click the verification
                        link before continuing.
                    </p>

                    {status === 'verification-link-sent' ? (
                        <div className="auth-status">
                            A new verification email has been sent to your address.
                        </div>
                    ) : null}

                    <form onSubmit={submit} className="auth-form">
                        <button className="auth-button" type="submit" disabled={processing}>
                            {processing ? 'Sending...' : 'Resend verification email'}
                        </button>
                    </form>

                    <div className="auth-links">
                        <Link href={route('logout')} method="post" as="button">
                            Log out
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
