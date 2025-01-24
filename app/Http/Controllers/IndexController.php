<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersNavigation;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('id',1)->first();

        $data = [
            'user' => $user
        ];

        return view('index',$user);
    }
}
