<?php

namespace App\Http\Controllers;

use App\Models\Rating;

use App\Models\Booking;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function createStart(Request $request)
    {

        $user = auth()->user();
        $renter_id = $user->id;
        $property_id = $request->property_id;
        // Lấy id user kiểm tra xem người này có rating chưa
        $start = Rating::where('renter_id', $renter_id);
        $start = $start->where('property_id', $property_id);
        $start = $start->first();
        //Nếu đã từng rating thi cho update
        //Kiểm tra số sao update có hợp lệ không
        if ($start) {
            $start->start = $request->rating;
            $start->message = $request->preview;
            $start->save();
            return response()->json([
                "start" => $start,
                "message" => "update"
            ]);
        }
        //Ngược tại tạo một racord rating
        else {
            $booking = Booking::where('user_id', $renter_id)->where('property_id', $property_id);
            $booking = $booking->where('booking_status', "success")->first();
            //Kiem tra xem cos booking chua va booking co suceess chua
            if ($booking) {
                $start = new Rating;
                $start->renter_id = $renter_id;
                $start->property_id = $request->property_id;
                $start->message = $request->preview;
                $start->start = $request->rating;
                $start->save();
                return response()->json([
                    "start" => $start,
                    "message" => "new"
                ]);
            } else {
                return response()->json([
                    'message' => "not yet rented"
                ], 404);
            }
        }
    }
    public function readStart(Request $request)
    {
        $user = auth()->user();
        $renter_id = $user->id;

        $start = Rating::with('user')->where('renter_id', $renter_id);
        $start = $start->where('property_id', $request->property_id);
        $start = $start->first();
        if ($start) {

            return response()->json([
                'start' => $start
            ]);
        } else {
            return response("error", 404);
        }
    }
    public function readAverageStart(Request $request)
    {
        $property_id = $request->property_id;

        $listRating = Rating::where('property_id', $property_id)->get();
        $total = 0;
        $count = 0;

        foreach ($listRating as $rating) {
            $total = $rating->start + $total;
            $count++;
        }

        $average = $total / $count;
        $result = number_format($average, 1, '.', '');
        return response()->json([
            "average" => $result,
            "total" => $count
        ]);
    }

    public function readStartAll(Request $request)
    {
        $page = $request->currentPage;
        $perpage = 4 * $page;
        $count = Rating::with('user')->where('property_id', $request->property_id)->count();
        $ratings = Rating::with('user')->where('property_id', $request->property_id)->orderBy("updated_at", "desc")->paginate($perpage);

        if ($ratings) {
            return response()->json([
                "ratings" => $ratings,
                "total" => $count
            ]);
        } else {
            return response("error", 404);
        }
    }

    public function createHostReview(Request $request)
    {

        $host_id = auth()->user()->id;
        $booking =  Booking::where('id', $request->booking_id)->first();
        if ($booking) {
            $review = Rating::where('host_id', $host_id)->where('renter_id', $booking->user_id)->first();

            if ($review) {
                $review->renter_id = $booking->user_id;
                $review->start = $request->start;
                $review->host_id = $host_id;
                $review->message = $request->message;
                $review->save();
                return response($review, 200);
            }
            $review = new Rating();
            $review->renter_id = $booking->user_id;
            $review->start = $request->start;
            $review->host_id = $host_id;
            $review->message = $request->message;
            $review->save();
            return response($review, 200);
            
        } else {
            return response("error", 404);
        }
    }

    public function readHostReview(Request $request)
    {
        $host_id = auth()->user()->id;
        $rating = Rating::where('renter_id', $request->renter_id)->where('host_id', $host_id)->first();
        if ($rating) {
            return response($rating, 200);
        } else {
            return response("error", 404);
        }
    }

    public function allHostReviewUser()
    {
        $user_id = auth()->user()->id;
        $ratings = Rating::where('renter_id', $user_id)
            ->where('host_id', '!=', null)
            ->get();
        if ($ratings) {
            return response($ratings, 200);
        } else {
            return response("error", 404);
        }
    }
}
