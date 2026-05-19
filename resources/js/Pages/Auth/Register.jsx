import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
  IofrmAuthCard,
  IofrmAuthLayout,
  IofrmInput,
  IofrmSocialLinks,
} from '@/layouts/IofrmAuthLayout';

export default function Register({ googleEnabled }) {
  const [step, setStep] = useState(1);

  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
    role: 'client',
    // company fields
    company_name: '',
    company_type: '',
    ice: '',
    patente: '',
    company_address: '',
    city: '',
    company_phone: '',
    main_category: '',
    company_logo: null,
    // delivery fields
    delivery_zone: '',
    vehicle_type: '',
    cin: '',
  });

  const next = () => setStep((s) => (data.role === 'client' && s === 2 ? 4 : Math.min(4, s + 1)));
  const back = () => setStep((s) => (data.role === 'client' && s === 4 ? 2 : Math.max(1, s - 1)));
  const selectRole = (role) => {
    setData('role', role);
    setStep(role === 'client' ? 4 : 3);
  };

  const validationErrors = Object.values(errors).filter(Boolean);

  const submit = (e) => {
    e.preventDefault();

    post(route('register'), {
      forceFormData: true,
      onFinish: () => reset('password', 'password_confirmation', 'company_logo'),
    });
  };

  return (
    <IofrmAuthLayout>
      <Head title="Register" />

      <IofrmAuthCard
        compact
        title={<>{step === 1 ? 'Create your account' : 'Register'}</>}
        subtitle={<>Join Matjari and start selling or shopping.</>}
      >
        <form onSubmit={submit} encType="multipart/form-data">
          {validationErrors.length > 0 && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <p className="font-bold">Veuillez corriger les champs indiqués.</p>
              {errors.register && <p className="mt-1">{errors.register}</p>}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <IofrmInput
                type="text"
                value={data.first_name}
                onChange={(e) => setData('first_name', e.target.value)}
                placeholder="First name"
                autoComplete="given-name"
                error={errors.first_name}
              />

              <IofrmInput
                type="text"
                value={data.last_name}
                onChange={(e) => setData('last_name', e.target.value)}
                placeholder="Last name"
                autoComplete="family-name"
                error={errors.last_name}
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
                type="text"
                value={data.phone}
                onChange={(e) => setData('phone', e.target.value)}
                placeholder="Phone"
                autoComplete="tel"
                error={errors.phone}
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
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => selectRole('client')}
                  className={`h-24 rounded-md p-4 text-left border ${data.role === 'client' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}
                >
                  <div className="text-lg font-bold">Client</div>
                  <div className="text-sm">Shop and place orders</div>
                </button>

                <button
                  type="button"
                  onClick={() => selectRole('commercant')}
                  className={`h-24 rounded-md p-4 text-left border ${data.role === 'commercant' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}
                >
                  <div className="text-lg font-bold">Commerçant</div>
                  <div className="text-sm">Sell products on Matjari</div>
                </button>

                <button
                  type="button"
                  onClick={() => selectRole('livreur')}
                  className={`h-24 rounded-md p-4 text-left border ${data.role === 'livreur' ? 'border-black bg-black text-white' : 'border-gray-200 bg-white'}`}
                >
                  <div className="text-lg font-bold">Livreur</div>
                  <div className="text-sm">Deliver orders</div>
                </button>
              </div>
              {errors.role && <p className="text-red-600 text-sm">{errors.role}</p>}
            </div>
          )}

          {step === 3 && data.role === 'commercant' && (
            <div className="space-y-4">
              <IofrmInput
                type="text"
                value={data.company_name}
                onChange={(e) => setData('company_name', e.target.value)}
                placeholder="Company name"
                error={errors.company_name}
              />

              <IofrmInput
                type="text"
                value={data.company_type}
                onChange={(e) => setData('company_type', e.target.value)}
                placeholder="Company type"
                error={errors.company_type}
              />

              <IofrmInput
                type="text"
                value={data.ice}
                onChange={(e) => setData('ice', e.target.value)}
                placeholder="ICE"
                error={errors.ice}
              />

              <IofrmInput
                type="text"
                value={data.patente}
                onChange={(e) => setData('patente', e.target.value)}
                placeholder="Patente"
                error={errors.patente}
              />

              <IofrmInput
                type="text"
                value={data.company_address}
                onChange={(e) => setData('company_address', e.target.value)}
                placeholder="Company address"
                error={errors.company_address}
              />

              <IofrmInput
                type="text"
                value={data.city}
                onChange={(e) => setData('city', e.target.value)}
                placeholder="City"
                error={errors.city}
              />

              <IofrmInput
                type="text"
                value={data.company_phone}
                onChange={(e) => setData('company_phone', e.target.value)}
                placeholder="Company phone"
                error={errors.company_phone}
              />

              <IofrmInput
                type="text"
                value={data.main_category}
                onChange={(e) => setData('main_category', e.target.value)}
                placeholder="Main category"
                error={errors.main_category}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700">Company logo (optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData('company_logo', e.target.files?.[0] ?? null)}
                  className="mt-1 block w-full"
                />
                {errors.company_logo && <p className="text-red-600 text-sm">{errors.company_logo}</p>}
              </div>
            </div>
          )}

          {step === 3 && data.role === 'livreur' && (
            <div className="space-y-4">
              <IofrmInput
                type="text"
                value={data.city}
                onChange={(e) => setData('city', e.target.value)}
                placeholder="City"
                error={errors.city}
              />

              <IofrmInput
                type="text"
                value={data.delivery_zone}
                onChange={(e) => setData('delivery_zone', e.target.value)}
                placeholder="Delivery zone"
                error={errors.delivery_zone}
              />

              <IofrmInput
                type="text"
                value={data.vehicle_type}
                onChange={(e) => setData('vehicle_type', e.target.value)}
                placeholder="Vehicle type"
                error={errors.vehicle_type}
              />

              <IofrmInput
                type="text"
                value={data.cin}
                onChange={(e) => setData('cin', e.target.value)}
                placeholder="CIN"
                error={errors.cin}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm">Please review your information and submit.</p>
              <dl className="grid grid-cols-1 gap-2 text-sm">
                <div>
                  <dt className="font-bold">Name</dt>
                  <dd>{data.first_name} {data.last_name}</dd>
                </div>
                <div>
                  <dt className="font-bold">Email</dt>
                  <dd>{data.email}</dd>
                </div>
                <div>
                  <dt className="font-bold">Role</dt>
                  <dd>{data.role}</dd>
                </div>
              </dl>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              className="h-12 rounded-md border bg-white text-base font-bold text-[#202526]"
            >
              Back
            </button>

            {step < 4 && (
              <button
                type="button"
                onClick={next}
                className="h-12 rounded-md bg-white border text-base font-bold text-[#202526]"
              >
                Next
              </button>
            )}

            {step === 4 && (
              <button
                type="submit"
                disabled={processing}
                className="h-12 rounded-md bg-black text-base font-bold text-white"
              >
                {processing ? 'Creating...' : 'Create account'}
              </button>
            )}

            <Link
              href={route('login')}
              className="flex h-12 items-center justify-center rounded-md border border-black/15 bg-white text-base font-bold text-[#202526]"
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
