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
        'prixadulte' => 'required',
        'prixenfant' => 'required',
        'prixbebe' => 'required',
       ]);

    if ($validator->fails()) { 
             return response()->json(['error'=>'error'], 422);            
    }
    $hotel=$request->input('hotel');
    $pension=$request->input('pension');
    $prixenfant=$request->input('prixenfant');
    $prixadulte=$request->input('prixadulte');
    $prixbebe=$request->input('prixbebe');
    $ponsion_hotel=new ponsion_hotel();
    $ponsion_hotel->hotel=$hotel;
    $ponsion_hotel->pension=$pension;
    $ponsion_hotel->prixAdulte=$prixadulte;
    $ponsion_hotel->prixEnfant=$prixenfant;
    $ponsion_hotel->prixBebe=$prixbebe;
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
        $table[]=['id'=>$p->id,'titre'=>$pension->titre,'prixAdulte'=>$p->prixAdulte,'prixEnfant'=>$p->prixEnfant,"prixBebe"=>$p->prixBebe,'icon'=>$icon->nom];
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
    $prixAdulte=$request->input('prixAdulte');
    $prixEnfant=$request->input('prixEnfant');
    $prixBebe=$request->input('prixBebe');
    $pension=ponsion_hotel::find($id);
    $pension->prixAdulte=$prixAdulte;
    $pension->prixEnfant=$prixEnfant;
    $pension->prixBebe=$prixBebe;
    $pension->save();
    return $pension;
}
}
