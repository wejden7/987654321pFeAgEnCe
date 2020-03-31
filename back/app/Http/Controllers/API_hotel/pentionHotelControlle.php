<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ponsion_hotel;
use App\hotels;
use App\pension;
use App\icone;
use Validator;
class pentionHotelControlle extends Controller
{
    function create_ponsion_hotel(Request $request){
    $validator = Validator::make($request->all(),  [
        'hotel' => 'required',
        'pension' => 'required',
        'prix' => 'required',
       ]);

    if ($validator->fails()) { 
             return response()->json(['error'=>'error'], 422);            
    }
    $hotel=$request->input('hotel');
    $pension=$request->input('pension');
    $prix=$request->input('prix');
    $ponsion_hotel=new ponsion_hotel();
    $ponsion_hotel->hotel=$hotel;
    $ponsion_hotel->pension=$pension;
    $ponsion_hotel->prix=$prix;
    $ponsion_hotel->save();
    return $ponsion_hotel;
}
function get_all_ponsion_hotel(Request $request){
    return ponsion_hotel::all();
}
function get_all_pension_of_hotel(Request $request){
    $id=$request->input('id');
    $p_hotel=hotels::find($id)->ponsion_hotel;
    $table=[];
    foreach($p_hotel as $p){
        $pension=pension::find($p->pension);
        $icon=icone::find($pension->icon);
        $table[]=['id'=>$p->id,'titre'=>$pension->titre,'prix'=>$p->prix,'icon'=>$icon->nom];
    }
    return $table;
}
function delete_pension_of_hotel(Request $request){
    $id=$request->input('id');
    $pension=ponsion_hotel::find($id);
    $pension->delete();
    return $pension;
}
function updete_prix_pension_of_hotel(Request $request){
    $id=$request->input('id');
    $prix=$request->input('prix');
    $pension=ponsion_hotel::find($id);
    $pension->prix=$prix;
    $pension->save();
    return $pension;
}
}
