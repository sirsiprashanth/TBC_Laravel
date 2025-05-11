# Property Import Instructions

This document explains how to import properties from the Goyzer XML feed into the database.

## Setup Requirements

1. Make sure you have a running MySQL database
2. Ensure the Laravel application is configured correctly
3. Verify that the database migrations have been run

## Import Process

### 1. Importing Sale Properties

Run the following command to import properties for sale:

```bash
php import_from_file.php
```

This will:
- Connect to the Goyzer Sales XML feed
- Process each property
- Insert them into the database with `is_rental = false`
- Skip properties that already exist with the same reference number

### 2. Importing Rental Properties

Run the following command to import rental properties:

```bash
php import_rentals.php
```

This will:
- Connect to the Goyzer Rentals XML feed
- Process each rental property
- Insert them into the database with `is_rental = true`
- Skip properties that already exist with the same reference number

### 3. Verify the Import

To check if the properties were imported correctly, run:

```bash
php artisan tinker --execute="echo 'Rental properties: ' . \App\Models\Property::where('is_rental', true)->count() . \"\\n\" . 'Sale properties: ' . \App\Models\Property::where(function(\$q) { \$q->where('is_rental', false)->orWhereNull('is_rental'); })->count();"
```

### 4. Clear Laravel Cache

Always clear the Laravel cache after importing new properties:

```bash
php artisan cache:clear
php artisan route:clear
php artisan view:clear
```

## Troubleshooting

If you encounter any issues during the import:

- Check the database connection in `.env`
- Verify that the `properties` table has the `is_rental` column
- Review any error messages in the Laravel logs at `storage/logs/laravel.log`
- Ensure the XML feed URLs are accessible

## XML Feed Details

- **Sales XML Feed URL**:
  `https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082...`

- **Rentals XML Feed URL**:
  `https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082...`

## Regular Updates

To keep your property database up to date, set up a cron job to run these import scripts daily:

```
0 2 * * * cd /path/to/application && php import_from_file.php && php import_rentals.php && php artisan cache:clear
```

This will run the imports every day at 2 AM and clear the cache afterward.