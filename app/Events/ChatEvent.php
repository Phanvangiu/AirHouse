<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatEvent implements ShouldBroadcast
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
        $name = [$this->from_email, $this->to_email];
        sort($name);

        return [join("-", $name)];
    }

    public function broadcastAs()
    {
        return 'my-event';
    }
}
