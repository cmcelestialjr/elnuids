<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\HRPayroll;
use App\Models\HRPayrollList;
use App\Services\PayslipServices;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Users;
use Illuminate\Support\Facades\Validator;
use Webklex\PDFMerger\Facades\PDFMergerFacade as PDFMerger;

class ApiPayslipController extends Controller
{
    public function fetch(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'year' => 'required|integer',
            'month' => 'required|integer',
            'option' => 'required|string',
        ]);

        $pdf_error = $this->convertPdfToBase64('assets\pdf\pdf_error.pdf');        
        
        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid data',
                'src' => $pdf_error], 400);
        }

        $user = Users::where('username',$request->username)->first();

        if(!$user){
            return response()->json(['result' => 'Unauthorized',
                'src' => ''], 200);
        }

        $pdf_no_data = $this->convertPdfToBase64('assets\pdf\no-data-found.pdf');

        $user_id = $user->id;
        $id_no = $user->id_no;
        $option = $request->option;
        $year = $request->year;
        $month = $request->month;

        $payroll = HRPayroll::whereHas('list', function ($subQuery) use ($user_id) {
                $subQuery->where('user_id',$user_id);
            })
            ->whereHas('bank', function ($subQuery) {

            })
            ->where('generate_option','generate')
            ->where('year',$year);
        if($option=='By Month'){
            $payroll = $payroll->where('month',$month);
        }
        $payroll = $payroll->orderBy('year','DESC')
            ->orderBy('month','DESC')
            ->orderBy('payroll_type_id','ASC')
            ->get();

        if($payroll->count()<=0){
            return response()->json(['result' => 'No available payslip',
                'src' => ''], 200);
        }

        $payslipServices = new PayslipServices;

        if($payroll->count()>1){
            $src = 'storage\hrims\employee/'.$id_no.'\payslip/'.$year.'_'.$month.'_merge.pdf';
            $oMerger = PDFMerger::init();
            foreach($payroll as $row){
                $payroll_id = $row->payroll_id;
                $pdf = $payslipServices->generateQR($id_no,$payroll_id,'none');
                $oMerger->addPDF(public_path($pdf), 'all','L');
            }
            $oMerger->merge();
            $oMerger->save($src);
        }else{
            foreach($payroll as $row){
                $payroll_id = $row->payroll_id;
                $src = $payslipServices->generateQR($id_no,$payroll_id,'none');
            }
        }

        $pdf = $this->convertPdfToBase64($src);

        return response()->json(['result' => 'success',
                    'src' => $pdf], 200);
    }
    private function convertPdfToBase64($file){
        $pdfPath = public_path($file);
        $pdfContent = file_get_contents($pdfPath);
        return base64_encode($pdfContent);
    }
}
