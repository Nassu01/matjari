<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'navbar_logo_path',
        'navbar_home_label',
        'navbar_category_label',
        'navbar_search_placeholder',
        'navbar_links',
        'footer_description',
        'footer_quick_links',
        'footer_social_links',
        'newsletter_title',
        'newsletter_text',
        'newsletter_placeholder',
        'newsletter_button_label',
        'footer_copyright',
        'footer_policy_label',
        'footer_terms_label',
    ];

    protected function casts(): array
    {
        return [
            'navbar_links' => 'array',
            'footer_quick_links' => 'array',
            'footer_social_links' => 'array',
        ];
    }

    public static function defaults(): array
    {
        return [
            'site_name' => 'Matjari',
            'navbar_logo_path' => '/images/Logo.png',
            'navbar_home_label' => 'HOME',
            'navbar_category_label' => 'CATEGORY',
            'navbar_search_placeholder' => 'Search products...',
            'navbar_links' => [
                ['label' => 'Telephone & Tablet', 'url' => '/shop'],
                ['label' => 'TV & High Tech', 'url' => '/shop'],
                ['label' => 'Computing', 'url' => '/shop'],
                ['label' => 'Home & Kitchen', 'url' => '/shop'],
                ['label' => 'Clothing & Shoes', 'url' => '/shop'],
                ['label' => 'Beauty & Health', 'url' => '/shop'],
            ],
            'footer_description' => 'Your one-stop destination for daily essentials, curated accessories, and a clean shopping experience.',
            'footer_quick_links' => [
                ['label' => 'Home', 'url' => '/'],
                ['label' => 'Shop', 'url' => '/shop'],
                ['label' => 'Favorite', 'url' => '/favorite'],
                ['label' => 'Cart', 'url' => '/cart'],
            ],
            'footer_social_links' => [
                ['label' => 'Facebook', 'url' => '#', 'icon' => 'f'],
                ['label' => 'Twitter', 'url' => '#', 'icon' => 'x'],
                ['label' => 'GitHub', 'url' => '#', 'icon' => 'g'],
                ['label' => 'LinkedIn', 'url' => '#', 'icon' => 'in'],
            ],
            'newsletter_title' => 'Newsletter',
            'newsletter_text' => 'Get updates and special offers in your inbox.',
            'newsletter_placeholder' => 'Enter your email',
            'newsletter_button_label' => 'Subscribe',
            'footer_copyright' => 'All rights reserved.',
            'footer_policy_label' => 'Privacy Policy',
            'footer_terms_label' => 'Terms & Conditions',
        ];
    }

    public static function current(): self
    {
        return static::query()->firstOrCreate([], static::defaults());
    }
}
