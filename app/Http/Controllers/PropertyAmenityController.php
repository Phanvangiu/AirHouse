<?php

namespace App\Http\Controllers;

use App\Models\PropertyAmenity;
use Illuminate\Http\Request;

class PropertyAmenityController extends Controller
{
    //
    function getData(){
        return PropertyAmenity::all();
    }
}
