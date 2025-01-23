<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeePayslipFile extends Model
{
    protected $table = 'employee_payslip_files';
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withDefault();
    }
}
