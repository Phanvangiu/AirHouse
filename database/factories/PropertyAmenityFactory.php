<?php

namespace Database\Factories;

use App\Models\Amenity;
use App\Models\Property;
use App\Models\PropertyAmenity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyAmenity>
 */
class PropertyAmenityFactory extends Factory
{
    protected $model = PropertyAmenity::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $properties = Property::pluck('id');
        $amenities = Amenity::pluck('id');

        return [            //
            'property_id' => $this->faker->randomElement($properties),
            'amenity_id' => $this->faker->randomElement($amenities)
        ];
    }
}
