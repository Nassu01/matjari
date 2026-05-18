<?php

namespace App\Filament\Resources\HeroBannerSettings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class HeroBannerSettingsForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Hero Section')
                ->schema([
                    TextInput::make('hero_badge')->maxLength(255),
                    TextInput::make('hero_title')->maxLength(255),
                    TextInput::make('hero_title_accent')->maxLength(255),
                    Textarea::make('hero_description')->rows(3)->columnSpanFull(),
                    TextInput::make('hero_primary_button_label')->maxLength(255),
                    TextInput::make('hero_primary_button_url')->maxLength(255),
                    TextInput::make('hero_secondary_button_label')->maxLength(255),
                    TextInput::make('hero_secondary_button_url')->maxLength(255),
                    TextInput::make('hero_stat_one_value')->maxLength(255),
                    TextInput::make('hero_stat_one_label')->maxLength(255),
                    TextInput::make('hero_stat_two_value')->maxLength(255),
                    TextInput::make('hero_stat_two_label')->maxLength(255),
                    TextInput::make('hero_image_path')
                        ->helperText('Example: /images/HeroPage.png')
                        ->maxLength(255)
                        ->columnSpanFull(),
                ])
                ->columns(2),
            Section::make('Promo Banner')
                ->schema([
                    TextInput::make('promo_badge')->maxLength(255),
                    TextInput::make('promo_title')->maxLength(255),
                    Textarea::make('promo_description')->rows(3)->columnSpanFull(),
                    TextInput::make('promo_button_label')->maxLength(255),
                    TextInput::make('promo_button_url')->maxLength(255),
                ])
                ->columns(2),
        ]);
    }
}
