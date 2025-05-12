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

// API credentials
$accessCode = '@Dlux$@r!(OllE(Tio$n';
$groupCode = '5082';

// URL with proper URL encoding for special characters
$url = "https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=" . urlencode($accessCode) .
      "&GroupCode=" . $groupCode .
      "&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

echo "Fetching rental data from API...\n";

// Set browser-like headers
$headers = [
    'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language: en-US,en;q=0.9',
];

// Initialize cURL session
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

// Execute cURL session
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    die('cURL error: ' . curl_error($ch));
}

// Get HTTP status code
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($httpCode != 200) {
    die('HTTP error: ' . $httpCode);
}

// Close cURL session
curl_close($ch);

echo "API request completed successfully.\n";
echo "Response length: " . strlen($response) . " bytes\n";

// Save raw XML response to file
$xmlFile = __DIR__ . '/rental_listings.xml';
file_put_contents($xmlFile, $response);
echo "Raw XML saved to: $xmlFile\n";

// Process the XML
try {
    // Load XML from string
    libxml_use_internal_errors(true);
    $xml = simplexml_load_string($response);
    
    if (!$xml) {
        $errors = libxml_get_errors();
        libxml_clear_errors();
        
        echo "XML parsing errors:\n";
        foreach ($errors as $error) {
            echo "  " . $error->message . "\n";
        }
        die();
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
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    Log::error("Error in rental images import script: " . $e->getMessage());
    Log::error($e->getTraceAsString());
}

echo "\nDone!\n";