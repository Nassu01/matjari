<?php

namespace App\Filament\Resources\DeliveryProfiles\Schemas;

use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DeliveryProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Utilisateur livreur')
                    ->options(fn () => User::query()
                        ->where('role', 'livreur')
                        ->orderBy('email')
                        ->pluck('email', 'id')
                        ->all())
                    ->searchable()
                    ->required(),
                TextInput::make('city')
                    ->label('Ville')
                    ->required()
                    ->maxLength(255),
                TextInput::make('delivery_zone')
                    ->label('Zone de livraison')
                    ->required()
                    ->maxLength(255),
                TextInput::make('vehicle_type')
                    ->label('Type de vehicule')
                    ->required()
                    ->maxLength(255),
                TextInput::make('cin')
                    ->label('CIN')
                    ->required()
                    ->maxLength(255),
                Select::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'pending',
                        'active' => 'active',
                        'rejected' => 'rejected',
                    ])
                    ->required()
                    ->default('pending'),
            ]);
    }
}
