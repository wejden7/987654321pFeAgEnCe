<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\pension;
use App\icone;
use App\hotels;
use Validator;
class pensionControlle extends Controller
{
    function create_pension(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'image' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        $existe=pension::where('titre',$request->input('titre'));
        if($existe->count()<1){
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
          
            $icone=new icone();
            $icone->nom=$name;
            $icone->save();
            $destinationPath = public_path('/images/hotels/icons');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
            $titre=$request->input('titre');
            $icon=$request->input('icon');
            $pension=new pension();
            $pension->titre=$titre;
            $pension->icon=$icone->id;
            $pension->save();
            return $pension;
        }
        return response()->json(['error'=>'error'], 500);
        }
        return response()->json(['error'=>'existe'], 500);
   
    }
    function get_all_pension(Request $request){
        return pension::all();
    }
    function get_pension_moi_of_hotel(Request $request){
        $id=$request->input('id');
        $pensions=pension::all();
        $p_hotel=hotels::find($id)->ponsion_hotel;
        $table=[];
        foreach($pensions as $pension){
            $existe=0;
            foreach($p_hotel as $p){
                if($p->pension==$pension->id){
                    $existe=1;
                }
            }
            if($existe==0){
                $table[]=$pension;
            }
        }
        return $table;
    }
}
