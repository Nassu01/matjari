<?php

namespace App\Filament\Resources\HeroBannerSettings;

use App\Filament\Resources\HeroBannerSettings\Pages\EditHeroBannerSettings;
use App\Filament\Resources\HeroBannerSettings\Pages\ListHeroBannerSettings;
use App\Filament\Resources\HeroBannerSettings\Schemas\HeroBannerSettingsForm;
use App\Filament\Resources\HeroBannerSettings\Tables\HeroBannerSettingsTable;
use App\Models\SiteSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class HeroBannerSettingsResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedPhoto;

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 3;

    protected static ?string $navigationLabel = 'Hero & Banner';

    public static function form(Schema $schema): Schema
    {
        return HeroBannerSettingsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HeroBannerSettingsTable::configure($table);
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
            'index' => ListHeroBannerSettings::route('/'),
            'edit' => EditHeroBannerSettings::route('/{record}/edit'),
        ];
    }
}
