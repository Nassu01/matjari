<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class StoreRegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->filled('email')) {
            $this->merge([
                'email' => mb_strtolower(trim((string) $this->input('email'))),
            ]);
        }
    }

    public function rules(): array
    {
        $rules = [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class, 'email'),
            ],
            'phone' => ['required', 'string', 'max:50'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', Rule::in(['client', 'commercant', 'livreur'])],
        ];

        if ($this->input('role') === 'commercant') {
            $rules = array_merge($rules, [
                'company_name' => ['required', 'string', 'max:255'],
                'company_type' => ['required', 'string', 'max:255'],
                'ice' => ['required', 'string', 'max:255'],
                'patente' => ['required', 'string', 'max:255'],
                'company_address' => ['required', 'string'],
                'city' => ['required', 'string', 'max:255'],
                'company_phone' => ['required', 'string', 'max:50'],
                'main_category' => ['required', 'string', 'max:255'],
                'company_logo' => ['nullable', 'image'],
            ]);
        }

        if ($this->input('role') === 'livreur') {
            $rules = array_merge($rules, [
                'city' => ['required', 'string', 'max:255'],
                'delivery_zone' => ['required', 'string', 'max:255'],
                'vehicle_type' => ['required', 'string', 'max:255'],
                'cin' => ['required', 'string', 'max:255'],
            ]);
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Le prénom est obligatoire.',
            'last_name.required' => 'Le nom est obligatoire.',
            'email.required' => 'L adresse email est obligatoire.',
            'email.email' => 'L adresse email doit etre valide.',
            'email.lowercase' => 'L adresse email doit etre en minuscules.',
            'email.max' => 'L adresse email ne peut pas depasser 255 caracteres.',
            'email.unique' => 'Cette adresse email est deja utilisee.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'role.required' => "Le type de compte est obligatoire.",
            'role.in' => "Le type de compte selectionne n'est pas valide.",
            'company_name.required' => 'Le nom de la société est obligatoire.',
            'company_type.required' => "Le type d'entreprise est obligatoire.",
            'ice.required' => "L'ICE est obligatoire.",
            'patente.required' => 'La patente est obligatoire.',
            'company_address.required' => "L'adresse de l'entreprise est obligatoire.",
            'company_phone.required' => 'Le téléphone de l entreprise est obligatoire.',
            'main_category.required' => "La catégorie principale est requise.",
            'city.required' => "La ville est requise.",
            'delivery_zone.required' => "La zone de livraison est requise.",
            'vehicle_type.required' => "Le type de véhicule est requis.",
            'cin.required' => "Le numéro de carte d'identité est requis.",
        ];
    }

    public function attributes(): array
    {
        return [
            'first_name' => 'prénom',
            'last_name' => 'nom',
            'email' => 'adresse email',
            'phone' => 'téléphone',
            'password' => 'mot de passe',
        ];
    }
}
