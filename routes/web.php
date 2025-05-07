<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return Inertia::render('Backend/Dashboard');
});

Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/backend/dashboard', function () {
        return Inertia::render('Backend/Dashboard');
    })->name('backend.dashboard');
    Route::get('/backend/products', [App\Http\Controllers\ProductController::class, 'index'])->name('backend.products');
    Route::get('/backend/products/{product}', [App\Http\Controllers\ProductController::class, 'show'])->name('backend.products.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/backend/profile', [App\Http\Controllers\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/backend/profile', [App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/backend/profile', [App\Http\Controllers\ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
