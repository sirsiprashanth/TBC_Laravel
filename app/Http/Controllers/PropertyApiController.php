<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PropertyApiController extends Controller
{
    private $accessCode;
    private $groupCode;

    public function __construct()
    {
        // Store API credentials (ideally, these would be in .env file)
        $this->accessCode = '@‌Dlux$@r !(OllE(Tio$n';
        $this->groupCode = '5082';
    }

    public function getSalesListings()
    {
        try {
            Log::info('Starting API request to Goyzer');
            
            // Make API request to Goyzer with all required parameters
            $response = Http::timeout(30)->asForm()->post('http://webapi.goyzer.com/Company.asmx/SalesListings', [
                'AccessCode' => $this->accessCode,
                'GroupCode' => $this->groupCode,
                'Bedrooms' => '', // Empty string to include all bedroom options
                'PropertyType' => '', // Empty string to include all property types
                'MinPrice' => '', // Empty for no minimum price filter
                'MaxPrice' => '', // Empty for no maximum price filter
                'Community' => '', // Empty for all communities
                'Furnished' => '', // Empty for all furnishing options
                'StartPriceRange' => '0', // Starting price range
                'EndPriceRange' => '100000000', // Ending price range (high to include all)
                'City' => '', // All cities
                'Area' => '', // All areas
                'SubCommunity' => '', // All sub-communities
                'Bathrooms' => '', // All bathroom options
                'SortBy' => '', // Default sorting
                'OrderBy' => '', // Default ordering
                'CategoryID' => '0', // Default category ID (0 for all)
                'SpecialProjects' => '0', // Default value for special projects
                'CountryID' => '1', // Default country ID (1 for UAE)
                'PageNo' => '1', // First page of results
                'PageSize' => '20', // Number of results per page
                'PropertyStatus' => '', // All property statuses
                'ViewType' => '', // All view types
                'Keywords' => '', // No specific keywords
                'StateID' => '0', // Default state ID (0 for all states)
                'CommunityID' => '0', // Default community ID (0 for all communities)
                'DistrictID' => '0', // Default district ID (0 for all districts)
                'FloorAreaMin' => '0', // Minimum floor area
                'FloorAreaMax' => '100000', // Maximum floor area
                'PlotAreaMin' => '0', // Minimum plot area
                'PlotAreaMax' => '100000', // Maximum plot area
                'UnitCategory' => '', // Default unit category (empty for all)
            ]);
            
            // Log the response status and body for debugging
            Log::info('API response status: ' . $response->status());
            Log::info('API response body: ' . substr($response->body(), 0, 500) . '...');
            
            // Check if request was successful
            if ($response->successful()) {
                // Parse XML response
                $xml = simplexml_load_string($response->body());
                
                // If XML parsing failed, handle the error
                if ($xml === false) {
                    Log::error('Failed to parse XML response: ' . $response->body());
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to parse API response',
                    ], 500);
                }
                
                // Log XML structure for debugging
                Log::info('XML parsed successfully. Count: ' . (isset($xml->Count) ? $xml->Count : 'not found'));
                
                $properties = [];

                // Check if there are any properties
                if (isset($xml->Count) && $xml->Count > 0) {
                    foreach ($xml->Units->Unit as $unit) {
                        // Extract first image URL if available
                        $imageUrl = '/assets/img/property.png'; // Default image
                        if (isset($unit->Images) && count($unit->Images->Image) > 0) {
                            $imageUrl = (string)$unit->Images->Image[0]->Url;
                        }

                        // Build property data
                        $properties[] = [
                            'id' => (string)$unit->Unit_PK,
                            'name' => (string)($unit->Property_Name ?: $unit->Marketing_Title ?: 'Luxury Property'),
                            'price' => isset($unit->Selling_Price) 
                                ? 'AED ' . number_format((float)$unit->Selling_Price, 0, '.', ',') 
                                : 'Price on Request',
                            'bedrooms' => (int)($unit->Bedroom_Details ?: 0),
                            'bathrooms' => (int)($unit->No_Of_Bathrooms ?: 0),
                            'image' => $imageUrl,
                            'link' => '#',
                            'description' => (string)$unit->Web_Remarks,
                            'location' => implode(', ', array_filter([
                                (string)$unit->Community,
                                (string)$unit->City
                            ])),
                            'reference' => (string)$unit->Unit_Reference_No,
                            'builtupArea' => (string)$unit->Unit_Builtup_Area,
                            'unitType' => (string)$unit->Unit_Type,
                        ];
                    }
                } else {
                    // Log if no properties were found
                    Log::warning('No properties found in API response');
                }

                return response()->json([
                    'success' => true,
                    'count' => count($properties),
                    'properties' => $properties
                ]);
            }

            // Handle unsuccessful response
            Log::error('Failed API call to Goyzer: ' . $response->status() . ' - ' . $response->body());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch properties from API',
                'status' => $response->status()
            ], 500);
        } catch (\Exception $e) {
            // Handle exceptions with detailed logging
            Log::error('Exception in PropertyApiController: ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Error processing property data',
                'error' => $e->getMessage(),
                'solution' => 'Using fallback properties. API might be down or credentials may be incorrect.'
            ], 500);
        }
    }

    public function getRentalListings()
    {
        try {
            Log::info('Starting API request to Goyzer for rentals');
            
            // Make API request to Goyzer with all required parameters
            $response = Http::timeout(30)->asForm()->post('http://webapi.goyzer.com/Company.asmx/RentListings', [
                'AccessCode' => $this->accessCode,
                'GroupCode' => $this->groupCode,
                'Bedrooms' => '', // Empty string to include all bedroom options
                'PropertyType' => '', // Empty string to include all property types
                'MinPrice' => '', // Empty for no minimum price filter
                'MaxPrice' => '', // Empty for no maximum price filter
                'Community' => '', // Empty for all communities
                'Furnished' => '', // Empty for all furnishing options
                'StartPriceRange' => '0', // Starting price range
                'EndPriceRange' => '1000000', // Ending price range (high to include all)
                'City' => '', // All cities
                'Area' => '', // All areas
                'SubCommunity' => '', // All sub-communities
                'Bathrooms' => '', // All bathroom options
                'SortBy' => '', // Default sorting
                'OrderBy' => '', // Default ordering
                'CategoryID' => '0', // Default category ID (0 for all)
                'SpecialProjects' => '0', // Default value for special projects
                'CountryID' => '1', // Default country ID (1 for UAE)
                'PageNo' => '1', // First page of results
                'PageSize' => '20', // Number of results per page
                'PropertyStatus' => '', // All property statuses
                'ViewType' => '', // All view types
                'Keywords' => '', // No specific keywords
                'StateID' => '0', // Default state ID (0 for all states)
                'CommunityID' => '0', // Default community ID (0 for all communities)
                'DistrictID' => '0', // Default district ID (0 for all districts)
                'FloorAreaMin' => '0', // Minimum floor area
                'FloorAreaMax' => '100000', // Maximum floor area
                'PlotAreaMin' => '0', // Minimum plot area
                'PlotAreaMax' => '100000', // Maximum plot area
                'UnitCategory' => '', // Default unit category (empty for all)
            ]);
            
            // Log the response for debugging
            Log::info('Rental API response status: ' . $response->status());
            
            // Process response similar to getSalesListings
            if ($response->successful()) {
                // Parse XML response
                $xml = simplexml_load_string($response->body());
                
                // If XML parsing failed, handle the error
                if ($xml === false) {
                    Log::error('Failed to parse XML response for rentals');
                    return response()->json([
                        'success' => false,
                        'message' => 'Failed to parse rental API response',
                    ], 500);
                }
                
                $properties = [];

                // Check if there are any properties
                if (isset($xml->Count) && $xml->Count > 0) {
                    foreach ($xml->Units->Unit as $unit) {
                        // Extract first image URL if available
                        $imageUrl = '/assets/img/property.png'; // Default image
                        if (isset($unit->Images) && count($unit->Images->Image) > 0) {
                            $imageUrl = (string)$unit->Images->Image[0]->Url;
                        }

                        // Build property data
                        $properties[] = [
                            'id' => (string)$unit->Unit_PK,
                            'name' => (string)($unit->Property_Name ?: $unit->Marketing_Title ?: 'Luxury Property'),
                            'price' => isset($unit->Rent_Per_Annum) 
                                ? 'AED ' . number_format((float)$unit->Rent_Per_Annum, 0, '.', ',') . '/year' 
                                : 'Price on Request',
                            'bedrooms' => (int)($unit->Bedroom_Details ?: 0),
                            'bathrooms' => (int)($unit->No_Of_Bathrooms ?: 0),
                            'image' => $imageUrl,
                            'link' => '#',
                            'description' => (string)$unit->Web_Remarks,
                            'location' => implode(', ', array_filter([
                                (string)$unit->Community,
                                (string)$unit->City
                            ])),
                            'reference' => (string)$unit->Unit_Reference_No,
                            'builtupArea' => (string)$unit->Unit_Builtup_Area,
                            'unitType' => (string)$unit->Unit_Type,
                        ];
                    }
                } else {
                    // Log if no rental properties were found
                    Log::warning('No rental properties found in API response');
                }

                return response()->json([
                    'success' => true,
                    'count' => count($properties),
                    'properties' => $properties
                ]);
            }

            // Handle unsuccessful response
            Log::error('Failed rental API call to Goyzer: ' . $response->status() . ' - ' . $response->body());
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch rental properties from API',
                'status' => $response->status()
            ], 500);
        } catch (\Exception $e) {
            // Handle exceptions with detailed logging
            Log::error('Exception in PropertyApiController (rentals): ' . $e->getMessage());
            Log::error('Exception trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'message' => 'Error processing rental property data',
                'error' => $e->getMessage(),
                'solution' => 'Using fallback properties. API might be down or credentials may be incorrect.'
            ], 500);
        }
    }
    
    // Enhanced test method with more realistic luxury property data
    public function getTestProperties()
    {
        // Return static test data for development
        $properties = [
            [
                'id' => '1',
                'name' => 'Luxury Villa in Damac Hills 1',
                'price' => 'AED 6,500,000',
                'bedrooms' => 4,
                'bathrooms' => 4,
                'image' => '/assets/img/property1.jpg',
                'link' => '#',
                'description' => 'Exquisite 4-bedroom villa with private pool and garden in a prestigious gated community',
                'location' => 'Damac Hills, Dubai',
                'reference' => 'DH-1234',
                'builtupArea' => '4,200 sq ft',
                'unitType' => 'Villa',
            ],
            [
                'id' => '2',
                'name' => 'Palm Jumeirah Signature Villa',
                'price' => 'AED 18,900,000',
                'bedrooms' => 5,
                'bathrooms' => 6,
                'image' => '/assets/img/property2.jpg',
                'link' => '#',
                'description' => 'Beachfront signature villa with private beach access and panoramic sea views',
                'location' => 'Palm Jumeirah, Dubai',
                'reference' => 'PJ-5678',
                'builtupArea' => '8,500 sq ft',
                'unitType' => 'Villa',
            ],
            [
                'id' => '3',
                'name' => 'Exclusive Downtown Penthouse',
                'price' => 'AED 13,500,000',
                'bedrooms' => 4,
                'bathrooms' => 5,
                'image' => '/assets/img/property3.jpg',
                'link' => '#',
                'description' => 'Luxury penthouse with stunning Burj Khalifa views, private terrace and premium finishes',
                'location' => 'Downtown, Dubai',
                'reference' => 'DT-9012',
                'builtupArea' => '5,300 sq ft',
                'unitType' => 'Apartment',
            ],
            [
                'id' => '4',
                'name' => 'Emirates Hills Mansion',
                'price' => 'AED 31,000,000',
                'bedrooms' => 7,
                'bathrooms' => 8,
                'image' => '/assets/img/property4.jpg',
                'link' => '#',
                'description' => 'Custom-built luxury mansion overlooking Emirates Golf Club with private swimming pool and home cinema',
                'location' => 'Emirates Hills, Dubai',
                'reference' => 'EH-3456',
                'builtupArea' => '15,000 sq ft',
                'unitType' => 'Villa',
            ],
            [
                'id' => '5',
                'name' => 'Bluewaters Island Residence',
                'price' => 'AED 5,600,000',
                'bedrooms' => 3,
                'bathrooms' => 3.5,
                'image' => '/assets/img/property5.jpg',
                'link' => '#',
                'description' => 'Modern apartment with panoramic sea views and access to premium lifestyle amenities',
                'location' => 'Bluewaters Island, Dubai',
                'reference' => 'BW-7890',
                'builtupArea' => '2,400 sq ft',
                'unitType' => 'Apartment',
            ],
            [
                'id' => '6',
                'name' => 'Dubai Hills Estate Mansion',
                'price' => 'AED 21,500,000',
                'bedrooms' => 6,
                'bathrooms' => 7,
                'image' => '/assets/img/property6.jpg',
                'link' => '#',
                'description' => 'Contemporary mansion with city skyline views, featuring a smart home system and infinity pool',
                'location' => 'Dubai Hills Estate, Dubai',
                'reference' => 'DH-1357',
                'builtupArea' => '11,200 sq ft',
                'unitType' => 'Villa',
            ],
            [
                'id' => '7',
                'name' => 'Business Bay Luxury Loft',
                'price' => 'AED 4,800,000',
                'bedrooms' => 2,
                'bathrooms' => 2.5,
                'image' => '/assets/img/property7.jpg',
                'link' => '#',
                'description' => 'Designer loft apartment with double-height ceilings and canal views',
                'location' => 'Business Bay, Dubai',
                'reference' => 'BB-2468',
                'builtupArea' => '2,100 sq ft',
                'unitType' => 'Apartment',
            ],
            [
                'id' => '8',
                'name' => 'Jumeirah Bay Island Villa',
                'price' => 'AED 35,000,000',
                'bedrooms' => 6,
                'bathrooms' => 7,
                'image' => '/assets/img/property8.jpg',
                'link' => '#',
                'description' => 'Exclusive waterfront villa with private beach and yacht berth in a prestigious island community',
                'location' => 'Jumeirah Bay Island, Dubai',
                'reference' => 'JB-3690',
                'builtupArea' => '13,500 sq ft',
                'unitType' => 'Villa',
            ],
        ];
        
        return response()->json([
            'success' => true,
            'count' => count($properties),
            'properties' => $properties,
            'note' => 'Using high-quality test data while API integration is being finalized'
        ]);
    }
}
