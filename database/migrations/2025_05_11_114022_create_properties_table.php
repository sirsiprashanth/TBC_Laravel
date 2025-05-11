<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique()->comment('Property reference like AP7806');
            $table->string('property_name')->comment('Name like Bahar 2, Marina Diamond 1');
            $table->string('community')->nullable()->comment('Community like Jumeirah Beach Residence');
            $table->string('sub_community')->nullable();
            $table->decimal('price', 15, 2)->nullable();
            $table->string('currency')->default('AED');
            $table->integer('bedrooms')->nullable();
            $table->decimal('bathrooms', 3, 1)->nullable();
            $table->decimal('built_up_area', 10, 2)->nullable()->comment('Size in sq ft');
            $table->decimal('plot_area', 10, 2)->nullable();
            $table->string('status')->nullable()->comment('Vacant, Occupied, etc.');
            $table->string('district')->nullable()->comment('Marina District, etc.');
            $table->string('city')->nullable()->default('Dubai');
            $table->string('state')->nullable()->default('Dubai');
            $table->string('country')->nullable()->default('United Arab Emirates');
            $table->string('agent_name')->nullable();
            $table->string('agent_contact')->nullable();
            $table->text('marketing_title')->nullable();
            $table->text('description')->nullable();
            $table->string('primary_view')->nullable()->comment('Sea view, City view, etc.');
            $table->string('secondary_view')->nullable();
            $table->string('unit_floor')->nullable();
            $table->string('floor_no')->nullable();
            $table->string('parking')->nullable();
            $table->string('property_type')->nullable()->comment('Apartment, Villa, Townhouse');
            $table->string('ref_unit_category')->nullable();
            $table->string('brochure_link')->nullable();
            $table->json('images')->nullable()->comment('Array of image URLs');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->dateTime('last_updated')->nullable();
            $table->dateTime('listing_date')->nullable();
            $table->dateTime('expiry_date')->nullable()->default(null);
            $table->string('external_property_id')->nullable();
            $table->json('external_ids')->nullable()->comment('Store IDs like CountryID, CityID');
            $table->json('amenities')->nullable()->comment('Property amenities and features');
            $table->boolean('featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            // Indexes
            $table->index('property_name');
            $table->index('community');
            $table->index('bedrooms');
            $table->index('property_type');
            $table->index('price');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
