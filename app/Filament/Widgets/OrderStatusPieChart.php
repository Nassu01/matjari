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
        $statuses = [
            'pending' => 'Pending',
            'paid' => 'Paid',
            'shipped' => 'Shipped',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
        ];

        $counts = Order::query()
            ->selectRaw('status, COUNT(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        return [
            'datasets' => [[
                'label' => 'Orders',
                'data' => array_map(
                    fn (string $status): int => (int) ($counts[$status] ?? 0),
                    array_keys($statuses)
                ),
                'backgroundColor' => [
                    '#f59e0b',
                    '#22c55e',
                    '#3b82f6',
                    '#10b981',
                    '#ef4444',
                ],
            ]],
            'labels' => array_values($statuses),
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
}
