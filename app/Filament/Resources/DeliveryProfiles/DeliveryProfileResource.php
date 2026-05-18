<?php

namespace App\Filament\Resources\DeliveryProfiles;

use App\Filament\Resources\DeliveryProfiles\Pages\CreateDeliveryProfile;
use App\Filament\Resources\DeliveryProfiles\Pages\EditDeliveryProfile;
use App\Filament\Resources\DeliveryProfiles\Pages\ListDeliveryProfiles;
use App\Filament\Resources\DeliveryProfiles\Pages\ViewDeliveryProfile;
use App\Filament\Resources\DeliveryProfiles\Schemas\DeliveryProfileForm;
use App\Filament\Resources\DeliveryProfiles\Schemas\DeliveryProfileInfolist;
use App\Filament\Resources\DeliveryProfiles\Tables\DeliveryProfilesTable;
use App\Models\DeliveryProfile;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Model;
use UnitEnum;

class DeliveryProfileResource extends Resource
{
    protected static ?string $model = DeliveryProfile::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-truck';

    protected static UnitEnum|string|null $navigationGroup = 'Account Validation';

    protected static ?int $navigationSort = 2;

    protected static ?string $modelLabel = 'demande livreur';

    protected static ?string $pluralModelLabel = 'demandes livreurs';

    public static function form(Schema $schema): Schema
    {
        return DeliveryProfileForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return DeliveryProfileInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return DeliveryProfilesTable::configure($table);
    }

    public static function shouldRegisterNavigation(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function canCreate(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function canView(Model $record): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function canEdit(Model $record): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function canDelete(Model $record): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }

    public static function getPages(): array
    {
        return [
            'index' => ListDeliveryProfiles::route('/'),
            'create' => CreateDeliveryProfile::route('/create'),
            'view' => ViewDeliveryProfile::route('/{record}'),
            'edit' => EditDeliveryProfile::route('/{record}/edit'),
        ];
    }
}
