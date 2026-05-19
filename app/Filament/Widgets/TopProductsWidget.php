<?php

namespace App\Filament\Widgets;

use App\Models\OrderItem;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class TopProductsWidget extends TableWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 9;

    public function table(Table $table): Table
    {
        return $table
            ->heading('Top Products')
            ->description('Most ordered products based on order items.')
            ->query(fn (): Builder => OrderItem::query()
                ->selectRaw('MIN(id) as id, product_id, product_name, SUM(quantity) as sold_quantity, SUM(COALESCE(NULLIF(total, 0), total_price)) as revenue')
                ->groupBy('product_id', 'product_name')
                ->orderByDesc('sold_quantity')
                ->orderByDesc('revenue'))
            ->columns([
                TextColumn::make('product_name')
                    ->label('Product')
                    ->searchable(),
                TextColumn::make('sold_quantity')
                    ->label('Quantity sold')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('revenue')
                    ->label('Revenue')
                    ->money('MAD')
                    ->sortable(),
            ])
            ->paginated([5])
            ->emptyStateIcon(Heroicon::OutlinedShoppingBag)
            ->emptyStateHeading('No product sales yet')
            ->emptyStateDescription('Best-selling products will appear once order items are recorded.');
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
