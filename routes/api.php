<?php

use App\Http\Controllers\Api\StorefrontController;
use Illuminate\Support\Facades\Route;

Route::get('/storefront', [StorefrontController::class, 'index']);
Route::get('/storefront/products', [StorefrontController::class, 'products']);
