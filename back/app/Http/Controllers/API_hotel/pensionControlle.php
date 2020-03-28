<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\pension;
use Validator;
class pensionControlle extends Controller
{
    function create_pension(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'icon' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $titre=$request->input('titre');
        $icon=$request->input('icon');
        $pension=new pension();
        $pension->titre=$titre;
        $pension->icon=$icon;
        $pension->save();
        return $pension;
    }
    function get_all_pension(Request $request){
        return pension::all();
    }
}
