<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\interdi_hotel;
use App\hotels;
use App\interdi;
use App\icone;
use Validator;
class interdiHotelControlle extends Controller
{
    function create_interdi_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'hotel' => 'required',
            'interdi' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        $hotel=$request->input('hotel');
        $interdi=$request->input('interdi');
        $interdi_hotel=new interdi_hotel();
        $interdi_hotel->hotel=$hotel;
        $interdi_hotel->interdi=$interdi;
        $interdi_hotel->save();
        return $interdi_hotel;
    }
    function get_all_interdi_hotel(Request $request){
        return interdi_hotel::all();
    }
    function get_all_interdi_of_hotel(Request $request){
        $id=$request->input('id');
        $i_hotel=hotels::find($id)->interdi_hotel;
        $table=[];
        foreach($i_hotel as $i){
            $interdi=interdi::find($i->interdi);
            $icone=icone::find($interdi->icon);
            $table[]=['id'=>$i->id,'titre'=>$interdi->titre,'icon'=>$icone->nom];
        }
        return $table;
    
    }
    function delete_interdi_of_hotel(Request $request){
        $id=$request->input('id');
        $interdi=interdi_hotel::find($id);
        $interdi->delete();
        return $interdi;
    }
}
