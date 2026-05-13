import { Head, Link, useForm } from '@inertiajs/react';
import {
  IofrmAuthCard,
  IofrmAuthLayout,
  IofrmInput,
  IofrmSocialLinks,
} from '@/layouts/IofrmAuthLayout';

export default function Login({ status, canResetPassword, googleEnabled }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    identifiant: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <IofrmAuthLayout>
      <Head title="Login" />

      <IofrmAuthCard
        title={
          <>
            Welcome back to
            <br />
            your shopping account.
          </>
        }
        subtitle={
          <>
            Login to access your cart, orders,
            <br />
            and favorite products.
          </>
        }
      >

        {status ? (
          <div className="mb-4 text-center text-sm font-medium text-green-600">
            {status}
          </div>
        ) : null}

        <form onSubmit={submit}>
          <div className="space-y-4">
            <IofrmInput
              type="email"
              value={data.identifiant}
              onChange={(e) => setData('identifiant', e.target.value)}
              placeholder="E-mail Address"
              autoComplete="username"
              error={errors.identifiant}
            />

            <IofrmInput
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              error={errors.password}
            />
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm font-medium text-[#58463e]">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="h-4 w-4 rounded border-[#b8aaa5] text-[#58463e] focus:ring-[#58463e]"
            />
            Remember me
          </label>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={processing}
              className="h-12 rounded-md bg-[#58463e] text-base font-bold text-white transition hover:bg-[#44352f] disabled:opacity-60"
            >
              {processing ? 'Logging in...' : 'Login'}
            </button>

            <Link
              href={route('register')}
              className="flex h-12 items-center justify-center rounded-md border border-[#8f817c] bg-white text-base font-bold text-[#3b332f] transition hover:bg-gray-50"
            >
              Create account
            </Link>
          </div>

          {canResetPassword ? (
            <div className="mt-4 text-center">
              <Link
                href={route('password.request')}
                className="text-sm text-[#58463e] hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          ) : null}
        </form>

        <IofrmSocialLinks label="Or login with" googleEnabled={googleEnabled} />
      </IofrmAuthCard>
    </IofrmAuthLayout>
  );
}
