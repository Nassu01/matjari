<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class OrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('user.name')
                    ->label('User')
                    ->placeholder('-'),
                TextEntry::make('order_number'),
                TextEntry::make('customer_name'),
                TextEntry::make('customer_email'),
                TextEntry::make('customer_phone')
                    ->placeholder('-'),
                TextEntry::make('status'),
                TextEntry::make('payment_method'),
                TextEntry::make('payment_status'),
                TextEntry::make('stripe_checkout_session_id')
                    ->placeholder('-'),
                TextEntry::make('invoice_path')
                    ->label('Invoice')
                    ->placeholder('-'),
                TextEntry::make('total')
                    ->money('MAD'),
                TextEntry::make('notes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('shipped_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
