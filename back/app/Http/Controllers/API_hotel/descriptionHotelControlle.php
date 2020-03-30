<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\description_hotel;
use App\hotels;
use Validator;
class descriptionHotelControlle extends Controller
{
    function create_description_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'hotel' => 'required',
            'description' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $titre=$request->input('titre');
        $hotel=$request->input('hotel');
        $description=$request->input('description');
        $description_hotel=new description_hotel();
        $description_hotel->titre=$titre;
        $description_hotel->hotel=$hotel;
        $description_hotel->description=$description;
        $description_hotel->save();
        return $description_hotel;
    }
    function get_all_description_hotel(Request $request){
        return description_hotel::all();
    }
    function get_all_description_of_on_hotel(Request $request){
        $id=$request->input('id');
        return hotels::find($id)->Description;
    }
}
