<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailDenyProperty extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user;
    public $property;
    public function __construct($user, $property)
    {
        $this->user = $user;
        $this->property = $property;
    }

    /**
     * Get the message envelope.
     */
    public function build()
    {
        return $this->view('denyProperty')
            ->subject('AirHouse');
    }
}
