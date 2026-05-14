import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';

import AccountPageLayout from './AccountPageLayout';

type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function Password() {
    const form = useForm<PasswordForm>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (event) => {
        event.preventDefault();

        form.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    return (
        <>
            <Head title="Changer le mot de passe" />
            <AccountPageLayout
                title="Changer le mot de passe"
                subtitle="Mettez à jour votre mot de passe pour sécuriser votre compte."
                eyebrow="Sécurité"
            >
                <article className="account-card">
                    {form.recentlySuccessful ? (
                        <div className="auth-status">Mot de passe mis à jour avec succès.</div>
                    ) : null}

                    <form className="auth-form account-password-form" onSubmit={submit}>
                        <label className="auth-field">
                            <span>Mot de passe actuel</span>
                            <input
                                type="password"
                                value={form.data.current_password}
                                onChange={(event) => form.setData('current_password', event.target.value)}
                                autoComplete="current-password"
                            />
                            {form.errors.current_password ? <small>{form.errors.current_password}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Nouveau mot de passe</span>
                            <input
                                type="password"
                                value={form.data.password}
                                onChange={(event) => form.setData('password', event.target.value)}
                                autoComplete="new-password"
                            />
                            {form.errors.password ? <small>{form.errors.password}</small> : null}
                        </label>

                        <label className="auth-field">
                            <span>Confirmer le nouveau mot de passe</span>
                            <input
                                type="password"
                                value={form.data.password_confirmation}
                                onChange={(event) => form.setData('password_confirmation', event.target.value)}
                                autoComplete="new-password"
                            />
                            {form.errors.password_confirmation ? <small>{form.errors.password_confirmation}</small> : null}
                        </label>

                        <button className="auth-button account-form-button" type="submit" disabled={form.processing}>
                            {form.processing ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
                        </button>
                    </form>
                </article>
            </AccountPageLayout>
        </>
    );
}
