<?php

namespace App\Filament\Resources\DeliveryProfiles\Pages;

use App\Filament\Resources\DeliveryProfiles\DeliveryProfileResource;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditDeliveryProfile extends EditRecord
{
    protected static string $resource = DeliveryProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
        ];
    }
}
