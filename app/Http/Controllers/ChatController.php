<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Province;
use App\Events\ChatEvent;
use App\Events\NotificationEvent;
use App\Models\ChatModel;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;


class ChatController extends Controller
{
    function sendMessage(Request $request)
    {
        $user_from_email = $request->user()->email;
        $user_to_email = $request->user_to_email;
        $message = $request->message;

        event(new ChatEvent($user_from_email, $user_to_email, $message));
        event(new NotificationEvent($user_from_email, $user_to_email, $message));

        $chat = new Chat();
        $chat->from_email = $user_from_email;
        $chat->to_email = $user_to_email;
        $chat->body = $message;
        $chat->save();

        return response()->json([
            '$user_from_email' => $user_from_email,
            '$user_to_email' => $user_to_email,
            'message' => $message
        ]);
    }

    function getMessage(Request $request)
    {
        $user = $request->user();
        $user_from_email = $user->email;
        $user_to_email = $request->user_to_email;
        $emails = [$user_from_email, $user_to_email];

        $messages = DB::table('tp_messages')
            ->where(function ($query) use ($emails) {
                $query->whereIn('from_email', $emails)
                    ->WhereIn('to_email', $emails);
            })
            ->get();
        return $messages;
    }

    function getAllUser(Request $request)
    {
        $AllUser = [];

        DB::statement("SET SQL_MODE=''");
        $user = $request->user();
        $fromEmail = $user->email;
        $array1 = DB::table('tp_messages')
            ->select('tp_messages.*')
            ->where('from_email', $fromEmail)
            ->orWhere('to_email', $fromEmail)
            ->groupBy('from_email')
            ->pluck('from_email');
        $array2 = DB::table('tp_messages')
            ->select('tp_messages.*')
            ->where('from_email', $fromEmail)
            ->orWhere('to_email', $fromEmail)
            ->groupBy('to_email')
            ->pluck('to_email');

        foreach ($array1 as $key => $value) {
            if (!in_array($value, $AllUser) && $value != $fromEmail) {
                $AllUser[] = $value;
            }
        }
        foreach ($array2 as $key => $value) {
            if (!in_array($value, $AllUser) && $value != $fromEmail) {
                $AllUser[] = $value;
            }
        }

        $users = DB::table('users')
            ->whereIn('email', $AllUser)
            ->get();
        return $users;
    }
    function test()
    {
        $rs = Province::pluck('code');
        $code = fake()->randomElement($rs);
        return response()->json([
            '$rs' => $rs,
            'code' => $code
        ]);
    }
}
