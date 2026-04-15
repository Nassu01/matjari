<?php

namespace App\Filament\Resources\NavbarSettings;

use App\Filament\Resources\NavbarSettings\Pages\EditNavbarSettings;
use App\Filament\Resources\NavbarSettings\Pages\ListNavbarSettings;
use App\Filament\Resources\NavbarSettings\Schemas\NavbarSettingsForm;
use App\Filament\Resources\NavbarSettings\Tables\NavbarSettingsTable;
use App\Models\SiteSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class NavbarSettingsResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedBars3BottomLeft;

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 1;

    protected static ?string $navigationLabel = 'Navbar Settings';

    public static function form(Schema $schema): Schema
    {
        return NavbarSettingsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return NavbarSettingsTable::configure($table);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getNavigationUrl(): string
    {
        return static::getUrl('edit', ['record' => static::getModel()::current()]);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListNavbarSettings::route('/'),
            'edit' => EditNavbarSettings::route('/{record}/edit'),
        ];
    }
}
