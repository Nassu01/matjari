<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->searchable()
                    ->preload()
                    ->default(null),
                TextInput::make('order_number')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('customer_name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('customer_email')
                    ->email()
                    ->required()
                    ->maxLength(255),
                TextInput::make('customer_phone')
                    ->tel()
                    ->maxLength(255)
                    ->default(null),
                Select::make('status')
                    ->required()
                    ->options([
                        'pending' => 'Pending',
                        'paid' => 'Paid',
                        'shipped' => 'Shipped',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->default('pending'),
                Select::make('payment_status')
                    ->required()
                    ->options([
                        'unpaid' => 'Unpaid',
                        'paid' => 'Paid',
                        'refunded' => 'Refunded',
                    ])
                    ->default('unpaid'),
                TextInput::make('total')
                    ->required()
                    ->numeric()
                    ->prefix('MAD')
                    ->default(0.0),
                Textarea::make('notes')
                    ->default(null)
                    ->columnSpanFull(),
                DateTimePicker::make('shipped_at'),
            ]);
    }
}
