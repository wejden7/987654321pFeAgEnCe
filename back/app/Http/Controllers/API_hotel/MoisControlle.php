<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\mois;
use Validator;
class MoisControlle extends Controller
{
    function create_mois(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $nom=$request->input('nom');
        $mois=new mois();
        $mois->nom=$nom;
        $mois->save();
        return $mois;
    }
    function get_all_mois(Request $request){
        return mois::all();
    }
}
