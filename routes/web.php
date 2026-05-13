<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StorefrontController;
use Illuminate\Support\Facades\Route;

Route::get('/', StorefrontController::class)->name('storefront.home');
Route::get('/shop', StorefrontController::class)->name('storefront.shop');
Route::get('/cart', StorefrontController::class)->name('storefront.cart');
Route::get('/privacy', StorefrontController::class)->name('storefront.privacy');
Route::get('/terms', StorefrontController::class)->name('storefront.terms');
Route::get('/contact', StorefrontController::class)->name('storefront.contact');
Route::get('/about', StorefrontController::class)->name('storefront.about');

Route::get('/dashboard', DashboardController::class)->middleware('auth')->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/favorite', StorefrontController::class)->name('storefront.favorite');
    Route::get('/order', StorefrontController::class)->name('storefront.order');
    Route::get('/checkout', StorefrontController::class)->name('storefront.checkout');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
