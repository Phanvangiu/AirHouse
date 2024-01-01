<?php

namespace App\Console\Commands;

use App\Mail\MailDenyReview;
use App\Mail\MailExpireBooking;
use App\Models\Booking;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

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
        $bookingAccepted = Booking::where("booking_status", "accepted")->get();
        if ($bookingAccepted) {
            foreach ($bookingAccepted as $booking) {
                $time  = $now->diffInHours($booking->updated_at);
                if ($time >= 24) {
                    $booking->booking_status = "expired";
                    $booking->save();
                    $user = User::where('id', $booking->user_id)->first();
                    $property  = Property::where('id', $booking->property_id)->first();
                    Mail::to($user->email)->send(new MailExpireBooking($user, $booking, $property));
                }
            }
        }


        $bookingWaiting = Booking::where("booking_status", "waiting")->get();
        if ($bookingWaiting) {
            foreach ($bookingWaiting as $booking) {
                $time  = $now->diffInHours($booking->created_at);
                if ($time >= 72) {
                    $booking->booking_status = "denied";
                    $booking->save();
                    $user = User::where('id', $booking->user_id)->first();
                    $property  = Property::where('id', $booking->property_id)->first();
                    Mail::to($user->email)->send(new MailDenyReview($user, $booking, $property));
                }
            }
        }
    }
}
