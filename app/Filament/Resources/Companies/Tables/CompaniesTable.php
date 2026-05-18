<?php

namespace App\Filament\Resources\Companies\Tables;

use App\Models\Company;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CompaniesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('user.first_name')
                    ->label('Prenom')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.last_name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('user.email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('user.status')
                    ->label('Statut utilisateur')
                    ->badge()
                    ->color(fn (?string $state): string => static::statusColor($state)),
                TextColumn::make('company_name')
                    ->label('Societe')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('company_type')
                    ->label('Type')
                    ->searchable(),
                TextColumn::make('ice')
                    ->label('ICE')
                    ->searchable(),
                TextColumn::make('patente')
                    ->label('Patente')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('company_address')
                    ->label('Adresse')
                    ->searchable()
                    ->limit(40)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('city')
                    ->label('Ville')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('company_phone')
                    ->label('Telephone')
                    ->searchable(),
                TextColumn::make('main_category')
                    ->label('Categorie')
                    ->searchable(),
                ImageColumn::make('company_logo')
                    ->label('Logo')
                    ->getStateUsing(fn ($record) => static::imageUrl($record->company_logo)),
                TextColumn::make('status')
                    ->label('Statut societe')
                    ->badge()
                    ->color(fn (?string $state): string => static::statusColor($state))
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Cree le')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'pending' => 'pending',
                        'active' => 'active',
                        'rejected' => 'rejected',
                    ]),
                SelectFilter::make('city')
                    ->label('Ville')
                    ->options(fn () => Company::query()
                        ->whereNotNull('city')
                        ->orderBy('city')
                        ->pluck('city', 'city')
                        ->all()),
                SelectFilter::make('main_category')
                    ->label('Categorie')
                    ->options(fn () => Company::query()
                        ->whereNotNull('main_category')
                        ->orderBy('main_category')
                        ->pluck('main_category', 'main_category')
                        ->all()),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('approve')
                    ->label('Valider')
                    ->visible(fn ($record) => $record->status === 'pending' && $record->user?->role === 'commercant')
                    ->authorize(fn () => auth()->user()?->isAdmin() ?? false)
                    ->action(function ($record) {
                        $record->update(['status' => 'active']);
                        $record->user?->update(['status' => 'active']);
                    })
                    ->color('success')
                    ->successNotificationTitle('Compte validé avec succès'),
                Action::make('reject')
                    ->label('Refuser')
                    ->visible(fn ($record) => $record->status === 'pending' && $record->user?->role === 'commercant')
                    ->authorize(fn () => auth()->user()?->isAdmin() ?? false)
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $record->update(['status' => 'rejected']);
                        $record->user?->update(['status' => 'rejected']);
                    })
                    ->color('danger')
                    ->successNotificationTitle('Compte refusé'),
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
