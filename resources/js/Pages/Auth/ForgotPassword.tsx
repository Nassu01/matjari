import type { FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { IofrmAuthCard, IofrmAuthLayout, IofrmInput } from '@/layouts/IofrmAuthLayout';

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
        <IofrmAuthLayout>
            <Head title="Mot de passe oublie" />

            <IofrmAuthCard
                title="Forgot your password?"
                subtitle="Enter your email address and we will send you a secure reset link."
            >
                {status ? (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700">
                        {status}
                    </div>
                ) : null}

                <form onSubmit={submit}>
                    <IofrmInput
                        type="email"
                        value={data.email}
                        placeholder="E-mail Address"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                    />

                    <button
                        className="mt-5 h-12 w-full rounded-md bg-black text-base font-bold text-white transition hover:bg-gray-800 hover:text-white disabled:opacity-60"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Sending...' : 'Send reset link'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm font-semibold">
                    <Link className="text-[#202526] transition hover:text-[#b91f2c] hover:underline" href={route('login')}>
                        Back to login
                    </Link>
                </div>
            </IofrmAuthCard>
        </IofrmAuthLayout>
    );
}
