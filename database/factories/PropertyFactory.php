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
        $arrayDescription =  [
            "Embark on an adventure and explore the open waters in a sleek and modern boat.",
            "Experience the thrill of sailing and harness the power of the wind on a sailboat.",
            "Cruise along tranquil rivers and enjoy the serenity of nature on a riverboat.",
            "Discover hidden coves and remote islands aboard a private yacht.",
            "Feel the excitement as you ride the waves and engage in water sports on a speedboat.",
            "Take a leisurely ride on a classic wooden boat and admire its timeless beauty.",
            "Board a fishing boat and try your luck at catching a variety of fish.",
            "Hop on a kayak or a canoe and navigate through scenic waterways at your own pace.",
            "Enjoy a romantic sunset cruise and savor breathtaking views aboard a luxury catamaran.",
            "Experience the charm of a traditional wooden sailboat and learn about its rich history.",
            "Take a thrilling ride on a jet ski and feel the adrenaline rush on the water.",
            "Embark on a scenic river cruise and witness stunning landscapes along the way.",
            "Sail on a historic tall ship and immerse yourself in the nostalgia of a bygone era.",
            "Join a wildlife tour on a boat and encounter fascinating marine creatures in their natural habitat.",
            "Explore coastal caves and hidden beaches on a guided tour with a small boat.",
            "Participate in a sailing regatta and compete with other boats in a thrilling race.",
            "Experience luxury and comfort on a cruise ship and indulge in world-class amenities.",
            "Navigate through narrow canals and bustling waterways on a charming canal boat.",
            "Join a diving excursion on a dive boat and explore vibrant coral reefs and underwater ecosystems.",
            "Embark on a river safari and spot exotic wildlife along the riverbanks."
        ];
        $description = $this->faker->randomElement($arrayDescription);

        $users = User::pluck('id');
        $user_id = $this->faker->randomElement($users);

        $property_type = PropertyType::pluck('id');
        $property_type_id = $this->faker->randomElement($property_type);

        $room_type = RoomType::pluck('id');
        $room_type_id = $this->faker->randomElement($room_type);

        $categories = Category::pluck('id');
        // $category_array = array_diff($categories, ['26', '27', '28', '32', '36']);
        $category_id = $this->faker->randomElement($categories);

        $provinces =  Province::pluck('code');
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
        $minimum_stay = $this->faker->numberBetween(1, 3);
        $maximum_stay = $minimum_stay + $this->faker->numberBetween(1, 5);

        $place_greate_for = $this->faker->text();
        $guest_access = $this->faker->text();
        $interaction_guest = $this->faker->text();
        $thing_to_note = $this->faker->text();


        $about_place_array = [
            "Experience rural life and enjoy the open space on the farm.",
            "Engage in agricultural activities and learn about farming practices.",
            "Interact with farm animals and learn about their care and feeding.",
            "Explore the fields and gardens filled with fresh produce and vibrant flowers.",
            "Participate in farm-to-table experiences and savor the taste of freshly harvested ingredients.",
            "Enjoy the tranquility and peacefulness of the countryside on the farm.",
            "Learn about sustainable farming practices and the importance of organic agriculture.",
            "Immerse yourself in nature and appreciate the beauty of the farm's landscapes.",
            "Discover the joy of picking your own fruits and vegetables straight from the farm.",
            "Take part in farm tours and educational workshops to deepen your understanding of agriculture.",
            "Witness the cycle of life on the farm, from planting seeds to harvesting crops.",
            "Indulge in farm-fresh meals and traditional dishes made with locally sourced ingredients.",
            "Engage in farm activities such as milking cows, collecting eggs, or herding sheep.",
            "Experience the sense of community and connection that comes with living and working on a farm.",
            "Escape the hustle and bustle of the city and unwind in the peaceful atmosphere of the farm.",
            "Learn about the importance of sustainable farming and its impact on the environment.",
            "Engage in farm-based recreational activities such as horseback riding, fishing, or hiking.",
            "Connect with nature and appreciate the symbiotic relationship between humans and the land.",
            "Escape to the farm and enjoy a slower pace of life surrounded by nature.",
            "Appreciate the hard work and dedication of farmers who provide us with fresh and nutritious food."
        ];


        $about_place = $this->faker->randomElement($about_place_array);
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
        $acception_status_array = ['deny', 'waiting'];
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
