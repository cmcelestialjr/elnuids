<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeDeduction extends Model
{
    protected $table = 'employee_deductions';
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withDefault();
    }
}
