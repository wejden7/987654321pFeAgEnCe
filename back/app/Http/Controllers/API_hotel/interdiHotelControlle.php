<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\interdi_hotel;
use App\hotels;
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
        return hotels::find($id)->interdi_hotel();
    
    }
}