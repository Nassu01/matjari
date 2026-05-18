<?php

namespace App\Filament\Resources\DeliveryProfiles\Tables;

use App\Models\DeliveryProfile;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class DeliveryProfilesTable
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
                TextColumn::make('city')
                    ->label('Ville')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('delivery_zone')
                    ->label('Zone')
                    ->searchable(),
                TextColumn::make('vehicle_type')
                    ->label('Vehicule')
                    ->searchable(),
                TextColumn::make('cin')
                    ->label('CIN')
                    ->searchable(),
                TextColumn::make('status')
                    ->label('Statut profil')
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
                    ->options(fn () => DeliveryProfile::query()
                        ->whereNotNull('city')
                        ->orderBy('city')
                        ->pluck('city', 'city')
                        ->all()),
                SelectFilter::make('vehicle_type')
                    ->label('Vehicule')
                    ->options(fn () => DeliveryProfile::query()
                        ->whereNotNull('vehicle_type')
                        ->orderBy('vehicle_type')
                        ->pluck('vehicle_type', 'vehicle_type')
                        ->all()),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('approve')
                    ->label('Valider')
                    ->visible(fn ($record) => $record->status === 'pending' && $record->user?->role === 'livreur')
                    ->authorize(fn () => auth()->user()?->isAdmin() ?? false)
                    ->action(function ($record) {
                        $record->update(['status' => 'active']);
                        $record->user?->update(['status' => 'active']);
                    })
                    ->color('success')
                    ->successNotificationTitle('Compte validé avec succès'),
                Action::make('reject')
                    ->label('Refuser')
                    ->visible(fn ($record) => $record->status === 'pending' && $record->user?->role === 'livreur')
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
}
