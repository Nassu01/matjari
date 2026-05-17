<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorefrontController;
use App\Http\Middleware\EnsureActiveRole;
use App\Http\Middleware\EnsureRole;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

Route::get('/', StorefrontController::class)->name('storefront.home');
Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/search', [ProductController::class, 'search'])->name('search');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');
Route::get('/cart', fn () => Inertia::render('Cart'))->name('cart');
Route::redirect('/favorite', '/account/favorites')->name('storefront.favorite');
Route::get('/privacy', StorefrontController::class)->name('storefront.privacy');
Route::get('/terms', StorefrontController::class)->name('storefront.terms');
Route::get('/contact', StorefrontController::class)->name('storefront.contact');
Route::get('/about', StorefrontController::class)->name('storefront.about');

Route::get('/dashboard', DashboardController::class)->middleware('auth')->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/order', StorefrontController::class)->name('storefront.order');
    Route::get('/checkout', StorefrontController::class)->name('storefront.checkout');
    Route::get('/support', StorefrontController::class)->name('support');

    Route::redirect('/account/profile', '/profile')->name('account.profile');
    Route::get('/account/orders', function (Request $request) {
        $orders = $request->user()->orders()
            ->latest()
            ->get()
            ->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'payment_status' => $order->payment_status,
                'total' => (float) $order->total,
                'created_at' => $order->created_at?->toFormattedDateString(),
            ]);

        return Inertia::render('Account/Orders', [
            'orders' => $orders,
        ]);
    })->name('account.orders');
    Route::get('/account/orders/{id}', StorefrontController::class)->name('account.orders.show');
    Route::get('/account/favorites', fn () => Inertia::render('Account/Favorites', [
        'favoriteProducts' => [],
    ]))->name('account.favorites');
    Route::get('/account/addresses', fn () => Inertia::render('Account/Addresses', [
        'addresses' => [],
    ]))->name('account.addresses');
    Route::get('/account/payment', fn () => Inertia::render('Account/Payment'))->name('account.payment');
    Route::get('/account/password', fn () => Inertia::render('Account/Password'))->name('account.password');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware([EnsureRole::class.':commercant'])->group(function () {
        Route::get('/merchant/pending', function (Request $request) {
            $user = $request->user();
            $company = $user->company;

            return Inertia::render('Merchant/Pending', [
                'company' => $company ? [
                    'status' => $company->status,
                ] : null,
            ]);
        })->name('merchant.pending');
    });

    Route::middleware([EnsureRole::class.':commercant', EnsureActiveRole::class.':commercant'])->group(function () {
        Route::get('/merchant/dashboard', function (Request $request) {
            $user = $request->user();
            $company = $user->company;
            $products = $user->merchantProducts()->get();
            $orders = $user->merchantOrders()->get();

            $productSummary = [
                'total' => $products->count(),
                'active' => $products->where('is_active', true)->count(),
                'pending' => 0,
                'refused' => 0,
            ];

            $orderSummary = [
                'total' => $orders->count(),
                'pending' => $orders->where('status', 'pending')->count(),
                'preparing' => $orders->whereIn('status', ['processing', 'preparing'])->count(),
                'shipped' => $orders->whereIn('status', ['shipped', 'shipping'])->count(),
                'delivered' => $orders->where('status', 'delivered')->count(),
            ];

            $stockSummary = [
                'in_stock' => $products->where('stock', '>', 0)->count(),
                'out_of_stock' => $products->where('stock', '<=', 0)->count(),
                'low_stock' => $products->where('stock', '<=', 5)->where('stock', '>', 0)->count(),
            ];

            $popularProducts = $products->sortByDesc(fn ($product) => $product->orderItems()->count())->take(3)->map(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
            ])->values();

            return Inertia::render('Merchant/Dashboard', [
                'company' => $company ? [
                    'company_name' => $company->company_name,
                    'city' => $company->city,
                    'status' => $company->status,
                ] : null,
                'productSummary' => $productSummary,
                'orderSummary' => $orderSummary,
                'stockSummary' => $stockSummary,
                'stats' => [
                    'total_sales' => $orders->count(),
                    'estimated_revenue' => $orders->sum('total'),
                    'top_product' => $popularProducts->first()['name'] ?? 'Aucun produit',
                    'popular_products' => $popularProducts,
                ],
            ]);
        })->name('merchant.dashboard');

        Route::get('/merchant/products', function (Request $request) {
            $products = $request->user()->merchantProducts()->with('category')->latest()->get();

            return Inertia::render('Merchant/Products', [
                'products' => $products->map(fn ($product) => [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => (float) $product->price,
                    'stock' => $product->stock,
                    'is_active' => $product->is_active,
                    'category' => $product->category?->name,
                ]),
            ]);
        })->name('merchant.products');

        Route::get('/merchant/products/create', function () {
            $categories = Category::query()->orderBy('name')->get(['id', 'name']);

            return Inertia::render('Merchant/CreateProduct', [
                'categories' => $categories,
            ]);
        })->name('merchant.products.create');

        Route::get('/merchant/company', function (Request $request) {
            $company = $request->user()->company;

            return Inertia::render('Merchant/Company', [
                'company' => $company,
            ]);
        })->name('merchant.company');

        Route::get('/merchant/statistics', function (Request $request) {
            $products = $request->user()->merchantProducts()->get();
            $orders = $request->user()->merchantOrders()->get();

            return Inertia::render('Merchant/Statistics', [
                'products' => $products->count(),
                'orders' => $orders->count(),
                'revenue' => $orders->sum('total'),
            ]);
        })->name('merchant.statistics');
    });

    Route::middleware([EnsureRole::class.':livreur'])->group(function () {
        Route::get('/delivery/pending', function (Request $request) {
            $profile = $request->user()->deliveryProfile;

            return Inertia::render('Delivery/Pending', [
                'deliveryProfile' => $profile ? ['status' => $profile->status] : null,
            ]);
        })->name('delivery.pending');
    });

    Route::middleware([EnsureRole::class.':livreur', EnsureActiveRole::class.':livreur'])->group(function () {
        Route::get('/delivery/dashboard', function (Request $request) {
            $user = $request->user();
            $profile = $user->deliveryProfile;
            $today = now()->startOfDay();

            $allOrders = Order::query()
                ->where('status', '!=', 'cancelled')
                ->get();

            $availableOrders = $allOrders->whereIn('status', ['waiting_for_delivery', 'ready_for_delivery'])->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'customer_phone' => $order->customer_phone,
                'shipping_address' => $order->customer_address ?? 'Adresse inconnue',
                'total' => (float) $order->total,
                'status' => $order->status,
            ])->values();

            $currentOrders = $allOrders->where('status', 'on_delivery')->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'shipping_address' => $order->customer_address ?? 'Adresse inconnue',
                'total' => (float) $order->total,
                'status' => $order->status,
            ])->values();

            $historyOrders = $allOrders->where('status', 'delivered')->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer_name,
                'shipping_address' => $order->customer_address ?? 'Adresse inconnue',
                'total' => (float) $order->total,
                'status' => $order->status,
                'delivered_at' => $order->shipped_at?->toFormattedDateString(),
            ])->values();

            return Inertia::render('Delivery/Dashboard', [
                'deliveryProfile' => $profile ? [
                    'city' => $profile->city,
                    'delivery_zone' => $profile->delivery_zone,
                    'vehicle_type' => $profile->vehicle_type,
                    'status' => $profile->status,
                ] : null,
                'summary' => [
                    'total_deliveries' => $historyOrders->count() + $currentOrders->count(),
                    'today_deliveries' => $allOrders->where('created_at', '>=', $today)->count(),
                    'ongoing_deliveries' => $currentOrders->count(),
                    'completed_deliveries' => $historyOrders->count(),
                ],
                'availableOrders' => $availableOrders,
                'currentOrders' => $currentOrders,
                'historyOrders' => $historyOrders,
            ]);
        })->name('delivery.dashboard');

        Route::get('/delivery/orders', function () {
            return Inertia::render('Delivery/Orders', []);
        })->name('delivery.orders');

        Route::get('/delivery/orders/available', function () {
            return Inertia::render('Delivery/OrdersAvailable', []);
        })->name('delivery.orders.available');

        Route::get('/delivery/orders/current', function () {
            return Inertia::render('Delivery/OrdersCurrent', []);
        })->name('delivery.orders.current');

        Route::get('/delivery/orders/history', function () {
            return Inertia::render('Delivery/OrdersHistory', []);
        })->name('delivery.orders.history');

        Route::get('/delivery/profile', function (Request $request) {
            return Inertia::render('Delivery/Profile', [
                'deliveryProfile' => $request->user()->deliveryProfile,
            ]);
        })->name('delivery.profile');
    });
});

require __DIR__.'/auth.php';
