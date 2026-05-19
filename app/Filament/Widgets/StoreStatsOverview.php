<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Filament\Support\Icons\Heroicon;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StoreStatsOverview extends StatsOverviewWidget
{
    protected ?string $heading = 'Store Overview';

    protected ?string $description = 'Quick ecommerce metrics from your current data.';

    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalRevenue = (float) Order::query()->sum('total');

        return [
            Stat::make('Total users', User::query()->count())
                ->description('All registered accounts')
                ->descriptionIcon(Heroicon::OutlinedUsers)
                ->color('info'),
            Stat::make('Clients', User::query()->where('role', 'client')->count())
                ->description('Customer accounts')
                ->descriptionIcon(Heroicon::OutlinedUserGroup)
                ->color('success'),
            Stat::make('Commercants', User::query()->where('role', 'commercant')->count())
                ->description('Merchant accounts')
                ->descriptionIcon(Heroicon::OutlinedBuildingStorefront)
                ->color('warning'),
            Stat::make('Livreurs', User::query()->where('role', 'livreur')->count())
                ->description('Delivery accounts')
                ->descriptionIcon(Heroicon::OutlinedTruck)
                ->color('primary'),
            Stat::make('Pending accounts', User::query()->where('status', 'pending')->count())
                ->description('Waiting for validation')
                ->descriptionIcon(Heroicon::OutlinedClock)
                ->color('danger'),
            Stat::make('Total products', Product::query()->count())
                ->description('Products in the catalog')
                ->descriptionIcon(Heroicon::OutlinedShoppingBag)
                ->color('primary'),
            Stat::make('Active products', Product::query()->where('is_active', true)->count())
                ->description('Visible products')
                ->descriptionIcon(Heroicon::OutlinedCheckCircle)
                ->color('success'),
            Stat::make('Categories', Category::query()->count())
                ->description('Catalog categories')
                ->descriptionIcon(Heroicon::OutlinedSquares2x2)
                ->color('info'),
            Stat::make('Orders', Order::query()->count())
                ->description('Total orders')
                ->descriptionIcon(Heroicon::OutlinedClipboardDocumentList)
                ->color('warning'),
            Stat::make('Revenue', number_format($totalRevenue, 2) . ' MAD')
                ->description('Total order value')
                ->descriptionIcon(Heroicon::OutlinedBanknotes)
                ->color('success'),
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
