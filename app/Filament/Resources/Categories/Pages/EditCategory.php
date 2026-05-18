<?php

namespace App\Filament\Resources\Categories\Pages;

use App\Filament\Resources\Categories\CategoryResource;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\EditRecord;

class EditCategory extends EditRecord
{
    protected static string $resource = CategoryResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make()
                ->visible(fn ($record) => ! $record->products()->exists()),
            Action::make('delete_blocked')
                ->label('Delete')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading('Category has products')
                ->modalDescription('Move or delete the products in this category first, or deactivate the category instead.')
                ->visible(fn ($record) => $record->products()->exists())
                ->action(function (): void {
                    Notification::make()
                        ->warning()
                        ->title('Category has products')
                        ->body('This category cannot be deleted while products are assigned to it.')
                        ->send();
                }),
        ];
    }
}
