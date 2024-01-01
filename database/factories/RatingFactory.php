<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\Rating;
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
        $renter_id = 0;
        $properties = Property::where('user_id', '!=', $renter_id)->pluck('id');
        $property_id = fake()->randomElement($properties);

        $start = fake()->numberBetween(1, 5);
        $message = fake()->text();
        return [
            'property_id' => $property_id,
            'renter_id' => $renter_id,
            'start' => $start,
            'message' => $message

        ];
    }
}
