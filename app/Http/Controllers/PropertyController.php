<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use Ramsey\Uuid\Uuid;
use App\Models\Amenity;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Models\PropertyImage;
use App\Mail\MailDenyProperty;
use App\Models\PropertyAmenity;
use App\Mail\MailAcceptProperty;
use App\Mail\MailCreateProperty;
use Illuminate\Support\Facades\Mail;
use App\Models\PropertyExceptionDate;
use Illuminate\Support\Facades\Storage;

class PropertyController extends Controller
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
        $Property->booking_type = $request->input('booking_type');
        $Property->check_in_after = $request->input('check_in_after');
        $Property->check_out_before = $request->input('check_out_before');
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

        $exceptions = $request->exception;

        $oldException = PropertyExceptionDate::where('property_id', $request->property_id)->get();

        if ($oldException) {
            foreach ($oldException as $exception) {
                $exception->delete();
            }
        }

        if ($exceptions) {
            foreach ($exceptions as $exception) {
                $newException = new PropertyExceptionDate();
                $exception = json_decode($exception);
                $newException->property_id = $Property->id;
                $newException->start_date = $exception->start;
                $newException->end_date = $exception->end;
                $newException->save();
            }
        }

        Mail::to($user->email)->send(new MailCreateProperty($user,  $Property));

        return response()->json([
            'success' => true,
            'message' => "added ok",
            'id' => $Property->id
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
        $collection = $collection->orderBy("updated_at")->get()->reverse()->chunk(20);

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

        foreach ($collection as $property) {
            if ($property->user->image) {
                // $property->user->image = asset("storage/images/users/" . $property->user->image);
                if (!filter_var($property->user->image, FILTER_VALIDATE_URL)) {
                    $property->user->image = asset('storage/images/users/' . $property->user->image);
                }
            }
        }

        return response()->json([
            'items' => $collection,
            'total' => $count,
        ]);
    }


    public function readById($id)
    {
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images', 'exception_date')->where('id', $id)->first();

        foreach ($property->images as $key => $image) {
            $property->images[$key] = asset("storage/images/host/" . $image->image);
        }

        if ($property->user->image) {
            $property->user->image = asset("storage/images/users/" . $property->user->image);
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
        $user  = User::where('id',$property->user_id)->first();
        Mail::to($user->email)->send(new MailAcceptProperty($user,  $property));    

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

        $user  = User::where('id',$property->user_id)->first();
        Mail::to($user->email)->send(new MailDenyProperty($user,  $property));

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


    public function showInIndexFilterPreview(Request $request)
    {
        $category = $request->category;
        $property = Property::where('category_id', $category);
        $property = $property->where('acception_status', 'accept');
        $property = $property->where('property_status', true);

        $now = now()->toDateString();

        $property = $property->whereDate('end_date', '>=', $now);

        $tempCollections = $property->get();
        $totalMax = $tempCollections[0]->base_price;

        foreach ($tempCollections as $item) {
            if ($item->base_price > $totalMax) {
                $totalMax = $item->base_price;
            }
        }



        if ($request->province != "none") {
            $property = $property->where('provinces_id', $request->province);
        }

        if ($request->checkOutFilter) {
            $checkInFilter = $request->checkInFilter;
            $checkOutFilter = $request->checkOutFilter;
            $property = $property->where('start_date', '<=', $request->checkInFilter)
                ->where('end_date', '>=',  $request->checkOutFilter)
                ->whereDoesntHave('booking', function ($query) use ($checkInFilter, $checkOutFilter) {
                    $query->where(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '<=', $checkInFilter)
                            ->whereDate('check_out_date', '>=', $checkInFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '<=', $checkOutFilter)
                            ->whereDate('check_out_date', '>=', $checkOutFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '>=', $checkInFilter)
                            ->whereDate('check_out_date', '<=', $checkOutFilter);
                    })->whereIn('booking_status', ['accepted', 'success']);
                })
                ->whereDoesntHave('exception_date', function ($query) use ($checkInFilter, $checkOutFilter) {
                    $query->where(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '<=', $checkInFilter)
                            ->whereDate('end_date', '>=', $checkInFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '<=', $checkOutFilter)
                            ->whereDate('end_date', '>=', $checkOutFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '>=', $checkInFilter)
                            ->whereDate('end_date', '<=', $checkOutFilter);
                    });
                });
        }

        if ($request->guest_count) {
            $property = $property->where('accomodates_count', '>=', $request->guest_count);
        }

        if ($request->roomType != 'any') {
            $property = $property->where('room_type_id', $request->roomType);
        }

        if ($request->bedRoom != 'any') {

            if ($request->bedRoom == '8+') {
                $property = $property->where('bedroom_count', '>=', 8);
            } else {
                $property = $property->where('bedroom_count', '>=', $request->bedRoom);
            }
        }

        if ($request->bathRoom != 'any') {
            if ($request->bathRoom == '8+') {
                $property = $property->where('bathroom_count', '>=', 8);
            } else {
                $property = $property->where('bathroom_count', '>=', $request->bathRoom);
            }
        }

        if ($request->propertyType != 'any') {
            $property = $property->where('property_type_id', $request->propertyType);
        }

        if ($request->amenities) {
            $amenities = $request->amenities;

            $property = $property->whereHas('amenities', function ($query) use ($amenities) {
                $query->whereIn('amenity_id',  $amenities)->groupBy('property_id')->havingRaw('count(amenity_id) >= ?', [count($amenities)]);
            });
        }

        $property = $property->get();

        $minPrice = $property[0]->base_price;
        $maxPrice = $property[0]->base_price;



        foreach ($property as $item) {
            if ($item->base_price > $maxPrice) {
                $maxPrice = $item->base_price;
            }

            if ($item->base_price < $minPrice) {
                $minPrice = $item->base_price;
            }
        }

        return response([
            'min' => $minPrice,
            'max' => $maxPrice,
            'totalMax' => $totalMax,
            'total' => count($property)
        ]);
    }

    public function showInIndex(Request $request)
    {
        $category = $request->category;
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images', 'rating', 'exception_date')->where('category_id', $category);
        $property = $property->where('acception_status', 'accept');
        $property = $property->where('property_status', true);

        $now = now()->toDateString();

        $property = $property->whereDate('end_date', '>=', $now);

        if ($request->province != "none") {
            $property = $property->where('provinces_id', $request->province);
        }

        if ($request->checkOutFilter) {
            $checkInFilter = $request->checkInFilter;
            $checkOutFilter = $request->checkOutFilter;
            $property = $property->where('start_date', '<=', $request->checkInFilter)
                ->where('end_date', '>=',  $request->checkOutFilter)
                ->whereDoesntHave('booking', function ($query) use ($checkInFilter, $checkOutFilter) {
                    $query->where(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '<=', $checkInFilter)
                            ->whereDate('check_out_date', '>=', $checkInFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '<=', $checkOutFilter)
                            ->whereDate('check_out_date', '>=', $checkOutFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('check_in_date', '>=', $checkInFilter)
                            ->whereDate('check_out_date', '<=', $checkOutFilter);
                    })->whereIn('booking_status', ['accepted', 'success']);
                })
                ->whereDoesntHave('exception_date', function ($query) use ($checkInFilter, $checkOutFilter) {
                    $query->where(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '<=', $checkInFilter)
                            ->whereDate('end_date', '>=', $checkInFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '<=', $checkOutFilter)
                            ->whereDate('end_date', '>=', $checkOutFilter);
                    })->orWhere(function ($subQuery) use ($checkInFilter, $checkOutFilter) {
                        $subQuery->whereDate('start_date', '>=', $checkInFilter)
                            ->whereDate('end_date', '<=', $checkOutFilter);
                    });
                });
        }

        if ($request->guest_count) {
            $property = $property->where('accomodates_count', '>=', $request->guest_count);
        }


        if ($request->roomType != 'any') {
            $property = $property->where('room_type_id', $request->roomType);
        }

        if ($request->bedRoom != 'any') {

            if ($request->bedRoom == '8+') {
                $property = $property->where('bedroom_count', '>=', 8);
            } else {
                $property = $property->where('bedroom_count', '>=', $request->bedRoom);
            }
        }

        if ($request->bathRoom != 'any') {
            if ($request->bathRoom == '8+') {
                $property = $property->where('bathroom_count', '>=', 8);
            } else {
                $property = $property->where('bathroom_count', '>=', $request->bathRoom);
            }
        }

        if ($request->propertyType != 'any') {
            $property = $property->where('property_type_id', $request->propertyType);
        }

        if ($request->amenities) {
            $amenities = $request->amenities;

            $property = $property->whereHas('amenities', function ($query) use ($amenities) {
                $query->whereIn('amenity_id',  $amenities)->groupBy('property_id')->havingRaw('count(amenity_id) >= ?', [count($amenities)]);
            });
        }


        $property = $property->get();

        foreach ($property as $key => $value) {
            foreach ($property[$key]->images as $imgkey => $imgvalue) {
                $property[$key]->images[$imgkey]->image =  asset("storage/images/host/" . $imgvalue->image);
            }
        }

        return response($property);
    }

    public function showUserPropertyById(Request $request)
    {
        $property_id = $request->id;
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images', 'booking', 'exception_date')->where('id', $property_id);
        $property = $property->where('acception_status', 'accept');
        $property = $property->where('property_status', true);

        $property = $property->first();


        if ($property) {
            foreach ($property->images as $key => $image) {
                $property->images[$key] = asset("storage/images/host/" . $image->image);
            }
            foreach ($property->amenities as $key => $amenity) {
                $property->amenities[$key]->icon_image = asset("storage/images/amenities/" . $amenity->icon_image);
            }

            $property->user->image = asset("storage/images/users/" . $property->user->image);
            return response($property, 200);
        } else {
            return response()->json([
                "error" => "Not found property"
            ], 404);
        }
    }

    public function updateProperty(Request $request)
    {
        $Property = Property::find($request->id);

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
        $Property->booking_type = $request->input('booking_type');
        $Property->check_in_after = $request->input('check_in_after');
        $Property->check_out_before = $request->input('check_out_before');
        $Property->minimum_stay = $request->input('minimum_stay');
        $Property->maximum_stay = $request->input('maximum_stay');
        $Property->property_status = $request->input('property_status');
        $Property->video = $request->input('video');
        $Property->acception_status = "waiting";
        $Property->save();

        $images = PropertyImage::where('property_id', $request->id)->get();

        foreach ($images as $image) {
            // Storage::delete('public/images/host/' . $image->image);
            $image->delete();
        }

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

        $amenities = PropertyAmenity::where('property_id', $request->id)->get();

        foreach ($amenities as $amenity) {
            $amenity->delete();
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

        $exceptions = $request->exception;

        $oldException = PropertyExceptionDate::where('property_id', $Property->id)->get();

        if ($oldException) {
            foreach ($oldException as $exception) {
                $exception->delete();
            }
        }

        if ($exceptions) {
            foreach ($exceptions as $exception) {
                $newException = new PropertyExceptionDate();
                $exception = json_decode($exception);
                $newException->property_id = $Property->id;
                $newException->start_date = $exception->start;
                $newException->end_date = $exception->end;
                $newException->save();
            }
        }



        return response()->json([
            'success' => true,
            'message' => "added ok",
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


    public function listingProperty(Request $request)
    {
        $collection = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images')->where('user_id', $request->user()->id);


        $now = now()->toDateString();
        if ($request->status == "listed") {
            $collection = $collection->where("property_status", true);
            $collection = $collection->where('acception_status', 'accept');
            $collection = $collection->whereDate('end_date', '>=', $now);
        }

        if ($request->status == "unlisted") {
            $collection = $collection->where(function ($query)  use ($now) {
                $query->where('property_status', false)->orWhere('end_date', '<', $now)->orWhere('acception_status', '!=', 'accept');
            });
        }

        $count = $collection->count();
        $collection = $collection->get()->reverse()->chunk(10);

        $collection_length = count($collection);

        if ($collection_length < $request->page) {
            return response(['message' => 'nothing here'], 404);
        }

        $collection = $collection[$request->page - 1];

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }

        $collections = $newCollection;

        foreach ($collections as $key => $value) {
            foreach ($collections[$key]->images as $imgkey => $imgvalue) {
                $collections[$key]->images[$imgkey]->image =  asset("storage/images/host/" . $imgvalue->image);
            }
        }

        return response()->json([
            'items' => $collections,
            'total' => $count,
        ]);
    }

    public function readPropertyToUpdate(Request $request)
    {
        $property_id = $request->id;
        $user_id = $request->user()->id;
        $property = Property::with('user', 'category', 'property_type', 'room_type', 'district', 'province', 'amenities', 'images', 'booking', 'exception_date')->where('id', $property_id);

        $property = $property->first();

        if ($property) {
            if ($property->user_id != $user_id) {
                return response()->json([
                    "error" => "Wrong user"
                ], 403);
            }

            foreach ($property->images as $key => $image) {
                // $property->images[$key] = asset("storage/images/host/" . $image->image);
                $property->images[$key] = base64_encode(Storage::get('public/images/host/' . $image->image));
            }
            foreach ($property->amenities as $key => $amenity) {
                $property->amenities[$key]->icon_image = asset("storage/images/amenities/" . $amenity->icon_image);
            }

            return response($property, 200);
        } else {
            return response()->json([
                "error" => "Not found property"
            ], 404);
        }
    }

    public function readProperty(Request $request)
    {
        $property = Property::where('id', $request->id)->first();

        if ($property) {
            return response($property);
        } else {
            return response(['message' => 'not found'], 400);
        }
    }




}
