<?php

namespace App\Filament\Resources\OrderItems\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class OrderItemForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('order_id')
                    ->relationship('order', 'order_number')
                    ->searchable()
                    ->preload()
                    ->required(),
                Select::make('product_id')
                    ->relationship('product', 'name')
                    ->searchable()
                    ->preload()
                    ->default(null),
                TextInput::make('product_name')
                    ->required()
                    ->maxLength(255),
                TextInput::make('sku')
                    ->label('SKU')
                    ->maxLength(255)
                    ->default(null),
                TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->default(1),
                TextInput::make('unit_price')
                    ->required()
                    ->numeric()
                    ->prefix('MAD'),
                TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('MAD'),
            ]);
    }
}
