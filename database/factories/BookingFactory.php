<?php

namespace Database\Factories;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Booking;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    protected $model = Booking::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id');
        $user_id = fake()->randomElement($users);
        // $user_id = 147;

        $properties = Property::where('user_id', '!=', $user_id)->pluck('id');
        $property_id = fake()->randomElement($properties);

        $total_day_booking = fake()->numberBetween(1, 30);
        $check_in_date = Carbon::parse(fake()->dateTimeBetween('2023-11-01', '2023-12-31'));
        $check_out_date = Carbon::parse($check_in_date);
        $check_out_date->addDays($total_day_booking);

        $price_per_day = fake()->numberBetween(1, 50);
        $price_for_stay = $total_day_booking * $price_per_day;
        $site_fees = 0;


        $booking_date = fake()->dateTimeBetween('2023-05-01', $check_in_date);
        $total_person = 5;

        $booking_array = ['success', 'accepted', 'denied', 'waiting'];
        $booking_status = fake()->randomElement($booking_array);
        return [
            'property_id' =>  $property_id,
            'user_id' =>  $user_id,
            'check_in_date' =>   $check_in_date,
            'check_out_date' => $check_out_date,
            'price_per_day' =>  $price_per_day,
            'price_for_stay' =>  $price_for_stay,
            'site_fees' =>  $site_fees,
            'booking_date' =>  $booking_date,
            'total_person' => $total_person,
            'booking_status' => $booking_status
        ];
    }
}
