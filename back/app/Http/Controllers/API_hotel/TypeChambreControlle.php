<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\type_chambre;
use Validator;
class TypeChambreControlle extends Controller
{
    function create_type_chambre(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
             'nb' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $nom=$request->input('nom');
        $nb=$request->input('nb');
        $type_chambre=new type_chambre();
        $type_chambre->nom=$nom;
        $type_chambre->nb=$nb;
        $type_chambre->save();
        return $type_chambre;
    }
    function get_all_type_chambre(Request $request){
        return type_chambre::all();
    }
}
