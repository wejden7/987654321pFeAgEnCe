<?php

namespace App\Http\Controllers\API;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeUser;

use Illuminate\Support\Str;
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
            if($user->bloquer==false){
                $success['token'] =  $user->createToken('MyApp')-> accessToken; 
                $success['role'] = $user->role;
                $success['id'] = $user->id;
                return response()->json(['success' => $success], $this-> successStatus); 
            }else{
            return response()->json(['error'=>'Unauthorised'], 401); 
            }
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
    $existe=User::where('email',$request->input['email'])->get()->count();
if($existe==0){
    $input = $request->all(); 
    $input['password'] = bcrypt($input['password']); 
    $user = User::create($input); 
    $success['token'] =  $user->createToken('MyApp')-> accessToken; 
    $success['name'] =  $user->name;
    $success['id'] =  $user->id;
    $success['role'] = "user";
return response()->json(['success'=>$success], $this-> successStatus); 
}else{
    return response()->json(['error'=>'existe'], 501);  
}

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
    function bloquer(Request $request){
        $id=$request->input('id');
        $user=user::find($id);
        $user->bloquer=true;
        $user->save();
        return $user;
    }
    function debloquer(Request $request){
        $id=$request->input('id');
        $user=user::find($id);
        $user->bloquer=false;
        $user->save();
        return $user;
    }

     function decrypte(Request $request){
        $id=$request->input('id');
        $user=user::find($id);
        $user->password=bcrypt('0123456789');
        $user->save();
        return $user;
    }
    function sendmessage(Request $request){
        $email=$request->input('email');
    $user=User::where('email',$email)->first();
    $to=$user->email;
    $user_name = $user->name.' '.$user->surname;
    $string= Str::random(15);
    $user->code=$string;
    $user->save();
    Mail::to($to)->send(new WelcomeUser($user_name,$string));
    return response()->json(['user_id'=>$user->id], $this-> successStatus); ;
    }
    function testcode(Request $request){
        $id=$request->input('id');
        $code=$request->input('code');
        $user=user::find($id);
        if($code==$user->code){
            return response()->json([true], $this-> successStatus); ; 
        }
        return response()->json([false], 501);  
    }
  function  update_mot_passe(Request $request){
        $id=$request->input('id');
        $password=$request->input('mot_passe');
        $user=user::find($id);
        $user->password=bcrypt($password);
        $user->code=null;
        $user->save();
        return $user;
    } 
}
