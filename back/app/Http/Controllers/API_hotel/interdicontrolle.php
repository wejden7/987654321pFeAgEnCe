<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\interdi;
use Validator;
class interdicontrolle extends Controller
{
    function create_interdi(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'icon' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $titre=$request->input('titre');
        $icon=$request->input('icon');
        $interdi=new interdi();
        $interdi->titre=$titre;
        $interdi->icon=$icon;
        $interdi->save();
        return $interdi;
    }
    function get_all_interdi(Request $request){
        return interdi::all();
    }
}
