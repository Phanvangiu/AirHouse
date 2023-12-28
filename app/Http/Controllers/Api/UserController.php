<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Ramsey\Uuid\Uuid;
use App\Models\Booking;
use App\Models\Property;
use App\Mail\EmailVerify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;


class UserController extends Controller
{
    public function signup(Request $request)
    {
        $user = new User();
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->date_of_birth = $request->birthday;
        $user->first_name = $request->first_name;
        $user->last_name  = $request->last_name;
        $user->save();

        Mail::to($user->email)->send(new EmailVerify($user));

        $token = $user->createToken('myToken')->plainTextToken;
        return response(compact('user', 'token'));
    }


    public function login(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'wrong account or password'
            ], 401);
        }

        $token = $user->createToken('myToken')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response([
            'message' => 'logout'
        ]);
    }

    public function readById($id)
    {
        $user = User::with('ratings.property')->where('id',  $id)->first();

        if ($user) {
            if ($user->image) {
                $user->image = asset("storage/images/users/" . $user->image);
            }
            return response(['user' => $user]);
        }

        return response(['message' => 'not found']);
    }

    public function updateUser(Request $request)
    {
        $email = $request->email;
        $firstName = $request->firstName;
        $lastName = $request->lastName;
        $phoneNumber = $request->phoneNumber;
        $gender = $request->gender;
        $address = $request->address;
        $about = $request->about;

        $user = DB::table('users')->where('email', $email)->update([
            'first_name' => $firstName,
            'last_Name' => $lastName,
            'phonenumber' => $phoneNumber,
            'gender' => $gender,
            'address' => $address,
            'about' => $about
        ]);

        $data = [$email, $firstName, $lastName, $phoneNumber, $gender, $address, $about];
        return $user;
    }

    public function uploadImage(Request $request)
    {
        $user = $request->user();
        $originFileName = $request->file('image')->getClientOriginalName();

        $newFileName = 'images_user_' . Uuid::uuid4()->toString() . '_' . $originFileName;
        $request->file('image')->storeAs('public/images/users', $newFileName);

        if ($user->image) {
            Storage::delete('public/images/users/' . $user->image);
        }

        $user->image =  $newFileName;
        $user->save();

        return response(['message' => 'success']);
    }

    public function checkEmailUnique(Request $request)
    {
        $email = User::where('email', $request->email)->first();

        if ($email) {
            return response([
                'message' => 'email already exist'
            ], 406);
        }

        return response([
            'message' => "acceptable"
        ]);
    }


    public function signUpGoogle(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $token =  $user->createToken('myToken')->plainTextToken;
            return response([
                'user' => $user,
                'token' => $token
            ]);
        }

        return response(['message' => 'cant do that'], 403);
    }

    public function verify($email)
    {
        $user = User::where('email', $email)->first();
        if ($user) {
            $user->email_verify_at = now();
            $user->save();
            return response()->json([
                'message' => "ok"
            ]);
        }
    }

    public function registerAdmin(Request $request)
    {
        $user = new User();
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->date_of_birth = '1997-06-19';
        $user->first_name = 'admin';
        $user->last_name  = 'admin';
        $user->user_type = 0;
        $user->save();

        return response($user);
    }

    public function loginAdmin(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'wrong account or password'
            ], 401);
        }

        if ($user->user_type == 1) {
            return response([
                'message' => 'forbiden'
            ], 403);
        }

        $token = $user->createToken('myToken')->plainTextToken;
        return response(compact('user', 'token'));
    }

    public function readForHostDashboard()
    {
        $userID = auth()->user()->id;

        $user = User::with('bookings', 'ratings.property')->where('id', $userID)->first();

        // Lấy danh sách các Prop thuộc sở hữu của user đó
        $userOwnedProperties = Property::where('user_id', $userID)->pluck('id');

        // Tính tổng số booking thuộc về user từ các khách khác
        $countBookingFromOthers = Booking::whereIn('property_id', $userOwnedProperties)->count();

        if ($user) {
            if ($user->image) {
                $user->image = asset("storage/images/users/" . $user->image);
            }
            return response(['user' => $user, 'bookFromOthers' => $countBookingFromOthers]);
        }
    }
}
