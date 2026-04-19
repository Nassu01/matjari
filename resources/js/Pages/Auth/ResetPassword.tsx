import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';

type ResetPasswordProps = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset password" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>Reset password</h1>
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

                        <label className="auth-field">
                            <span>Password</span>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password ? <small>{errors.password}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Confirm password</span>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData('password_confirmation', e.target.value)
                                }
                            />
                        </label>

                        <button className="auth-button" type="submit" disabled={processing}>
                            {processing ? 'Resetting...' : 'Reset password'}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
