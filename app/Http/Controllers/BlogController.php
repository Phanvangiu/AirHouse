<?php

namespace App\Http\Controllers;

use App\Models\Blog;

use App\Models\BlogOfCate;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;

class BlogController extends Controller
{
    public function uploadImage(Request $request)
    {
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originFileName = $image->getClientOriginalName();
            $newFileName = 'images_blogs_' . Uuid::uuid4()->toString() . '_' . $originFileName;
            $image->storeAs('public/images/blogs', $newFileName);
            $imageUrl = asset('storage/images/blogs/' . $newFileName);

            return response()->json(['url' => $imageUrl], 200);
        }

        return response()->json(['error' => 'No image file provided'], 400);
    }

    public function create(Request $request)
    {
        $Blog = new Blog;

        $Blog->title = $request->input('title');
        $Blog->content = $request->input('content');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $originFileName = $image->getClientOriginalName();
            $newFileName = 'images_blogs_' . Uuid::uuid4()->toString() . '_' . $originFileName;
            $image->storeAs('public/images/blogs', $newFileName);
            $Blog->image = $newFileName;
        }
        $Blog->save();

        $BlogCategories = $request->input('category');

        foreach ($BlogCategories as $BlogCategory) {
            $BlogOfCate = new BlogOfCate();
            $BlogOfCate->id_blog = $Blog->id;
            $BlogOfCate->id_blog_categories = $BlogCategory;
            $BlogOfCate->updated_at = Carbon::now(); // Thêm thời gian chỉnh sửa thực tế
            $BlogOfCate->save();
        }

        return response()->json([
            'success' => true,
            'Blog' => $Blog,
        ]);
    }

    public function read(Request $request)
    {
        $request->validate([
            'id_blog' => 'int',
            'id_category' => 'int',
        ]);


        // $Blogs = Blog::all();
        $Blogs =  Blog::with('categories')->whereNotNull('image')->get();
        foreach ($Blogs as $Blog) {
            $imageName = $Blog->image;
            $Blog->image = asset('storage/images/blogs/' . $imageName);
        }

        //để hiển thị bài viết chi tiết
        // if ($request->input('id_blog')) {
        //     $id_blog = $request->input('id_blog');
        //     $id_category = $request->input('id_category');
        //     $Blog = Blog::where('id', $id_blog)->first();
        //     $imageName = $Blog->image;
        //     $Blog->image = asset('storage/images/blogs/' . $imageName);
        //     return response($Blog);
        // }
        //để hiển thị bài viết dựa trên category
        $ListBlogThroughCateID =  [];
        if ($request->input('id_category')) {
            $id_category = $request->input('id_category');
            $ListBlogID = BlogOfCate::where('id_blog_categories', $id_category)->pluck('id_blog');
            foreach ($ListBlogID as $BlogId) {
                $BlogThroughCateID = Blog::where('id', $BlogId)->first();
                $ListBlogThroughCateID[] = $BlogThroughCateID;
            }
        }
        return response()->json([
            "success" => true,
            // "data through blog_id" => $Blog,
            // "imageUrl" => $imageUrl,
            "data through category_id" => $ListBlogThroughCateID,
            "items" => $Blogs
        ], 200);
    }

    public function update(Request $request)
    {
        $id = $request->id;
        $Blog = Blog::where('id', $id)->first();
        if ($Blog) {
            $Blog->title = $request->input('title');
            $Blog->content = $request->input('content');
            $Blog->updated_at = Carbon::now();

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $originFileName = $image->getClientOriginalName();
                $newFileName = 'images_blogs_' . Uuid::uuid4()->toString() . '_' . $originFileName;
                $image->storeAs('public/images/blogs', $newFileName);
                // $imageUrl = asset('storage/images/blogs/' . $newFileName);
                $Blog->image = $newFileName;
            }
            $Blog->save();
        }

        //xóa hết record cũ có cùng id_blog tại bảng Blog_Of_Cate, tạo reocrd mới
        BlogOfCate::where('id_blog', $Blog->id)->delete();
        $BlogCategories = $request->input('category');

        foreach ($BlogCategories as $BlogCategory) {
            $BlogOfCate = new BlogOfCate();
            $BlogOfCate->id_blog = $Blog->id;
            $BlogOfCate->id_blog_categories = $BlogCategory;
            $BlogOfCate->updated_at = Carbon::now(); // Thêm thời gian chỉnh sửa thực tế
            $BlogOfCate->save();
        }

        if ($request->hasFile('blog_images')) {
            $files = $request->file('blog_images');
            $filePaths = [];
            foreach ($files as $file) {
                // Lưu tệp vào thư mục lưu trữ
                $originFileName = $file->getClientOriginalName();
                $newFileName = 'images_blogs_' . Uuid::uuid4()->toString() . '_' . $originFileName;
                $file->storeAs('public/images/blogs', $newFileName);
                $newFileName_path = asset('storage/images/blogs/' . $newFileName);
                $filePaths[] = $newFileName_path;
            }

            return response()->json([
                'success' => true,
                'message' => "added ok",
                'newFileName_path' => $filePaths,
                'Blog' => $Blog,
                'BlogOfCate' => $BlogOfCate
            ]);
        } else {
            return response()->json([
                'success' => true,
                'message' => 'Không có tệp nào được chọn nen giu tep cu.',
                'Blog' => $Blog,
                'BlogOfCate' => $BlogOfCate
            ]);
        }
    }

    public function delete($id)
    {
        $Blog = Blog::find($id);

        if ($Blog) {
            $BlogOfCates = BlogOfCate::where('id_blog', $Blog->id)->get();

            foreach ($BlogOfCates as $BlogOfCate) {
                $BlogOfCate->delete();
            }
            $Blog->delete();

            return response()->json([
                'messege' => "Deleted successfully record with ID: " . $id
            ]);
        }
        return response()->json([
            'messege' => "ID not found to delete",
            'status' => 403
        ]);
    }

    public function readCurrentPage(Request $request)
    {
        $currentPage = $request->page;    //api bên react đã gửi cái params có tên là page
        $total = Blog::count();  //lấy tổng sp để chai trang
        $collections = Blog::all()->reverse()->chunk(10);    //chuck(20) để chia ra những mảng con gồm 20sp trong mảng lớn, reverse: đảo lại để những cái mới tạo sẽ nằm đầu
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

    public function filterById(Request $request)
    {
        $id = $request->id;  //api bên react đã gửi cái params có tên là id
        $blog = Blog::with('categories')->where('id',  $id)->first(); //categories: tên function tạo relationship bên file Model

        if ($blog) {

            $imageName = $blog->image;
            $blog->image = asset('storage/images/blogs/' . $imageName);
            return response()->json($blog);
        } else {
            return response([
                'message' => 'not found',
                'status' => 403
            ]);
        }
    }

    public function search($key)
    {
        $Blogs =   Blog::where('title', 'like', "%$key%")->get();
        foreach ($Blogs as $Blog) {
            $imageName = $Blog->image;
            $Blog->image = asset('storage/images/blogs/' . $imageName);
        }

        return response()->json($Blogs);
    }
}
