<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\EmployeePayslipFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PayslipController extends Controller
{
    public function index($year)
    {

        $query = EmployeePayslipFile::where('user_id',1)->where('year',2025)->first();

        return 'https://ids.lnu.edu.ph/pdf_error.pdf';

    }
}