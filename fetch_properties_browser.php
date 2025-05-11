<?php
// Script to fetch and parse the property XML feed with browser-like headers

// URL with proper URL encoding for special characters
$url = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=%40Dlux%24%40r%21%28OllE%28Tio%24n&GroupCode=5082&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

// Set browser-like headers
$headers = [
    'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language: en-US,en;q=0.9',
    'Connection: keep-alive',
    'Cache-Control: max-age=0',
    'Sec-Fetch-Site: none',
    'Sec-Fetch-Mode: navigate',
    'Sec-Fetch-User: ?1',
    'Sec-Fetch-Dest: document',
    'Accept-Encoding: gzip, deflate, br',
];

// Initialize cURL session
$ch = curl_init();

// Set cURL options
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_ENCODING, ''); // Accept compressed content

// Execute the cURL request
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo "cURL Error: " . curl_error($ch) . "\n";
    exit;
}

// Get information about the request
$info = curl_getinfo($ch);
echo "HTTP Code: " . $info['http_code'] . "\n";
echo "Content Type: " . $info['content_type'] . "\n";
echo "Response Size: " . strlen($response) . " bytes\n";

// Close cURL session
curl_close($ch);

// Save raw response for debugging
file_put_contents(__DIR__ . '/raw_response.xml', $response);
echo "Raw response saved to " . __DIR__ . "/raw_response.xml\n";

// Output file path
$outputFilePath = __DIR__ . '/all_properties_browser.txt';

// Try to parse the XML
try {
    // Suppress warnings to catch XML parsing errors
    libxml_use_internal_errors(true);
    
    $xml = new SimpleXMLElement($response);

    // Open file for writing
    $file = fopen($outputFilePath, 'w');

    // Write header
    fwrite($file, "ALL PROPERTIES FROM XML FEED\n\n");

    // Count properties
    $properties = $xml->UnitDTO;
    $totalProperties = count($properties);
    fwrite($file, "Total Properties in Feed: $totalProperties\n\n");

    if ($totalProperties > 0) {
        $propertyCount = 1;

        // Loop through each property
        foreach ($xml->UnitDTO as $property) {
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
            
            // Additional property fields as needed
            fwrite($file, "Marketing Title: " . (isset($property->MarketingTitle) ? (string)$property->MarketingTitle : "N/A") . "\n");
            
            // Add a separator between properties
            fwrite($file, "\n" . str_repeat("-", 80) . "\n\n");
            
            $propertyCount++;
            
            // Limit to first 5 properties for demonstration
            if ($propertyCount > 5) {
                fwrite($file, "... and " . ($totalProperties - 5) . " more properties ...\n");
                break;
            }
        }
    } else {
        fwrite($file, "No property units found in the XML structure.\n");
        fwrite($file, "XML structure: " . print_r($xml, true) . "\n");
    }
    
    // Close the file
    fclose($file);
    
    echo "Property data saved to $outputFilePath\n";
    
} catch (Exception $e) {
    echo "Error parsing XML: " . $e->getMessage() . "\n";
    
    // Get all XML errors
    $errors = libxml_get_errors();
    foreach ($errors as $error) {
        echo "XML Error: [Line " . $error->line . "] " . $error->message . "\n";
    }
    libxml_clear_errors();
}