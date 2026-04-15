<?php

namespace App\Filament\Resources\HeroBannerSettings\Pages;

use App\Filament\Resources\HeroBannerSettings\HeroBannerSettingsResource;
use Filament\Resources\Pages\EditRecord;

class EditHeroBannerSettings extends EditRecord
{
    protected static string $resource = HeroBannerSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
