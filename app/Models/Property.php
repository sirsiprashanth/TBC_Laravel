<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'reference_number',
        'property_name',
        'community',
        'sub_community',
        'price',
        'currency',
        'bedrooms',
        'bathrooms',
        'built_up_area',
        'plot_area',
        'status',
        'district',
        'city',
        'state',
        'country',
        'agent_name',
        'agent_contact',
        'marketing_title',
        'description',
        'primary_view',
        'secondary_view',
        'unit_floor',
        'floor_no',
        'parking',
        'property_type',
        'ref_unit_category',
        'brochure_link',
        'images',
        'latitude',
        'longitude',
        'last_updated',
        'listing_date',
        'expiry_date',
        'external_property_id',
        'external_ids',
        'amenities',
        'featured',
        'is_active',
        'is_rental',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'built_up_area' => 'decimal:2',
        'plot_area' => 'decimal:2',
        'bedrooms' => 'integer',
        'bathrooms' => 'decimal:1',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'last_updated' => 'datetime',
        'listing_date' => 'datetime',
        'expiry_date' => 'datetime',
        'images' => 'array',
        'external_ids' => 'array',
        'amenities' => 'array',
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'is_rental' => 'boolean',
    ];

    /**
     * Get the formatted price with currency.
     *
     * @return string
     */
    public function getFormattedPriceAttribute()
    {
        return $this->currency . ' ' . number_format($this->price, 0);
    }

    /**
     * Get the formatted built-up area with unit.
     *
     * @return string
     */
    public function getFormattedAreaAttribute()
    {
        return number_format($this->built_up_area, 2) . ' sq ft';
    }

    /**
     * Get the full location string.
     *
     * @return string
     */
    public function getFullLocationAttribute()
    {
        $location = [];

        if ($this->district) {
            $location[] = $this->district;
        }

        if ($this->city) {
            $location[] = $this->city;
        }

        if ($this->country) {
            $location[] = $this->country;
        }

        return implode(', ', $location);
    }

    /**
     * Filter properties by type.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('property_type', $type);
    }

    /**
     * Filter featured properties.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Filter properties by price range.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param float $min
     * @param float|null $max
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByPriceRange($query, $min, $max = null)
    {
        $query->where('price', '>=', $min);

        if ($max) {
            $query->where('price', '<=', $max);
        }

        return $query;
    }

    /**
     * Filter properties by number of bedrooms.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $bedrooms
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithBedrooms($query, $bedrooms)
    {
        return $query->where('bedrooms', $bedrooms);
    }

    /**
     * Filter properties by community.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $community
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeInCommunity($query, $community)
    {
        return $query->where('community', $community);
    }

    /**
     * Filter active properties.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Filter rental properties.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeRental($query)
    {
        return $query->where('is_rental', true);
    }

    /**
     * Filter sale properties (not rentals).
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeForSale($query)
    {
        return $query->where('is_rental', false);
    }
}
