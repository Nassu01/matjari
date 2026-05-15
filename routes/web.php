<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorefrontController;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/', StorefrontController::class)->name('storefront.home');
Route::get('/shop', StorefrontController::class)->name('storefront.shop');
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
});

require __DIR__.'/auth.php';
