<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Navbar')
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
                                TextInput::make('label')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('url')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->defaultItems(0)
                            ->columns(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
                Section::make('Footer')
                    ->schema([
                        Textarea::make('footer_description')
                            ->rows(3)
                            ->columnSpanFull(),
                        Repeater::make('footer_quick_links')
                            ->schema([
                                TextInput::make('label')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('url')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->defaultItems(0)
                            ->columns(2)
                            ->columnSpanFull(),
                        Repeater::make('footer_social_links')
                            ->schema([
                                TextInput::make('label')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('url')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('icon')
                                    ->helperText('Short text like f, x, g, in')
                                    ->maxLength(50),
                            ])
                            ->defaultItems(0)
                            ->columns(3)
                            ->columnSpanFull(),
                    ])
                    ->columns(1),
                Section::make('Newsletter & Bottom Bar')
                    ->schema([
                        TextInput::make('newsletter_title')
                            ->required()
                            ->maxLength(255),
                        Textarea::make('newsletter_text')
                            ->rows(2),
                        TextInput::make('newsletter_placeholder')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('newsletter_button_label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('footer_policy_label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('footer_terms_label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('footer_copyright')
                            ->helperText('Example: All rights reserved.')
                            ->maxLength(255)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }
}
