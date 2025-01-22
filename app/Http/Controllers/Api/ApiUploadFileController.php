<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
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

        $path = $file->storeAs('user_images', $file->getClientOriginalName(), 'public');
    }
}