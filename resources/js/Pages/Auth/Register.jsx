import { Head, Link, useForm } from '@inertiajs/react';
import {
  IofrmAuthCard,
  IofrmAuthLayout,
  IofrmInput,
  IofrmSocialLinks,
} from '@/layouts/IofrmAuthLayout';

export default function Register({ googleEnabled }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <IofrmAuthLayout>
      <Head title="Register" />

      <IofrmAuthCard
        compact
        title={
          <>
            Create your account
            <br />
            and start shopping.
          </>
        }
        subtitle={
          <>
            Join Matjari and discover
            <br />
            beauty and lifestyle products.
          </>
        }
      >

        <form onSubmit={submit}>
          <div className="space-y-4">
            <IofrmInput
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              placeholder="Full Name"
              autoComplete="name"
              error={errors.name}
            />

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

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={processing}
              className="h-12 rounded-md bg-black text-base font-bold text-white transition hover:bg-gray-800 hover:text-white disabled:opacity-60"
            >
              {processing ? 'Creating...' : 'Create account'}
            </button>

            <Link
              href={route('login')}
              className="flex h-12 items-center justify-center rounded-md border border-black/15 bg-white text-base font-bold text-[#202526] transition hover:border-[#b91f2c] hover:bg-white hover:text-[#b91f2c]"
            >
              Login
            </Link>
          </div>
        </form>

        <IofrmSocialLinks label="Or register with" googleEnabled={googleEnabled} />
      </IofrmAuthCard>
    </IofrmAuthLayout>
  );
}
