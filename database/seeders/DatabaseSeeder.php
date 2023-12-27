<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Amenity;
use App\Models\Property;
use App\Models\Transaction;
use Illuminate\Support\Arr;
use App\Models\PropertyImage;
use App\Models\PropertyAmenity;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // Property::factory()->count(3000)->create();

        // $properties = Property::pluck('id');

        // foreach ($properties as $property) {
        //     $property_images = PropertyImage::where('property_id', $property)->first();
        //     if (!$property_images) {
        //         for ($i = 0; $i < 10; $i++) {
        //             PropertyImage::factory()->state([
        //                 'property_id' => $property
        //             ])->create();
        //         }
        //     }
        // }

        // $properties = Property::pluck('id');
        // foreach ($properties as $property) {
        //     $property_images = PropertyImage::where('property_id', $property)->first();
        //     if (!$property_images) {
        //         for ($i = 0; $i < 5; $i++) {
        //             PropertyImage::factory()->state([
        //                 'property_id' => $property
        //             ])->create();
        //         }
        //     }
        // }

        $amenites = Amenity::pluck('id');
        $properties = Property::pluck('id');
        foreach ($properties as $property) {
            $amenites_array = [];
            foreach ($amenites as $amenity) {
                $amenites_array[] = $amenity;
            }
            $randomAmenites = array_unique(Arr::random($amenites_array, fake()->numberBetween(10, 20)));
            foreach ($randomAmenites as $item) {
                DB::table('property_amenities')->insert([
                    'property_id' => $property,
                    'amenity_id' => $item
                ]);
            }
        }


        // ///////////////////////////////////////////////////////////////////////////
        // User::factory()->count(100)->create();


        // Property::factory()->count(2000)->create();



        ///////////////////////////////////////////////////////////////////////////


        // for ($i = 0; $i < 3000000; $i++) {
        //     //SELECT * FROM `transactions` WHERE `payment_id` LIKE 'PM%'
        //     Transaction::factory()->state([
        //         'payment_id' => "PM$i"
        //     ])->count(1)->create();
        // }
    }
}
