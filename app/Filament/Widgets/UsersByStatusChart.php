<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;

class UsersByStatusChart extends ChartWidget
{
    protected ?string $heading = 'Users by Status';

    protected ?string $description = 'Active, pending, and rejected account status.';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected static ?int $sort = 4;

    protected function getData(): array
    {
        $statuses = [
            'active' => 'Active',
            'pending' => 'Pending',
            'rejected' => 'Rejected',
        ];

        $counts = User::query()
            ->selectRaw('status, COUNT(*) as aggregate')
            ->groupBy('status')
            ->pluck('aggregate', 'status');

        return [
            'datasets' => [[
                'label' => 'Users',
                'data' => array_map(
                    fn (string $status): int => (int) ($counts[$status] ?? 0),
                    array_keys($statuses)
                ),
                'backgroundColor' => [
                    '#22c55e',
                    '#f59e0b',
                    '#ef4444',
                ],
            ]],
            'labels' => array_values($statuses),
        ];
    }

    protected function getType(): string
    {
        return 'doughnut';
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
