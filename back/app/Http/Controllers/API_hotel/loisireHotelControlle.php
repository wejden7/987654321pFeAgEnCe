<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\loisire_hotel;
use App\hotels;
use App\loisire;
use App\icone;
use Validator;
class loisireHotelControlle extends Controller
{
    function create_loisire_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'hotel' => 'required',
            'loisire' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        $hotel=$request->input('hotel');
        $loisire=$request->input('loisire');
        $loisire_hotel=new loisire_hotel();
        $loisire_hotel->hotel=$hotel;
        $loisire_hotel->loisire=$loisire;
        $loisire_hotel->save();
        return $loisire_hotel;
    }
    function get_all_loisire_hotel(Request $request){
        return loisire_hotel::all();
    }
    function get_all_loisire_of_hotel(Request $request){
        $id=$request->input('id');
        $l_hotel=hotels::find($id)->loisire_hotel;
        $table=[];
        foreach($l_hotel as $l){
          
            $loisire=loisire::find($l->loisire);
            $icon=icone::find($loisire->icon);
            $table[]=['id'=>$l->id,'titre'=>$loisire->titre,'icon'=>$icon->nom];
        }
        return $table;
    }
  function  delete_loisire_of_hotel(Request $request){
        $id=$request->input('id');
        $loisire=loisire_hotel::find($id);
        $loisire->delete();
        return $loisire;
    }
}
