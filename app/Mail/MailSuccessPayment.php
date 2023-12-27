<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class MailSuccessPayment extends Mailable
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
        return $this->view('paymentSuccess')
            ->subject('AirHouse');
    }
}
