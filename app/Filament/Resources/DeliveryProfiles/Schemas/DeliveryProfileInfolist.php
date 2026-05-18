<?php

namespace App\Filament\Resources\DeliveryProfiles\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DeliveryProfileInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Utilisateur')
                    ->schema([
                        TextEntry::make('user.first_name')->label('Prenom')->placeholder('-'),
                        TextEntry::make('user.last_name')->label('Nom')->placeholder('-'),
                        TextEntry::make('user.email')->label('Email')->placeholder('-'),
                        TextEntry::make('user.status')
                            ->label('Statut utilisateur')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state))
                            ->placeholder('-'),
                    ])
                    ->columns(2),
                Section::make('Profil livreur')
                    ->schema([
                        TextEntry::make('city')->label('Ville'),
                        TextEntry::make('delivery_zone')->label('Zone de livraison'),
                        TextEntry::make('vehicle_type')->label('Type de vehicule'),
                        TextEntry::make('cin')->label('CIN'),
                        TextEntry::make('status')
                            ->label('Statut profil')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state)),
                        TextEntry::make('created_at')->dateTime()->placeholder('-'),
                        TextEntry::make('updated_at')->dateTime()->placeholder('-'),
                    ])
                    ->columns(2),
            ]);
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
}
