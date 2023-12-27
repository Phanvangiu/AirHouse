<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use App\Models\District;
use App\Models\Property;
use App\Models\Province;
use App\Models\RoomType;
use App\Models\PropertyType;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
{
    protected $model = Property::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->name();
        $arrayDescription = [
            'Floral Island Resort is nestled in the middle of Talacanen island and offers a secluded and exclusive atmosphere. With only 8 rooms, restaurant, chill-out place, bonfire- and grill on the beach and a lovely
            overlooking massage hut, Floral Island Resort is perfect for small groups up to 24 guests.
            We provide you with boat transfers, healthy and fresh meals from the region (breakfast, lunch and dinner), free use of kayaks, free wi-fi in the restaurant, 24hrs. solar power and comfortable accommodation with
            private shower and electric fan. Drinks and other services like island hopping, fishing trips, etc. are not included. Scuba diving on request!
            We are proud to be part of the coral triangle initiative, an international project planting artificial coral reefs. Visit our coral-domes and taklobo (giant clams) garden just in front of the Resort
            Be a CORAL HERO and plant yourself some corals!',
            'Our 8000m2 estate is located in the middle of lush and virgin jungle reaching until the sea with three small private beaches. Our property features a true jungle waterfall for you to shower and our newly opened very own "Jungle Spa" offering treatments for body and soul to our guests only. Adjacent to our private beaches you will have access to 6 other picturesque beaches located within maximum 10 minutes walking distance.
            You will be able to enjoy breathtaking views with the sunset right behind the islands of the Angtong Marine National Park from our private bar and restaurant in a secluded beach atmosphere.  
            The estate hosts, as of now, 2 free-standing guest villas. Each villa has its own entrance and closed garden with uninterrupted sea and garden views to assure a maximum of privacy and intimacy.',
            'Aura House is perched on top of the Ayung river offering a beautiful view. It features 2 very romantic en-suite bedrooms, a large living room fully furnished, a small kitchen, and a private swimming pool with view.
            It is the perfect gateway for adventurous couples and honeymoon.The whole house is private - it is just for you and your guests,
            We are very proud to have in Aura House one of the famous egg shaped door built by the designer company Ibuku. It is the entrance of the second bedroom.
            The atmosphere of Aura House is perfect for people looking to disconnect from their busy city life and/or nature enthusiasts. Be ready to be awaken by the sun peeking up into your room and the sounds of the river down below.',
            'We welcome you to to one of our three villas a unique self-contained little paradise with private spa, restaurant and beach bar.
            Your intimate luxury pool villa awaits you.The villa is made for 2 people only and guests over 16 years old.',
            'Our charming home is semi wooden with 3 A/C bedrooms and 3 bathrooms. It is equipped with a kitchen, a bar, fiber optic wifi and a large open space upstairs. It is perfect for a family with children or a group of friends. We are 10 minutes walking distance from Chiangmai Gate and the Saturday walking street. We offer complimentary home cooked breakfast every morning and a complimentary pick up service from the airport.'
        ];
        $description = $this->faker->randomElement($arrayDescription);

        $users = User::pluck('id');
        $user_id = $this->faker->randomElement($users);

        $property_type = PropertyType::pluck('id');
        $property_type_id = $this->faker->randomElement($property_type);

        $room_type = RoomType::pluck('id');
        $room_type_id = $this->faker->randomElement($room_type);

        $category = Category::pluck('id');
        $category_id = $this->faker->randomElement($category);

        $provinces = Province::pluck('code');
        $provinces_id = $this->faker->randomElement($provinces);


        $district = District::where('province_code', $provinces_id)->pluck('code');
        $districts_id = $this->faker->randomElement($district);

        $address = $this->faker->address();
        $bedroom_count = $this->faker->numberBetween(1, 10);
        $bathroom_count = $this->faker->numberBetween(1, 10);

        $start_date = Carbon::parse($this->faker->dateTimeBetween('2023-11-01', '2023-12-31'));
        $end_date = Carbon::parse($start_date);
        $end_date->addDays($this->faker->numberBetween(60, 250));
        $base_price =  $this->faker->numberBetween(20, 200);
        $minimum_stay = $this->faker->numberBetween(1, 10);
        $maximum_stay = $minimum_stay + $this->faker->numberBetween(1, 5);
        $place_greate_for = $this->faker->text();
        $guest_access = $this->faker->text();
        $interaction_guest = $this->faker->text();
        $thing_to_note = $this->faker->text();
        $about_place = $this->faker->text();
        $overview = $this->faker->text();
        $getting_around = $this->faker->text();
        $booking_type = 'instantly';

        $checkInArr = [
            '02PM',
            '03PM',
            '04PM',
            '05PM',
            '06PM',
            '07PM',
            '08PM',
            '09PM',
            '10PM',
            '11PM',
            '12PM',
        ];
        $checkOutArr = [
            '01AM',
            '02AM',
            '03AM',
            '04AM',
            '05AM',
            '06AM',
            '07AM',
            '08AM',
            '09AM',
            '10AM',
            '11AM',
            '12AM',
        ];


        $check_in_after = $this->faker->randomElement($checkInArr);
        $check_out_before = $this->faker->randomElement($checkOutArr);

        $videos = [
            'https://www.youtube.com/watch?v=PJNLXF7N4oo',
            'https://www.youtube.com/watch?v=i03sTpUFJ2k',
            'https://www.youtube.com/watch?v=T8kTDdMFR_M',
            'https://www.youtube.com/watch?v=6_2Sff2_Re4'
        ];


        $video = $this->faker->randomElement($videos);
        $property_status = 1;
        $acception_status_array = ['accept', 'deny', 'waiting'];
        $acception_status = $this->faker->randomElement($acception_status_array);
        $accomodates_count = $this->faker->numberBetween(1, 16);

        return [
            'name' =>  $name,
            'description' =>  $description,
            'user_id' =>   $user_id,
            'property_type_id' => $property_type_id,
            'room_type_id' =>  $room_type_id,
            'category_id' =>  $category_id,
            'provinces_id' =>  $provinces_id,
            'districts_id' => $districts_id,
            'address' =>  $address,
            'bedroom_count' =>  $bedroom_count,
            'bathroom_count' =>  $bathroom_count,
            'accomodates_count' => $accomodates_count,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'base_price' => $base_price,
            'place_great_for' => $place_greate_for,
            'guest_access' => $guest_access,
            'interaction_guest' => $interaction_guest,
            'thing_to_note' => $thing_to_note,
            'about_place' => $about_place,
            'overview' => $overview,
            'getting_around' => $getting_around,
            'booking_type' => $booking_type,
            'check_in_after' => $check_in_after,
            'check_out_before' => $check_out_before,
            'minimum_stay' => $minimum_stay,
            'maximum_stay' => $maximum_stay,
            'video' => $video,
            'property_status' => $property_status,
            'acception_status' => $acception_status
        ];
    }
}
