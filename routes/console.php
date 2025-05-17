<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

// Schedule the property update command to run daily at midnight
Schedule::command('properties:update-from-xml')
    ->daily()
    ->at('00:00')
    ->withoutOverlapping()
    ->appendOutputTo(storage_path('logs/property-updates.log'))
    ->before(function () {
        $timestamp = now()->format('Y-m-d H:i:s');
        $separator = str_repeat('=', 60);
        file_put_contents(
            storage_path('logs/property-updates.log'), 
            "\n{$separator}\n[{$timestamp}] Starting scheduled property update\n{$separator}\n", 
            FILE_APPEND
        );
    })
    ->after(function () {
        $timestamp = now()->format('Y-m-d H:i:s');
        file_put_contents(
            storage_path('logs/property-updates.log'), 
            "[{$timestamp}] Property update completed\n\n", 
            FILE_APPEND
        );
    });
