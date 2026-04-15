<?php

namespace App\Filament\Resources\NavbarSettings\Pages;

use App\Filament\Resources\NavbarSettings\NavbarSettingsResource;
use Filament\Resources\Pages\ListRecords;

class ListNavbarSettings extends ListRecords
{
    protected static string $resource = NavbarSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
