<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ville;
use Validator;
class villes extends Controller
{
    function cretate_ville(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $nom=$request->input('nom');
        $ville=new ville();
        $ville->nom=$nom;
        $ville->save();
        return $ville;
    }
    function get_all_ville(Request $request){

        return Ville::all();
    }
}
