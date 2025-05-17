<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Property;

class PropertyStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Display current property status and statistics';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Property Status Report ===');
        
        $totalProperties = Property::count();
        $activeProperties = Property::where('is_active', true)->count();
        $inactiveProperties = Property::where('is_active', false)->count();
        $rentalProperties = Property::where('is_rental', true)->count();
        $saleProperties = Property::where(function($q) { 
            $q->where('is_rental', false)->orWhereNull('is_rental'); 
        })->count();
        $propertiesWithImages = Property::whereNotNull('images')->count();
        
        // Get inactive property details
        $inactiveList = Property::where('is_active', false)
            ->select('reference_number', 'property_name')
            ->get();
        
        // Get last updated property
        $lastUpdated = Property::orderBy('updated_at', 'desc')->first();
        
        $this->table(
            ['Metric', 'Count'],
            [
                ['Total Properties', $totalProperties],
                ['Active Properties', $activeProperties],
                ['Inactive Properties', $inactiveProperties],
                ['Sale Properties', $saleProperties],
                ['Rental Properties', $rentalProperties],
                ['Properties with Images', $propertiesWithImages],
            ]
        );
        
        if ($inactiveList->count() > 0) {
            $this->info("\nInactive Properties:");
            foreach ($inactiveList as $property) {
                $this->line("- {$property->reference_number}: {$property->property_name}");
            }
        }
        
        if ($lastUpdated) {
            $this->info("\nLast Updated Property:");
            $this->line("{$lastUpdated->property_name} ({$lastUpdated->reference_number}) - " . $lastUpdated->updated_at->diffForHumans());
        }
        
        $this->info("\nScheduled Updates:");
        $this->line("Daily at midnight (00:00) - Only active properties will be updated");
        $this->line("Log file: storage/logs/property-updates.log");
        
        return Command::SUCCESS;
    }
}