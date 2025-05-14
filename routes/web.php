<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/sell', [App\Http\Controllers\PropertyController::class, 'sell'])->name('sell');

Route::get('/rent', [App\Http\Controllers\PropertyController::class, 'rent'])->name('rent');

Route::get('/off-plan', function () {
    return Inertia::render('OffPlan');
})->name('off-plan');

Route::get('/about-us', function () {
    return Inertia::render('AboutUs');
})->name('about-us');

Route::get('/blogs', function () {
    return Inertia::render('Blogs');
})->name('blogs');

Route::get('/contact-us', function () {
    return Inertia::render('ContactUs');
})->name('contact-us');

// Property routes
Route::get('/properties', [App\Http\Controllers\PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/{property}', [App\Http\Controllers\PropertyController::class, 'show'])->name('properties.show');
// Admin routes
Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    // Import properties (must be before resource routes to prevent conflicts)
    Route::get('/properties/import', function() {
        return Inertia::render('Admin/Properties/Import');
    })->name('properties.import');
    
    // Property management
    Route::resource('properties', App\Http\Controllers\Admin\PropertyController::class);
    
    // Additional property actions
    Route::put('/properties/{property}/toggle-active', [App\Http\Controllers\Admin\PropertyController::class, 'toggleActive'])->name('properties.toggle-active');
    Route::put('/properties/{property}/toggle-featured', [App\Http\Controllers\Admin\PropertyController::class, 'toggleFeatured'])->name('properties.toggle-featured');
});
Route::get('/api/properties/feed.xml', [App\Http\Controllers\PropertyController::class, 'xmlFeed'])->name('properties.xml-feed');
Route::get('/api/properties/sales', [App\Http\Controllers\PropertyController::class, 'getSalesApi'])->name('properties.sales-api');
Route::get('/api/properties/rentals', [App\Http\Controllers\PropertyController::class, 'getRentalsApi'])->name('properties.rentals-api');
Route::get('/api/properties/test', [App\Http\Controllers\PropertyController::class, 'getTestApi'])->name('properties.test-api');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
