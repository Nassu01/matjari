<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StoreRegisterRequest;
use App\Models\User;
use App\Models\Company;
use App\Models\DeliveryProfile;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class RegisterController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'googleEnabled' => $this->googleEnabled(),
        ]);
    }

    public function store(StoreRegisterRequest $request): RedirectResponse
    {
        $role = $request->input('role');

        try {
            $user = DB::transaction(function () use ($request, $role): User {
                $user = User::create([
                    'name' => trim($request->string('first_name')->toString() . ' ' . $request->string('last_name')->toString()),
                    'first_name' => $request->string('first_name')->toString(),
                    'last_name' => $request->string('last_name')->toString(),
                    'email' => $request->string('email')->toString(),
                    'phone' => $request->string('phone')->toString(),
                    'password' => Hash::make($request->string('password')->toString()),
                    'role' => $role,
                    'status' => $role === 'client' ? 'active' : 'pending',
                ]);

                if ($role === 'commercant') {
                    $logoPath = null;
                    if ($request->hasFile('company_logo')) {
                        $logoPath = $request->file('company_logo')->store('company_logos', 'public');
                    }

                    Company::create([
                        'user_id' => $user->id,
                        'company_name' => $request->string('company_name')->toString(),
                        'company_type' => $request->string('company_type')->toString(),
                        'ice' => $request->string('ice')->toString(),
                        'patente' => $request->string('patente')->toString(),
                        'company_address' => $request->string('company_address')->toString(),
                        'city' => $request->string('city')->toString(),
                        'company_phone' => $request->string('company_phone')->toString(),
                        'main_category' => $request->string('main_category')->toString(),
                        'company_logo' => $logoPath,
                        'status' => 'pending',
                    ]);
                }

                if ($role === 'livreur') {
                    DeliveryProfile::create([
                        'user_id' => $user->id,
                        'city' => $request->string('city')->toString(),
                        'delivery_zone' => $request->string('delivery_zone')->toString(),
                        'vehicle_type' => $request->string('vehicle_type')->toString(),
                        'cin' => $request->string('cin')->toString(),
                        'status' => 'pending',
                    ]);
                }

                return $user;
            });
        } catch (Throwable $exception) {
            report($exception);

            return back()
                ->withErrors(['register' => 'Impossible de créer le compte pour le moment. Veuillez réessayer.'])
                ->withInput($request->except('password', 'password_confirmation', 'company_logo'));
        }

        event(new Registered($user));

        Auth::login($user);
        $request->session()->regenerate();

        $message = match ($role) {
            'client' => 'Compte créé avec succès.',
            'commercant' => 'Compte commerçant créé avec succès. Votre compte est en attente de validation par l’administrateur.',
            'livreur' => 'Compte livreur créé avec succès. Votre compte est en attente de validation par l’administrateur.',
        };

        if ($role === 'client') {
            return redirect(route('dashboard', absolute: false))->with('success', $message);
        }

        if ($role === 'commercant') {
            return redirect('/merchant/pending')->with('success', $message);
        }

        return redirect('/delivery/pending')->with('success', $message);
    }

    private function googleEnabled(): bool
    {
        return filled(config('services.google.client_id')) && filled(config('services.google.client_secret'));
    }
}
