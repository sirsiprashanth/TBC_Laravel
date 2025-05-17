<?php

// Test the sales API with different URL formats

// URL 1: Current URL in our code
$url1 = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode('@Dlux$@r!(OllE(Tio$n') . "&GroupCode=5082&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

// URL 2: URL you provided with SpecialProjects parameter
$url2 = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

// URL 3: URL encoded version of URL2
$url3 = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode('@Dlux$@r!(OllE(Tio$n') . "&GroupCode=5082&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

echo "Testing Sales API URLs...\n\n";

function testUrl($url, $label) {
    echo "Testing $label:\n";
    echo "URL: $url\n";
    
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $effectiveUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
    
    echo "HTTP Code: $httpCode\n";
    echo "Effective URL: $effectiveUrl\n";
    
    if ($httpCode != 200) {
        echo "Response: " . substr($response, 0, 200) . "...\n";
    } else {
        echo "Success! Response size: " . strlen($response) . " bytes\n";
        // Check if it's valid XML
        libxml_use_internal_errors(true);
        $xml = simplexml_load_string($response);
        if ($xml) {
            echo "Valid XML with " . count($xml->UnitDTO) . " properties\n";
        } else {
            echo "Invalid XML\n";
        }
    }
    
    curl_close($ch);
    echo "\n" . str_repeat('-', 50) . "\n\n";
}

testUrl($url1, "Current URL (without SpecialProjects)");
testUrl($url2, "Your URL (with SpecialProjects, not encoded)");
testUrl($url3, "Your URL (with SpecialProjects, encoded)");