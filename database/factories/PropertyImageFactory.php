<?php

namespace Database\Factories;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyImage>
 */
class PropertyImageFactory extends Factory
{
    protected $model = PropertyImage::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $files = File::allFiles('storage\app\public\images\host');

        $images = [];
        foreach ($files as $file) {
            $filePath = $file->getFilename();
            array_push($images, $filePath);
        }

        $properties = Property::pluck('id');
        return [
            //
            'property_id' => $this->faker->randomElement($properties),
            'image' => $this->faker->randomElement($images),
            'add_by_user' => 45
        ];
    }
}
