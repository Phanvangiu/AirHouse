<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use Ramsey\Uuid\Uuid;
use App\Models\Property;
use App\Models\PropertyAmenity;
use Illuminate\Http\Request;
use App\Models\PropertyImage;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class HostController extends Controller
{
    public function create(Request $request)
    {
        $Property = new Property();

        $user = auth()->user();
        $user_id = $user->id;
        $Property->user_id = $user_id; // Gán 'user_id' trước khi gán 'add_by_user'
        $Property->name = $request->input('name');
        $Property->description = $request->input('description');
        $Property->about_place = $request->input('about_place');
        $Property->place_great_for = $request->input('place_great_for');
        $Property->guest_access = $request->input('guest_access');
        $Property->interaction_guest = $request->input('interaction_guest');
        $Property->thing_to_note = $request->input('thing_to_note');
        $Property->overview = $request->input('overview');
        $Property->getting_around = $request->input('getting_around');
        $Property->property_type_id = $request->input('property_type_id');
        $Property->room_type_id = $request->input('room_type_id');
        $Property->category_id = $request->input('category_id');
        $Property->provinces_id = $request->input('provinces_id');
        $Property->districts_id = $request->input('districts_id');
        $Property->address = $request->input('address');
        $Property->bedroom_count = $request->input('bedroom_count');
        $Property->bathroom_count = $request->input('bathroom_count');
        $Property->accomodates_count = $request->input('accomodates_count');
        $Property->start_date = $request->input('start_date');
        $Property->end_date = $request->input('end_date');
        $Property->base_price = $request->input('base_price');
        $Property->booking_per = $request->input('booking_per');
        $Property->booking_type = $request->input('booking_type');
        $Property->check_in_after = $request->input('check_in_after');
        $Property->check_out_before = $request->input('check_out_before');
        $Property->cancelation = $request->input('cancelation');
        $Property->minimum_stay = $request->input('minimum_stay');
        $Property->maximum_stay = $request->input('maximum_stay');
        $Property->property_status = $request->input('property_status');
        $Property->video = $request->input('video');
        $Property->save();

        $files = $request->file('images', []);

        foreach ($files as $file) {
            $newFileName = 'images_host_' . Uuid::uuid4()->toString() . '_' . $file->getClientOriginalName();
            $uploadedFilePath = $file->storeAs('public/images/host', $newFileName);

            if (!$uploadedFilePath) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lỗi khi lưu tệp lên máy chủ.'
                ]);
            }

            $PropertyImage = new PropertyImage();
            $PropertyImage->image = $newFileName;
            $PropertyImage->property_id = $Property->id;
            $PropertyImage->add_by_user = $user_id;
            $PropertyImage->save();
            if (!$PropertyImage->save()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Lỗi khi lưu thông tin tệp vào cơ sở dữ liệu.'
                ]);
            }
        }

        $amenities = $request->input('amenities');

        if ($amenities) {
            foreach ($amenities as $amenityID) {
                $amenity = new PropertyAmenity();
                $amenity->property_id = $Property->id;
                $amenity->amenity_id = $amenityID;
                $amenity->save();
            }
        }


        return response()->json([
            'success' => true,
            'message' => "added ok",
        ]);
    }


    public function readCurrentPageStatus(Request $request)
    {
        $status = $request->status;
        $page = $request->page;
        $search = $request->search;
        $category = $request->category;
        $roomtype = $request->roomtype;
        $propertytype = $request->propertytype;
        $accomodates = $request->accomodates;
        $bedroom = $request->bedroom;
        $bookingtype = $request->bookingtype;
        $property_status = $request->property_status;

        $collection = Property::with('user', 'category', 'property_type', 'room_type');

        if ($status == "waiting") {
            $collection = $collection->where('acception_status', '=',  'waiting');
        }

        if ($status == 'deny') {
            $collection = $collection->where('acception_status', '=', $status);
        }

        if ($status == "accept") {
            $collection = $collection->where('acception_status', '=', 'accept');
        }

        $collection = $collection->where(function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')->orWhere('id', 'like', '%' . $search . '%');
        });

        if ($category) {
            $collection = $collection->where('category_id', $category);
        }

        if ($roomtype) {
            $collection = $collection->where('room_type_id', $roomtype);
        }

        if ($propertytype) {
            $collection = $collection->where('property_type_id', $propertytype);
        }

        if ($accomodates) {
            $collection = $collection->where('accomodates_count', $accomodates);
        }


        if ($bedroom) {
            $collection = $collection->where('bedroom_count', $bedroom);
        }

        if ($bookingtype) {
            $collection = $collection->where('booking_type', $bookingtype);
        }

        if ($property_status != null) {
            $collection = $collection->where('property_status', (int) $property_status);
        }

        $count = $collection->count();
        $collection = $collection->get()->reverse()->chunk(20);

        $collection_length = count($collection);
        if ($collection_length < $page) {
            return response(['message' => 'nothing here'], 404);
        }

        $collection = $collection[$page - 1];

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }
        $collection = $newCollection;

        return response()->json([
            'items' => $collection,
            'total' => $count,
        ]);
    }


    public function readById($id)
    {
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images')->where('id', $id)->first();

        foreach ($property->images as $key => $image) {
            $property->images[$key] = asset("storage/images/host/" . $image->image);
        }

        if ($property) {
            return response($property);
        }

        return response(['mesasge' => 'not found'], 404);
    }


    public function acceptProperty(Request $request)
    {
        $property = Property::find($request->id);

        if (!$property) {
            return response([
                'message' => 'cant find property'
            ]);
        };

        $property->acception_status = 'accept';
        $property->admin_message = $request->message;
        $property->save();

        return response([
            'message' => 'accept property'
        ]);
    }

    public function denyProperty(Request $request)
    {
        $property = Property::find($request->id);
        if (!$property) {
            return response([
                'message' => 'cant find property'
            ]);
        };

        $property->acception_status = 'deny';
        $property->admin_message = $request->message;
        $property->save();

        return response([
            'message' => 'deny property'
        ]);
    }

    public function read(Request $Request)
    {
        $Request->validate([
            'property_id' => 'required|int'
        ]);
        $property_id = $Request->input('property_id');
        $user = auth()->user();
        $user_id = $user->id;
        if ($user_id) {
            $listPropertyImage = PropertyImage::where('property_id', $property_id)->pluck('image');

            $listPropertyImage = $listPropertyImage->map(function ($image) {
                return asset('storage/images/host/' . $image);
            });

            $properties = Property::find($property_id);
            return response()->json([
                'success' => true,
                'property_image' => $listPropertyImage,
                'properties' => $properties
            ]);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'khong co hoster này'
            ]);
        }
    }

    public function showInIndex(Request $request)
    {
        $category = $request->category;
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images')->where('category_id', $category);
        $property = $property->where('acception_status', 'accept');
        $property = $property->where('property_status', 1);

        $now = now();
        $property = $property->where('start_date', '<=', $now);
        $property = $property->where('end_date', '>=', $now);

        $property = $property->get();

        foreach ($property as $key => $value) {
            foreach ($property[$key]->images as $imgkey => $imgvalue) {
                $property[$key]->images[$imgkey]->image =  asset("storage/images/host/" . $imgvalue->image);
            }
        }

        return response($property);
    }


    public function update(Request $request)
    {

        $request->validate([
            'name' => 'required|string| max:255',
            'description' => 'required|string',
            // 'user_id' => 'required|int',
            'property_type_id' => 'required|int',
            'room_type_id' => 'required|int',
            'category_id' => 'required|int',
            'provinces_id' => 'required|string',
            'districts_id' => 'required|string',
            'address' => 'required|string',
            'bedroom_count' => 'required|int',
            'bed_count' => 'required|int',
            'bathroom__count' => 'required|int',
            'accomodates_count' => 'required|int',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'price' => 'required|numeric',
            'minimum_stay' => 'required|int',

            // 'image' => 'required',
            'image.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        $id = $request->input('id');
        $Property = Property::where('id', $id)->first();
        // $PropertyImage = new PropertyImage();
        $user = auth()->user();
        $user_id = $user->id;
        $Property->name = $request->input('name');
        $Property->description = $request->input('description');
        $Property->user_id = $user_id; // Gán 'user_id' trước khi gán 'add_by_user'
        $Property->property_type_id = $request->input('property_type_id');
        $Property->room_type_id = $request->input('room_type_id');
        $Property->category_id = $request->input('category_id');
        $Property->provinces_id = $request->input('provinces_id');
        $Property->districts_id = $request->input('districts_id');
        $Property->address = $request->input('address');
        $Property->bedroom_count = $request->input('bedroom_count');
        $Property->bed_count = $request->input('bed_count');
        $Property->bathroom__count = $request->input('bathroom__count');
        $Property->accomodates_count = $request->input('accomodates_count');
        $Property->start_date = $request->input('start_date');
        $Property->end_date = $request->input('end_date');
        $Property->price = $request->input('price');
        $Property->minimum_stay = $request->input('minimum_stay');
        $Property->save();


        if ($request->hasFile('image')) {
            $files = $request->file('image');
            if (!empty($files)) {
                //Neu co update anh thi xoa anh cu trong server
                $PropertyImage = PropertyImage::where('property_id', $id)->get();
                foreach ($PropertyImage as $flieImage) {
                    Storage::delete('public/images/host/' . $flieImage->image);
                    $flieImage->delete();
                }
                //them anh moi
                foreach ($files as $file) {
                    // Lưu tệp vào thư mục lưu trữ
                    $newFileName = 'images_host_' . Uuid::uuid4()->toString() . '_' . $file->getClientOriginalName();
                    $uploadedFilePath = $file->storeAs('public/images/host', $newFileName);

                    if (!$uploadedFilePath) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Lỗi khi lưu tệp lên máy chủ.'
                        ]);
                    }

                    // Lưu thông tin tệp vào cơ sở dữ liệu
                    $PropertyImage = new PropertyImage;
                    $PropertyImage->image = $newFileName;
                    $PropertyImage->property_id = $Property->id;
                    $PropertyImage->add_by_user = $user_id;
                    $PropertyImage->save();

                    if (!$PropertyImage->save()) {
                        return response()->json([
                            'success' => false,
                            'message' => 'Lỗi khi lưu thông tin tệp vào cơ sở dữ liệu.'
                        ]);
                    }
                }
                return response()->json([
                    'success' => true,
                    'message' => "updated ok",
                    'property' => $Property,
                    'property_images' => PropertyImage::where('property_id', $Property->id)->get() // Thêm dòng này
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Không có tệp nào được chọn nen giu tep cu.'
                ]);
            }
        }
        $listPropertyImage = PropertyImage::where('property_id', $id)->pluck('image');

        // $listPropertyImage = $listPropertyImage->map(function ($image) {
        //     return asset('storage/images/host/' . $image);
        // });
        $listPropertyImage->transform(function ($image) {
            return asset('storage/images/host/' . $image);
        });
        //Lay tp, quan
        // $Property->provinces_id = Province::where('code', $Property->provinces_id)->value('full_name');
        // $Property->districts_id = District::where('code', $Property->districts_id)->value('full_name');
        // //Property_type
        // $Property->property_type_id = PropertyType::where('id', $Property->property_type_id)->value('name');
        // $Property->room_type_id = RoomType::where('id', $Property->room_type_id)->value('name');
        // $Property->category_id = Category::where('id', $Property->category_id)->value('name');
        return response()->json([
            'success' => true,
            'property_image' => $listPropertyImage,
            'properties' => $Property
        ]);
    }
    public function delete($id)
    {
        $Property = Property::find($id);

        if ($Property) {
            $PropertyImages = PropertyImage::where('property_id', $Property->id)->get();

            foreach ($PropertyImages as $PropertyImage) {
                Storage::delete('public/images/host/' . $PropertyImage->image);
                $PropertyImage->delete();
            }

            $Property->delete();

            return response()->json([
                'messege' => "Deleted successfully record with ID: " . $id
            ]);
        }
        return response()->json([
            'messege' => "ID not found to delete"
        ]);
    }
}
