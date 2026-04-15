<?php

namespace App\Filament\Resources\FooterSettings\Pages;

use App\Filament\Resources\FooterSettings\FooterSettingsResource;
use Filament\Resources\Pages\EditRecord;

class EditFooterSettings extends EditRecord
{
    protected static string $resource = FooterSettingsResource::class;

    protected function getHeaderActions(): array
    {
        return [];
    }
}
