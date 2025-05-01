<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PropertyApiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/sell', function () {
    return Inertia::render('Sell');
})->name('sell');

Route::get('/rent', function () {
    return Inertia::render('Rent');
})->name('rent');

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

// Property API routes
Route::get('/api/properties/sales', [PropertyApiController::class, 'getSalesListings']);
Route::get('/api/properties/rentals', [PropertyApiController::class, 'getRentalListings']);
Route::get('/api/properties/test', [PropertyApiController::class, 'getTestProperties']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
