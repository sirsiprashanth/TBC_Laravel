<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PropertyController extends Controller
{
    private $accessCode;
    private $groupCode;

    public function __construct()
    {
        // Store API credentials (ideally, these would be in .env file)
        $this->accessCode = '@‌Dlux$@r !(OllE(Tio$n';
        $this->groupCode = '5082';
    }

    /**
     * Display a listing of properties.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = Property::query()->active();

        // Apply filters if any
        if ($request->filled('type')) {
            $query->ofType($request->type);
        }

        if ($request->filled('bedrooms')) {
            $query->withBedrooms($request->bedrooms);
        }

        if ($request->filled('community')) {
            $query->inCommunity($request->community);
        }

        if ($request->filled('min_price')) {
            $maxPrice = $request->filled('max_price') ? $request->max_price : null;
            $query->byPriceRange($request->min_price, $maxPrice);
        }

        // Get paginated results
        $properties = $query->latest()->paginate(9);

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['type', 'bedrooms', 'community', 'min_price', 'max_price']),
        ]);
    }

    /**
     * Display the specified property.
     *
     * @param  \App\Models\Property  $property
     * @return \Inertia\Response
     */
    public function show(Property $property)
    {
        // Load similar properties based on same community/location or similar bedrooms
        $similarProperties = Property::where('id', '!=', $property->id)
            ->where('is_active', true)
            ->where(function($query) use ($property) {
                $query->where('community', $property->community)
                    ->orWhere('bedrooms', $property->bedrooms);
            })
            ->limit(3)
            ->get()
            ->map(function ($similarProperty) {
                return [
                    'id' => $similarProperty->id,
                    'property_name' => $similarProperty->property_name,
                    'price' => $similarProperty->price,
                    'formatted_price' => $similarProperty->formatted_price ?? ('AED ' . number_format($similarProperty->price, 0)),
                    'bedrooms' => $similarProperty->bedrooms,
                    'bathrooms' => $similarProperty->bathrooms,
                    'images' => $similarProperty->images,
                    'property_type' => $similarProperty->property_type,
                    'built_up_area' => $similarProperty->built_up_area,
                    'full_location' => $similarProperty->full_location
                ];
            });

        // Transform property data for the view
        $propertyData = array_merge($property->toArray(), [
            'formatted_price' => $property->formatted_price ?? ('AED ' . number_format($property->price, 0)),
            'full_location' => $property->full_location
        ]);

        return Inertia::render('Properties/Show', [
            'property' => $propertyData,
            'similarProperties' => $similarProperties,
        ]);
    }

    /**
     * Import properties from the XML feed.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function import()
    {
        try {
            // Set browser-like headers
            $headers = [
                'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language' => 'en-US,en;q=0.9',
            ];

            // URL with proper URL encoding for special characters
            $url = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode($this->accessCode) .
                  "&GroupCode=" . $this->groupCode .
                  "&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

            // Make the request
            $response = Http::withHeaders($headers)->get($url);

            // Check if request was successful
            if (!$response->successful()) {
                return redirect()->back()->with('error', 'Failed to fetch properties from XML feed. Status code: ' . $response->status());
            }

            // Try to parse the XML
            try {
                // Suppress warnings to catch XML parsing errors
                libxml_use_internal_errors(true);

                $xml = simplexml_load_string($response->body());

                if (!$xml) {
                    $errors = libxml_get_errors();
                    libxml_clear_errors();

                    Log::error('XML parsing errors: ' . json_encode($errors));
                    return redirect()->back()->with('error', 'Failed to parse XML response.');
                }

                // Count how many properties were processed and imported
                $processed = 0;
                $imported = 0;

                // Process each property
                foreach ($xml->UnitDTO as $propertyData) {
                    $processed++;

                    // Extract reference number
                    $refNo = (string)$propertyData->RefNo;

                    // Check if property already exists
                    $property = Property::firstOrNew(['reference_number' => $refNo]);

                    // Only update property data if it's new or has a newer update date
                    $isNew = !$property->exists;
                    $xmlLastUpdated = isset($propertyData->LastUpdated) ? (string)$propertyData->LastUpdated : null;

                    if ($isNew || !$property->last_updated ||
                        ($xmlLastUpdated && strtotime($xmlLastUpdated) > strtotime($property->last_updated))) {

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
                            'listing_date' => isset($propertyData->ListingDate) ? (string)$propertyData->ListingDate : null,
                            'expiry_date' => isset($propertyData->ExpiryDate) ? (string)$propertyData->ExpiryDate : null,
                            'external_property_id' => isset($propertyData->PropertyID) ? (string)$propertyData->PropertyID : null,
                            'external_ids' => $externalIds,
                            'is_active' => true,
                        ]);

                        // Save the property
                        $property->save();
                        $imported++;
                    }
                }

                // Return success message
                return redirect()->back()->with('success', "XML import completed. Processed $processed properties, imported/updated $imported.");

            } catch (\Exception $e) {
                Log::error('Exception during XML processing: ' . $e->getMessage());
                Log::error($e->getTraceAsString());

                return redirect()->back()->with('error', 'Error processing XML data: ' . $e->getMessage());
            }

        } catch (\Exception $e) {
            Log::error('Exception during property import: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            return redirect()->back()->with('error', 'Error importing properties: ' . $e->getMessage());
        }
    }

    /**
     * Display properties for sale on the Sell page.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function sell(Request $request)
    {
        // Start query with base filters
        $query = Property::where(function($query) {
                $query->where('property_type', 'Apartment')
                    ->orWhere('property_type', 'Villa')
                    ->orWhere('property_type', 'Townhouse')
                    ->orWhere('property_type', 'Penthouse');
            })
            ->where('is_active', true)
            ->where(function($query) {
                $query->where('is_rental', false)
                      ->orWhereNull('is_rental'); // For backwards compatibility with older data
            });

        // Apply location filter if provided
        if ($request->filled('location')) {
            $location = $request->location;
            $query->where(function($query) use ($location) {
                $query->where('community', 'like', "%{$location}%")
                      ->orWhere('district', 'like', "%{$location}%")
                      ->orWhere('city', 'like', "%{$location}%")
                      ->orWhere('country', 'like', "%{$location}%");
            });
        }

        // Apply bedrooms filter if provided
        if ($request->filled('bedrooms') && $request->bedrooms !== 'Any') {
            if ($request->bedrooms === '5+') {
                $query->where('bedrooms', '>=', 5);
            } else {
                $query->where('bedrooms', $request->bedrooms);
            }
        }

        // Apply price range filter if provided
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Apply property type filter if provided
        if ($request->filled('property_type') && $request->property_type !== 'Any') {
            $query->where('property_type', $request->property_type);
        }

        // Get the filtered properties
        $properties = $query->latest()
            ->get()
            ->map(function ($property) {
                return [
                    'id' => $property->id,
                    'name' => $property->property_name,
                    'price' => $property->formatted_price ?? ('AED ' . number_format($property->price, 0)),
                    'bedrooms' => $property->bedrooms,
                    'bathrooms' => $property->bathrooms,
                    'image' => ($property->images && is_array($property->images) && count($property->images) > 0)
                        ? $property->images[0]
                        : '/assets/img/property.png',
                    'link' => route('properties.show', $property),
                    'location' => $property->full_location ?? $property->location,
                    'reference' => $property->reference_number,
                    'unitType' => $property->property_type,
                    'builtupArea' => $property->built_up_area,
                    'description' => $property->description
                ];
            });

        // Collect all filter parameters to pass back to the view
        $filters = $request->only([
            'location',
            'bedrooms',
            'min_price',
            'max_price',
            'property_type'
        ]);

        // Add property type for filter display
        $filters['propertyFor'] = 'Buy';

        // Get dropdown options from database
        $propertyTypes = Property::where('is_active', true)
            ->where(function($query) {
                $query->where('is_rental', false)
                      ->orWhereNull('is_rental');
            })
            ->distinct('property_type')
            ->pluck('property_type')
            ->filter()
            ->values();

        $bedroomOptions = Property::where('is_active', true)
            ->where(function($query) {
                $query->where('is_rental', false)
                      ->orWhereNull('is_rental');
            })
            ->distinct('bedrooms')
            ->pluck('bedrooms')
            ->sort()
            ->filter()
            ->values();

        $communities = Property::where('is_active', true)
            ->where(function($query) {
                $query->where('is_rental', false)
                      ->orWhereNull('is_rental');
            })
            ->distinct('community')
            ->pluck('community')
            ->filter()
            ->values();

        // Return the Sell view with properties data, filters and dropdown options
        return Inertia::render('Sell', [
            'properties' => $properties,
            'count' => count($properties),
            'filters' => $filters,
            'dropdown_options' => [
                'property_types' => $propertyTypes,
                'bedrooms' => $bedroomOptions,
                'communities' => $communities
            ]
        ]);
    }

    /**
     * Display properties for rent on the Rent page.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function rent(Request $request)
    {
        // Start query with base filters
        $query = Property::where(function($query) {
                $query->where('property_type', 'Apartment')
                    ->orWhere('property_type', 'Villa')
                    ->orWhere('property_type', 'Townhouse')
                    ->orWhere('property_type', 'Penthouse');
            })
            ->where('is_active', true)
            ->where('is_rental', true);

        // Apply location filter if provided
        if ($request->filled('location')) {
            $location = $request->location;
            $query->where(function($query) use ($location) {
                $query->where('community', 'like', "%{$location}%")
                      ->orWhere('district', 'like', "%{$location}%")
                      ->orWhere('city', 'like', "%{$location}%")
                      ->orWhere('country', 'like', "%{$location}%");
            });
        }

        // Apply bedrooms filter if provided
        if ($request->filled('bedrooms') && $request->bedrooms !== 'Any') {
            if ($request->bedrooms === '5+') {
                $query->where('bedrooms', '>=', 5);
            } else {
                $query->where('bedrooms', $request->bedrooms);
            }
        }

        // Apply price range filter if provided
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Apply property type filter if provided
        if ($request->filled('property_type') && $request->property_type !== 'Any') {
            $query->where('property_type', $request->property_type);
        }

        // Get the filtered properties
        $properties = $query->latest()
            ->get()
            ->map(function ($property) {
                // Calculate monthly price from yearly
                $monthlyPrice = $property->price ? $property->price / 12 : null;

                return [
                    'id' => $property->id,
                    'name' => $property->property_name,
                    'price' => $property->formatted_price ?? ('AED ' . number_format($property->price, 0)),
                    'pricePerMonth' => $monthlyPrice ? ('AED ' . number_format($monthlyPrice, 0) . '/month') : null,
                    'bedrooms' => $property->bedrooms,
                    'bathrooms' => $property->bathrooms,
                    'image' => ($property->images && is_array($property->images) && count($property->images) > 0)
                        ? $property->images[0]
                        : '/assets/img/property.png',
                    'link' => route('properties.show', $property),
                    'location' => $property->full_location ?? $property->location,
                    'reference' => $property->reference_number,
                    'unitType' => $property->property_type,
                    'builtupArea' => $property->built_up_area,
                    'description' => $property->description,
                    'amenities' => $property->amenities
                ];
            });

        // Collect all filter parameters to pass back to the view
        $filters = $request->only([
            'location',
            'bedrooms',
            'min_price',
            'max_price',
            'property_type'
        ]);

        // Add property type for filter display
        $filters['propertyFor'] = 'Rent';

        // Get dropdown options from database
        $propertyTypes = Property::where('is_active', true)
            ->where('is_rental', true)
            ->distinct('property_type')
            ->pluck('property_type')
            ->filter()
            ->values();

        $bedroomOptions = Property::where('is_active', true)
            ->where('is_rental', true)
            ->distinct('bedrooms')
            ->pluck('bedrooms')
            ->sort()
            ->filter()
            ->values();

        $communities = Property::where('is_active', true)
            ->where('is_rental', true)
            ->distinct('community')
            ->pluck('community')
            ->filter()
            ->values();

        // Return the Rent view with properties data, filters and dropdown options
        return Inertia::render('Rent', [
            'properties' => $properties,
            'count' => count($properties),
            'filters' => $filters,
            'dropdown_options' => [
                'property_types' => $propertyTypes,
                'bedrooms' => $bedroomOptions,
                'communities' => $communities
            ]
        ]);
    }

    /**
     * Generate XML feed of properties.
     *
     * @return \Illuminate\Http\Response
     */
    public function xmlFeed()
    {
        try {
            // Get all active properties
            $properties = Property::active()->get();

            // Create a new XML document
            $xml = new \SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?><properties></properties>');

            // Add each property to the XML
            foreach ($properties as $property) {
                $propertyNode = $xml->addChild('property');

                // Add property details as XML elements
                $propertyNode->addChild('id', htmlspecialchars($property->id));
                $propertyNode->addChild('reference', htmlspecialchars($property->reference_number));
                $propertyNode->addChild('property_name', htmlspecialchars($property->property_name));

                // Price
                $propertyNode->addChild('price', $property->price);

                // Basic details
                $propertyNode->addChild('bedrooms', $property->bedrooms);
                $propertyNode->addChild('bathrooms', $property->bathrooms);
                $propertyNode->addChild('type', htmlspecialchars($property->property_type));
                $propertyNode->addChild('location', htmlspecialchars($property->full_location));
                $propertyNode->addChild('builtupArea', $property->built_up_area);
                $propertyNode->addChild('description', htmlspecialchars($property->description));

                // Image and URL
                if ($property->images && is_array($property->images) && count($property->images) > 0) {
                    $propertyNode->addChild('image', htmlspecialchars($property->images[0]));
                }

                $baseUrl = url('/');
                $propertyNode->addChild('url', $baseUrl . '/properties/' . $property->id);
            }

            // Set the content type header to XML
            $response = response($xml->asXML());
            $response->header('Content-Type', 'application/xml');

            return $response;
        } catch (\Exception $e) {
            // Log the exception
            Log::error('Exception in xmlFeed: ' . $e->getMessage());
            Log::error($e->getTraceAsString());

            // Return an error XML
            $errorXml = '<?xml version="1.0" encoding="UTF-8"?><error>Failed to generate XML feed: ' . htmlspecialchars($e->getMessage()) . '</error>';

            $response = response($errorXml);
            $response->header('Content-Type', 'application/xml');

            return $response;
        }
    }
}
