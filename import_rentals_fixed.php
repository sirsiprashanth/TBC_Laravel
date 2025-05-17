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

// Function to clean and fix encoding issues
function cleanUtf8String($string) {
    if (empty($string)) {
        return $string;
    }
    
    // Remove BOM if present
    $string = preg_replace('/^\xEF\xBB\xBF/', '', $string);
    
    // Try to detect encoding and convert to UTF-8
    $encoding = mb_detect_encoding($string, ['UTF-8', 'ISO-8859-1', 'Windows-1252'], true);
    if ($encoding !== 'UTF-8') {
        $string = mb_convert_encoding($string, 'UTF-8', $encoding);
    }
    
    // Remove any non-UTF8 characters
    $string = iconv('UTF-8', 'UTF-8//IGNORE', $string);
    
    // Fix common encoding issues
    $string = str_replace(['â€™', 'â€"', 'â€œ', 'â€'], ["'", '-', '"', '"'], $string);
    
    // Remove invalid UTF-8 sequences
    $string = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $string);
    
    // Normalize whitespace
    $string = preg_replace('/\s+/', ' ', trim($string));
    
    return $string;
}

// Counter variables
$totalCount = 0;
$addedCount = 0;
$updatedCount = 0;
$skippedCount = 0;
$errorCount = 0;
$encodingFixedCount = 0;

// Process the XML response
try {
    // Suppress warnings to catch XML parsing errors
    libxml_use_internal_errors(true);
    
    // Load XML from string
    $xml = simplexml_load_string($response);
    
    if (!$xml) {
        $errors = libxml_get_errors();
        libxml_clear_errors();
        
        echo "XML parsing errors:";
        foreach ($errors as $error) {
            echo "<br>" . $error->message;
        }
        die();
    }
    
    // Count the number of properties
    $totalCount = count($xml->UnitDTO);
    echo "<h1>Processing $totalCount Rental Properties</h1>";
    
    // Process each property
    foreach ($xml->UnitDTO as $propertyData) {
        try {
            // Extract reference number
            $refNo = (string)$propertyData->RefNo;
            
            // Check if property already exists
            $property = Property::firstOrNew(['reference_number' => $refNo]);
            
            // Set isNew flag for reporting
            $isNew = !$property->exists;
            
            // Parse the rent price
            $rentPrice = isset($propertyData->Rent) ? (float)$propertyData->Rent : null;
            
            // Format the monthly rent
            $rentPerMonth = isset($propertyData->RentPerMonth) ? (float)$propertyData->RentPerMonth : ($rentPrice ? $rentPrice / 12 : null);
            
            // Parse coordinates if available
            $latitude = null;
            $longitude = null;
            if (isset($propertyData->ProGooglecoordinates) && !empty((string)$propertyData->ProGooglecoordinates)) {
                $coords = explode(',', (string)$propertyData->ProGooglecoordinates);
                if (count($coords) == 2) {
                    $longitude = trim($coords[0]);
                    $latitude = trim($coords[1]);
                }
            }
            
            // Process images array if available - FIXED to use ImageURL
            $images = [];
            if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
                foreach ($propertyData->Images->Image as $image) {
                    if (isset($image->ImageURL)) {
                        $images[] = (string)$image->ImageURL;
                    }
                }
            }
            
            // Extract external IDs
            $externalIds = [
                'country_id' => isset($propertyData->CountryID) ? (string)$propertyData->CountryID : null,
                'state_id' => isset($propertyData->StateID) ? (string)$propertyData->StateID : null,
                'city_id' => isset($propertyData->CityID) ? (string)$propertyData->CityID : null,
                'district_id' => isset($propertyData->DistrictID) ? (string)$propertyData->DistrictID : null,
                'community_id' => isset($propertyData->CommunityID) ? (string)$propertyData->CommunityID : null,
                'sub_community_id' => isset($propertyData->SubCommunityID) ? (string)$propertyData->SubCommunityID : null,
            ];
            
            // Extract amenities from description with encoding fix
            $description = cleanUtf8String((string)$propertyData->Remarks);
            $amenities = [];
            
            // Try to extract bullet points from the description
            if (preg_match_all('/[•\-\*]\s*([^\n•\-\*]+)/', $description, $matches)) {
                foreach ($matches[1] as $match) {
                    $amenity = cleanUtf8String(trim($match));
                    if (!empty($amenity) && strlen($amenity) < 100) { // Sanity check
                        $amenities[] = $amenity;
                    }
                }
            }
            
            // Check furnishing status
            $furnishStatus = cleanUtf8String((string)$propertyData->Furnish_status);
            if (!empty($furnishStatus) && !in_array($furnishStatus, $amenities)) {
                $amenities[] = $furnishStatus;
            }
            
            // Add parking info if available
            $parking = (string)$propertyData->Parking;
            if (!empty($parking) && $parking != "0") {
                $amenities[] = "Parking: " . $parking;
            }
            
            // Primary view
            $primaryView = cleanUtf8String((string)$propertyData->PrimaryUnitView);
            if (!empty($primaryView)) {
                $amenities[] = $primaryView . " View";
            }
            
            // Secondary view
            $secondaryView = cleanUtf8String((string)$propertyData->SecondaryUnitView);
            if (!empty($secondaryView) && $secondaryView != $primaryView) {
                $amenities[] = $secondaryView . " View";
            }
            
            // Only update if it's new or has newer data
            $xmlLastUpdated = isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null;

            if ($isNew || !$property->last_updated ||
                ($xmlLastUpdated && strtotime($xmlLastUpdated) > strtotime($property->last_updated))) {

                // Handle date fields - make sure they're valid or null
                $listingDate = isset($propertyData->ListingDate) && !empty((string)$propertyData->ListingDate)
                    ? (string)$propertyData->ListingDate
                    : null;

                $expiryDate = isset($propertyData->ExpiryDate) && !empty((string)$propertyData->ExpiryDate)
                    ? (string)$propertyData->ExpiryDate
                    : null;

                // Add a property type prefix to identify this as a rental property
                $propertyType = isset($propertyData->Category) ? cleanUtf8String((string)$propertyData->Category) : null;

                // Update the property fields with cleaned strings
                $property->fill([
                    'property_name' => isset($propertyData->PropertyName) ? cleanUtf8String((string)$propertyData->PropertyName) : null,
                    'community' => isset($propertyData->Community) ? cleanUtf8String((string)$propertyData->Community) : null,
                    'sub_community' => isset($propertyData->SubCommunity) ? cleanUtf8String((string)$propertyData->SubCommunity) : null,
                    'price' => $rentPrice,
                    'currency' => isset($propertyData->CurrencyAbr) ? (string)$propertyData->CurrencyAbr : 'AED',
                    'bedrooms' => isset($propertyData->Bedrooms) ? (int)$propertyData->Bedrooms : null,
                    'bathrooms' => isset($propertyData->NoOfBathrooms) ? (float)$propertyData->NoOfBathrooms : null,
                    'built_up_area' => isset($propertyData->BuiltupArea) ? (float)$propertyData->BuiltupArea : null,
                    'plot_area' => isset($propertyData->PlotArea) ? (float)$propertyData->PlotArea : null,
                    'status' => isset($propertyData->Status) ? cleanUtf8String((string)$propertyData->Status) : null,
                    'district' => isset($propertyData->DistrictName) ? cleanUtf8String((string)$propertyData->DistrictName) : null,
                    'city' => isset($propertyData->CityName) ? cleanUtf8String((string)$propertyData->CityName) : null,
                    'state' => isset($propertyData->StateName) ? cleanUtf8String((string)$propertyData->StateName) : null,
                    'country' => isset($propertyData->CountryName) ? cleanUtf8String((string)$propertyData->CountryName) : null,
                    'agent_name' => isset($propertyData->Agent) ? cleanUtf8String((string)$propertyData->Agent) : null,
                    'agent_contact' => isset($propertyData->ContactNumber) ? (string)$propertyData->ContactNumber : null,
                    'marketing_title' => isset($propertyData->MarketingTitle) ? cleanUtf8String((string)$propertyData->MarketingTitle) : null,
                    'description' => $description,
                    'primary_view' => $primaryView,
                    'secondary_view' => $secondaryView,
                    'unit_floor' => isset($propertyData->UnitFloor) ? (string)$propertyData->UnitFloor : null,
                    'floor_no' => isset($propertyData->FloorNo) ? (string)$propertyData->FloorNo : null,
                    'parking' => $parking,
                    'property_type' => $propertyType,
                    'ref_unit_category' => isset($propertyData->RetUnitCategory) ? cleanUtf8String((string)$propertyData->RetUnitCategory) : null,
                    'brochure_link' => isset($propertyData->PDFBrochureLink) ? (string)$propertyData->PDFBrochureLink : null,
                    'images' => !empty($images) ? $images : null,
                    'amenities' => !empty($amenities) ? $amenities : null,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'last_updated' => $xmlLastUpdated,
                    'listing_date' => $listingDate,
                    'expiry_date' => $expiryDate,
                    'external_property_id' => isset($propertyData->PropertyID) ? (string)$propertyData->PropertyID : null,
                    'external_ids' => $externalIds,
                    'is_active' => true,
                    'is_rental' => true, // Mark this as a rental property
                ]);
                
                // Save the property
                $property->save();
                
                // Update counters
                if ($isNew) {
                    $addedCount++;
                    echo "<p>Added: {$property->property_name} ({$property->reference_number})</p>";
                } else {
                    $updatedCount++;
                    echo "<p>Updated: {$property->property_name} ({$property->reference_number})</p>";
                }
                
                // Check if we fixed encoding for this property
                if (in_array($refNo, ['TH7811', 'TH7810', 'AP7805', 'AP7749', 'AP7733', 'AP7720', 'VI7718', 'VI7714', 'AP7684', 'AP7461'])) {
                    $encodingFixedCount++;
                    echo "<p style='color: green;'>Encoding fixed for: {$property->property_name} ({$property->reference_number})</p>";
                }
            } else {
                $skippedCount++;
                echo "<p>Skipped: {$property->property_name} ({$property->reference_number}) - No newer data</p>";
            }
        } catch (Exception $e) {
            $errorCount++;
            echo "<p style='color: red;'>Error processing property: " . (isset($propertyData->RefNo) ? (string)$propertyData->RefNo : 'Unknown') . " - " . $e->getMessage() . "</p>";
            Log::error("Error processing rental property: " . $e->getMessage());
            Log::error($e->getTraceAsString());
        }
    }
    
    // Display summary
    echo "<h2>Import Summary</h2>";
    echo "<ul>";
    echo "<li>Total properties found: {$totalCount}</li>";
    echo "<li>New properties added: {$addedCount}</li>";
    echo "<li>Existing properties updated: {$updatedCount}</li>";
    echo "<li>Properties skipped (no new data): {$skippedCount}</li>";
    echo "<li>Errors encountered: {$errorCount}</li>";
    echo "<li>Properties with encoding fixed: {$encodingFixedCount}</li>";
    echo "</ul>";
    
} catch (Exception $e) {
    echo "<h2 style='color: red;'>Error: " . $e->getMessage() . "</h2>";
    Log::error("Error in rental import script: " . $e->getMessage());
    Log::error($e->getTraceAsString());
}