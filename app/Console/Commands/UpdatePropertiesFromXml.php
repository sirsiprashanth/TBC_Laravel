<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;
use Illuminate\Support\Facades\Log;

class UpdatePropertiesFromXml extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:update-from-xml';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update properties from XML feed (sales and rentals)';

    /**
     * API credentials
     */
    private $accessCode = '@Dlux$@r!(OllE(Tio$n';
    private $groupCode = '5082';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting property update from XML feeds...');
        $this->info('This will: Create new properties, Update existing active properties, Skip inactive properties');
        $this->newLine();
        
        $salesProcessed = $this->updateSalesProperties();
        $rentalsProcessed = $this->updateRentalProperties();
        
        $this->newLine();
        $this->info("Process completed! Sales processed: {$salesProcessed}, Rentals processed: {$rentalsProcessed}");
        
        // Clear cache after updates
        $this->call('cache:clear');
        
        return Command::SUCCESS;
    }

    /**
     * Update sales properties from XML
     */
    private function updateSalesProperties()
    {
        $this->info('Fetching sales properties...');
        
        $url = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode($this->accessCode) .
            "&GroupCode=" . $this->groupCode .
            "&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

        $xmlContent = $this->fetchXml($url);
        if (!$xmlContent) {
            $this->warn('Failed to fetch sales properties from API, trying local XML file...');
            
            // Try to use local XML file as fallback
            $localFile = base_path('raw_response.xml');
            if (file_exists($localFile)) {
                $xmlContent = file_get_contents($localFile);
                $this->info('Using local XML file for sales properties');
                
                // Log warning about using cached data
                Log::warning('Sales API failed, using local XML cache from: ' . $localFile);
            } else {
                $this->error('No local XML file found as fallback');
                return 0;
            }
        }

        return $this->processXml($xmlContent, false);
    }

    /**
     * Update rental properties from XML
     */
    private function updateRentalProperties()
    {
        $this->info('Fetching rental properties...');
        
        $url = "https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=" . urlencode($this->accessCode) .
            "&GroupCode=" . $this->groupCode .
            "&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

        $xmlContent = $this->fetchXml($url);
        if (!$xmlContent) {
            $this->error('Failed to fetch rental properties');
            return 0;
        }

        return $this->processXml($xmlContent, true);
    }

    /**
     * Fetch XML from URL
     */
    private function fetchXml($url)
    {
        $headers = [
            'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            Log::error('cURL error: ' . $error);
            $this->error('cURL error: ' . $error);
            curl_close($ch);
            return false;
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $effectiveUrl = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
        curl_close($ch);

        if ($httpCode != 200) {
            Log::error("HTTP error: {$httpCode} for URL: {$effectiveUrl}");
            $this->error("HTTP error: {$httpCode}");
            
            // Log the response content for debugging
            if ($response) {
                Log::error('Response content: ' . substr($response, 0, 500));
            }
            return false;
        }

        return $response;
    }

    /**
     * Process XML content and update properties
     */
    private function processXml($xmlContent, $isRental)
    {
        libxml_use_internal_errors(true);
        $xml = simplexml_load_string($xmlContent);
        
        if (!$xml) {
            $errors = libxml_get_errors();
            foreach ($errors as $error) {
                Log::error('XML parsing error: ' . $error->message);
            }
            libxml_clear_errors();
            return 0;
        }

        $updatedCount = 0;
        $createdCount = 0;
        $skippedInactive = 0;

        if (!isset($xml->UnitDTO)) {
            Log::error('No UnitDTO elements found in XML');
            return 0;
        }

        foreach ($xml->UnitDTO as $propertyData) {
            try {
                $refNo = (string)$propertyData->RefNo;
                
                // Find existing property or create new
                $property = Property::where('reference_number', $refNo)->first();
                
                if (!$property) {
                    // Create new property
                    $property = new Property();
                    $property->reference_number = $refNo;
                    $property->is_active = true; // Set new properties as active by default
                    $property->is_rental = $isRental;
                    
                    $this->info("Creating new property: {$refNo}");
                    $isNew = true;
                } else {
                    $isNew = false;
                    
                    // Skip if existing property is inactive
                    if (!$property->is_active) {
                        $this->line("Property {$refNo} is inactive, skipping...");
                        $skippedInactive++;
                        continue;
                    }

                    // Check if update is needed for existing property
                    $xmlLastUpdated = isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null;
                    
                    if (!$xmlLastUpdated || 
                        ($property->last_updated && strtotime($xmlLastUpdated) <= strtotime($property->last_updated))) {
                        $this->line("Property {$refNo} has no newer data, skipping...");
                        continue;
                    }
                }

                // Update property data (for both new and existing)
                $this->updatePropertyData($property, $propertyData, $isRental);
                
                $property->save();
                
                if ($isNew) {
                    $createdCount++;
                    $this->info("Created: {$property->property_name} ({$refNo})");
                } else {
                    $updatedCount++;
                    $this->info("Updated: {$property->property_name} ({$refNo})");
                }
                
            } catch (\Exception $e) {
                Log::error("Error processing property {$refNo}: " . $e->getMessage());
                $this->error("Error processing property {$refNo}: " . $e->getMessage());
            }
        }

        $this->info("Properties created: {$createdCount}, updated: {$updatedCount}, skipped (inactive): {$skippedInactive}");
        return $createdCount + $updatedCount;
    }

    /**
     * Update property data from XML
     */
    private function updatePropertyData($property, $propertyData, $isRental)
    {
        // Parse coordinates
        $latitude = null;
        $longitude = null;
        if (isset($propertyData->ProGooglecoordinates) && !empty((string)$propertyData->ProGooglecoordinates)) {
            $coords = explode(',', (string)$propertyData->ProGooglecoordinates);
            if (count($coords) == 2) {
                $longitude = trim($coords[0]);
                $latitude = trim($coords[1]);
            }
        }

        // Process images
        $images = [];
        if (isset($propertyData->Images) && isset($propertyData->Images->Image)) {
            foreach ($propertyData->Images->Image as $image) {
                if (isset($image->ImageURL)) {
                    $images[] = (string)$image->ImageURL;
                }
            }
        }

        // Extract amenities
        $description = $this->cleanUtf8String((string)$propertyData->Remarks);
        $amenities = $this->extractAmenities($propertyData, $description);

        // Update property fields
        $property->fill([
            'property_name' => isset($propertyData->PropertyName) ? $this->cleanUtf8String((string)$propertyData->PropertyName) : null,
            'community' => isset($propertyData->Community) ? $this->cleanUtf8String((string)$propertyData->Community) : null,
            'sub_community' => isset($propertyData->SubCommunity) ? $this->cleanUtf8String((string)$propertyData->SubCommunity) : null,
            'price' => $isRental 
                ? (isset($propertyData->Rent) ? (float)$propertyData->Rent : null)
                : (isset($propertyData->SellPrice) ? (float)$propertyData->SellPrice : null),
            'currency' => isset($propertyData->CurrencyAbr) ? (string)$propertyData->CurrencyAbr : 'AED',
            'bedrooms' => isset($propertyData->Bedrooms) ? (int)$propertyData->Bedrooms : null,
            'bathrooms' => isset($propertyData->NoOfBathrooms) ? (float)$propertyData->NoOfBathrooms : null,
            'built_up_area' => isset($propertyData->BuiltupArea) ? (float)$propertyData->BuiltupArea : null,
            'plot_area' => isset($propertyData->PlotArea) ? (float)$propertyData->PlotArea : null,
            'description' => $description,
            'images' => !empty($images) ? $images : $property->images,
            'amenities' => !empty($amenities) ? $amenities : $property->amenities,
            'latitude' => $latitude ?: $property->latitude,
            'longitude' => $longitude ?: $property->longitude,
            'last_updated' => isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null,
        ]);
    }

    /**
     * Clean UTF-8 string
     */
    private function cleanUtf8String($string)
    {
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

    /**
     * Extract amenities from property data
     */
    private function extractAmenities($propertyData, $description)
    {
        $amenities = [];
        
        // Extract from description
        if (preg_match_all('/[•\-\*]\s*([^\n•\-\*]+)/', $description, $matches)) {
            foreach ($matches[1] as $match) {
                $amenity = $this->cleanUtf8String(trim($match));
                if (!empty($amenity) && strlen($amenity) < 100) {
                    $amenities[] = $amenity;
                }
            }
        }
        
        // Add furnishing status
        $furnishStatus = isset($propertyData->Furnish_status) ? $this->cleanUtf8String((string)$propertyData->Furnish_status) : null;
        if (!empty($furnishStatus) && !in_array($furnishStatus, $amenities)) {
            $amenities[] = $furnishStatus;
        }
        
        // Add parking
        $parking = isset($propertyData->Parking) ? (string)$propertyData->Parking : null;
        if (!empty($parking) && $parking != "0") {
            $amenities[] = "Parking: " . $parking;
        }
        
        // Add views
        $primaryView = isset($propertyData->PrimaryUnitView) ? $this->cleanUtf8String((string)$propertyData->PrimaryUnitView) : null;
        if (!empty($primaryView)) {
            $amenities[] = $primaryView . " View";
        }
        
        $secondaryView = isset($propertyData->SecondaryUnitView) ? $this->cleanUtf8String((string)$propertyData->SecondaryUnitView) : null;
        if (!empty($secondaryView) && $secondaryView != $primaryView) {
            $amenities[] = $secondaryView . " View";
        }
        
        return $amenities;
    }
}