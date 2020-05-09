<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User; 
use Illuminate\Support\Facades\Auth; 
use Validator;

class UserControlle extends Controller
{
    public $successStatus = 200;
/** 
     * login api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function login(){ 
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){ 
            $user = Auth::user(); 
            $success['token'] =  $user->createToken('MyApp')-> accessToken; 
            $success['role'] = $user->role;
            $success['id'] = $user->id;
            return response()->json(['success' => $success], $this-> successStatus); 
        } 
        else{ 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }
/** 
     * Register api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function register(Request $request) 
    { 
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'surname' => 'required', 
            'civilite'=>'required',
            'tel' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
           
        ]);
if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
$input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $success['token'] =  $user->createToken('MyApp')-> accessToken; 
        $success['name'] =  $user->name;
        $success['id'] =  $user->id;
        $success['role'] = "user";
return response()->json(['success'=>$success], $this-> successStatus); 
    }
/** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    public function details() 
    { 
        $user = Auth::user(); 
        return response()->json( $user, $this-> successStatus); 
    } 
    public function isAdmin() 
    { 
        $user = Auth::user(); 
        if($user->role=="admin"){
            return response()->json([true], $this-> successStatus); 
        } 
        
        return response()->json([false], 401); 
    } 
    public function updete_user(Request $request){
        $id=$request->input('id');
        $name=$request->input('name');
        $surname=$request->input('surname');
        $tel=$request->input('tel');
        $email=$request->input('email');
        $user=user::find($id);
        $user->name=$name;
        $user->surname=$surname;
        $user->tel=$tel;
        $user->email=$email;
        $user->save();
        return $user;
    }
    public function countuser(){
        $user=user::all();
        return $user->count()-1;
    }
    function getuser(){
        $user=User::where('role','<>','admin')->get();
        return $user;
    }
   function deleteclient(Request $request){
        $id=$request->input('id');
        $user=user::find($id);
        $user->delete();
        return $user;
    }
}
