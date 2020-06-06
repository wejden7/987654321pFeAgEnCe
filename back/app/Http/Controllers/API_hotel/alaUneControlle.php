<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\aLaUneHotel;
use App\hotels;
use App\aLaUneVoyagenormal;
use App\aLaUneVoyageomra;
use App\Voyage;


class alaUneControlle extends Controller
{
    function ajouter_hotel(Request $request){
        $id_hotel=$request->input("id_hotel");
        $chambres=hotels::find($id_hotel)->chambre;
        $ageMaxs=hotels::find($id_hotel)->AgeMax;
        $p_hotel=hotels::find($id_hotel)->ponsion_hotel;
        if($ageMaxs->count()==2&&$chambres->count()>0&&$p_hotel->count()>0){
        $AlaUnes=hotels::find($id_hotel)->ALaUne_Hotel;
        if($AlaUnes->count()==0){
            $AlaUne=new aLaUneHotel();
            $AlaUne->hotel=$id_hotel;
            $AlaUne->save();
            return $AlaUne;
        }else{
            return response()->json(['error'=>"existe"], 401); 
        }
     }else{
            return response()->json(['error'=>'invalide'], 401); 
        }
    }
    function delete_hotel(Request $request){
        $id_hotel=$request->input("id_hotel");
        $AlaUnes=hotels::find($id_hotel)->ALaUne_Hotel;
        $AlaUnes[0]->delete();
        return $AlaUnes;
    }
  
    function ajouter_voyagenormal(Request $request){
        $id_voyage=$request->input("id_voyage");
        $AlaUnes=Voyage::find($id_voyage)->Ala_uneVoyageNormale;
        if($AlaUnes->count()==0){
            $AlaUne=new aLaUneVoyagenormal();
            $AlaUne->voyage=$id_voyage;
            $AlaUne->save();
            return $AlaUne;
        }else{
            return response()->json(['error'=>"existe"], 401); 
        }
    }
    function delete_voyageNormal(Request $request){
        $id_voyage=$request->input("id_voyage");
        $AlaUnes=voyage::find($id_voyage)->Ala_uneVoyageNormale;
        $AlaUnes[0]->delete();
        return $AlaUnes;
    }
   
    function ajouter_voyageOmra(Request $request){
        $id_voyage=$request->input("id_voyage");
        $AlaUnes=Voyage::find($id_voyage)->Ala_uneVoyageOmra;
        if($AlaUnes->count()==0){
            $AlaUne=new aLaUneVoyageomra();
            $AlaUne->voyage=$id_voyage;
            $AlaUne->save();
            return $AlaUne;
        }else{
            return response()->json(['error'=>"existe"], 401); 
        }
    }
    function delete_voyageOmra(Request $request){
        $id_voyage=$request->input("id_voyage");
        $AlaUnes=voyages::find($id_voyage)->Ala_uneVoyageOmra;
        $AlaUnes[0]->delete();
        return $AlaUnes;
    }
    
    function get_All_Ala_une(){
        $aLaUneHotels=aLaUneHotel::all();
        $aLaUneVoyagenormals=aLaUneVoyagenormal::all();
        $aLaUneVoyageomras=aLaUneVoyageomra::all();
        $table=[];
        foreach($aLaUneHotels as $alaUneHotel){
            $hotel=hotels::find($alaUneHotel->hotel);
            $table[]=["id"=>$hotel->id,"type"=>"hotel","name"=>$hotel->nom,"image"=>$hotel->image];
        }
        foreach($aLaUneVoyagenormals as $aLaUneVoyagenormal){
            $voyage=Voyage::find($aLaUneVoyagenormal->voyage);
            $table[]=["id"=>$voyage->id,"type"=>"voyage","name"=>$voyage->titre,"image"=>$voyage->image];
        }
        foreach($aLaUneVoyageomras as $aLaUneVoyageomra){
            $voyage=Voyage::find($aLaUneVoyageomra->voyage);
            $table[]=["id"=>$voyage->id,"type"=>"omra","name"=>$voyage->titre,"image"=>$voyage->image];
        }
        return $table;


    }
}
