<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\BlogPost;
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
        $navbarLinks = $this->navbarLinks($settings, $categories);
        $heroTitle = trim(implode(' ', array_filter([$settings->hero_title, $settings->hero_title_accent])));
        $heroFallback = [
            'badge' => $settings->hero_badge,
            'title' => $heroTitle,
            'description' => $settings->hero_description,
            'primaryButtonLabel' => $settings->hero_primary_button_label,
            'primaryButtonUrl' => $settings->hero_primary_button_url,
            'secondaryButtonLabel' => $settings->hero_secondary_button_label,
            'secondaryButtonUrl' => $settings->hero_secondary_button_url,
            'imagePath' => $this->image11Fallback($heroImagePath, 1, ['/images/HeroPage.png']),
        ];

        return response()->json([
            'settings' => [
                'siteName' => $settings->site_name,
                'navbar' => [
                    'logoPath' => $this->image11Fallback($logoPath, 0, ['/images/Logo.png']),
                    'homeLabel' => $settings->navbar_home_label,
                    'categoryLabel' => $settings->navbar_category_label,
                    'searchPlaceholder' => $settings->navbar_search_placeholder,
                    'links' => $navbarLinks,
                ],
                'hero' => [
                    ...$heroFallback,
                    'statOneValue' => $settings->hero_stat_one_value,
                    'statOneLabel' => $settings->hero_stat_one_label,
                    'statTwoValue' => $settings->hero_stat_two_value,
                    'statTwoLabel' => $settings->hero_stat_two_label,
                    'slides' => $this->heroSlides($settings, $heroFallback),
                ],
                'promo' => [
                    'badge' => $settings->promo_badge,
                    'title' => $settings->promo_title,
                    'description' => $settings->promo_description,
                    'buttonLabel' => $settings->promo_button_label,
                    'buttonUrl' => $settings->promo_button_url,
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
            'products' => $products->take(240)->values(),
            'blogPosts' => $this->blogPosts(),
            'catalogMenu' => $this->catalogMenu(),
        ]);
    }

    private function navbarLinks(SiteSetting $settings, $categories)
    {
        $links = collect($settings->navbar_links ?? [])
            ->filter(fn ($link) => is_array($link) && filled($link['label'] ?? null))
            ->map(fn (array $link) => $this->storefrontLink($link['label'], $link['url'] ?? '/shop'))
            ->values();

        if ($links->isNotEmpty()) {
            return $links;
        }

        return $categories->map(fn (array $category) => [
            'icon' => Str::upper(Str::substr($category['name'], 0, 2)),
            'label' => $category['name'],
            'name' => $category['name'],
            'slug' => $category['slug'],
            'url' => "/shop?category={$category['slug']}",
        ])->values();
    }

    private function storefrontLink(string $label, ?string $url): array
    {
        $url = filled($url) ? $url : '/shop';
        $slug = Str::of($url)->after('category=')->before('&')->slug()->value()
            ?: Str::slug($label);

        return [
            'icon' => Str::upper(Str::substr($label, 0, 2)),
            'label' => $label,
            'name' => $label,
            'slug' => $slug,
            'url' => $url,
        ];
    }

    private function heroSlides(SiteSetting $settings, array $heroFallback): array
    {
        $fallbacks = [
            $heroFallback,
            [
                'badge' => 'Full Gallery',
                'title' => 'Every File, One Storefront',
                'description' => '',
                'primaryButtonLabel' => 'Shop Now',
                'primaryButtonUrl' => '/shop',
                'secondaryButtonLabel' => 'Learn More',
                'secondaryButtonUrl' => '#about',
                'imagePath' => Images11::urlAt(1) ?: '',
            ],
            [
                'badge' => 'Fresh Source',
                'title' => 'Browse the Complete Set',
                'description' => '',
                'primaryButtonLabel' => 'Shop Now',
                'primaryButtonUrl' => '/shop',
                'secondaryButtonLabel' => 'Learn More',
                'secondaryButtonUrl' => '#about',
                'imagePath' => Images11::urlAt(2) ?: '',
            ],
        ];

        return collect($settings->banner_slides ?? [])
            ->take(3)
            ->map(fn (array $slide, int $index) => $this->heroSlide($slide, $fallbacks[$index] ?? $fallbacks[0]))
            ->pad(3, null)
            ->map(fn ($slide, int $index) => $slide ?? $fallbacks[$index])
            ->values()
            ->all();
    }

    private function heroSlide(array $slide, array $fallback): array
    {
        $imagePath = $this->assetPath($slide['image'] ?? null);

        return [
            'badge' => filled($slide['badge'] ?? null) ? $slide['badge'] : $fallback['badge'],
            'title' => filled($slide['title'] ?? null) ? $slide['title'] : $fallback['title'],
            'description' => filled($slide['description'] ?? null) ? $slide['description'] : $fallback['description'],
            'primaryButtonLabel' => filled($slide['button_label'] ?? null) ? $slide['button_label'] : $fallback['primaryButtonLabel'],
            'primaryButtonUrl' => filled($slide['button_url'] ?? null) ? $slide['button_url'] : $fallback['primaryButtonUrl'],
            'secondaryButtonLabel' => filled($slide['secondary_button_label'] ?? null) ? $slide['secondary_button_label'] : $fallback['secondaryButtonLabel'],
            'secondaryButtonUrl' => filled($slide['secondary_button_url'] ?? null) ? $slide['secondary_button_url'] : $fallback['secondaryButtonUrl'],
            'imagePath' => $imagePath ?: $fallback['imagePath'],
        ];
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
                $images = $this->galleryUrls($product);
                $image = $images[0] ?? (Images11::urlAt($index) ?: '/images/logomatjari.png');

                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'sku' => $product->sku,
                    'price' => (float) $product->price,
                    'image' => $image,
                    'images' => $images,
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

    private function galleryUrls(Product $product): array
    {
        return collect([$product->featured_image])
            ->merge(is_array($product->images) ? $product->images : [])
            ->map(fn ($path) => is_string($path) ? $this->assetPath($path) : '')
            ->filter()
            ->unique()
            ->values()
            ->all();
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

    private function catalogMenu()
    {
        return Category::query()
            ->where('is_active', true)
            ->whereHas('products', fn ($query) => $query->where('is_active', true))
            ->withCount(['products' => fn ($query) => $query->where('is_active', true)])
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'description'])
            ->map(function (Category $category) {
                $products = $category->products()
                    ->where('is_active', true)
                    ->latest()
                    ->limit(8)
                    ->get(['id', 'name', 'slug'])
                    ->map(fn (Product $product) => [
                        'id' => $product->id,
                        'name' => $product->name,
                        'slug' => $product->slug,
                        'url' => route('products.show', ['product' => $product->slug]),
                    ])
                    ->values();

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description ?: $this->categoryDescription($category->slug, $category->name),
                    'count' => $category->products_count,
                    'url' => "/shop?category={$category->slug}",
                    'products' => $products,
                ];
            })
            ->values();
    }

    private function categoryDescription(string $slug, string $name): string
    {
        return match ($slug) {
            'bags' => 'Sacs pratiques et elegants pour accompagner chaque journee.',
            'shoes' => 'Chaussures confortables et stylisees pour toutes les saisons.',
            'accessories' => 'Accessoires, montres et details utiles pour completer votre style.',
            'electronics' => 'Produits tech, audio et appareils connectes pour le quotidien.',
            'clothing' => 'Pieces mode faciles a porter, selectionnees pour tous les jours.',
            default => "Selection MATJARI autour de {$name}.",
        };
    }

    private function blogPosts()
    {
        return BlogPost::query()
            ->published()
            ->latest('published_at')
            ->latest()
            ->limit(8)
            ->get()
            ->map(function (BlogPost $post) {
                $publishedAt = $post->published_at ?: $post->created_at;

                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'category' => $post->category,
                    'author' => $post->author,
                    'date' => $publishedAt?->translatedFormat('d M') ?? '',
                    'day' => $publishedAt?->format('d') ?? '',
                    'month' => $publishedAt?->translatedFormat('M') ?? '',
                    'image' => $this->assetPath($post->featured_image) ?: (Images11::urlAt(18) ?: '/images/logomatjari.png'),
                    'excerpt' => $post->excerpt,
                    'views' => $post->views_count,
                    'comments' => 0,
                    'url' => route('blog.show', ['slug' => $post->slug]),
                ];
            })
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

        if (str_starts_with($path, 'storage/')) {
            return '/'.$path;
        }

        if (str_starts_with($path, '/')) {
            return is_file(public_path(ltrim($path, '/'))) ? $path : '';
        }

        if (is_file(public_path($path))) {
            return '/'.ltrim($path, '/');
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
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
