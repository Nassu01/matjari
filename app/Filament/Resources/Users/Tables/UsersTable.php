<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                TextColumn::make('first_name')
                    ->label('Prénom')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('last_name')
                    ->label('Nom')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Adresse email')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('phone')
                    ->label('Téléphone')
                    ->searchable()
                    ->placeholder('-')
                    ->sortable(),
                TextColumn::make('role')
                    ->label('Rôle')
                    ->badge()
                    ->colors([
                        'secondary' => 'client',
                        'warning' => 'commercant',
                        'success' => 'livreur',
                        'danger' => 'admin',
                    ])
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Statut')
                    ->badge()
                    ->colors([
                        'success' => 'active',
                        'warning' => 'pending',
                        'danger' => 'rejected',
                    ])
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('role')
                    ->label('Rôle')
                    ->options([
                        'client' => 'client',
                        'commercant' => 'commercant',
                        'livreur' => 'livreur',
                        'admin' => 'admin',
                    ]),
                SelectFilter::make('status')
                    ->label('Statut')
                    ->options([
                        'active' => 'active',
                        'pending' => 'pending',
                        'rejected' => 'rejected',
                    ]),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('approve')
                    ->label('Approuver')
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {
                        $record->update(['status' => 'active']);

                        if ($record->role === 'commercant' && $record->company) {
                            $record->company->update(['status' => 'active']);
                        }
                    })
                    ->requiresConfirmation()
                    ->color('success')
                    ->successNotificationTitle('Compte approuvé avec succès'),
                Action::make('reject')
                    ->label('Refuser')
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->action(function ($record) {
                        $record->update(['status' => 'rejected']);

                        if ($record->role === 'commercant' && $record->company) {
                            $record->company->update(['status' => 'rejected']);
                        }
                    })
                    ->requiresConfirmation()
                    ->color('danger')
                    ->successNotificationTitle('Compte refusé'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
