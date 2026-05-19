<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\ChartWidget;

class OrderStatusPieChart extends ChartWidget
{
    protected ?string $heading = 'Orders by Status';

    protected ?string $description = 'Distribution of orders across workflow states.';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected static ?int $sort = 2;

    protected function getData(): array
    {
        $preferredOrder = ['pending', 'processing', 'shipped', 'delivered', 'completed', 'paid', 'cancelled', 'payment_cancelled'];

        $counts = Order::query()
            ->selectRaw('status, COUNT(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        $statuses = collect($preferredOrder)
            ->filter(fn (string $status): bool => $counts->has($status))
            ->merge($counts->keys()->diff($preferredOrder)->sort())
            ->values();

        if ($statuses->isEmpty()) {
            return [
                'datasets' => [[
                    'label' => 'Orders',
                    'data' => [0],
                    'backgroundColor' => ['#e5e7eb'],
                ]],
                'labels' => ['No orders'],
            ];
        }

        return [
            'datasets' => [[
                'label' => 'Orders',
                'data' => $statuses
                    ->map(fn (string $status): int => (int) $counts[$status])
                    ->all(),
                'backgroundColor' => [
                    '#f59e0b',
                    '#8b5cf6',
                    '#3b82f6',
                    '#22c55e',
                    '#10b981',
                    '#ef4444',
                    '#f97316',
                    '#64748b',
                ],
            ]],
            'labels' => $statuses
                ->map(fn (string $status): string => str($status)->replace('_', ' ')->headline()->toString())
                ->all(),
        ];
    }

    protected function getType(): string
    {
        return 'pie';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
