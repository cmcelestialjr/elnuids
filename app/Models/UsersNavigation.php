<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersNavigation extends Model
{
    protected $table = 'users_navigations';
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->withDefault();
    }
}
