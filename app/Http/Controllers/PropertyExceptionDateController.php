<?php

namespace App\Http\Controllers;

use App\Models\PropertyExceptionDate;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\DataCollector\ExceptionDataCollector;

class PropertyExceptionDateController extends Controller
{
    public function create(Request $request)
    {
        $exceptions = $request->exception;

        $oldException = PropertyExceptionDate::where('property_id', $request->property_id)->get();

        if ($oldException) {
            foreach ($oldException as $exception) {
                $exception->delete();
            }
        }


        foreach ($exceptions as $exception) {
            $newException = new PropertyExceptionDate();
            $exception = json_decode($exception);
            $newException->property_id = $request->property_id;
            $newException->start_date = $exception->start;
            $newException->end_date = $exception->end;
            $newException->save();
        }

        return response(['message' => 'success']);
    }
}
