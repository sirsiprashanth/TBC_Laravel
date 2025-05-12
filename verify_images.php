<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;

// Check sales properties
$salesProperties = Property::where(function($query) {
    $query->where('is_rental', false)
          ->orWhereNull('is_rental');
})->get();

$salesWithImages = 0;
foreach ($salesProperties as $property) {
    if (!empty($property->images) && is_array($property->images) && count($property->images) > 0) {
        $salesWithImages++;
    }
}

echo "Sales properties with images: $salesWithImages out of " . count($salesProperties) . "\n";

// Check rental properties
$rentalProperties = Property::where('is_rental', true)->get();

$rentalsWithImages = 0;
foreach ($rentalProperties as $property) {
    if (!empty($property->images) && is_array($property->images) && count($property->images) > 0) {
        $rentalsWithImages++;
    }
}

echo "Rental properties with images: $rentalsWithImages out of " . count($rentalProperties) . "\n";