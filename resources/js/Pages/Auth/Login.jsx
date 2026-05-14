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
      <Head title="Connexion" />

      <IofrmAuthCard
        title="Bienvenue dans votre compte MATJARI"
        subtitle="Connectez-vous pour accéder à votre panier, vos commandes et vos favoris."
      >

        {status ? (
          <div className="mb-4 text-center text-sm font-semibold text-green-700">
            {status}
          </div>
        ) : null}

        <form onSubmit={submit}>
          <div className="space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#202526]">
                Email
              </span>
              <IofrmInput
                type="email"
                value={data.identifiant}
                onChange={(e) => setData('identifiant', e.target.value)}
                placeholder="Email"
                autoComplete="username"
                error={errors.identifiant}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#202526]">
                Mot de passe
              </span>
              <IofrmInput
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                placeholder="Mot de passe"
                autoComplete="current-password"
                error={errors.password}
              />
            </label>
          </div>

          <label className="mt-4 flex items-center gap-3 text-sm font-medium text-[#202526]">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="h-4 w-4 rounded border-black/25 text-black focus:ring-[#b91f2c]"
            />
            Se souvenir de moi
          </label>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="submit"
              disabled={processing}
              className="h-12 rounded-md bg-black text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 hover:text-white disabled:opacity-60"
            >
              {processing ? 'Connexion...' : 'Se connecter'}
            </button>

            <Link
              href={route('register')}
              className="flex h-12 items-center justify-center rounded-md border border-black/20 bg-white text-base font-bold text-[#202526] transition hover:-translate-y-0.5 hover:border-[#b91f2c] hover:bg-white hover:text-[#b91f2c]"
            >
              Créer un compte
            </Link>
          </div>

          {canResetPassword ? (
            <div className="mt-4 text-center">
              <Link
                href={route('password.request')}
                className="text-sm font-medium text-[#202526] transition hover:text-[#b91f2c] hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          ) : null}

          <div className="mt-3 text-center">
            <Link
              href="/"
              className="text-sm font-medium text-[#687074] transition hover:text-[#b91f2c] hover:underline"
            >
              Retour à la boutique
            </Link>
          </div>
        </form>

        <IofrmSocialLinks label="Ou connectez-vous avec" googleEnabled={googleEnabled} />
      </IofrmAuthCard>
    </IofrmAuthLayout>
  );
}
