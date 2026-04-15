<?php

namespace App\Filament\Resources\NavbarSettings\Pages;

use App\Filament\Resources\NavbarSettings\NavbarSettingsResource;
use Filament\Resources\Pages\EditRecord;

class EditNavbarSettings extends EditRecord
{
    protected static string $resource = NavbarSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
