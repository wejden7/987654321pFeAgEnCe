<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ageMaxHotelPersonne;
use App\hotels;
class ageMaxHotelControlle extends Controller
{
    function creat_ageMaxHotel(Request $request){
        $id_hotel=$request->input('id_hotel');
        $AgeEnfant=$request->input('AgeEnfant');
        $AgeBebe=$request->input('AgeBebe');
        $age=new ageMaxHotelPersonne();
        $age->hotel=$id_hotel;
        $age->type="enfant";
        $age->age=$AgeEnfant;
        $age->save();
        $age=new ageMaxHotelPersonne();
        $age->hotel=$id_hotel;
        $age->type="bebe";
        $age->age=$AgeBebe;
        $age->save();
        return $age;
    }
    function update_AgeMAxHotel(Request $request){
        $id_hotel=$request->input('id_hotel');
        $ageMaxs=hotels::find($id_hotel)->AgeMax;
        $ageMaxs[0]->age=$request->input('AgeEnfant');
        $ageMaxs[0]->save();
        $ageMaxs[1]->age=$request->input('AgeBebe');
        $ageMaxs[1]->save();
        return $ageMaxs;  
    }
    function get_AgeMaxHotel(Request $request){
        $id_hotel=$request->input('id_hotel');
        $ageMaxs=hotels::find($id_hotel)->AgeMax;
        $table=['id'=>$id_hotel,'Enfant'=>$ageMaxs[0]->age,'bebe'=>$ageMaxs[1]->age];
        return $table;

    }
}
