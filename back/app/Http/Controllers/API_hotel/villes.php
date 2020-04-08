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
        $existe=ville::where('nom',$nom);
        if($existe->count()<1){
            $ville=new ville();
            $ville->nom=$nom;
            $ville->save();
            return $ville;
        }
        return response()->json(['error'=>'existe'], 500); 
       
    }
    function get_all_ville(Request $request){

        return Ville::all();
    }
    function delete_ville_chambre(Request $request){
        $id=$request->input('id');
        $ville=Ville::find($id);
        $ville->delete();
        return $ville;
    }
}
