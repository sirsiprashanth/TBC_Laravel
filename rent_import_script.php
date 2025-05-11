<?php
// Set maximum execution time to 5 minutes
ini_set('max_execution_time', 300);

// Display errors (for debugging)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Access code for the API
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
    $propertyCount = count($xml->UnitDTO);
    echo "<h1>Found $propertyCount Rental Properties</h1>";
    
    // Display all property details
    echo "<table border='1' cellpadding='5' cellspacing='0'>";
    echo "<tr style='background-color: #f2f2f2;'>";
    echo "<th>Property Name</th>";
    echo "<th>Reference No</th>";
    echo "<th>Bedrooms</th>";
    echo "<th>Bathrooms</th>";
    echo "<th>Rent Price</th>";
    echo "<th>Area (sqft)</th>";
    echo "<th>Property Type</th>";
    echo "<th>Community</th>";
    echo "<th>Location</th>";
    echo "</tr>";
    
    // Counter for detailed properties
    $detailedCount = 0;
    
    // Loop through and display each property
    foreach ($xml->UnitDTO as $property) {
        // Create table row for each property
        echo "<tr>";
        echo "<td>" . (string)$property->PropertyName . "</td>";
        echo "<td>" . (string)$property->RefNo . "</td>";
        echo "<td>" . (string)$property->Bedrooms . "</td>";
        echo "<td>" . (string)$property->NoOfBathrooms . "</td>";
        echo "<td>AED " . number_format((float)$property->RentPrice) . "</td>";
        echo "<td>" . number_format((float)$property->BuiltupArea) . "</td>";
        echo "<td>" . (string)$property->Category . "</td>";
        echo "<td>" . (string)$property->Community . "</td>";
        
        // Combine location components
        $location = [];
        if (!empty($property->DistrictName)) $location[] = (string)$property->DistrictName;
        if (!empty($property->CityName)) $location[] = (string)$property->CityName;
        if (!empty($property->CountryName)) $location[] = (string)$property->CountryName;
        
        echo "<td>" . implode(", ", $location) . "</td>";
        echo "</tr>";
        
        // Display detailed information for the first 3 properties
        if ($detailedCount < 3) {
            echo "</table>";
            echo "<h2>Detailed Information for Property #" . ($detailedCount + 1) . "</h2>";
            echo "<div style='margin-bottom: 20px; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9;'>";
            echo "<h3>" . (string)$property->PropertyName . " (Ref: " . (string)$property->RefNo . ")</h3>";
            
            // Images
            if (isset($property->Images) && isset($property->Images->Image)) {
                echo "<h4>Images:</h4>";
                echo "<ul>";
                foreach ($property->Images->Image as $image) {
                    if (isset($image->Url)) {
                        echo "<li><a href='" . (string)$image->Url . "' target='_blank'>" . (string)$image->Url . "</a></li>";
                    }
                }
                echo "</ul>";
            }
            
            // Full XML details for reference
            echo "<h4>All Available XML Fields:</h4>";
            echo "<pre style='background-color: #f5f5f5; padding: 10px; overflow: auto; max-height: 300px;'>";
            foreach ($property as $key => $value) {
                if ($key != "Images") {  // Skip images as we already displayed them
                    echo "$key: " . (string)$value . "\n";
                }
            }
            echo "</pre>";
            
            echo "</div>";
            echo "<table border='1' cellpadding='5' cellspacing='0'>";
            echo "<tr style='background-color: #f2f2f2;'>";
            echo "<th>Property Name</th>";
            echo "<th>Reference No</th>";
            echo "<th>Bedrooms</th>";
            echo "<th>Bathrooms</th>";
            echo "<th>Rent Price</th>";
            echo "<th>Area (sqft)</th>";
            echo "<th>Property Type</th>";
            echo "<th>Community</th>";
            echo "<th>Location</th>";
            echo "</tr>";
            
            $detailedCount++;
        }
    }
    
    echo "</table>";
    
    // Display the fields available in the XML
    if ($propertyCount > 0) {
        $firstProperty = $xml->UnitDTO[0];
        echo "<h2>Available XML Fields</h2>";
        echo "<ul>";
        foreach ($firstProperty as $key => $value) {
            echo "<li><strong>$key</strong>: " . (is_object($value) ? "Object" : (string)$value) . "</li>";
        }
        echo "</ul>";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>