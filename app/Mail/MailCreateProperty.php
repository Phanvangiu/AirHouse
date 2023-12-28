<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailCreateProperty extends Mailable
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
    public function build()
    {
        return $this->view('createProperty')
            ->subject('AirHouse');
    }
}
