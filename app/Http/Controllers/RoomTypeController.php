<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\RoomType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Uuid;

class RoomTypeController extends Controller
{
    function create(Request $request)
    {
        $roomType = new RoomType();
        $imageName = time() . '_' . $request->file('icon_image')->extension();
        $request->file('icon_image')->storeAs('public/images/room_images', $imageName);

        $roomType->name = $request->name;
        $roomType->icon_image = $imageName;
        $roomType->save();

        return response()->json([
            "message" => "A room type created successfully.",
        ], 201);
    }

    public function update(Request $request)
    {
        $id = $request->input("id");

        $updateRoomType = RoomType::find($id);

        if (!$updateRoomType) {
            return response()->json([
                "success" => false,
                "message" => "ID does not exist. Update unsuccessful!!!",
            ], 404);
        }

        if ($request->file('icon_image')) {
            $originFileName = $request->file('icon_image')->getClientOriginalName();
            $newFileName = 'images_room_type_' . Uuid::uuid4()->toString() . '_' . $originFileName;
            $request->file('icon_image')->storeAs('public/images/room_images', $newFileName);
            $updateRoomType->icon_image = $newFileName;
        }

        $updateRoomType->name = $request->input('name');
        $updateRoomType->save();

        return response()->json([
            "message" => " Room type have id : " . $id . " updated successfully.",
        ], 200);
    }


    function getRoom(Request $request)
    {
        $roomTypes = RoomType::all();
        foreach ($roomTypes as $roomType) {
            if ($roomType->icon_image != null) {
                $roomType->icon_image = asset('storage/images/room_images/' . $roomType->icon_image);
            } else {
                $roomType->icon_image = null;
            }
        }
        return response()->json($roomTypes);
    }

    function deleteRoomType(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        $id = $request->input("id");
        $roomType = RoomType::find($id);

        if ($roomType) {
            $property = Property::where('room_type_id', $roomType->id)->first();

            if ($property) {
                return response(['message' => 'error'], 403);
            }


            unlink(storage_path('app/public/images/room_images/' . $roomType->icon_image));
            $roomType->delete();
            return response()->json([
                'messege' => "Deleted successfully record with ID: " . $id
            ]);
        }
        return response()->json([
            'messege' => "ID not found to delete"
        ]);
    }

    public function filterById(Request $request)
    {
        $id = $request->input("id");
        $roomType = RoomType::where('id',  $id)->first();

        if ($roomType) {
            $roomType->icon_image = asset('storage/images/room_images/' . $roomType->icon_image);
            return response()->json([$roomType]);
        } else {
            return response([
                'message' => 'not found'
            ]);
        }
    }

    public function readCurrentPage($currentPage)
    {
        $total = RoomType::count();
        $collections = RoomType::all()->reverse()->chunk(10);
        $collection = $collections[$currentPage - 1];

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }
        $collection = $newCollection;

        foreach ($collection as $roomType) {
            if ($roomType->icon_image !== null) {
                $roomType->icon_image = asset('storage/images/room_images/' . $roomType->icon_image);
            } else {
                $roomType->icon_image = null;
            }
        }
        return response()->json([
            'items' => $collection,
            'total' => $total
        ]);
    }
}
