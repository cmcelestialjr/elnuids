<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\EmployeePayslipFile;
use Illuminate\Http\Request;

class PayslipController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeePayslipFile::where('user_id',1)->where('year',2025)->first();
        $data = [
            'src' => "public$query->path"
        ];

        return view('pdf_view',$data);

    }
}