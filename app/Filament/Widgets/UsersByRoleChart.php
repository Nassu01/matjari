<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Widgets\ChartWidget;

class UsersByRoleChart extends ChartWidget
{
    protected ?string $heading = 'Users by Role';

    protected ?string $description = 'Account distribution across public and admin roles.';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected static ?int $sort = 3;

    protected function getData(): array
    {
        $roles = [
            'client' => 'Clients',
            'commercant' => 'Commercants',
            'livreur' => 'Livreurs',
            'admin' => 'Admins',
        ];

        $counts = User::query()
            ->selectRaw('role, COUNT(*) as aggregate')
            ->groupBy('role')
            ->pluck('aggregate', 'role');

        return [
            'datasets' => [[
                'label' => 'Users',
                'data' => array_map(
                    fn (string $role): int => (int) ($counts[$role] ?? 0),
                    array_keys($roles)
                ),
                'backgroundColor' => [
                    '#22c55e',
                    '#f59e0b',
                    '#3b82f6',
                    '#111827',
                ],
            ]],
            'labels' => array_values($roles),
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
