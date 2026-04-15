<?php

namespace App\Filament\Resources\HeroBannerSettings\Pages;

use App\Filament\Resources\HeroBannerSettings\HeroBannerSettingsResource;
use Filament\Resources\Pages\ListRecords;

class ListHeroBannerSettings extends ListRecords
{
    protected static string $resource = HeroBannerSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
