<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\SiteSetting;
use App\Support\Images11;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class StorefrontController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $settings = SiteSetting::current();
        $user = $request->user();

        $logoPath = $this->assetPath($settings->navbar_logo_path);
        $heroImagePath = $this->assetPath($settings->hero_image_path);
        $categories = $this->activeCategories();
        $products = $this->activeProducts();

        return response()->json([
            'settings' => [
                'siteName' => $settings->site_name,
                'navbar' => [
                    'logoPath' => $this->image11Fallback($logoPath, 0, ['/images/Logo.png']),
                    'homeLabel' => $settings->navbar_home_label,
                    'categoryLabel' => $settings->navbar_category_label,
                    'searchPlaceholder' => $settings->navbar_search_placeholder,
                    'links' => $categories->map(fn (array $category) => [
                        'icon' => Str::upper(Str::substr($category['name'], 0, 2)),
                        'label' => $category['name'],
                        'name' => $category['name'],
                        'slug' => $category['slug'],
                        'url' => "/shop?category={$category['slug']}",
                    ])->values(),
                ],
                'hero' => [
                    'badge' => $settings->hero_badge,
                    'title' => trim(implode(' ', array_filter([$settings->hero_title, $settings->hero_title_accent]))),
                    'description' => $settings->hero_description,
                    'primaryButtonLabel' => $settings->hero_primary_button_label,
                    'primaryButtonUrl' => $settings->hero_primary_button_url,
                    'secondaryButtonLabel' => $settings->hero_secondary_button_label,
                    'secondaryButtonUrl' => $settings->hero_secondary_button_url,
                    'imagePath' => $this->image11Fallback($heroImagePath, 1, ['/images/HeroPage.png']),
                ],
                'footer' => [
                    'description' => $settings->footer_description,
                    'quickLinks' => $settings->footer_quick_links ?? [],
                    'socialLinks' => $settings->footer_social_links ?? [],
                    'newsletterTitle' => $settings->newsletter_title,
                    'newsletterText' => $settings->newsletter_text,
                    'newsletterPlaceholder' => $settings->newsletter_placeholder,
                    'newsletterButtonLabel' => $settings->newsletter_button_label,
                    'copyright' => $settings->footer_copyright,
                    'policyLabel' => $settings->footer_policy_label,
                    'termsLabel' => $settings->footer_terms_label,
                ],
            ],
            'auth' => [
                'isAuthenticated' => (bool) $user,
                'isVerified' => (bool) $user,
                'user' => $user ? [
                    'name' => $user->name,
                    'displayName' => $user->display_name,
                    'email' => $user->email,
                ] : null,
            ],
            'categories' => $categories,
            'products' => $products->take(16)->values(),
        ]);
    }

    public function products(): JsonResponse
    {
        $products = $this->activeProducts();

        return response()->json([
            'products' => $products,
        ]);
    }

    private function activeProducts()
    {
        return Product::query()
            ->with(['brand:id,name', 'category:id,name,slug'])
            ->where('is_active', true)
            ->latest()
            ->get()
            ->map(function (Product $product, int $index) {
                $image = $this->assetPath($product->featured_image) ?: Images11::urlAt($index) ?: '/images/logomatjari.png';

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'sku' => $product->sku,
                    'price' => (float) $product->price,
                    'image' => $image,
                    'url' => route('products.show', ['product' => $product->slug]),
                    'description' => $product->short_description ?: $product->description,
                    'category' => $product->category?->slug ?: $product->category?->name ?: 'other',
                    'categoryName' => $product->category?->name,
                    'brand' => $product->brand?->name,
                    'stock' => $product->stock,
                ];
            })
            ->values();
    }

    private function activeCategories()
    {
        return Category::query()
            ->where('is_active', true)
            ->whereHas('products', fn ($query) => $query->where('is_active', true))
            ->withCount(['products' => fn ($query) => $query->where('is_active', true)])
            ->orderBy('name')
            ->get(['id', 'name', 'slug'])
            ->map(fn (Category $category) => [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'count' => $category->products_count,
                'url' => "/shop?category={$category->slug}",
            ])
            ->values();
    }

    private function assetPath(?string $path): string
    {
        if (! $path) {
            return '';
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/storage/') || str_starts_with($path, '/images/')) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return is_file(public_path(ltrim($path, '/'))) ? $path : '';
        }

        if (is_file(public_path($path))) {
            return '/'.ltrim($path, '/');
        }

        return Storage::exists($path) ? Storage::url($path) : '';
    }

    private function image11Fallback(string $path, int $index, array $legacyPaths = []): string
    {
        if ($path === '' || in_array($path, $legacyPaths, true)) {
            return Images11::urlAt($index) ?: $path;
        }

        return $path;
    }
}
