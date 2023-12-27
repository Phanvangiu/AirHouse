<?php

namespace App\Http\Controllers;

use Ramsey\Uuid\Uuid;
use App\Models\Amenity;
use App\Models\PropertyAmenity;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Storage;

class AmenityController extends Controller
{
    public function create(Request $request)
    {
        $amenity = new Amenity;
        $originFileName = $request->file('icon_image')->getClientOriginalName();
        $newFileName = 'images_amenities_' . Uuid::uuid4()->toString() . '_' . $originFileName;

        $request->file('icon_image')->storeAs('public/images/amenities', $newFileName);
        $amenity->icon_image = $newFileName;
        $amenity->type = $request->type;
        $amenity->name = $request->name;

        $amenity->save();

        return response()->json([
            "message" => "A amenity created successfully.",
        ]);
    }

    public function read()
    {
        $Amenities = Amenity::all();

        foreach ($Amenities as $amenity) {
            if ($amenity->icon_image !== null) {
                $amenity->icon_image = asset('storage/images/amenities/' . $amenity->icon_image);
            } else {
                $amenity->icon_image = null;
            }
        }
        return response()->json($Amenities);
    }


    public function readCurrentPage($currentPage)
    {
        $total = Amenity::count();
        $collections = Amenity::all()->reverse()->chunk(10);
        $collection = $collections[$currentPage - 1];

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }
        $collection = $newCollection;

        foreach ($collection as $amenity) {
            if ($amenity->icon_image !== null) {
                $amenity->icon_image = asset('storage/images/amenities/' . $amenity->icon_image);
            } else {
                $amenity->icon_image = null;
            }
        }

        return response()->json([
            'items' => $collection,
            'total' => $total
        ]);
    }

    public function update(Request $request)
    {
        $id = $request->input("id");

        $updateAmenity = Amenity::find($id);

        if (!$updateAmenity) {
            return response()->json([
                "success" => false,
                "message" => "ID does not exist. Update unsuccessful!!!",
            ], 404);
        }

        if ($request->file('icon_image')) {
            $originFileName = $request->file('icon_image')->getClientOriginalName();
            $newFileName = 'images_amenities_' . Uuid::uuid4()->toString() . '_' . $originFileName;
            $request->file('icon_image')->storeAs('public/images/amenities', $newFileName);
            $updateAmenity->icon_image = $newFileName;
        }

        $updateAmenity->name = $request->input('name');
        $updateAmenity->type = $request->input('type');
        $updateAmenity->save();

        return response()->json([
            "message" => " Amenity have id : " . $id . " updated successfully.",
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);

        $id = $request->input("id");

        $amenities = Amenity::find($id);

        if ($amenities) {
            $property_amenities = PropertyAmenity::where('amenity_id', $amenities->id)->first();

            if ($property_amenities) {
                return response(['message' => 'error'], 403);
            }

            unlink(storage_path('app/public/images/amenities/' . $amenities->icon_image));
            $amenities->delete();
            return response()->json([
                "success" => true,
                "message" => "Deleted amenity with ID: " . $id,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "ID does not exist. Deletion unsuccessful!!!"
            ]);
        }
    }

    public function filterByName(Request $request)
    {
        $name = $request->input("name");
        $Amenities = Amenity::where('name', 'like', '%' . $name . '%')->get();
        if (count($Amenities) > 0) {
            foreach ($Amenities as $amenity) {
                if ($amenity->icon_image != "") {
                    $amenity->icon_image = asset('storage/images/amenities/' . $amenity->icon_image);
                } else {
                    $amenity->icon_image = null;
                }
            }
            return response()->json([
                "success" => true,
                "message" => "All of amenities list",
                "data" => $Amenities,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Amenity not found.",
            ], 404);
        }
    }

    public function filterById(Request $request)
    {
        $id = $request->input("id");
        $amenity = Amenity::where('id',  $id)->first();

        if ($amenity) {
            $amenity->icon_image = asset('storage/images/amenities/' . $amenity->icon_image);
            return response()->json([$amenity]);
        } else {
            return response([
                'message' => 'not found'
            ]);
        }
    }
}
