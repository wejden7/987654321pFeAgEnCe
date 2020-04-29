<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Message;
use App\User;
class messageControlle extends Controller
{
    function envoyerMessage(Request $request){
        $id=$request->input('id');
        $A=$request->input('a');
        $objet=$request->input('objet');
        $message=$request->input('message');
        $msg=new Message();
        $msg->user_id_de=$id;
        $msg->user_id_a=$A;
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


}
