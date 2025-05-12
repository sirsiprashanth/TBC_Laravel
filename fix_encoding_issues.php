<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Get the IDs of properties that failed to import
$failedRefNumbers = [
    'AP7775',
    'TH7824',
    'AP7793',
    'AP7821',
    'AP7816',
    'AP7817',
    'AP7476'
];

echo "Starting to fix encoding issues for " . count($failedRefNumbers) . " properties...\n";

// Check if XML file exists
$xmlFilePath = __DIR__ . '/sales_listings.xml';
if (!file_exists($xmlFilePath)) {
    die("XML file not found: $xmlFilePath\n");
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
    exit(1);
}

// Count fixed properties
$fixedCount = 0;
$errorCount = 0;

// Process each property
foreach ($xml->UnitDTO as $propertyData) {
    // Extract reference number
    $refNo = (string)$propertyData->RefNo;
    
    // Skip if not in our failed list
    if (!in_array($refNo, $failedRefNumbers)) {
        continue;
    }
    
    echo "Processing property: $refNo\n";
    
    try {
        // Find the property
        $property = Property::where('reference_number', $refNo)->first();
        
        if (!$property) {
            // Create a new property if it doesn't exist
            $property = new Property();
            $property->reference_number = $refNo;
            echo "  Creating new property record\n";
        } else {
            echo "  Updating existing property record\n";
        }
        
        // Extract amenities from description with proper encoding
        $description = (string)$propertyData->Remarks;
        // Clean the description - remove or replace problematic characters
        $description = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $description);
        $description = mb_convert_encoding($description, 'UTF-8', 'UTF-8');
        
        $amenities = [];
        
        // Try to extract bullet points from the description
        if (preg_match_all('/[•\-\*]\s*([^\n•\-\*]+)/', $description, $matches)) {
            foreach ($matches[1] as $match) {
                $amenity = trim($match);
                // Clean the amenity string
                $amenity = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $amenity);
                $amenity = mb_convert_encoding($amenity, 'UTF-8', 'UTF-8');
                
                if (!empty($amenity) && strlen($amenity) < 100) { // Sanity check
                    $amenities[] = $amenity;
                }
            }
        }
        
        // Add other amenities with proper encoding
        $furnishStatus = (string)$propertyData->Furnish_status;
        if (!empty($furnishStatus)) {
            $furnishStatus = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $furnishStatus);
            $furnishStatus = mb_convert_encoding($furnishStatus, 'UTF-8', 'UTF-8');
            if (!in_array($furnishStatus, $amenities)) {
                $amenities[] = $furnishStatus;
            }
        }
        
        // Add parking info if available
        $parking = (string)$propertyData->Parking;
        if (!empty($parking) && $parking != "0") {
            $amenities[] = "Parking: " . $parking;
        }
        
        // Primary view
        $primaryView = (string)$propertyData->PrimaryUnitView;
        if (!empty($primaryView)) {
            $primaryView = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $primaryView);
            $primaryView = mb_convert_encoding($primaryView, 'UTF-8', 'UTF-8');
            $amenities[] = $primaryView . " View";
        }
        
        // Secondary view
        $secondaryView = (string)$propertyData->SecondaryUnitView;
        if (!empty($secondaryView) && $secondaryView != $primaryView) {
            $secondaryView = preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $secondaryView);
            $secondaryView = mb_convert_encoding($secondaryView, 'UTF-8', 'UTF-8');
            $amenities[] = $secondaryView . " View";
        }
        
        // Parse coordinates if available
        $latitude = null;
        $longitude = null;
        if (isset($propertyData->ProGooglecoordinates) && !empty((string)$propertyData->ProGooglecoordinates)) {
            $coords = explode(',', (string)$propertyData->ProGooglecoordinates);
            if (count($coords) == 2) {
                $latitude = trim($coords[0]);
                $longitude = trim($coords[1]);
            }
        }
        
        // Process images array if available
        $images = [];
        if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
            foreach ($propertyData->Images->Image as $image) {
                if (isset($image->Url)) {
                    $images[] = (string)$image->Url;
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
        
        // Extract other fields with encoding fixes
        $propertyName = isset($propertyData->PropertyName) ? (string)$propertyData->PropertyName : null;
        $propertyName = $propertyName ? preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $propertyName) : null;
        $propertyName = $propertyName ? mb_convert_encoding($propertyName, 'UTF-8', 'UTF-8') : null;
        
        $community = isset($propertyData->Community) ? (string)$propertyData->Community : null;
        $community = $community ? preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $community) : null;
        $community = $community ? mb_convert_encoding($community, 'UTF-8', 'UTF-8') : null;
        
        $subCommunity = isset($propertyData->SubCommunity) ? (string)$propertyData->SubCommunity : null;
        $subCommunity = $subCommunity ? preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $subCommunity) : null;
        $subCommunity = $subCommunity ? mb_convert_encoding($subCommunity, 'UTF-8', 'UTF-8') : null;
        
        $marketingTitle = isset($propertyData->MarketingTitle) ? (string)$propertyData->MarketingTitle : null;
        $marketingTitle = $marketingTitle ? preg_replace('/[\x00-\x1F\x80-\xFF]/', ' ', $marketingTitle) : null;
        $marketingTitle = $marketingTitle ? mb_convert_encoding($marketingTitle, 'UTF-8', 'UTF-8') : null;
        
        // Extract date fields
        $xmlLastUpdated = isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null;
        $listingDate = isset($propertyData->ListingDate) && !empty((string)$propertyData->ListingDate) 
            ? (string)$propertyData->ListingDate : null;
        $expiryDate = isset($propertyData->ExpiryDate) && !empty((string)$propertyData->ExpiryDate)
            ? (string)$propertyData->ExpiryDate : null;
            
        // Update the property with clean data
        $property->fill([
            'property_name' => $propertyName,
            'community' => $community,
            'sub_community' => $subCommunity,
            'price' => isset($propertyData->SellPrice) ? (float)$propertyData->SellPrice : null,
            'currency' => isset($propertyData->CurrencyAbr) ? (string)$propertyData->CurrencyAbr : 'AED',
            'bedrooms' => isset($propertyData->Bedrooms) ? (int)$propertyData->Bedrooms : null,
            'bathrooms' => isset($propertyData->NoOfBathrooms) ? (float)$propertyData->NoOfBathrooms : null,
            'built_up_area' => isset($propertyData->BuiltupArea) ? (float)$propertyData->BuiltupArea : null,
            'plot_area' => isset($propertyData->PlotArea) ? (float)$propertyData->PlotArea : null,
            'status' => isset($propertyData->Status) ? (string)$propertyData->Status : null,
            'district' => isset($propertyData->DistrictName) ? (string)$propertyData->DistrictName : null,
            'city' => isset($propertyData->CityName) ? (string)$propertyData->CityName : null,
            'state' => isset($propertyData->StateName) ? (string)$propertyData->StateName : null,
            'country' => isset($propertyData->CountryName) ? (string)$propertyData->CountryName : null,
            'agent_name' => isset($propertyData->Agent) ? (string)$propertyData->Agent : null,
            'agent_contact' => isset($propertyData->ContactNumber) ? (string)$propertyData->ContactNumber : null,
            'marketing_title' => $marketingTitle,
            'description' => $description,
            'primary_view' => $primaryView,
            'secondary_view' => $secondaryView,
            'unit_floor' => isset($propertyData->UnitFloor) ? (string)$propertyData->UnitFloor : null,
            'floor_no' => isset($propertyData->FloorNo) ? (string)$propertyData->FloorNo : null,
            'parking' => $parking,
            'property_type' => isset($propertyData->Category) ? (string)$propertyData->Category : null,
            'ref_unit_category' => isset($propertyData->RetUnitCategory) ? (string)$propertyData->RetUnitCategory : null,
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
            'is_rental' => false, // This is a sales property
        ]);
        
        // Save the property
        $property->save();
        $fixedCount++;
        echo "  Property saved successfully with fixed encoding\n";
        
    } catch (Exception $e) {
        $errorCount++;
        echo "  Error processing property: " . $refNo . " - " . $e->getMessage() . "\n";
        Log::error("Error fixing property encoding: " . $e->getMessage());
        Log::error($e->getTraceAsString());
    }
}

// Display summary
echo "\nEncoding Fix Summary\n";
echo "Properties fixed: {$fixedCount}\n";
echo "Errors encountered: {$errorCount}\n";