<?php

namespace App\Filament\Resources\Users\Schemas;

use App\Models\Role;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Hash;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('first_name')
                    ->label('Prénom')
                    ->required()
                    ->maxLength(255),
                TextInput::make('last_name')
                    ->label('Nom')
                    ->required()
                    ->maxLength(255),
                TextInput::make('email')
                    ->label('Adresse email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('phone')
                    ->label('Téléphone')
                    ->tel()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                Select::make('role')
                    ->label('Rôle')
                    ->required()
                    ->options(fn () => Role::query()->where('is_active', true)->pluck('name', 'slug')->all())
                    ->default('client'),
                Select::make('status')
                    ->label('Statut')
                    ->required()
                    ->options([
                        'active' => 'active',
                        'pending' => 'pending',
                        'rejected' => 'rejected',
                    ])
                    ->default('pending'),
                TextInput::make('password')
                    ->label('Mot de passe')
                    ->password()
                    ->revealable()
                    ->required(fn (string $operation): bool => $operation === 'create')
                    ->dehydrated(fn (?string $state): bool => filled($state))
                    ->dehydrateStateUsing(fn (string $state): string => Hash::make($state)),
            ]);
    }
}
