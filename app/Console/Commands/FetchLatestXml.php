<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class FetchLatestXml extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:fetch-xml 
                            {--sales : Fetch only sales properties}
                            {--rentals : Fetch only rental properties}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch latest XML data from the API and save to files';

    /**
     * API credentials
     */
    private $accessCode = '@Dlux$@r!(OllE(Tio$n';
    private $groupCode = '5082';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $fetchSales = !$this->option('rentals') || $this->option('sales');
        $fetchRentals = !$this->option('sales') || $this->option('rentals');
        
        $this->info('Fetching latest XML data from API...');
        
        $success = true;
        
        if ($fetchSales) {
            $success = $this->fetchSalesXml() && $success;
        }
        
        if ($fetchRentals) {
            $success = $this->fetchRentalsXml() && $success;
        }
        
        return $success ? Command::SUCCESS : Command::FAILURE;
    }

    /**
     * Fetch sales XML
     */
    private function fetchSalesXml()
    {
        $this->info('Fetching sales properties XML...');
        
        $url = "https://webapi.goyzer.com/Company.asmx/SalesListings?AccessCode=" . urlencode($this->accessCode) .
            "&GroupCode=" . $this->groupCode .
            "&Bedrooms=&StartPriceRange=&EndPriceRange=&CategoryID=&SpecialProjects=&CountryID=&StateID=&CommunityID=&DistrictID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

        $content = $this->fetchXml($url);
        
        if ($content) {
            $file = base_path('raw_response.xml');
            file_put_contents($file, $content);
            $size = number_format(strlen($content) / 1024, 2);
            $this->info("Sales XML saved to {$file} ({$size} KB)");
            return true;
        } else {
            $this->error('Failed to fetch sales XML');
            return false;
        }
    }

    /**
     * Fetch rentals XML
     */
    private function fetchRentalsXml()
    {
        $this->info('Fetching rental properties XML...');
        
        $url = "https://webapi.goyzer.com/Company.asmx/RentListings?AccessCode=" . urlencode($this->accessCode) .
            "&GroupCode=" . $this->groupCode .
            "&PropertyType=&Bedrooms=&StartPriceRange=&EndPriceRange=&categoryID=&CountryID=&StateID=&CommunityID=&FloorAreaMin=&FloorAreaMax=&UnitCategory=&UnitID=&BedroomsMax=&PropertyID=&ReadyNow=&PageIndex=";

        $content = $this->fetchXml($url);
        
        if ($content) {
            $file = base_path('rental_listings.xml');
            file_put_contents($file, $content);
            $size = number_format(strlen($content) / 1024, 2);
            $this->info("Rental XML saved to {$file} ({$size} KB)");
            return true;
        } else {
            $this->error('Failed to fetch rental XML');
            return false;
        }
    }

    /**
     * Fetch XML from URL
     */
    private function fetchXml($url)
    {
        $headers = [
            'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.9',
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 60);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            $error = curl_error($ch);
            Log::error('cURL error in FetchLatestXml: ' . $error);
            $this->error('cURL error: ' . $error);
            curl_close($ch);
            return false;
        }

        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode != 200) {
            Log::error("HTTP error in FetchLatestXml: {$httpCode} for URL: {$url}");
            $this->error("HTTP error: {$httpCode}");
            return false;
        }

        return $response;
    }
}