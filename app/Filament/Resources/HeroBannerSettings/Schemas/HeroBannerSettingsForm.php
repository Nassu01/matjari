<?php

namespace App\Filament\Resources\HeroBannerSettings\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
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
                    FileUpload::make('hero_image_path')
                        ->label('Hero image')
                        ->image()
                        ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                        ->disk('public')
                        ->directory('hero-banners')
                        ->visibility('public')
                        ->previewable()
                        ->downloadable()
                        ->openable()
                        ->helperText('Upload jpg, jpeg, png, or webp. Stored on the public disk in hero-banners.')
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
            Section::make('Hero Carousel Slides')
                ->schema([
                    Repeater::make('banner_slides')
                        ->label('Slides')
                        ->schema([
                            FileUpload::make('image')
                                ->label('Banner image')
                                ->image()
                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                                ->disk('public')
                                ->directory('hero-banners')
                                ->visibility('public')
                                ->previewable()
                                ->downloadable()
                                ->openable()
                                ->helperText('Upload jpg, jpeg, png, or webp. Stored on the public disk in hero-banners.')
                                ->columnSpanFull(),
                            TextInput::make('badge')
                                ->label('Small label / badge')
                                ->maxLength(255),
                            TextInput::make('title')->maxLength(255),
                            Textarea::make('description')->rows(3)->columnSpanFull(),
                            TextInput::make('button_label')->maxLength(255),
                            TextInput::make('button_url')->maxLength(255),
                            TextInput::make('secondary_button_label')->maxLength(255),
                            TextInput::make('secondary_button_url')->maxLength(255),
                        ])
                        ->defaultItems(3)
                        ->minItems(3)
                        ->maxItems(3)
                        ->columns(2)
                        ->columnSpanFull(),
                ]),
        ]);
    }
}
