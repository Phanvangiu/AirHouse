<?php

namespace App\Http\Controllers;

use App\Models\PropertyReview;
use Illuminate\Http\Request;

class PropertyReviewController extends Controller
{
    //
    function getData(){
        return PropertyReview::all();
    }
}
