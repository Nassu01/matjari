<?php

namespace App\Filament\Resources\FooterSettings;

use App\Filament\Resources\FooterSettings\Pages\EditFooterSettings;
use App\Filament\Resources\FooterSettings\Pages\ListFooterSettings;
use App\Filament\Resources\FooterSettings\Schemas\FooterSettingsForm;
use App\Filament\Resources\FooterSettings\Tables\FooterSettingsTable;
use App\Models\SiteSetting;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class FooterSettingsResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleGroup;

    protected static UnitEnum|string|null $navigationGroup = 'Settings';

    protected static ?int $navigationSort = 2;

    protected static ?string $navigationLabel = 'Footer Settings';

    public static function form(Schema $schema): Schema
    {
        return FooterSettingsForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FooterSettingsTable::configure($table);
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
            'index' => ListFooterSettings::route('/'),
            'edit' => EditFooterSettings::route('/{record}/edit'),
        ];
    }
}
