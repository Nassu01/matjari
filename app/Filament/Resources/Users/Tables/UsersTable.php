<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
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
                    ->label('First name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('last_name')
                    ->label('Last name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('phone')
                    ->searchable()
                    ->hidden(),
                TextColumn::make('role')
                    ->label('Role')
                    ->badge()
                    ->colors([
                        'info' => 'client',
                        'warning' => 'commercant',
                        'success' => 'livreur',
                        'danger' => 'admin',
                    ])
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->colors([
                        'success' => 'active',
                        'warning' => 'pending',
                        'danger' => 'rejected',
                    ])
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Created at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('role')
                    ->label('Role')
                    ->options([
                        'client' => 'client',
                        'commercant' => 'commercant',
                        'livreur' => 'livreur',
                        'admin' => 'admin',
                    ]),
                SelectFilter::make('status')
                    ->label('Status')
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
                    ->label('Valider')
                    ->visible(fn ($record) => self::canModerateAccount($record))
                    ->authorize(fn () => auth()->user()?->isAdmin() ?? false)
                    ->action(function ($record) {
                        $record->update(['status' => 'active']);

                        if ($record->role === 'commercant' && $record->company) {
                            $record->company->update(['status' => 'active']);
                        }

                        if ($record->role === 'livreur' && $record->deliveryProfile) {
                            $record->deliveryProfile->update(['status' => 'active']);
                        }
                    })
                    ->color('success')
                    ->successNotificationTitle('Compte validé avec succès'),
                Action::make('reject')
                    ->label('Refuser')
                    ->visible(fn ($record) => self::canModerateAccount($record))
                    ->authorize(fn () => auth()->user()?->isAdmin() ?? false)
                    ->requiresConfirmation()
                    ->action(function ($record) {
                        $record->update(['status' => 'rejected']);

                        if ($record->role === 'commercant' && $record->company) {
                            $record->company->update(['status' => 'rejected']);
                        }

                        if ($record->role === 'livreur' && $record->deliveryProfile) {
                            $record->deliveryProfile->update(['status' => 'rejected']);
                        }
                    })
                    ->color('danger')
                    ->successNotificationTitle('Compte refusé'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    private static function canModerateAccount($record): bool
    {
        return $record->status === 'pending'
            && in_array($record->role, ['commercant', 'livreur'], true);
    }
}
