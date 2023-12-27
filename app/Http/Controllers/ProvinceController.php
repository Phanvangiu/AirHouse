<?php

namespace App\Http\Controllers;

use App\Models\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    //
    function get()
    {
        $provinces = Province::all();
        return response($provinces);
    }
}
