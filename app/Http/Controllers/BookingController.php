<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Booking;
use App\Models\Property;
use App\Mail\MailDenyReview;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use App\Mail\MailAcceptReview;
use App\Mail\MailCreateBooking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\PropertyExceptionDate;
use Illuminate\Support\Facades\Storage;

class BookingController extends Controller
{
    //
    function createBooking(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            $now = today()->toDateString();
            //exceptiondate
            $listException = [];
            $cntExcept = 0;
            $exception_start = PropertyExceptionDate::where('property_id', $request->property_id)->where('start_date', '>=', $now)->pluck('start_date')->toArray();
            $exception_end = PropertyExceptionDate::where('property_id', $request->property_id)->where('end_date', '>=', $now)->pluck('end_date')->toArray();

            foreach ($exception_start as $bookingIn) {
                $bookingIn = Carbon::parse($bookingIn);
                $bookingOut = Carbon::parse($exception_end[$cntExcept]);
                for ($date = $bookingIn; $date->lte($bookingOut); $date->addDay()) {
                    $listException[] = $date->toDateString();
                }
                $cntExcept++;
            }

            //list check_in_date
            $booking_in = Booking::where('check_in_date', '>=', $now);
            $booking_in = $booking_in->where('property_id',  $request->property_id)->where(function ($query) {
                $query->where('booking_status', 'accepted')
                    ->orWhere('booking_status', 'success');
            });
            $booking_in = $booking_in->pluck('check_in_date')->toArray();
            //list check_out_date
            $booking_out = Booking::where('check_in_date', '>=', $now);
            $booking_out = $booking_out->where('property_id', $request->property_id)->where(function ($query) {
                $query->where('booking_status', 'accepted')
                    ->orWhere('booking_status', 'success');
            });
            $booking_out = $booking_out->pluck('check_out_date')->toArray();
            $listBookedDate = [];
            $cntBook = 0;
            foreach ($booking_in as $bookingIn) {
                $bookingIn = Carbon::parse($bookingIn);
                $bookingOut = Carbon::parse($booking_out[$cntBook]);
                for ($date = $bookingIn; $date->lte($bookingOut); $date->addDay()) {
                    $listBookedDate[] = $date->toDateString();
                }
                $cntBook++;
            }
            //Xu ly yeu cau cu client dang muon book
            $checkInDate = Carbon::parse($request->check_in_date);
            $checkOutDate = Carbon::parse($request->check_out_date);
            // Tạo mảng chứa tất cả các ngày giữa check_in_date và check_out_date ma client dangv muon book
            $datesInRange = [];
            for ($date = $checkInDate; $date->lte($checkOutDate); $date->addDay()) {
                $datesInRange[] = $date->toDateString();
            }
            if (array_intersect($listBookedDate, $datesInRange) || array_intersect($listException, $datesInRange)) {
                // return response("error: maching date", 403);
                return response()->json([
                    "listBook" => $listBookedDate,
                    "listException" => $listException,
                    "date" => $datesInRange
                ], 403);
            } else {
                $booking = new Booking();
                $booking->property_id = $request->property_id;
                $booking->user_id = $request->user()->id;
                $booking->check_in_date = $request->check_in_date;
                $booking->check_out_date = $request->check_out_date;
                $booking->price_per_day = $request->base_price;
                $booking->price_for_stay = $request->total;
                $booking->site_fees = $request->site_fees;
                $booking->booking_date = now()->toDateString();
                $booking->total_person = $request->total_person;

                $property = Property::where('id', $request->property_id)->first();
                if ($property->booking_type == 'instantly') {
                    $booking->booking_status = 'accepted';
                    Mail::to($user->email)->send(new MailCreateBooking($user, $booking, $property));
                    Mail::to($user->email)->send(new MailAcceptReview($user, $booking, $property));
                } else {
                    $booking->booking_status = 'waiting';
                }
                $booking->save();
                Mail::to($user->email)->send(new MailCreateBooking($user, $booking, $property));
                return response($booking, 200);
            }
        } else {
            return response("error", 404);
        }
    }


    public function readBooking(Request $request)
    {
        $user = auth()->user();
        $renter_id = $user->id;

        $booking = Booking::where("id", $request->booking_id)->first();
        if ($booking) {
            $booking = $booking->where("id", $request->booking_id)->where('booking_status', "accepted")->first();
            if ($booking) {
                $booking = Booking::with('property')
                    ->where('id', $request->booking_id)
                    ->where('user_id', $renter_id)
                    ->first();

                $propertyTypeId = PropertyType::find($booking->property->property_type_id);
                $userName = User::find($booking->property->user_id);
                $renter = User::find($renter_id);


                return response()->json([
                    'booking' => $booking,
                    'propertyType' => $propertyTypeId->name,
                    'hostName' => $userName,
                    'renter' => $renter,
                ]);
            } else {
                return response([
                    'error' => 'Not Found',
                    'status' => 404,
                ], 404);
            };
        } else {
            return response([
                'error' => 'Not Found',
                'status' => 403,
            ], 403);
        };
    }


    public function getAllBookingOfProperty(Request $request)
    {
        $property = Property::where('id', $request->property_id)->first();

        if ($property->user_id != $request->user()->id) {
            return response(['message' => 'cant do that'], 403);
        }

        $bookings = Booking::with('user')->where('property_id', $request->property_id);

        if ($request->startDate != null && $request->endDate != null) {
            $bookings = $bookings->where(function ($query) use ($request) {
                $query->whereDate('check_in_date', '>=', $request->startDate)
                    ->whereDate('check_in_date', '<=', $request->endDate)
                    ->orWhereDate('check_out_date', '>=', $request->startDate)
                    ->whereDate('check_out_date', '<=', $request->endDate);
            });

            $bookings = $bookings->where('booking_status', $request->booking_status);
            $bookings = $bookings->paginate(5);


            foreach ($bookings->items() as $booking) {
                if (!filter_var($booking->user->image, FILTER_VALIDATE_URL)) {
                    $booking->user->image = asset('storage/images/users/' . $booking->user->image);
                }
            }

            return response($bookings);
        }

        return response(['message' => 'bad request'], 400);
    }

    public function denyBooking(Request $request)
    {
        $booking = Booking::where('id', $request->booking_id)->first();
        $booking->booking_status = 'denied';
        $booking->save();

        $user = User::where('id',$booking->user_id)->first();
        $property  = Property::find('id', $booking->property_id);
        Mail::to($user->email)->send(new MailDenyReview($user, $booking, $property));
        return response($booking);
    }

    public function acceptBooking(Request $request)
    {
        $booking = Booking::where('id', $request->booking_id)->first();

        $violateBooking = Booking::where('booking_status', 'waiting');

        $violateBooking = $violateBooking->where(function ($query) use ($request, $booking) {
            $query->whereDate('check_in_date', '>=', $booking->check_in_date)
                ->whereDate('check_in_date', '<=', $booking->check_out_date)
                ->orWhereDate('check_out_date', '>=', $booking->check_in_date)
                ->whereDate('check_out_date', '<=', $booking->check_out_date);
        });

        $violateBooking = $violateBooking->get();

        foreach ($violateBooking as $booking) {
            $booking->booking_status = 'denied';
            $booking->save();
            $user= User::where('id',$booking->user_id)->first();
            $property = Property::find($booking->property_id);
            Mail::to($user->email)->send(new MailDenyReview($user, $booking, $property));
        }

        $booking->booking_status = 'accepted';
        $booking->save();

        $user= User::where('id',$booking->user_id)->first();
        $property = Property::find($booking->property_id);
        Mail::to($user->email)->send(new MailAcceptReview($user, $booking, $property));

        return response($booking);
    }

    function getBookingByUser(Request $request)
    {
        $user = $request->user();
        $status = $request->status;
        $bookings = null;
        $perPage = 10;

        DB::statement("SET SQL_MODE=''");
        $bookings = DB::table('bookings')
            ->select('bookings.id', 'bookings.site_fees', 'bookings.price_for_stay', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts', 'bookings.booking_status as status', 'bookings.created_at')
            ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
            ->join('properties', 'properties.id', '=', 'bookings.property_id')
            ->join('users', 'users.id', '=', 'properties.user_id')
            ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
            ->join('districts', 'districts.code', '=', 'properties.districts_id')
            ->where('bookings.user_id', $user->id)
            ->groupBy('bookings.id')
            ->paginate($perPage);

        if ($status == 'accepted') {
            DB::statement("SET SQL_MODE=''");
            $bookings = DB::table('bookings')
                ->select('bookings.id', 'bookings.site_fees', 'bookings.price_for_stay', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts',  'bookings.booking_status as status', 'bookings.created_at')
                ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
                ->join('properties', 'properties.id', '=', 'bookings.property_id')
                ->join('users', 'users.id', '=', 'properties.user_id')
                ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
                ->join('districts', 'districts.code', '=', 'properties.districts_id')
                ->where('bookings.user_id', $user->id)
                ->where('booking_status', $status)
                ->groupBy('bookings.id')
                ->paginate($perPage);
        }

        if ($status == 'success') {
            DB::statement("SET SQL_MODE=''");
            $bookings = DB::table('bookings')
                ->select('bookings.id', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts', 'bookings.booking_status as status')
                ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
                ->join('properties', 'properties.id', '=', 'bookings.property_id')
                ->join('users', 'users.id', '=', 'properties.user_id')
                ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
                ->join('districts', 'districts.code', '=', 'properties.districts_id')
                ->where('bookings.user_id', $user->id)
                ->where('booking_status', $status)
                ->groupBy('bookings.id')
                ->paginate($perPage);
        }

        if ($status == 'denied') {
            DB::statement("SET SQL_MODE=''");
            $bookings = DB::table('bookings')
                ->select('bookings.id', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts')
                ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
                ->join('properties', 'properties.id', '=', 'bookings.property_id')
                ->join('users', 'users.id', '=', 'properties.user_id')
                ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
                ->join('districts', 'districts.code', '=', 'properties.districts_id')
                ->where('bookings.user_id', $user->id)
                ->where('booking_status', $status)
                ->groupBy('bookings.id')
                ->paginate($perPage);
        }

        if ($status == 'waiting') {
            DB::statement("SET SQL_MODE=''");
            $bookings = DB::table('bookings')
                ->select('bookings.id', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts', 'bookings.booking_status as status')
                ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
                ->join('properties', 'properties.id', '=', 'bookings.property_id')
                ->join('users', 'users.id', '=', 'properties.user_id')
                ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
                ->join('districts', 'districts.code', '=', 'properties.districts_id')
                ->where('bookings.user_id', $user->id)
                ->where('booking_status', $status)
                ->groupBy('bookings.id')
                ->paginate($perPage);
        }

        if ($status == 'expired') {
            DB::statement("SET SQL_MODE=''");
            $bookings = DB::table('bookings')
                ->select('bookings.id', 'bookings.property_id', 'bookings.user_id as id_user', 'bookings.check_in_date', 'bookings.check_out_date', 'property_images.image', 'properties.user_id', 'properties.name as Property_Name', 'properties.address as Property_Address', 'users.image as user_image', 'users.first_name as user_firstName',  'users.last_name as user_lastName', 'users.email as user_Email', 'provinces.full_name as province', 'districts.full_name as districts')
                ->join('property_images', 'property_images.property_id', '=', 'bookings.property_id')
                ->join('properties', 'properties.id', '=', 'bookings.property_id')
                ->join('users', 'users.id', '=', 'properties.user_id')
                ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
                ->join('districts', 'districts.code', '=', 'properties.districts_id')
                ->where('bookings.user_id', $user->id)
                ->where('booking_status', $status)
                ->groupBy('bookings.id')
                ->paginate($perPage);
        }



        foreach ($bookings as $booking) {
            $booking->image = asset("storage/images/host/" . $booking->image);
        }

        return $bookings;
    }


    public function getHostBookingOfHost(Request $request)
    {
        $user = $request->user();

        $properties_id = Property::select('id')->where('user_id', $user->id)->get();

        $bookings = Booking::with('property.images', 'user')->whereIn('property_id', $properties_id);

        if ($request->status != 'all') {
            $bookings = $bookings->where('booking_status', $request->status);
        }

        $bookings = $bookings->paginate(10);

        foreach ($bookings as $booking) {
            foreach ($booking->property->images as $property_image) {
                if (!filter_var($property_image->image, FILTER_VALIDATE_URL)) {
                    $property_image->image = asset('storage/images/host/' . $property_image->image);
                }
            }

            if (!filter_var($booking->user->image, FILTER_VALIDATE_URL)) {
                $booking->user->image = asset('storage/images/users/' . $booking->user->image);
            }
        }



        return response($bookings);
    }
}
