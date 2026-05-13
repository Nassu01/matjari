import { FormEventHandler } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { IofrmAuthCard, IofrmAuthLayout, IofrmInput } from '@/layouts/IofrmAuthLayout';

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
        <IofrmAuthLayout>
            <Head title="Confirm password" />

            <IofrmAuthCard
                title="Confirm your password"
                subtitle="For your security, please confirm your password before continuing."
            >
                <form onSubmit={submit}>
                    <IofrmInput
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Password"
                        autoComplete="current-password"
                        error={errors.password}
                    />

                    <button
                        className="mt-5 h-12 w-full rounded-md bg-[#58463e] text-base font-bold text-white transition hover:bg-[#44352f] disabled:opacity-60"
                        type="submit"
                        disabled={processing}
                    >
                        {processing ? 'Confirming...' : 'Confirm'}
                    </button>
                </form>
            </IofrmAuthCard>
        </IofrmAuthLayout>
    );
}
