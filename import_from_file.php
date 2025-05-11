<?php

// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Log;

// Get database connection to make sure it's working
try {
    $connection = DB::connection()->getPdo();
    echo "Database connected successfully: " . DB::connection()->getDatabaseName() . "\n";
} catch (\Exception $e) {
    echo "Database connection failed: " . $e->getMessage() . "\n";
    exit(1);
}

try {
    echo "Starting property import from XML file...\n";
    
    // Path to the XML file
    $xmlFilePath = __DIR__ . '/raw_response.xml';
    
    if (!file_exists($xmlFilePath)) {
        echo "XML file not found: $xmlFilePath\n";
        exit(1);
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
    
    // Count how many properties were processed and imported
    $processed = 0;
    $imported = 0;
    
    // Check we have UnitDTO elements
    if (!isset($xml->UnitDTO)) {
        echo "No UnitDTO elements found in XML file.\n";
        echo "XML structure: " . print_r($xml, true) . "\n";
        exit(1);
    }
    
    echo "Found " . count($xml->UnitDTO) . " properties in XML file.\n";
    
    // Process each property
    foreach ($xml->UnitDTO as $propertyData) {
        $processed++;
        
        // Extract reference number
        $refNo = (string)$propertyData->RefNo;
        echo "Processing property #$processed: $refNo\n";
        
        try {
            // Check if property already exists
            $property = Property::firstOrNew(['reference_number' => $refNo]);
            
            // Only update property data if it's new or has a newer update date
            $isNew = !$property->exists;
            $xmlLastUpdated = isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null;
            
            if ($isNew || !$property->last_updated || 
                ($xmlLastUpdated && strtotime($xmlLastUpdated) > strtotime($property->last_updated))) {
                
                echo "  " . ($isNew ? "Creating new" : "Updating existing") . " property\n";
                
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
                
                // Update the property
                $property->fill([
                    'reference_number' => $refNo,
                    'property_name' => isset($propertyData->PropertyName) ? (string)$propertyData->PropertyName : null,
                    'community' => isset($propertyData->Community) ? (string)$propertyData->Community : null,
                    'sub_community' => isset($propertyData->SubCommunity) ? (string)$propertyData->SubCommunity : null,
                    'price' => isset($propertyData->SellPrice) ? (float)$propertyData->SellPrice : null,
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
                    'marketing_title' => isset($propertyData->MarketingTitle) ? (string)$propertyData->MarketingTitle : null,
                    'description' => isset($propertyData->Remarks) ? (string)$propertyData->Remarks : null,
                    'primary_view' => isset($propertyData->PrimaryUnitView) ? (string)$propertyData->PrimaryUnitView : null,
                    'secondary_view' => isset($propertyData->SecondaryUnitView) ? (string)$propertyData->SecondaryUnitView : null,
                    'unit_floor' => isset($propertyData->UnitFloor) ? (string)$propertyData->UnitFloor : null,
                    'floor_no' => isset($propertyData->FloorNo) ? (string)$propertyData->FloorNo : null,
                    'parking' => isset($propertyData->Parking) ? (string)$propertyData->Parking : null,
                    'property_type' => isset($propertyData->Category) ? (string)$propertyData->Category : null,
                    'ref_unit_category' => isset($propertyData->RefUnitCategory) ? (string)$propertyData->RefUnitCategory : null,
                    'brochure_link' => isset($propertyData->PDFBrochureLink) ? (string)$propertyData->PDFBrochureLink : null,
                    'images' => !empty($images) ? $images : null,
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'last_updated' => $xmlLastUpdated,
                    'listing_date' => isset($propertyData->ListingDate) && !empty((string)$propertyData->ListingDate) ? (string)$propertyData->ListingDate : null,
                    'expiry_date' => isset($propertyData->ExpiryDate) && !empty((string)$propertyData->ExpiryDate) ? (string)$propertyData->ExpiryDate : null,
                    'external_property_id' => isset($propertyData->PropertyID) ? (string)$propertyData->PropertyID : null,
                    'external_ids' => $externalIds,
                    'is_active' => true,
                ]);
                
                // Save the property
                $property->save();
                $imported++;
                echo "  Property saved successfully\n";
            } else {
                echo "  Skipped - no updates needed\n";
            }
        } catch (\Exception $e) {
            echo "  Error processing property: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\nImport completed:\n";
    echo "  - Properties processed: $processed\n";
    echo "  - Properties imported/updated: $imported\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}