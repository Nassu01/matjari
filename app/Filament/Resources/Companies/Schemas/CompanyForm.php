<?php

namespace App\Filament\Resources\Companies\Schemas;

use App\Models\User;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CompanyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->label('Utilisateur commercant')
                    ->options(fn () => User::query()
                        ->where('role', 'commercant')
                        ->orderBy('email')
                        ->pluck('email', 'id')
                        ->all())
                    ->searchable()
                    ->required(),
                TextInput::make('company_name')
                    ->label('Nom de la societe')
                    ->required()
                    ->maxLength(255),
                TextInput::make('company_type')
                    ->label('Type de societe')
                    ->required()
                    ->maxLength(255),
                TextInput::make('ice')
                    ->label('ICE')
                    ->maxLength(255),
                TextInput::make('patente')
                    ->label('Patente')
                    ->maxLength(255),
                Textarea::make('company_address')
                    ->label('Adresse')
                    ->columnSpanFull(),
                TextInput::make('city')
                    ->label('Ville')
                    ->maxLength(255),
                TextInput::make('company_phone')
                    ->label('Telephone societe')
                    ->tel()
                    ->maxLength(255),
                TextInput::make('main_category')
                    ->label('Categorie principale')
                    ->maxLength(255),
                TextInput::make('company_logo')
                    ->label('Logo')
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
