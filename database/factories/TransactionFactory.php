<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Property;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    protected $model = Transaction::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $payment_id =  $this->faker->randomFloat();

        $properties = Property::pluck('id');
        $property_id = fake()->randomElement($properties);

        $users = User::pluck('id');
        $reciever_id = fake()->randomElement($users);
        $payee_id = fake()->randomElement($users);

        $bookings = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        $booking_id = fake()->randomElement($bookings);

        $site_fees = fake()->numberBetween(1, 50);
        $host_fee = fake()->numberBetween(1, 50);
        $amount = fake()->numberBetween(100, 1000);
        $transfer_on = fake()->dateTimeBetween('2021-12-20', '2024-05-15');

        return [
            //
            'payment_id' => $payment_id,
            'property_id' => $property_id,
            'reciever_id' => $reciever_id,
            'payee_id' => $payee_id,
            'booking_id' => $booking_id,
            'site_fees' => $site_fees,
            'host_fee' => $host_fee,
            'amount' => $amount,
            'transfer_on' => $transfer_on,
        ];
    }
}
