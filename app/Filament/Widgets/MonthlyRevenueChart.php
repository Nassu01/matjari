<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Carbon\CarbonPeriod;
use Filament\Widgets\ChartWidget;

class MonthlyRevenueChart extends ChartWidget
{
    protected ?string $heading = 'Monthly Revenue';

    protected ?string $description = 'Order revenue over the last 12 months.';

    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 6;

    protected function getData(): array
    {
        $start = now()->subMonths(11)->startOfMonth();
        $end = now()->endOfMonth();

        $months = collect(CarbonPeriod::create($start, '1 month', $end))
            ->mapWithKeys(fn ($date): array => [$date->format('Y-m') => [
                'label' => $date->format('M Y'),
                'total' => 0.0,
            ]]);

        Order::query()
            ->whereBetween('created_at', [$start, $end])
            ->get(['total', 'created_at'])
            ->each(function (Order $order) use ($months): void {
                $monthKey = $order->created_at?->format('Y-m');

                if ($monthKey && $months->has($monthKey)) {
                    $month = $months[$monthKey];
                    $month['total'] += (float) $order->total;
                    $months[$monthKey] = $month;
                }
            });

        return [
            'datasets' => [[
                'label' => 'Revenue (MAD)',
                'data' => $months->pluck('total')->map(fn (float $total): float => round($total, 2))->values()->all(),
                'borderColor' => '#22c55e',
                'backgroundColor' => 'rgba(34, 197, 94, 0.16)',
                'fill' => true,
                'tension' => 0.35,
            ]],
            'labels' => $months->pluck('label')->values()->all(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'position' => 'bottom',
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                ],
            ],
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
