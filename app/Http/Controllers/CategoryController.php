<?php

namespace App\Http\Controllers;

use Ramsey\Uuid\Uuid;
use App\Models\Category;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    //
    public function create(Request $request)
    {
        // tạo biến instance từ model Category để truy vấn vào các cột của bảng
        $Category = new Category;

        $Category->name =  $request->name;
        $Category->description =  $request->description;

        $newFileName = 'images_category_' . Uuid::uuid4()->toString() . '_' . $request->file('icon_image')->getClientOriginalName();

        $request->file('icon_image')->storeAs('public/images/category', $newFileName);

        $Category->icon_image = $newFileName;
        $Category->save();

        return response()->json(
            [
                'messege' => "added ok",
            ]
        );
    }

    public function read()
    {
        $Categories = Category::all();

        foreach ($Categories as $category) {
            if ($category->icon_image !== null) {
                $category->icon_image = asset('storage/images/category/' . $category->icon_image);
            } else {
                $category->icon_image = null;
            }
        }
        return response()->json($Categories);
    }

    public function update(Request $request)
    {
        $id = $request->input('id');
        $Category = Category::find($id);

        if ($Category) {

            $Category->name = $request->name;
            $Category->description = $request->description;

            if ($request->file('icon_image')) {
                Storage::delete('public/images/category/' . $Category->icon_image);
                $newFileName = 'images_category_update_' . Uuid::uuid4()->toString() . '_' . $request->file('icon_image')->getClientOriginalName();
                $request->file('icon_image')->storeAs('public/images/category', $newFileName);
                $Category->icon_image = $newFileName;
            }

            $Category->update();

            return response()->json([
                'messege' => "Updated successfully",
            ]);
        } else {
            return response()->json(['messege' => "ID not found", 404]);
        }
    }


    public function delete(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        $id = $request->input("id");
        $Category = Category::find($id);
        if ($Category) {
            $property = Property::where('category_id', $Category->id)->first();

            if ($property) {
                return response(['message' => 'error'], 403);
            }


            unlink(storage_path('app/public/images/category/' . $Category->icon_image));
            $Category->delete();
            return response()->json([
                'messege' => "Deleted successfully record with ID: " . $id
            ]);
        }
        return response()->json([
            'messege' => "ID not found to delete"
        ]);
    }

    public function filterByName(Request $request)
    {
        $name = $request->input('name');
        $Categories = Category::where('name', 'like', '%' . $name . '%')->get();
        // Để kiểm tra xem Collection có rỗng hay không, sử dụng phương thức isEmpty() hoặc count()
        if (count($Categories) > 0) {
            foreach ($Categories as $Category) {
                if ($Category->icon_image != "") {
                    $Category->icon_image = asset('storage/images/category/' . $Category->icon_image);
                } else {
                    $Category->icon_image = null;
                }
            }
            return response()->json([
                "success" => true,
                "message" => "All of Categories list",
                "data" => $Categories,
            ]);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Category not found.",
            ], 404);
        }
    }

    public function filterById(Request $request)
    {
        $id = $request->input("id");
        $category = Category::where('id',  $id)->first();

        if ($category) {
            $category->icon_image = asset('storage/images/category/' . $category->icon_image);
            return response()->json([$category]);
        } else {
            return response([
                'message' => 'not found'
            ]);
        }
    }

    public function readCurrentPage($currentPage)
    {
        $total = Category::count();
        $collections = Category::all()->reverse()->chunk(10);
        $collection = $collections[$currentPage - 1];

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }
        $collection = $newCollection;

        foreach ($collection as $category) {
            if ($category->icon_image !== null) {
                $category->icon_image = asset('storage/images/category/' . $category->icon_image);
            } else {
                $category->icon_image = null;
            }
        }
        return response()->json([
            'items' => $collection,
            'total' => $total
        ]);
    }
}
