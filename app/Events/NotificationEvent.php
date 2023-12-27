<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NotificationEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $from_email;
    public $to_email;
    public $body;

    public function __construct($user1, $user2, $message)
    {
        $this->from_email = $user1;
        $this->to_email = $user2;
        $this->body = $message;
    }

    public function broadcastOn()
    {
        return [$this->to_email];
    }

    public function broadcastAs()
    {
        return 'my-event';
    }
}
