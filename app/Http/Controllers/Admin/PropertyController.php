<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            // Prepare query with default filters
            $query = Property::query();
            
            // Apply search filter if provided
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function($q) use ($search) {
                    $q->where('reference_number', 'like', "%{$search}%")
                      ->orWhere('property_name', 'like', "%{$search}%")
                      ->orWhere('community', 'like', "%{$search}%");
                });
            }
            
            // Apply property type filter
            if ($request->filled('property_type')) {
                $query->where('property_type', $request->property_type);
            }
            
            // Apply rental filter
            if ($request->filled('is_rental')) {
                $query->where('is_rental', $request->is_rental === 'true' || $request->is_rental === '1');
            }
            
            // Get paginated results
            $properties = $query->latest()
                ->paginate(15)
                ->withQueryString();
            
            // Get dropdown options
            $propertyTypes = Property::distinct('property_type')
                ->pluck('property_type')
                ->filter()
                ->values();
            
            // Extract data for passing to the frontend
            $propertiesData = [
                'data' => $properties->items(),
                'meta' => [
                    'current_page' => $properties->currentPage(),
                    'from' => $properties->firstItem(),
                    'last_page' => $properties->lastPage(),
                    'per_page' => $properties->perPage(),
                    'to' => $properties->lastItem(),
                    'total' => $properties->total(),
                ]
            ];
                
            return Inertia::render('Admin/Properties/Index', [
                'properties' => $propertiesData,
                'filters' => $request->only(['search', 'property_type', 'is_rental']),
                'dropdown_options' => [
                    'property_types' => $propertyTypes
                ]
            ]);
        } catch (\Exception $e) {
            // Log error for debugging
            \Log::error('Error in Admin PropertyController index: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
            
            // Return empty data with error message
            return Inertia::render('Admin/Properties/Index', [
                'properties' => [
                    'data' => [],
                    'meta' => [
                        'current_page' => 1,
                        'from' => 0,
                        'last_page' => 1,
                        'per_page' => 15,
                        'to' => 0,
                        'total' => 0,
                    ]
                ],
                'filters' => $request->only(['search', 'property_type', 'is_rental']),
                'dropdown_options' => [
                    'property_types' => []
                ],
                'error' => 'Failed to load properties: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Get dropdown options for the form
        $propertyTypes = Property::distinct('property_type')
            ->pluck('property_type')
            ->filter()
            ->values();
            
        $communities = Property::distinct('community')
            ->pluck('community')
            ->filter()
            ->values();
            
        return Inertia::render('Admin/Properties/Create', [
            'dropdown_options' => [
                'property_types' => $propertyTypes,
                'communities' => $communities
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the input
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255|unique:properties',
            'property_name' => 'required|string|max:255',
            'community' => 'nullable|string|max:255',
            'sub_community' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|numeric|min:0',
            'built_up_area' => 'nullable|numeric|min:0',
            'plot_area' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'agent_name' => 'nullable|string|max:255',
            'agent_contact' => 'nullable|string|max:255',
            'marketing_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'primary_view' => 'nullable|string|max:255',
            'secondary_view' => 'nullable|string|max:255',
            'unit_floor' => 'nullable|string|max:50',
            'floor_no' => 'nullable|string|max:50',
            'parking' => 'nullable|string|max:100',
            'property_type' => 'nullable|string|max:100',
            'is_rental' => 'boolean',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);
        
        // Create new property
        $property = Property::create($validated);
        
        return redirect()->route('admin.properties.edit', $property->id)
            ->with('success', 'Property created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $property = Property::findOrFail($id);
        
        return Inertia::render('Admin/Properties/Show', [
            'property' => $property
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $property = Property::findOrFail($id);
        
        // Get dropdown options for the form
        $propertyTypes = Property::distinct('property_type')
            ->pluck('property_type')
            ->filter()
            ->values();
            
        $communities = Property::distinct('community')
            ->pluck('community')
            ->filter()
            ->values();
            
        return Inertia::render('Admin/Properties/Edit', [
            'property' => $property,
            'dropdown_options' => [
                'property_types' => $propertyTypes,
                'communities' => $communities
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $property = Property::findOrFail($id);
        
        // Validate the input
        $validated = $request->validate([
            'reference_number' => 'required|string|max:255|unique:properties,reference_number,' . $id,
            'property_name' => 'required|string|max:255',
            'community' => 'nullable|string|max:255',
            'sub_community' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'currency' => 'nullable|string|max:10',
            'bedrooms' => 'nullable|integer|min:0',
            'bathrooms' => 'nullable|numeric|min:0',
            'built_up_area' => 'nullable|numeric|min:0',
            'plot_area' => 'nullable|numeric|min:0',
            'status' => 'nullable|string|max:100',
            'district' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'agent_name' => 'nullable|string|max:255',
            'agent_contact' => 'nullable|string|max:255',
            'marketing_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'primary_view' => 'nullable|string|max:255',
            'secondary_view' => 'nullable|string|max:255',
            'unit_floor' => 'nullable|string|max:50',
            'floor_no' => 'nullable|string|max:50',
            'parking' => 'nullable|string|max:100',
            'property_type' => 'nullable|string|max:100',
            'is_rental' => 'boolean',
            'is_active' => 'boolean',
            'featured' => 'boolean',
        ]);
        
        // Update the property
        $property->update($validated);
        
        return redirect()->route('admin.properties.edit', $property->id)
            ->with('success', 'Property updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $property = Property::findOrFail($id);
        $property->delete();
        
        return redirect()->route('admin.properties.index')
            ->with('success', 'Property deleted successfully.');
    }
    
    /**
     * Toggle the active status of the property.
     */
    public function toggleActive(string $id)
    {
        $property = Property::findOrFail($id);
        $property->is_active = !$property->is_active;
        $property->save();
        
        return back()->with('success', 'Property status updated successfully.');
    }
    
    /**
     * Toggle the featured status of the property.
     */
    public function toggleFeatured(string $id)
    {
        $property = Property::findOrFail($id);
        $property->featured = !$property->featured;
        $property->save();
        
        return back()->with('success', 'Property featured status updated successfully.');
    }
}
