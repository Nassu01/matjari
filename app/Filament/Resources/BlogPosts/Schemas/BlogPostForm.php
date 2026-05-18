<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (?string $state, Set $set, Get $get): void {
                        if (blank($state) || filled($get('slug'))) {
                            return;
                        }

                        $set('slug', Str::slug($state));
                    })
                    ->maxLength(255),
                TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),
                TextInput::make('category')
                    ->required()
                    ->default('Conseils')
                    ->maxLength(255),
                TextInput::make('author')
                    ->required()
                    ->default('MATJARI')
                    ->maxLength(255),
                Select::make('status')
                    ->required()
                    ->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                    ])
                    ->default('draft'),
                DateTimePicker::make('published_at')
                    ->label('Published at')
                    ->seconds(false)
                    ->default(now()),
                Toggle::make('is_featured')
                    ->label('Featured')
                    ->default(false),
                TextInput::make('views_count')
                    ->numeric()
                    ->integer()
                    ->minValue(0)
                    ->default(0),
                Textarea::make('excerpt')
                    ->required()
                    ->rows(3)
                    ->columnSpanFull(),
                Textarea::make('content')
                    ->required()
                    ->rows(12)
                    ->helperText('Separate paragraphs with blank lines.')
                    ->columnSpanFull(),
                TextInput::make('featured_image')
                    ->label('Featured image URL or path')
                    ->helperText('Supports http(s), /storage/..., /images/..., or a public storage path.')
                    ->maxLength(255),
                FileUpload::make('featured_image_upload')
                    ->label('Upload featured image')
                    ->image()
                    ->disk('public')
                    ->directory('blog')
                    ->visibility('public')
                    ->previewable()
                    ->downloadable()
                    ->openable()
                    ->dehydrated(false)
                    ->afterStateUpdated(function (?string $state, Set $set): void {
                        if (filled($state)) {
                            $set('featured_image', $state);
                        }
                    }),
            ]);
    }
}
