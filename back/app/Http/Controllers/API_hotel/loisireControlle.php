<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\loisire;
use Validator;
class loisireControlle extends Controller
{
    function create_loisire(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'icon' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $titre=$request->input('titre');
        $icon=$request->input('icon');
        $loisire=new loisire();
        $loisire->titre=$titre;
        $loisire->icon=$icon;
        $loisire->save();
        return $loisire;
    }
    function get_all_loisire(Request $request){
        return loisire::all();
    }
}
