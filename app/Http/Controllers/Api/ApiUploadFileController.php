<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApiUploadFileController extends Controller
{
    public function upload(Request $request)
    {
        if (!$request->hasFile('file')) {
            return response()->json(['error' => 'No image uploaded'], 400);
        }

        $file = $request->file('file');
        $id = $request->header('id');
        $year = $request->header('year');
        $month = $request->header('month');

        $path = $file->storeAs("Payslip/$year", $id.$month.$file->getClientOriginalName(), 'public');

        $url = Storage::url($path);

        return response()->json(['url' => $url], 200);
    }
}