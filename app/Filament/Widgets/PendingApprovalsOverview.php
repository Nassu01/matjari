<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Companies\CompanyResource;
use App\Filament\Resources\DeliveryProfiles\DeliveryProfileResource;
use App\Filament\Resources\Products\ProductResource;
use App\Filament\Resources\Users\UserResource;
use App\Models\Company;
use App\Models\DeliveryProfile;
use App\Models\User;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class PendingApprovalsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Pending Approvals';

    protected ?string $description = 'Requests that need an admin decision.';

    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 7;

    protected function getStats(): array
    {
        return [
            Stat::make('Pending users', User::query()->where('status', 'pending')->count())
                ->description('All pending accounts')
                ->descriptionIcon(Heroicon::OutlinedUsers)
                ->color('warning')
                ->url(UserResource::getUrl('index')),
            Stat::make('Pending commercants', Company::query()->where('status', 'pending')->count())
                ->description('Company validation requests')
                ->descriptionIcon(Heroicon::OutlinedBuildingStorefront)
                ->color('warning')
                ->url(CompanyResource::getUrl('index')),
            Stat::make('Pending livreurs', DeliveryProfile::query()->where('status', 'pending')->count())
                ->description('Delivery profile validation requests')
                ->descriptionIcon(Heroicon::OutlinedTruck)
                ->color('info')
                ->url(DeliveryProfileResource::getUrl('index')),
            Stat::make('Product approvals', 'Not configured')
                ->description('Products currently use active/inactive only')
                ->descriptionIcon(Heroicon::OutlinedShoppingBag)
                ->color('gray')
                ->url(ProductResource::getUrl('index')),
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
