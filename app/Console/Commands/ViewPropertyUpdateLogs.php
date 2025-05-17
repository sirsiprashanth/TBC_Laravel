<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ViewPropertyUpdateLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'properties:logs 
                            {--lines=50 : Number of lines to show}
                            {--follow : Follow the log in real-time}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'View property update logs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $logFile = storage_path('logs/property-updates.log');
        
        if (!file_exists($logFile)) {
            $this->error('Log file not found. The property update command may not have run yet.');
            $this->info('Log file location: ' . $logFile);
            return Command::FAILURE;
        }
        
        $lines = $this->option('lines');
        $follow = $this->option('follow');
        
        if ($follow) {
            $this->info('Following property update logs (Ctrl+C to exit)...');
            passthru("tail -f {$logFile}");
        } else {
            $this->info("Showing last {$lines} lines of property update logs:");
            $this->line(str_repeat('-', 60));
            passthru("tail -n {$lines} {$logFile}");
        }
        
        return Command::SUCCESS;
    }
}