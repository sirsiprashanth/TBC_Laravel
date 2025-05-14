<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class MakeUserAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'user:make-admin {email : The email of the user to be made admin}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a user an administrator by email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        // Find the user
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User with email {$email} not found.");
            return 1;
        }
        
        // Check if already admin
        if ($user->is_admin) {
            $this->info("User {$email} is already an admin.");
            return 0;
        }
        
        // Make user admin
        $user->is_admin = true;
        $user->save();
        
        $this->info("User {$email} has been made an admin successfully.");
        return 0;
    }
}
