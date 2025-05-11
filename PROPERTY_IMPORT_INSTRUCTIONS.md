# Property Import Instructions

This document explains how to import properties from the XML feed into the application database after deploying to production.

## Prerequisites

- Access to the production server
- Database connection established and configured in `.env`
- PHP 8.0 or higher installed
- Proper permissions to run PHP scripts and access the file system

## Option 1: Using the Import Script

The easiest way to import properties is to use the pre-built import script:

1. First, ensure you have the latest code deployed to production
2. Connect to your production server via SSH or your preferred method
3. Navigate to the root directory of your Laravel application
4. Make sure you have the XML file either:
   - Downloaded from the API and saved as `raw_response.xml` in the project root
   - Or accessible via API endpoint

### Running the Import Script

If you already have the XML file saved locally:

```bash
# Navigate to your Laravel project root
cd /path/to/your/laravel/app

# Run the import script
php import_from_file.php
```

The script will read the XML file, process each property, and save it to the database. You'll see output indicating the progress and final results.

## Option 2: Importing via Admin Interface

You can also import properties via the admin interface:

1. Log into the application with an admin account
2. Navigate to Admin > Properties
3. Click the "Import Properties" button
4. The application will connect to the XML feed and import the properties
5. A success message will appear once the import is complete

## Option 3: Running the Import via Artisan Command

If you prefer to use Laravel's Artisan command (allows scheduling imports):

```bash
# Navigate to your Laravel project root
cd /path/to/your/laravel/app

# Run the import command
php artisan properties:import
```

## XML Feed Details

The XML feed URL is:
```
https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=
```

### Important Notes:

1. The XML feed contains properties from the Goyzer system
2. The import process checks for existing properties by reference number to avoid duplicates
3. Properties are only updated if they're new or have a newer update date
4. The import script handles all data formatting and type conversions

## Troubleshooting

If you encounter issues during import:

1. **Database Connection Issues**: Check your `.env` file for correct database credentials
2. **XML Parsing Errors**: Ensure the XML feed is accessible and properly formatted
3. **Permission Issues**: Make sure your web server has write access to the database
4. **Error Logs**: Check Laravel logs in `storage/logs/laravel.log` for detailed error messages

## Scheduling Regular Imports

To set up automatic property imports, add this to your `app/Console/Kernel.php` file:

```php
protected function schedule(Schedule $schedule)
{
    // Import properties daily at midnight
    $schedule->command('properties:import')->daily();
}
```

Then make sure your scheduler is running via cron job:

```
* * * * * cd /path/to/your/laravel/app && php artisan schedule:run >> /dev/null 2>&1
```

## Support

If you encounter any issues with the property import process, please contact the development team for assistance.