<?php
// Load the XML file
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

// Check the first property for images
$firstProperty = $xml->UnitDTO[0];

echo "Checking first property: " . $firstProperty->RefNo . "\n";
echo "Property Name: " . $firstProperty->PropertyName . "\n\n";

echo "Images Structure:\n";
if (isset($firstProperty->Images)) {
    echo "Images element exists\n";
    
    if (isset($firstProperty->Images->Image)) {
        echo "Image elements exist\n";
        echo "Number of images: " . count($firstProperty->Images->Image) . "\n";
        
        foreach ($firstProperty->Images->Image as $i => $image) {
            $index = intval($i) + 1;
            echo "Image #" . $index . ":\n";
            
            if (isset($image->Url)) {
                echo "  URL: " . $image->Url . "\n";
            } else {
                echo "  No URL element found\n";
            }
            
            // Print all elements available for debugging
            foreach ($image as $name => $value) {
                echo "  $name: $value\n";
            }
        }
    } else {
        echo "No Image elements found\n";
        
        // Print full Images element structure
        echo "Full Images element structure:\n";
        print_r($firstProperty->Images);
    }
} else {
    echo "No Images element found\n";
}

// Check all properties for image information
echo "\n\nChecking all properties for image information:\n";
$propertiesWithImages = 0;
$propertiesWithoutImages = 0;
$totalImages = 0;

foreach ($xml->UnitDTO as $property) {
    $hasImages = false;
    
    if (isset($property->Images)) {
        if (isset($property->Images->ImageUrl) && $property->Images->ImageUrl != "") {
            $hasImages = true;
            $totalImages++;
            echo "Property " . $property->RefNo . " has ImageUrl: " . $property->Images->ImageUrl . "\n";
        }
        
        if (isset($property->Images->Image)) {
            $imageCount = 0;
            foreach ($property->Images->Image as $image) {
                if (isset($image->Url) && $image->Url != "") {
                    $hasImages = true;
                    $totalImages++;
                    $imageCount++;
                }
            }
            
            if ($hasImages) {
                echo "Property " . $property->RefNo . " has " . $imageCount . " images\n";
            }
        }
    }
    
    if ($hasImages) {
        $propertiesWithImages++;
    } else {
        $propertiesWithoutImages++;
    }
}

echo "\nSummary:\n";
echo "Total properties: " . count($xml->UnitDTO) . "\n";
echo "Properties with images: " . $propertiesWithImages . "\n";
echo "Properties without images: " . $propertiesWithoutImages . "\n";
echo "Total images found: " . $totalImages . "\n";