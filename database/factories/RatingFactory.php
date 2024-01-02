<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Rating;
use App\Models\Property;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    protected $model = Rating::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::pluck('id');
        $renter_id = fake()->randomElement($users);

        $properties = Property::where('user_id', '!=', $renter_id)->pluck('id');
        $property_id = 0;

        $start = fake()->numberBetween(3, 5);
        $message = fake()->text();
        return [
            'property_id' => $property_id,
            'renter_id' => $renter_id,
            'start' => $start,
            'message' => $message

        ];
    }
}
