<?php

namespace App\Filament\Resources\DeliveryProfiles\Pages;

use App\Filament\Resources\DeliveryProfiles\DeliveryProfileResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewDeliveryProfile extends ViewRecord
{
    protected static string $resource = DeliveryProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
