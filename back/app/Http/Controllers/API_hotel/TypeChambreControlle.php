<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\type_chambre;
use App\hotels;
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
        $existe=type_chambre::where('nom',$nom);
        if($existe->count()<1){
            $type_chambre=new type_chambre();
            $type_chambre->nom=$nom;
            $type_chambre->nb=$nb;
            $type_chambre->save();
            return $type_chambre;
        }
        return response()->json(['error'=>'existe'], 500); 
    }
    function get_all_type_chambre(Request $request){
        return type_chambre::all();
    }
    function delete_type_chambre(Request $request){
        $id=$request->input('id');
        $types=type_chambre::find($id);
        $types->delete();
        return $types;
    }
    function  get_type_chambre_moi_hotel(Request $request){
          $id=$request->input('id');
          $types=type_chambre::all();
          $chambres=hotels::find($id)->chambre;
          $table=[];
          foreach($types as $type){
              $existe=0;
            foreach($chambres as $chambre){
                if($chambre->type==$type->id){
                    $existe=1;
                }
            }
            if($existe==0){
                $table[]=[$type];
            }
          }
         return $table;
    }
}
