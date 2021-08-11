<?php

namespace App\Console;

use App\Cron;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {

        // $schedule->command('coba:coba1')->twiceDaily(1, 3);
        $schedule->command('coba:coba1')->everyMinute();
        // $schedule->command('inspire')->hourly();
        // $schedule->command('tagihan:harian')->everyMinute();
        // $schedule->command('tagihan:pertama')->everyThirtyMinutes();
        // $schedule->command('tagihan:kedua')->hourly();


        // $schedule->command('tagihan:pertama')->everyMinute()->when(function () {
        //     return Cron::shouldIRun('tagihan:pertama', 10); //returns true every 10 minutes
        // });
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
