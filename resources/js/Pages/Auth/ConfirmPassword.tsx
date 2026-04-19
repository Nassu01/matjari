import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirm password" />
            <main className="auth-page">
                <div className="auth-card">
                    <h1>Confirm password</h1>
                    <p>Please confirm your password before continuing.</p>

                    <form onSubmit={submit} className="auth-form">
                        <label className="auth-field">
                            <span>Password</span>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password ? <small>{errors.password}</small> : null}
                        </label>

                        <button className="auth-button" type="submit" disabled={processing}>
                            {processing ? 'Confirming...' : 'Confirm'}
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
}
