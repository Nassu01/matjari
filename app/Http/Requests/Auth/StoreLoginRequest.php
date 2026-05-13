<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class StoreLoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (! $this->filled('identifiant') && $this->filled('email')) {
            $this->merge(['identifiant' => $this->input('email')]);
        }

        if (! $this->filled('identifiant')) {
            return;
        }

        $identifiant = trim((string) $this->input('identifiant'));

        if (str_contains($identifiant, '@')) {
            $identifiant = mb_strtolower($identifiant);
        } else {
            $identifiant = $this->normalizePhone($identifiant);
        }

        $this->merge(['identifiant' => $identifiant]);
    }

    public function rules(): array
    {
        return [
            'identifiant' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'remember' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'identifiant.required' => 'L’email ou le téléphone est obligatoire.',
            'identifiant.string' => 'L’identifiant doit être une chaîne de caractères.',
            'identifiant.max' => 'L’identifiant ne peut pas dépasser 255 caractères.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'remember.boolean' => 'Le champ se souvenir de moi doit être vrai ou faux.',
        ];
    }

    public function attributes(): array
    {
        return [
            'identifiant' => 'email ou téléphone',
            'password' => 'mot de passe',
            'remember' => 'se souvenir de moi',
        ];
    }

    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $field = $this->credentialField();

        if ($field === 'phone' && preg_match('/^\+212\d{9}$/', (string) $this->input('identifiant')) !== 1) {
            throw ValidationException::withMessages([
                'identifiant' => 'Le téléphone doit être un numéro marocain valide au format +212XXXXXXXXX ou 06XXXXXXXX.',
            ]);
        }

        if (! Auth::attempt([$field => $this->input('identifiant'), 'password' => $this->input('password')], $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'identifiant' => 'Ces identifiants ne correspondent pas à nos enregistrements.',
            ]);
        }

        RateLimiter::clear($this->throttleKey());
    }

    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'identifiant' => 'Trop de tentatives de connexion. Veuillez réessayer dans '.$seconds.' secondes.',
        ]);
    }

    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower((string) $this->input('identifiant')).'|'.$this->ip());
    }

    public function credentialField(): string
    {
        return str_contains((string) $this->input('identifiant'), '@') ? 'email' : 'phone';
    }

    private function normalizePhone(string $phone): string
    {
        $phone = preg_replace('/\s+/', '', trim($phone)) ?? '';

        if (preg_match('/^06\d{8}$/', $phone) === 1) {
            return '+212'.substr($phone, 1);
        }

        return $phone;
    }
}
