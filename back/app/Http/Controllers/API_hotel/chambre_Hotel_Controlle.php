<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\chambre;
use Validator;
class chambre_Hotel_Controlle extends Controller
{
    function create_chombre_of_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'type' => 'required',
            'hotel' => 'required',
            'nb' => 'required',
            
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
   
        $type=$request->input('type');
        $hotel=$request->input('hotel');
        $nb=$request->input('nb');
        $chambre=new chambre();
        $chambre->type=$type;
        $chambre->hotel=$hotel;
        $chambre->nb=$nb;
        $chambre->save();
        return $chambre;
        

    }
    
}
