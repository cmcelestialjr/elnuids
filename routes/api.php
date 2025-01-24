<?php

use App\Http\Controllers\API\ApiAuthController;
use App\Http\Controllers\API\ApiUploadFileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ApiAuthController::class, 'login']);

Route::get('/upload-file', [ApiUploadFileController::class, 'upload']);

Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::post('/login', [ApiAuthController::class, 'login']);
});





