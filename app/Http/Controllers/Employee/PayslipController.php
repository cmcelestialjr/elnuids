<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\EmployeePayslipFile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PayslipController extends Controller
{
    public function index(Request $request)
    {

        $user = User::where('id',1)->first();

        $data = [
            'user' => $user
        ];

        return view('index',$data);

    }
}