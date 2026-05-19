<?php

namespace App\Filament\Widgets;

use App\Models\Category;
use App\Models\Product;
use Filament\Widgets\ChartWidget;

class ProductsByCategoryChart extends ChartWidget
{
    protected ?string $heading = 'Products by Category';

    protected ?string $description = 'Catalog depth by category.';

    protected int | string | array $columnSpan = [
        'md' => 1,
        'xl' => 1,
    ];

    protected static ?int $sort = 5;

    protected function getData(): array
    {
        $categories = Category::query()
            ->withCount('products')
            ->orderByDesc('products_count')
            ->limit(10)
            ->get(['id', 'name']);

        $uncategorizedCount = Product::query()->whereNull('category_id')->count();

        $labels = $categories->pluck('name')->values();
        $data = $categories->pluck('products_count')->map(fn ($count): int => (int) $count)->values();

        if ($uncategorizedCount > 0) {
            $labels->push('Uncategorized');
            $data->push($uncategorizedCount);
        }

        if ($labels->isEmpty()) {
            $labels->push('No products');
            $data->push(0);
        }

        return [
            'datasets' => [[
                'label' => 'Products',
                'data' => $data->all(),
                'backgroundColor' => [
                    '#f59e0b',
                    '#3b82f6',
                    '#22c55e',
                    '#ef4444',
                    '#8b5cf6',
                    '#14b8a6',
                    '#f97316',
                    '#64748b',
                    '#ec4899',
                    '#84cc16',
                    '#06b6d4',
                ],
            ]],
            'labels' => $labels->all(),
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getOptions(): array
    {
        return [
            'plugins' => [
                'legend' => [
                    'display' => false,
                ],
            ],
            'scales' => [
                'y' => [
                    'beginAtZero' => true,
                    'ticks' => [
                        'precision' => 0,
                    ],
                ],
            ],
        ];
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
