<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Function to process images from XML
function processPropertyImages($xmlFilePath) {
    if (!file_exists($xmlFilePath)) {
        echo "XML file not found: $xmlFilePath\n";
        return false;
    }

    // Read the XML file content
    $xmlContent = file_get_contents($xmlFilePath);
    echo "Read " . strlen($xmlContent) . " bytes from XML file\n";

    // Try to parse the XML
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($xmlContent);

    if (!$xml) {
        $errors = libxml_get_errors();
        echo "XML parsing errors:\n";
        foreach ($errors as $error) {
            echo "  Line " . $error->line . ": " . $error->message . "\n";
        }
        libxml_clear_errors();
        return false;
    }

    $propertiesUpdated = 0;
    $imagesAdded = 0;

    // Process each property in the XML
    foreach ($xml->UnitDTO as $propertyData) {
        $refNo = (string)$propertyData->RefNo;
        echo "Processing property: $refNo\n";

        // Find property in database
        $property = Property::where('reference_number', $refNo)->first();
        
        if (!$property) {
            echo "  Property not found in database\n";
            continue;
        }

        // Extract all image URLs
        $images = [];
        if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
            foreach ($propertyData->Images->Image as $image) {
                if (isset($image->ImageURL) && !empty((string)$image->ImageURL)) {
                    $images[] = (string)$image->ImageURL;
                }
            }
        }

        if (count($images) > 0) {
            echo "  Found " . count($images) . " images\n";
            
            // Update the property with images
            $property->images = $images;
            $property->save();
            
            $propertiesUpdated++;
            $imagesAdded += count($images);
            
            echo "  Updated property with images\n";
        } else {
            echo "  No images found for this property\n";
        }
    }

    echo "\nSummary:\n";
    echo "Properties updated: $propertiesUpdated\n";
    echo "Total images added: $imagesAdded\n";
    
    return true;
}

// Process the sales properties XML
echo "Processing sales properties XML...\n";
$salesResult = processPropertyImages(__DIR__ . '/sales_listings.xml');

echo "\nDone!\n";