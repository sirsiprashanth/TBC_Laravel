<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Set script timeout
set_time_limit(300);

echo "Starting property image fix...\n";

// Get all properties
$properties = Property::whereNull('images')->get();
$totalProperties = $properties->count();

echo "Found {$totalProperties} properties without images\n";

// Process sale properties first
$xmlFilePath = __DIR__ . '/raw_response.xml';
if (file_exists($xmlFilePath)) {
    echo "\nProcessing sale properties from raw_response.xml...\n";
    
    $xmlContent = file_get_contents($xmlFilePath);
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($xmlContent);
    
    if ($xml) {
        foreach ($xml->UnitDTO as $propertyData) {
            $refNo = (string)$propertyData->RefNo;
            $property = Property::where('reference_number', $refNo)->first();
            
            if ($property && empty($property->images)) {
                // Process images array if available
                $images = [];
                if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
                    foreach ($propertyData->Images->Image as $image) {
                        if (isset($image->ImageURL)) {
                            $images[] = (string)$image->ImageURL;
                        }
                    }
                }
                
                if (!empty($images)) {
                    $property->images = $images;
                    $property->save();
                    echo "Updated images for: {$property->property_name} ({$refNo}) - " . count($images) . " images\n";
                }
            }
        }
    }
}

// Process rental properties
$rentalFiles = ['rental_listings.xml', 'sales_listings.xml'];

foreach ($rentalFiles as $fileName) {
    $filePath = __DIR__ . '/' . $fileName;
    if (file_exists($filePath)) {
        echo "\nProcessing properties from {$fileName}...\n";
        
        $xmlContent = file_get_contents($filePath);
        libxml_use_internal_errors(true);
        $xml = simplexml_load_string($xmlContent);
        
        if ($xml) {
            foreach ($xml->UnitDTO as $propertyData) {
                $refNo = (string)$propertyData->RefNo;
                $property = Property::where('reference_number', $refNo)->first();
                
                if ($property && empty($property->images)) {
                    // Process images array if available
                    $images = [];
                    if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
                        foreach ($propertyData->Images->Image as $image) {
                            if (isset($image->ImageURL)) {
                                $images[] = (string)$image->ImageURL;
                            }
                        }
                    }
                    
                    if (!empty($images)) {
                        $property->images = $images;
                        $property->save();
                        echo "Updated images for: {$property->property_name} ({$refNo}) - " . count($images) . " images\n";
                    }
                }
            }
        }
    }
}

// Final count
$propertiesWithImages = Property::whereNotNull('images')->count();
$propertiesWithoutImages = Property::whereNull('images')->count();

echo "\nImage fix completed!\n";
echo "Properties with images: {$propertiesWithImages}\n";
echo "Properties without images: {$propertiesWithoutImages}\n";