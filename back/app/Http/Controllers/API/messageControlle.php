<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Message;
use App\User;
use Validator;
class messageControlle extends Controller
{ 
    function messageVu(Request $request){
        $id=$request->input('id');
        $message=Message::find($id);
        $message->vu=true;
        $message->save();
        return $message;
    }

    function envoyerMessageAadmine(Request $request){
        $user=User::where("role","admin")->first();
        $id=$request->input('id');
        $objet=$request->input('objet');
        $message=$request->input('message');
        $msg=new Message();
        $msg->user_id_de=$id;
        $msg->user_id_a=$user->id;
        $msg->objet=$objet;
        $msg->message=$message;
        $msg->save();
        return $msg;
    }
    function get_nb_message_new_admin(){
        $user=User::where("role","admin")->first();
        $messages=User::find($user->id)->MessageRemis;
        $nb=0;
        foreach($messages as $msg){
            if($msg->vu==0){
                $nb++;
            }
        }
            return $nb;
    }
    function envoyerMessageDeAdmine(Request $request){
        $user=User::where("role","admin")->first();
        $id=$request->input('id');
        $objet=$request->input('objet');
        $message=$request->input('message');
        $msg=new Message();
        $msg->user_id_de=$user->id;
        $msg->user_id_a=$id;
        $msg->objet=$objet;
        $msg->message=$message;
        $msg->save();
        return $msg;
    }
    function MessageEnvoyer(Request $request){
        $id=$request->input('id');
        $messages= User::find($id)->MessageEnvoyer;
        foreach($messages as $message){
            $user=User::find($message->user_id_a);
            $message->user_nom_a=$user->name." ".$user->surname;
        }
        return $messages;
    }
    function MessageRemis (Request $request){
        $id=$request->input('id');
        $messages=User::find($id)->MessageRemis;
        foreach($messages as $message){
            $user=User::find($message->user_id_de);
            $message->user_nom_de=$user->name." ".$user->surname;
        }
        return $messages;
    }
    function envoyerMessagevisiteurs(Request $request){
        $validator = Validator::make($request->all(), [ 
            'name' => 'required', 
            'surname' => 'required', 
            'civilite'=>'required',
            'tel' => 'required', 
            'email' => 'required|email', 
            'password' => 'required', 
            'objet' => 'required', 
            'message' => 'required', 
           
        ]);
if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }
$input = $request->all(); 
        $input['password'] = bcrypt($input['password']); 
        $user = User::create($input); 
        $user->role="visiteurs";
        $user->save();
        $objet=$request->input('objet');
        $message=$request->input('message');
        $admin=User::where("role","admin")->first();
        $msg=new Message();
        $msg->user_id_de=$user->id;
        $msg->user_id_a=$admin->id;
        $msg->objet=$objet;
        $msg->message=$message;
        $msg->save();
        return $msg;
    }
 function   delete(Request $request){
        $id=$request->input('id');
        $msg=Message::find($id);
        $msg->delete();
        return $msg;
    }
       

}
