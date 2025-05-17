# DigitalOcean Production Cron Setup Guide

This guide explains how to set up the daily property update cron job on your DigitalOcean droplet.

## Prerequisites
- SSH access to your DigitalOcean droplet
- Laravel project deployed and running
- PHP and Composer installed

## Step 1: SSH into Your Droplet

```bash
ssh root@your-droplet-ip
# or
ssh your-username@your-droplet-ip
```

## Step 2: Set Up Laravel Scheduler

Add the Laravel scheduler to your system crontab:

```bash
# Open crontab for the web user (usually www-data on Ubuntu/Debian)
sudo crontab -u www-data -e

# Or if using nginx
sudo crontab -u nginx -e

# Or for the current user
crontab -e
```

## Step 3: Add the Cron Entry

Add this line (adjust paths based on your setup):

### For Nginx/Apache with Ubuntu:
```bash
* * * * * cd /var/www/TBC_Laravel && php artisan schedule:run >> /dev/null 2>&1
```

### For Laravel Forge or similar:
```bash
* * * * * cd /home/forge/your-site.com && php artisan schedule:run >> /dev/null 2>&1
```

### Common DigitalOcean Paths:
- **PHP Path**: `/usr/bin/php` (default on Ubuntu)
- **Project Path**: `/var/www/TBC_Laravel` or `/var/www/html/TBC_Laravel`

## Step 4: Verify PHP Version and Path

```bash
# Check PHP version
php -v

# Find PHP path
which php

# If using multiple PHP versions
which php8.2
```

## Step 5: Set Proper Permissions

```bash
# Navigate to your project
cd /var/www/TBC_Laravel

# Set permissions for Laravel
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Make artisan executable
chmod +x artisan
```

## Step 6: Configure Environment

Ensure your `.env` file has the correct timezone:

```bash
nano /var/www/TBC_Laravel/.env
```

Add or update:
```
APP_TIMEZONE=UTC
# or your preferred timezone
APP_TIMEZONE=America/New_York
```

## Step 7: Test the Setup

1. Test the command manually:
```bash
cd /var/www/TBC_Laravel
sudo -u www-data php artisan properties:update-from-xml
```

2. Test the scheduler:
```bash
sudo -u www-data php artisan schedule:run
```

## Step 8: Set Up Log Monitoring

1. Create log directory if needed:
```bash
mkdir -p /var/www/TBC_Laravel/storage/logs
chown www-data:www-data /var/www/TBC_Laravel/storage/logs
```

2. Monitor logs:
```bash
# Watch property updates
tail -f /var/www/TBC_Laravel/storage/logs/property-updates.log

# Watch Laravel logs
tail -f /var/www/TBC_Laravel/storage/logs/laravel.log

# Watch system cron logs
tail -f /var/log/syslog | grep CRON
```

## Step 9: Set Up Automatic Security Updates (Optional)

For DigitalOcean droplets, enable automatic security updates:

```bash
sudo apt update
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

## Step 10: Configure Firewall (if using ufw)

```bash
# Check firewall status
sudo ufw status

# Allow SSH (if not already allowed)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'
# or
sudo ufw allow 'Apache Full'
```

## Full Example Crontab Entry

```bash
# Edit crontab
sudo crontab -u www-data -e

# Add this line
* * * * * cd /var/www/TBC_Laravel && /usr/bin/php artisan schedule:run >> /dev/null 2>&1
```

## Monitoring and Alerts

### Option 1: DigitalOcean Monitoring
1. Go to your droplet dashboard
2. Click on "Monitoring"
3. Set up alerts for CPU, memory, and disk usage

### Option 2: Custom Email Alerts
Add to your crontab to receive email notifications:

```bash
MAILTO="your-email@example.com"
* * * * * cd /var/www/TBC_Laravel && php artisan schedule:run
```

### Option 3: Use Laravel's Built-in Notifications
Add to your scheduled command in `routes/console.php`:

```php
Schedule::command('properties:update-from-xml')
    ->daily()
    ->at('00:00')
    ->emailOutputTo('admin@example.com')
    ->emailOutputOnFailure('admin@example.com');
```

## Troubleshooting

### 1. Cron Not Running
```bash
# Check if cron service is running
systemctl status cron

# Restart cron service
sudo systemctl restart cron

# Check cron logs
grep CRON /var/log/syslog
```

### 2. Permission Issues
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/TBC_Laravel
sudo chmod -R 755 /var/www/TBC_Laravel
sudo chmod -R 775 /var/www/TBC_Laravel/storage
sudo chmod -R 775 /var/www/TBC_Laravel/bootstrap/cache
```

### 3. PHP Memory Limits
Edit PHP configuration if needed:

```bash
# Find PHP ini file
php -i | grep "php.ini"

# Edit PHP settings
sudo nano /etc/php/8.2/cli/php.ini

# Increase memory limit
memory_limit = 512M
max_execution_time = 300
```

### 4. Debug Cron Execution
Create a debug cron entry:

```bash
* * * * * cd /var/www/TBC_Laravel && php artisan schedule:run >> /tmp/laravel-cron.log 2>&1
```

Then check the log:
```bash
tail -f /tmp/laravel-cron.log
```

## DigitalOcean Specific Tips

1. **Use Droplet Snapshots**: Before major changes, create a snapshot
2. **Enable Backups**: Enable automated backups in your droplet settings
3. **Monitor Resources**: Use `htop` or `top` to monitor resource usage
4. **Use Private Networking**: For multiple droplets, use private networking

## Security Best Practices

1. **Disable Root Login** (if not already done):
```bash
sudo nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
sudo systemctl restart ssh
```

2. **Use SSH Keys** instead of passwords

3. **Keep System Updated**:
```bash
sudo apt update && sudo apt upgrade
```

4. **Install Fail2ban**:
```bash
sudo apt install fail2ban
```

## Final Verification

1. Check crontab is saved:
```bash
sudo crontab -u www-data -l
```

2. Wait a few minutes and check if scheduler ran:
```bash
tail -f /var/www/TBC_Laravel/storage/logs/laravel.log
```

3. Check property update logs after midnight:
```bash
tail -f /var/www/TBC_Laravel/storage/logs/property-updates.log
```

## Support Resources

- DigitalOcean Community: https://www.digitalocean.com/community
- Laravel Deployment: https://laravel.com/docs/deployment
- Ubuntu Cron Guide: https://help.ubuntu.com/community/CronHowto

## Quick Reference

```bash
# SSH to droplet
ssh user@your-droplet-ip

# Edit crontab
sudo crontab -u www-data -e

# Add scheduler
* * * * * cd /var/www/TBC_Laravel && php artisan schedule:run >> /dev/null 2>&1

# Save and exit
Ctrl+X, Y, Enter (in nano)
:wq (in vim)

# Verify
sudo crontab -u www-data -l
```