# Instructions for Claude Code

This file contains instructions and project information for Claude to reference when working on this project.

## Project Overview
- This is a Laravel + React/Inertia.js project for a real estate website
- The site displays property listings imported from an XML feed
- MySQL database runs on MAMP (port 8889)
- Development server runs on port 8000

## Core Features
- Property listings for sale and rent
- Property filtering by type, bedrooms, etc.
- Property detail pages
- Contact forms
- Off-plan projects

## Important Commands
- `php artisan serve` - Start the development server
- `php artisan cache:clear` - Clear Laravel cache
- `php artisan route:clear` - Clear route cache
- `npm run dev` - Start Vite development server for frontend
- `php artisan make:model ModelName -m` - Create model with migration

## Project Structure
- `/app/Models` - Eloquent models
- `/app/Http/Controllers` - Controllers
- `/resources/js/Components` - React components
- `/resources/js/Pages` - Inertia.js page components
- `/database/migrations` - Database migrations

## Database Connection
- Host: localhost
- Port: 8889 (MAMP)
- Database: tbc_laravel
- Username: root
- Password: root

## XML Feed Information
- Feed URL: https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082...
- AccessCode: @‌Dlux$@r !(OllE(Tio$n
- GroupCode: 5082

## Best Practices
- with every code change, please give clear information about the code changes you are suggesting, it should explain what the change is and why it is needed, after understanding the change I can approve it or reject it
- I love the 'Update Todos' you are showing when working on each task, its amazing, please continue using it
- Always clear Laravel cache after making changes to routes or controllers
- Use Inertia.js for passing data between backend and frontend
- Follow existing code style and component structure
- Use prop types for React components
- Test on both desktop and mobile viewports

## Property Import Instructions
When deploying to production, follow these steps to import properties correctly:

1. **Run Migrations First**:
   ```bash
   php artisan migrate
   ```
   Ensure the database has the `is_rental` field in the properties table.

2. **Import Sale Properties**:
   ```bash
   php import_from_file.php
   ```
   Sale properties will be imported with `is_rental = false` by default.

3. **Import Rental Properties**:
   ```bash
   php import_rentals.php
   ```
   Rental properties will be imported with `is_rental = true`.

4. **Verify Import**:
   ```bash
   php artisan tinker --execute="echo 'Rental properties: ' . \App\Models\Property::where('is_rental', true)->count() . \"\\n\" . 'Sale properties: ' . \App\Models\Property::where(function(\$q) { \$q->where('is_rental', false)->orWhereNull('is_rental'); })->count();"
   ```

5. **Clear Cache After Import**:
   ```bash
   php artisan cache:clear
   php artisan route:clear
   php artisan view:clear
   ```

## XML Feed Sources
- **Sales Properties**: `https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082...`
- **Rental Properties**: `https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=@Dlux$@r!(OllE(Tio$n&GroupCode=5082...`

## Upcoming Tasks
- Implement property search functionality
- Create admin panel for property management
- Implement contact form submission
- Add user authentication and favorite properties