<?php
// Bootstrap the Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Property;
use Illuminate\Support\Facades\Log;

echo "=== Complete Property Import Script ===\n\n";

// Set script timeout
set_time_limit(600);

// API credentials
$accessCode = '@Dlux$@r!(OllE(Tio$n';
$groupCode = '5082';

// Step 1: Fetch Sales Properties
echo "Step 1: Fetching sales properties from API...\n";

$salesUrl = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode($accessCode) .
    "&GroupCode=" . $groupCode .
    "&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

$headers = [
    'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language: en-US,en;q=0.9',
];

// Fetch sales properties
$ch = curl_init($salesUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$salesResponse = curl_exec($ch);
if (curl_errno($ch)) {
    die('Error fetching sales properties: ' . curl_error($ch));
}
curl_close($ch);

// Save sales response
file_put_contents(__DIR__ . '/raw_response.xml', $salesResponse);
echo "Sales properties XML saved to raw_response.xml\n";

// Step 2: Fetch Rental Properties
echo "\nStep 2: Fetching rental properties from API...\n";

$rentUrl = "https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=" . urlencode($accessCode) .
    "&GroupCode=" . $groupCode .
    "&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

$ch = curl_init($rentUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_TIMEOUT, 60);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$rentResponse = curl_exec($ch);
if (curl_errno($ch)) {
    die('Error fetching rental properties: ' . curl_error($ch));
}
curl_close($ch);

// Save rental response
file_put_contents(__DIR__ . '/rental_listings.xml', $rentResponse);
echo "Rental properties XML saved to rental_listings.xml\n";

// Step 3: Import Sales Properties
echo "\nStep 3: Importing sales properties...\n";
exec('php import_from_file_fixed.php', $output, $returnCode);
foreach ($output as $line) {
    echo "$line\n";
}

// Step 4: Import Rental Properties  
echo "\nStep 4: Importing rental properties...\n";
exec('php import_rentals_fixed.php', $output2, $returnCode2);
foreach ($output2 as $line) {
    echo "$line\n";
}

// Step 5: Clear Cache
echo "\nStep 5: Clearing cache...\n";
exec('php artisan cache:clear');
exec('php artisan route:clear');
exec('php artisan view:clear');
exec('php artisan config:clear');

// Step 6: Verify Results
echo "\nStep 6: Verifying import results...\n";
$totalProperties = Property::count();
$rentalProperties = Property::where('is_rental', true)->count();
$saleProperties = Property::where(function($q) { $q->where('is_rental', false)->orWhereNull('is_rental'); })->count();
$propertiesWithImages = Property::whereNotNull('images')->count();

echo "Import completed successfully!\n";
echo "- Total properties: $totalProperties\n";
echo "- Sale properties: $saleProperties\n";
echo "- Rental properties: $rentalProperties\n";
echo "- Properties with images: $propertiesWithImages\n";

if ($propertiesWithImages < $totalProperties) {
    echo "\nWARNING: Some properties are missing images. Check the XML files.\n";
}