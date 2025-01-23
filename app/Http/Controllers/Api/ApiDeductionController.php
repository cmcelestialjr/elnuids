<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\EmployeeDeduction;
use Illuminate\Http\Request;
use App\Models\User;
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

        $user = User::where('username',$request->username)->first();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $year = $request->year;
        $user_id = $user->id;
        
        $data = EmployeeDeduction::where('user_id',$user_id)
            ->where('year',$year)
            ->get();

        $responseData = $data->groupBy(function ($row) {
                return $row->deduction_id . '-' . $row->deduction_name;
        })->map(function ($group) {
            return [
                'deduction_name' => $group->first()->deduction_name,
                'deduction_id' => $group->first()->deduction_id
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

        $user = User::where('username',$request->username)->first();

        if(!$user){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $year = $request->year;
        $deduction_id = $request->deduction_id;
        $user_id = $user->id;

        $data = EmployeeDeduction::where('user_id', $user_id)
            ->where('deduction_id', $deduction_id)
            ->where('year', $year)
            ->get();

        $responseData = $data->map(function ($row) {
            return [
                'deduction_name' => $row->deduction_name,
                'deduction_id' => $row->deduction_id,
                'month' => $row->month,
                'amount' => $row->amount
            ];
        });

        return response()->json($responseData, 200);
    }
}
