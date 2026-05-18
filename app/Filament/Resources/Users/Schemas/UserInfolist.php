<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class UserInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Utilisateur')
                    ->schema([
                        TextEntry::make('id')->label('ID'),
                        TextEntry::make('first_name')->label('Prenom')->placeholder('-'),
                        TextEntry::make('last_name')->label('Nom')->placeholder('-'),
                        TextEntry::make('email')->label('Adresse email'),
                        TextEntry::make('phone')->label('Telephone')->placeholder('-'),
                        TextEntry::make('role')
                            ->label('Role')
                            ->badge()
                            ->color(fn (?string $state): string => static::roleColor($state)),
                        TextEntry::make('status')
                            ->label('Statut')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state)),
                        TextEntry::make('email_verified_at')
                            ->label('Email verifie le')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('phone_verified_at')
                            ->label('Telephone verifie le')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('created_at')
                            ->label('Cree le')
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('updated_at')
                            ->label('Mis a jour le')
                            ->dateTime()
                            ->placeholder('-'),
                    ])
                    ->columns(2),

                Section::make('Societe commercant')
                    ->visible(fn ($record): bool => $record?->role === 'commercant')
                    ->schema([
                        TextEntry::make('company.company_name')->label('Nom de la societe')->placeholder('-'),
                        TextEntry::make('company.company_type')->label('Type de societe')->placeholder('-'),
                        TextEntry::make('company.ice')->label('ICE')->placeholder('-'),
                        TextEntry::make('company.patente')->label('Patente')->placeholder('-'),
                        TextEntry::make('company.company_address')->label('Adresse')->placeholder('-')->columnSpanFull(),
                        TextEntry::make('company.city')->label('Ville')->placeholder('-'),
                        TextEntry::make('company.company_phone')->label('Telephone societe')->placeholder('-'),
                        TextEntry::make('company.main_category')->label('Categorie principale')->placeholder('-'),
                        TextEntry::make('company.status')
                            ->label('Statut societe')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state))
                            ->placeholder('-'),
                        ImageEntry::make('company.company_logo')
                            ->label('Logo')
                            ->getStateUsing(fn ($record) => static::imageUrl($record->company?->company_logo))
                            ->placeholder('-'),
                    ])
                    ->columns(2),

                Section::make('Profil livreur')
                    ->visible(fn ($record): bool => $record?->role === 'livreur')
                    ->schema([
                        TextEntry::make('deliveryProfile.city')->label('Ville')->placeholder('-'),
                        TextEntry::make('deliveryProfile.delivery_zone')->label('Zone de livraison')->placeholder('-'),
                        TextEntry::make('deliveryProfile.vehicle_type')->label('Type de vehicule')->placeholder('-'),
                        TextEntry::make('deliveryProfile.cin')->label('CIN')->placeholder('-'),
                        TextEntry::make('deliveryProfile.status')
                            ->label('Statut profil')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state))
                            ->placeholder('-'),
                    ])
                    ->columns(2),
            ]);
    }

    private static function roleColor(?string $state): string
    {
        return match ($state) {
            'client' => 'info',
            'commercant' => 'warning',
            'livreur' => 'success',
            'admin' => 'danger',
            default => 'gray',
        };
    }

    private static function statusColor(?string $state): string
    {
        return match ($state) {
            'active' => 'success',
            'pending' => 'warning',
            'rejected' => 'danger',
            default => 'gray',
        };
    }

    private static function imageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/storage/') || str_starts_with($path, '/images/')) {
            return $path;
        }

        return str_starts_with($path, 'storage/') || str_starts_with($path, 'images/')
            ? '/'.$path
            : '/storage/'.$path;
    }
}
