<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\SiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorefrontController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $settings = SiteSetting::current();
        $user = $request->user();

        return response()->json([
            'settings' => [
                'siteName' => $settings->site_name,
                'navbar' => [
                    'logoPath' => $this->assetPath($settings->navbar_logo_path),
                    'homeLabel' => $settings->navbar_home_label,
                    'categoryLabel' => $settings->navbar_category_label,
                    'searchPlaceholder' => $settings->navbar_search_placeholder,
                    'links' => $settings->navbar_links ?? [],
                ],
                'hero' => [
                    'badge' => $settings->hero_badge,
                    'title' => trim(implode(' ', array_filter([$settings->hero_title, $settings->hero_title_accent]))),
                    'description' => $settings->hero_description,
                    'primaryButtonLabel' => $settings->hero_primary_button_label,
                    'primaryButtonUrl' => $settings->hero_primary_button_url,
                    'secondaryButtonLabel' => $settings->hero_secondary_button_label,
                    'secondaryButtonUrl' => $settings->hero_secondary_button_url,
                    'imagePath' => $this->assetPath($settings->hero_image_path),
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
                'isVerified' => (bool) $user?->hasVerifiedEmail(),
                'user' => $user ? [
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ],
        ]);
    }

    public function products(): JsonResponse
    {
        $products = Product::query()
            ->with(['brand:id,name', 'category:id,name,slug'])
            ->where('is_active', true)
            ->orderByDesc('id')
            ->get()
            ->map(function (Product $product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'sku' => $product->sku,
                    'price' => (float) $product->price,
                    'image' => $this->assetPath($product->featured_image),
                    'description' => $product->short_description ?: $product->description,
                    'category' => $product->category?->slug ?: $product->category?->name ?: 'other',
                    'categoryName' => $product->category?->name,
                    'brand' => $product->brand?->name,
                    'stock' => $product->stock,
                ];
            })
            ->values();

        return response()->json([
            'products' => $products,
        ]);
    }

    private function assetPath(?string $path): string
    {
        if (! $path) {
            return '';
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, '/')) {
            return $path;
        }

        return Storage::url($path);
    }
}
