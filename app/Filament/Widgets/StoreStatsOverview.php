<?php

namespace App\Filament\Widgets;

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
        $paidOrders = Order::query()->where('payment_status', 'paid')->count();

        return [
            Stat::make('Products', Product::query()->count())
                ->description('Products currently in the catalog')
                ->descriptionIcon(Heroicon::OutlinedShoppingBag)
                ->color('primary'),
            Stat::make('Orders', Order::query()->count())
                ->description("{$paidOrders} paid orders")
                ->descriptionIcon(Heroicon::OutlinedClipboardDocumentList)
                ->color('warning'),
            Stat::make('Revenue', number_format($totalRevenue, 2) . ' MAD')
                ->description('Total order value')
                ->descriptionIcon(Heroicon::OutlinedBanknotes)
                ->color('success'),
            Stat::make('Customers', User::query()->count())
                ->description('Registered users in the store')
                ->descriptionIcon(Heroicon::OutlinedUsers)
                ->color('info'),
        ];
    }
}
