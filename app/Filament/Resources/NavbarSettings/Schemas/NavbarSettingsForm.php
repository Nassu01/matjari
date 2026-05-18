<?php

namespace App\Filament\Resources\NavbarSettings\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class NavbarSettingsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Navbar Content')
                ->schema([
                    TextInput::make('site_name')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('navbar_logo_path')
                        ->label('Logo path')
                        ->helperText('Example: /images/Logo.png')
                        ->maxLength(255),
                    TextInput::make('navbar_home_label')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('navbar_category_label')
                        ->required()
                        ->maxLength(255),
                    TextInput::make('navbar_search_placeholder')
                        ->required()
                        ->maxLength(255),
                    Repeater::make('navbar_links')
                        ->label('Dropdown links')
                        ->schema([
                            TextInput::make('label')->required()->maxLength(255),
                            TextInput::make('url')->required()->maxLength(255),
                        ])
                        ->defaultItems(0)
                        ->columns(2)
                        ->columnSpanFull(),
                ])
                ->columns(2),
        ]);
    }
}
