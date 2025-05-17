# Fresh Installation Guide for TBC Laravel

This guide covers all steps needed to set up the project from scratch and import all properties with real images.

## Prerequisites
- PHP 8.1+
- Composer
- MySQL (MAMP or similar)
- Node.js & NPM

## Step-by-Step Installation

### 1. Clone the Repository
```bash
git clone [repository-url]
cd TBC_Laravel
```

### 2. Install Dependencies
```bash
composer install
npm install
```

### 3. Environment Setup
Create the `.env` file:
```bash
cp .env.example .env
```

If `.env.example` doesn't exist, create `.env` with:
```
APP_NAME="TBC Laravel"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=8889
DB_DATABASE=tbc_laravel
DB_USERNAME=root
DB_PASSWORD=root

SESSION_DRIVER=database
CACHE_DRIVER=database
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Run Migrations
```bash
php artisan migrate
```

### 6. Import Properties with Images

Option A: Run all-in-one script (recommended):
```bash
php fetch_and_import_all.php
```

Option B: Run individual scripts:
```bash
# Import sale properties
php import_from_file_fixed.php

# Import rental properties  
php import_rentals_fixed.php
```

Note: The all-in-one script will fetch fresh data from the API and import everything automatically.

### 7. Clear Cache
```bash
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan config:clear
```

### 8. Verify Import
```bash
php artisan tinker --execute="echo 'Total properties: ' . \App\Models\Property::count() . \"\\n\" . 'Properties with images: ' . \App\Models\Property::whereNotNull('images')->count();"
```

You should see:
- Total properties: 70
- Properties with images: 70

### 9. Start Development Servers
In one terminal:
```bash
php artisan serve
```

In another terminal:
```bash
npm run dev
```

### 10. Access the Application
- Frontend: http://localhost:8000
- Admin: http://localhost:8000/login (after creating admin user)

## Creating Admin User (Optional)
```bash
php artisan tinker
>>> $user = new \App\Models\User();
>>> $user->name = 'Admin';
>>> $user->email = 'admin@example.com';
>>> $user->password = bcrypt('password');
>>> $user->is_admin = true;
>>> $user->save();
>>> exit
```

## Troubleshooting

### If images are missing:
1. Check if XML files exist: `raw_response.xml`, `rental_listings.xml`
2. Verify property reference numbers match between XML and database
3. Run the image fix script if needed

### If encoding errors occur:
- The fixed import scripts handle UTF-8 encoding issues automatically
- Check logs in `storage/logs/laravel.log` for specific errors

## Important Notes
- The XML feed URLs are hardcoded in the import scripts
- Images are hosted on the Goyzer API with watermarks
- Properties marked as rentals have `is_rental = true` in the database
- Sale properties have `is_rental = false` or `null`

## API Credentials
- AccessCode: @Dlux$@r!(OllE(Tio$n
- GroupCode: 5082
- Sales URL: https://webapi.goyzer.com/Company.asmx/SalesListings
- Rentals URL: https://webapi.goyzer.com/Company.asmx/RentListings