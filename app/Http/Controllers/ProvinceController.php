<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProvinceController extends Controller
{
    //
    function get()
    {
        $provinces = Province::all();
        return response($provinces);
    }

    public function getCategoryBasedOnProvince(Request $request)
    {

        $now = now()->toDateString();
        $results = DB::table('provinces')
            ->join('properties', 'properties.provinces_id', '=', 'provinces.code')
            ->join('categories', 'categories.id', '=', 'properties.category_id')
            ->where('properties.acception_status', 'accept')
            ->where('properties.property_status', true)
            ->whereDate('properties.end_date', '>=', $now)
            ->select('provinces.code', 'properties.category_id', DB::raw('COUNT(properties.category_id) as total'))
            ->groupBy('provinces.code', 'properties.category_id')
            ->get();

        return response($results);
    }

    public function getProvinceBasedOnCategory(Request $request)
    {

        $now = now()->toDateString();
        $results = DB::table('properties')
            ->join('provinces', 'provinces.code', '=', 'properties.provinces_id')
            ->where('properties.acception_status', 'accept')
            ->where('properties.property_status', true)
            ->whereDate('properties.end_date', '>=', $now)
            ->select('properties.category_id', 'provinces.code', DB::raw('count(provinces.code) as count'))
            ->groupBy('properties.category_id', 'provinces.code')
            ->get();

        return response($results);
    }
}
