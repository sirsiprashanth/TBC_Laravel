<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;

// Check both sales and rental properties
echo "Checking Sales Properties:\n";
echo "------------------------\n";
$salesProperties = Property::where(function($query) {
    $query->where('is_rental', false)
          ->orWhereNull('is_rental');
})->get();

$salesWithImages = 0;
$salesWithoutImages = 0;

foreach ($salesProperties as $property) {
    echo "Property: {$property->property_name} (Ref: {$property->reference_number})\n";
    
    if (!empty($property->images) && is_array($property->images)) {
        echo "  Has " . count($property->images) . " images:\n";
        foreach ($property->images as $i => $imageUrl) {
            echo "  {$i}: {$imageUrl}\n";
        }
        $salesWithImages++;
    } else {
        echo "  No images found\n";
        $salesWithoutImages++;
    }
    echo "\n";
}

echo "\nSales Properties Summary:\n";
echo "Total: " . count($salesProperties) . "\n";
echo "With images: " . $salesWithImages . "\n";
echo "Without images: " . $salesWithoutImages . "\n";

echo "\n\nChecking Rental Properties:\n";
echo "--------------------------\n";
$rentalProperties = Property::where('is_rental', true)->get();

$rentalsWithImages = 0;
$rentalsWithoutImages = 0;

foreach ($rentalProperties as $property) {
    echo "Property: {$property->property_name} (Ref: {$property->reference_number})\n";
    
    if (!empty($property->images) && is_array($property->images)) {
        echo "  Has " . count($property->images) . " images:\n";
        foreach ($property->images as $i => $imageUrl) {
            echo "  {$i}: {$imageUrl}\n";
        }
        $rentalsWithImages++;
    } else {
        echo "  No images found\n";
        $rentalsWithoutImages++;
    }
    echo "\n";
}

echo "\nRental Properties Summary:\n";
echo "Total: " . count($rentalProperties) . "\n";
echo "With images: " . $rentalsWithImages . "\n";
echo "Without images: " . $rentalsWithoutImages . "\n";