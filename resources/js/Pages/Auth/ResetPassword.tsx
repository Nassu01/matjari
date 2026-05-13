import { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { IofrmAuthCard, IofrmAuthLayout, IofrmInput } from '@/layouts/IofrmAuthLayout';

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
        <IofrmAuthLayout>
            <Head title="Reset password" />

            <IofrmAuthCard
                title="Create a new password"
                subtitle="Choose a strong password to keep your Matjari account secure."
            >
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <IofrmInput
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="E-mail Address"
                            autoComplete="username"
                            error={errors.email}
                        />

                        <IofrmInput
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            autoComplete="new-password"
                            error={errors.password}
                        />

                        <IofrmInput
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm Password"
                            autoComplete="new-password"
                            error={errors.password_confirmation}
                        />
                    </div>

                    <button
                        className="mt-5 h-12 w-full rounded-md bg-[#58463e] text-base font-bold text-white transition hover:bg-[#44352f] disabled:opacity-60"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Resetting...' : 'Reset password'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm font-semibold">
                    <Link className="text-[#58463e] hover:underline" href={route('login')}>
                        Back to login
                    </Link>
                </div>
            </IofrmAuthCard>
        </IofrmAuthLayout>
    );
}
