<?php

namespace App\Http\Controllers;

use App\Models\BlogCategory;
use App\Models\BlogOfCate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class BlogCategoryController extends Controller
{
    public function create(Request $request)
    {
        $BlogCategory = new BlogCategory;
        $BlogCategory->name = $request->input('name');
        // $BlogCategory->updated_at = Carbon::now();
        $BlogCategory->save();
    }
    public function read()
    {
        $BlogCategories = BlogCategory::all();
        return response()->json($BlogCategories);
    }

    public function update(Request $request)
    {

        // return response($request->input('name'));
        $id = $request->id;
        $BlogCategory = BlogCategory::where('id', $id)->first();
        $BlogCategory->name = $request->input('name');
        $BlogCategory->updated_at = Carbon::now();
        $BlogCategory->save();
    }

    public function readCurrentPage(Request $request)
    {
        $currentPage = $request->page;    //api bên react đã gửi cái params có tên là page
        $total = BlogCategory::count();  //lấy tổng sp để chai trang
        $collections = BlogCategory::all()->reverse()->chunk(10);    //chuck(20) để chia ra những mảng con gồm 20sp trong mảng lớn, reverse: đảo lại để những cái mới tạo sẽ nằm đầu
        $collection = $collections[$currentPage - 1];     // lấy 1 page cụ thể trong mảng các page

        $newCollection = [];
        foreach ($collection as $key => $chunk) {
            array_push($newCollection,  $chunk);
        }
        $collection = $newCollection;

        return response()->json([
            'items' => $collection,
            'total' => $total
        ]);
    }

    //nếu xóa liền k được thfi trả về status forbiden 403 => admin tự đi xóa hết những bài blog có sử dụng catefory này
    public function delete($id)
    {
        $BlogCategory = BlogCategory::find($id);

        if ($BlogCategory) {
            $test = BlogOfCate::where('id_blog_categories', $BlogCategory->id)->first();
            // return response($test);
            if ($test) {
                return response()->json([
                    'messege' => "Need to delete all blogs belong to this category first !",
                    'test' => $test
                ], 403);
            } else {
                $BlogCategory->delete();
                return response()->json([
                    'status' => 200,
                ]);
            }
        }
        return response()->json([
            'messege' => "ID not found to delete"
        ]);
    }
    public function filterById(Request $request)
    {
        $id = $request->id;  //api bên react đã gửi cái params có tên là id
        $blogCategory = BlogCategory::where('id',  $id)->first(); //categories: tên function tạo relationship bên file Model

        if ($blogCategory) {
            // $blog->icon_image = asset('storage/images/blogs/' . $blog->image);
            return response()->json($blogCategory);
        } else {
            return response([
                'message' => 'not found',
                'status' => 403
            ]);
        }
    }
}
