<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\HRDeduction;
use App\Models\HRPayrollDeduction;
use Illuminate\Http\Request;
use App\Models\Users;
use Illuminate\Support\Facades\Validator;

class ApiDeductionController extends Controller
{
    public function fetch(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'year' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid data'], 400);
        }

        $user = Users::where('username',$request->username)->first();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $year = $request->year;
        $user_id = $user->id;
        
        $data = HRDeduction::with('group')
            ->whereHas('payroll_deduction', function ($query) use ($user_id,$year) {
                $query->where('user_id', $user_id);
                $query->whereHas('payroll', function ($query) use ($year) {
                    $query->where('year',$year);
                    $query->where('generate_option','generate');
                    $query->whereHas('bank', function ($subQuery) {
        
                    });
                });
            })->get();

        $responseData = $data->map(function ($row) {
            $deduction_group = $row->group_id ? $row->group->name.'-' : '';
            return [
                'deduction_name' => $deduction_group.$row->name,
                'deduction_id' => $row->id
            ];
        });

        return response()->json($responseData, 200);
    }

    public function fetchData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'year' => 'required|integer',
            'deduction_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid data'], 400);
        }

        $user = Users::where('username',$request->username)->first();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $year = $request->year;
        $deduction_id = $request->deduction_id;
        $user_id = $user->id;

        $data = HRPayrollDeduction::with('payroll','deduction')
            ->where('user_id', $user->id)
            ->whereHas('payroll', function ($query) use ($year) {
                $query->where('year',$year);
                $query->where('generate_option','generate');
                $query->whereHas('bank', function ($subQuery) {

                });
            })->where('deduction_id',$deduction_id)
            ->get();

        $responseData = $data->map(function ($row) {
            $deduction_group = $row->deduction->group_id ? $row->deduction->group->name.'-' : '';
            return [
                'deduction_name' => $deduction_group.$row->deduction->name,
                'deduction_id' => $row->deduction_id,
                'month' => $row->payroll->month,
                'amount' => $row->amount
            ];
        });

        return response()->json($responseData, 200);
    }
}
