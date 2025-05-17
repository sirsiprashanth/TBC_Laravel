# Cron Job Setup for Property Updates

This guide explains how to set up automated property updates from the XML feed.

## Overview

The system includes a Laravel command that:
- Fetches property data from the Goyzer API
- Updates only active properties 
- Preserves inactive property status
- Logs all updates
- Runs daily at midnight

## Command Details

**Command:** `php artisan properties:update-from-xml`

**Features:**
- Creates new properties found in XML (marked as active by default)
- Updates existing active properties
- Skips inactive properties (preserves their status)
- Only updates if XML has newer data
- Handles encoding issues
- Correctly imports images from XML
- Logs output to `storage/logs/property-updates.log`

## Testing the Command

Run manually to test:
```bash
php artisan properties:update-from-xml
```

## Setting Up Cron Job

### Option 1: Laravel Scheduler (Recommended)

Add to your server's crontab:
```bash
* * * * * cd /path/to/TBC_Laravel && php artisan schedule:run >> /dev/null 2>&1
```

The scheduler is already configured to run the update at midnight.

### Option 2: Direct Cron Job

Add to your server's crontab:
```bash
0 0 * * * cd /path/to/TBC_Laravel && php artisan properties:update-from-xml >> /dev/null 2>&1
```

### For MAMP/Local Development

1. Open Terminal
2. Run `crontab -e`
3. Add:
```bash
0 0 * * * cd /Applications/MAMP/htdocs/TBC_Laravel && /Applications/MAMP/bin/php/php8.2.20/bin/php artisan properties:update-from-xml >> /dev/null 2>&1
```

## Monitoring Updates

Check the log file:
```bash
tail -f storage/logs/property-updates.log
```

## Manual Updates

To manually update properties (ignoring inactive status):
```bash
php import_from_file_fixed.php  # For sales
php import_rentals_fixed.php    # For rentals
```

## Important Notes

1. **Inactive Properties**: Properties marked as inactive in the database will NOT be updated
2. **New Properties**: New properties found in XML are automatically created and set as active
3. **Schedule**: Updates run at midnight server time
4. **Logs**: All updates are logged with timestamps
5. **Cache**: Cache is automatically cleared after updates
6. **Reference Numbers**: Properties are identified by their reference number (RefNo)