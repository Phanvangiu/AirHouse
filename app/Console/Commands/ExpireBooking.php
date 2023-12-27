<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Command;

class ExpireBooking extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'expire-bookings';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = now();
        $bookings = Booking::where("booking_status", "accepted")->get();
        if ($bookings) {
            foreach ($bookings as $book) {
                $time  = $now->diffInHours($book->updated_at);
                if ($time >= 24) {
                    $book->booking_status = "expired";
                    $book->save();
                }
            }
        }
    }
}
