<?php

use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiDeductionController;
use App\Http\Controllers\Api\ApiDtrController;
use App\Http\Controllers\Api\ApiPayslipController;
use App\Http\Controllers\Api\ApiUploadFileController;
use App\Http\Middleware\VerifyAppToken;
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

Route::post('/upload-file', [ApiUploadFileController::class, 'upload']);

Route::post('/login', [ApiAuthController::class, 'login'])->name('login');
Route::post('/login1', [ApiAuthController::class, 'login1']);

Route::group(['middleware' => [VerifyAppToken::class]], function(){
    

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::post('/fetchDtr', [ApiDtrController::class, 'fetchDtr'])->name('fetchDtr');
        Route::post('/fetchPayslip', [ApiPayslipController::class, 'fetch'])->name('fetchPayslip');
        Route::post('/fetchDeduction', [ApiDeductionController::class, 'fetch'])->name('fetchDeduction');
        Route::post('/fetchDeductionData', [ApiDeductionController::class, 'fetchData'])->name('fetchDeductionData');
        
    });
});





