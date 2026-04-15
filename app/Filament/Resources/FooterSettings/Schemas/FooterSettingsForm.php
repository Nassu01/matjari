<?php

namespace App\Filament\Resources\FooterSettings\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class FooterSettingsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Footer Content')
                ->schema([
                    Textarea::make('footer_description')->rows(3)->columnSpanFull(),
                    Repeater::make('footer_quick_links')
                        ->schema([
                            TextInput::make('label')->required()->maxLength(255),
                            TextInput::make('url')->required()->maxLength(255),
                        ])
                        ->defaultItems(0)
                        ->columns(2)
                        ->columnSpanFull(),
                    Repeater::make('footer_social_links')
                        ->schema([
                            TextInput::make('label')->required()->maxLength(255),
                            TextInput::make('url')->required()->maxLength(255),
                            TextInput::make('icon')->maxLength(50),
                        ])
                        ->defaultItems(0)
                        ->columns(3)
                        ->columnSpanFull(),
                ]),
            Section::make('Newsletter & Bottom Bar')
                ->schema([
                    TextInput::make('newsletter_title')->required()->maxLength(255),
                    Textarea::make('newsletter_text')->rows(2),
                    TextInput::make('newsletter_placeholder')->required()->maxLength(255),
                    TextInput::make('newsletter_button_label')->required()->maxLength(255),
                    TextInput::make('footer_policy_label')->required()->maxLength(255),
                    TextInput::make('footer_terms_label')->required()->maxLength(255),
                    TextInput::make('footer_copyright')->maxLength(255)->columnSpanFull(),
                ])
                ->columns(2),
        ]);
    }
}
