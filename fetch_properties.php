<?php
// Script to fetch and parse the property XML feed

// URL with proper URL encoding for special characters
$url = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=%40Dlux%24%40r%21%28OllE%28Tio%24n&GroupCode=5082&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

// Execute the cURL request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo "cURL Error: " . curl_error($ch) . "\n";
    exit;
}

// Close cURL session
curl_close($ch);

// Output file path
$outputFilePath = __DIR__ . '/all_properties_full.txt';

// Try to parse the XML
try {
    $xml = new SimpleXMLElement($response);
    
    // Open file for writing
    $file = fopen($outputFilePath, 'w');
    
    // Write header
    fwrite($file, "ALL PROPERTIES FROM XML FEED\n\n");
    
    // Write total count
    $totalProperties = isset($xml->Count) ? (int)$xml->Count : 0;
    fwrite($file, "Total Properties in Feed: $totalProperties\n\n");
    
    // Check if there are any properties
    if ($totalProperties > 0 && isset($xml->Units->Unit)) {
        $propertyCount = 1;
        
        // Loop through each property
        foreach ($xml->Units->Unit as $property) {
            fwrite($file, "PROPERTY " . $propertyCount . " (of $totalProperties):\n");
            fwrite($file, "------------------\n");
            
            // Basic details
            fwrite($file, "Reference: " . (isset($property->RefNo) ? (string)$property->RefNo : "N/A") . "\n");
            fwrite($file, "Name: " . (isset($property->PropertyName) ? (string)$property->PropertyName : "N/A") . "\n");
            fwrite($file, "Community: " . (isset($property->Community) ? (string)$property->Community : "N/A") . "\n");
            
            // Price formatting
            $price = isset($property->SellPrice) ? (string)$property->SellPrice : "N/A";
            if (is_numeric($price)) {
                $price = "AED " . number_format((float)$price, 2);
            }
            fwrite($file, "Price: " . $price . "\n");
            
            // Other details
            fwrite($file, "Bedrooms: " . (isset($property->Bedrooms) ? (string)$property->Bedrooms : "N/A") . "\n");
            fwrite($file, "Bathrooms: " . (isset($property->NoOfBathrooms) ? (string)$property->NoOfBathrooms : "N/A") . "\n");
            fwrite($file, "Built-up Area: " . (isset($property->BuiltupArea) ? (string)$property->BuiltupArea . " sq ft" : "N/A") . "\n");
            fwrite($file, "Status: " . (isset($property->Status) ? (string)$property->Status : "N/A") . "\n");
            
            // Location
            $location = [];
            if (isset($property->DistrictName) && !empty((string)$property->DistrictName)) {
                $location[] = (string)$property->DistrictName;
            }
            if (isset($property->CityName) && !empty((string)$property->CityName)) {
                $location[] = (string)$property->CityName;
            }
            if (isset($property->CountryName) && !empty((string)$property->CountryName)) {
                $location[] = (string)$property->CountryName;
            }
            fwrite($file, "Location: " . (!empty($location) ? implode(", ", $location) : "N/A") . "\n");
            
            // Agent info
            fwrite($file, "Agent: " . (isset($property->Agent) ? (string)$property->Agent : "N/A") . "\n");
            fwrite($file, "Contact: " . (isset($property->ContactNumber) ? "+" . (string)$property->ContactNumber : "N/A") . "\n");
            fwrite($file, "Property ID: " . (isset($property->PropertyID) ? (string)$property->PropertyID : "N/A") . "\n");
            
            // Marketing and dates
            fwrite($file, "Marketing Title: " . (isset($property->MarketingTitle) ? (string)$property->MarketingTitle : "N/A") . "\n");
            fwrite($file, "Last Updated: " . (isset($property->LastUpdated) ? (string)$property->LastUpdated : "N/A") . "\n");
            fwrite($file, "Listing Date: " . (isset($property->ListingDate) ? (string)$property->ListingDate : "N/A") . "\n");
            
            // Coordinates
            if (isset($property->ProGooglecoordinates) && !empty((string)$property->ProGooglecoordinates)) {
                fwrite($file, "Coordinates: " . (string)$property->ProGooglecoordinates . "\n");
            }
            
            // Description
            fwrite($file, "\nDescription:\n");
            fwrite($file, isset($property->Remarks) ? (string)$property->Remarks : "No description available" . "\n");
            
            // IDs section
            fwrite($file, "\nIDs:\n");
            fwrite($file, "Country ID: " . (isset($property->CountryID) ? (string)$property->CountryID : "N/A") . "\n");
            fwrite($file, "State ID: " . (isset($property->StateID) ? (string)$property->StateID : "N/A") . "\n");
            fwrite($file, "City ID: " . (isset($property->CityID) ? (string)$property->CityID : "N/A") . "\n");
            fwrite($file, "District ID: " . (isset($property->DistrictID) ? (string)$property->DistrictID : "N/A") . "\n");
            fwrite($file, "Community ID: " . (isset($property->CommunityID) ? (string)$property->CommunityID : "N/A") . "\n");
            fwrite($file, "Sub Community ID: " . (isset($property->SubCommunityID) ? (string)$property->SubCommunityID : "N/A") . "\n");
            
            // Views section
            fwrite($file, "\nViews:\n");
            fwrite($file, "Primary Unit View: " . (isset($property->PrimaryUnitView) ? (string)$property->PrimaryUnitView : "N/A") . "\n");
            fwrite($file, "Unit Floor: " . (isset($property->UnitFloor) ? (string)$property->UnitFloor : "Not specified") . "\n");
            
            // Other details section
            fwrite($file, "\nOther Details:\n");
            fwrite($file, "Parking: " . (isset($property->Parking) ? (string)$property->Parking : "N/A") . "\n");
            fwrite($file, "Property Type: " . (isset($property->RefUnitCategory) ? (string)$property->RefUnitCategory : "N/A") . "\n");
            fwrite($file, "Document Web: " . (isset($property->DocumentWeb) ? "Available" : "Not available") . "\n");
            fwrite($file, "Brochure Link: " . (isset($property->PDFBrochureLink) ? (string)$property->PDFBrochureLink : "N/A") . "\n");
            
            // Add a separator between properties
            fwrite($file, "\n" . str_repeat("-", 80) . "\n\n");
            
            $propertyCount++;
        }
    } else {
        fwrite($file, "No properties found in the XML feed.\n");
    }
    
    // Close the file
    fclose($file);
    
    echo "Successfully fetched and saved property data to $outputFilePath\n";
    echo "Total properties found: $totalProperties\n";
    
} catch (Exception $e) {
    echo "Error parsing XML: " . $e->getMessage() . "\n";
}