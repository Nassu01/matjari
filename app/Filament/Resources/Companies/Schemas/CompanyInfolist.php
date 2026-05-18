<?php

namespace App\Filament\Resources\Companies\Schemas;

use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class CompanyInfolist
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
                Section::make('Societe')
                    ->schema([
                        TextEntry::make('company_name')->label('Nom de la societe'),
                        TextEntry::make('company_type')->label('Type de societe'),
                        TextEntry::make('ice')->label('ICE')->placeholder('-'),
                        TextEntry::make('patente')->label('Patente')->placeholder('-'),
                        TextEntry::make('company_address')->label('Adresse')->placeholder('-')->columnSpanFull(),
                        TextEntry::make('city')->label('Ville')->placeholder('-'),
                        TextEntry::make('company_phone')->label('Telephone societe')->placeholder('-'),
                        TextEntry::make('main_category')->label('Categorie principale')->placeholder('-'),
                        TextEntry::make('status')
                            ->label('Statut societe')
                            ->badge()
                            ->color(fn (?string $state): string => static::statusColor($state)),
                        ImageEntry::make('company_logo')
                            ->label('Logo')
                            ->getStateUsing(fn ($record) => static::imageUrl($record->company_logo))
                            ->placeholder('-'),
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
