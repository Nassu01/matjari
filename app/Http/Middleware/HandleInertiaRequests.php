<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Product;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = fn () => SiteSetting::current();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'siteSettings' => $settings,
            'navbarSettings' => fn () => [
                'siteName' => $settings()->site_name,
                'logoPath' => $settings()->navbar_logo_path,
                'homeLabel' => $settings()->navbar_home_label,
                'categoryLabel' => $settings()->navbar_category_label,
                'searchPlaceholder' => $settings()->navbar_search_placeholder,
                'links' => $settings()->navbar_links ?? [],
            ],
            'footerSettings' => fn () => [
                'description' => $settings()->footer_description,
                'quickLinks' => $settings()->footer_quick_links ?? [],
                'socialLinks' => $settings()->footer_social_links ?? [],
                'newsletterTitle' => $settings()->newsletter_title,
                'newsletterText' => $settings()->newsletter_text,
                'newsletterPlaceholder' => $settings()->newsletter_placeholder,
                'newsletterButtonLabel' => $settings()->newsletter_button_label,
                'copyright' => $settings()->footer_copyright,
                'policyLabel' => $settings()->footer_policy_label,
                'termsLabel' => $settings()->footer_terms_label,
            ],
            'heroSettings' => fn () => [
                'badge' => $settings()->hero_badge,
                'title' => trim(implode(' ', array_filter([$settings()->hero_title, $settings()->hero_title_accent]))),
                'description' => $settings()->hero_description,
                'primaryButtonLabel' => $settings()->hero_primary_button_label,
                'primaryButtonUrl' => $settings()->hero_primary_button_url,
                'secondaryButtonLabel' => $settings()->hero_secondary_button_label,
                'secondaryButtonUrl' => $settings()->hero_secondary_button_url,
                'imagePath' => $settings()->hero_image_path,
            ],
            'catalogMenu' => fn () => Category::query()
                ->where('is_active', true)
                ->whereHas('products', fn ($query) => $query->where('is_active', true))
                ->withCount(['products' => fn ($query) => $query->where('is_active', true)])
                ->orderBy('name')
                ->get(['id', 'name', 'slug', 'description'])
                ->map(fn (Category $category) => [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description ?: "Selection MATJARI autour de {$category->name}.",
                    'count' => $category->products_count,
                    'url' => "/shop?category={$category->slug}",
                    'products' => Product::query()
                        ->where('is_active', true)
                        ->where('category_id', $category->id)
                        ->latest()
                        ->limit(8)
                        ->get(['id', 'name', 'slug'])
                        ->map(fn (Product $product) => [
                            'id' => $product->id,
                            'name' => $product->name,
                            'slug' => $product->slug,
                            'url' => route('products.show', ['product' => $product->slug]),
                        ])
                        ->values(),
                ])
                ->values(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
