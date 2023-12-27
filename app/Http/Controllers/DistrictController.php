<?php

namespace App\Http\Controllers;

use App\Models\District;
use App\Models\Province;
use Illuminate\Http\Request;

class DistrictController extends Controller
{
    //
    function get()
    {
        $districts = District::all();
        return response([$districts]);
    }

    function getBasedOnProvinces($provinceID)
    {
        $province = Province::find($provinceID);
        $districts = District::where('province_code', $province->code)->get();

        return response($districts);
    }
}
