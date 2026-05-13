<?php

namespace App\Filament\Resources\Users\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                TextColumn::make('name')
                    ->label('Nom')
                    ->searchable(),
                TextColumn::make('email')
                    ->label('Adresse email')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('Téléphone')
                    ->searchable()
                    ->placeholder('-'),
                TextColumn::make('role')
                    ->label('Rôle')
                    ->badge()
                    ->searchable(),
                TextColumn::make('email_verified_at')
                    ->label('Email vérifié le')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('phone_verified_at')
                    ->label('Téléphone vérifié le')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Créé le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Modifié le')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('phone_verified_at')
                    ->label('Téléphone vérifié')
                    ->nullable()
                    ->trueLabel('Téléphone vérifié')
                    ->falseLabel('Non vérifié')
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('phone_verified_at'),
                        false: fn ($query) => $query->whereNull('phone_verified_at'),
                        blank: fn ($query) => $query,
                    ),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
