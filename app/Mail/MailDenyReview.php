<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailDenyReview extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user;
    public $booking;
    public $property;
    public function __construct($user, $booking, $property)
    {
        $this->user = $user;
        $this->booking = $booking;
        $this->property = $property;
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this->view('denyBooking')
            ->subject('AirHouse');
    }
}
