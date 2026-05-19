<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Orders\OrderResource;
use App\Models\Order;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;
use Illuminate\Database\Eloquent\Builder;

class RecentOrdersWidget extends TableWidget
{
    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 8;

    public function table(Table $table): Table
    {
        return $table
            ->heading('Recent Orders')
            ->description('Latest customer orders received by the store.')
            ->query(fn (): Builder => Order::query()->with('user')->latest())
            ->columns([
                TextColumn::make('order_number')
                    ->label('Order')
                    ->searchable(),
                TextColumn::make('user.name')
                    ->label('Customer account')
                    ->placeholder('-')
                    ->searchable(),
                TextColumn::make('customer_name')
                    ->label('Customer')
                    ->searchable(),
                BadgeColumn::make('status')
                    ->colors([
                        'warning' => 'pending',
                        'success' => ['paid', 'completed', 'processing', 'delivered'],
                        'info' => 'shipped',
                        'danger' => ['cancelled', 'payment_cancelled'],
                    ]),
                BadgeColumn::make('payment_status')
                    ->colors([
                        'gray' => 'unpaid',
                        'warning' => 'pending',
                        'success' => 'paid',
                        'danger' => ['failed', 'cancelled', 'refunded'],
                    ]),
                TextColumn::make('total')
                    ->money('MAD')
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime()
                    ->sortable(),
            ])
            ->recordUrl(fn (Order $record): string => OrderResource::getUrl('view', ['record' => $record]))
            ->paginated([5])
            ->emptyStateIcon(Heroicon::OutlinedClipboardDocumentList)
            ->emptyStateHeading('No orders yet')
            ->emptyStateDescription('New orders will appear here as soon as customers place them.');
    }

    public static function canView(): bool
    {
        return auth()->user()?->isAdmin() ?? false;
    }
}
