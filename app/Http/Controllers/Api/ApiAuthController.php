<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UsersNavigation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ApiAuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid data'], 400);
        }        
        
        $apiToken = $request->header('App-Token');
        $apiKey = config('app.api_key');

        if ($apiToken !== $apiKey) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $username = $request->username;
        $password = $request->password;
        #$password = $this->decryptPassword($request->password);

        $credentials = ['username' => $username, 'password' => $password];
        #return response()->json(['error' => $password], 401);
        if (Auth::attempt($credentials)) {
            $user = User::where('username',$username)->first();
            $user->tokens()->delete();
            $token = $user->createToken(
                'LNU-IDS-APP', ['*'], Carbon::now()->addDay(),
            )->plainTextToken;
            
            $user1 = User::find($user->id);
            $user1->api_token = $token;
            $user1->save();

            $role = 0;

            $user_systems = UsersNavigation::select('system')
                ->where('user_id',$user->id)
                ->where('nav',"")
                ->where('nav_sub',"")
                ->whereIn('system',['SIMS','HRIMS','FIS','DTS'])
                ->groupBy('system')
                ->get();
            $systems = [];
            if($user_systems->count()>0){
                foreach($user_systems as $row){
                    if (!in_array($row->system, $systems)) {
                        $systems[] = $row->system;
                    }
                }
            }

            return response()->json([
                'username' => $user->username,
                'role' => $role,
                'id_no' => $user->id_no,
                'stud_id' => $user->stud_id,
                'lastname' => $user->lastname,
                'firstname' => $user->firstname,
                'middlename' => $user->middlename,
                'extname' => $user->extname,
                'token' => $token,
                'systems' => $systems
            ], 200);

        } else {
            return response()->json(['error' => 'Invalid Username and Password'], 401);
        }
    }

    public function decryptPassword($encryptedData) {
        list($ivBase64, $encryptedBase64) = explode(':', $encryptedData);
        $key = config('app.api_key');

        // Decode Base64
        $iv = base64_decode($ivBase64);
        $encryptedText = base64_decode($encryptedBase64);

        // Decrypt
        $cipher = "aes-256-cbc";
        $decrypted = openssl_decrypt($encryptedText, $cipher, $key, OPENSSL_RAW_DATA, $iv);

        return $decrypted;
    }
}
