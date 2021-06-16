<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\promotionHotel;
use App\hotels;
class promotionHotelController extends Controller
{
    function addPromotionOfHotel(Request $request){
            $id=$request->input('id');
            $titre=$request->input('titre');
            $adulteMin=$request->input('adulteMin');
            $enfantMin=$request->input('enfantMin');
            $ageEnfantMax=$request->input('ageEnfantMax');
            $bebeMin=$request->input('bebeMin');
            $ageBebeMax=$request->input('ageBebeMax');
            $type=$request->input('type');
            $dateFin=$request->input('dateFin');
            $pourcentage=$request->input('pourcentage');
            $nbnuit=$request->input('nbnuit');
            $promotion=new promotionHotel();
            $promotion->hotel=$id;
            $promotion->titre=$titre;
            $promotion->adulteMin=$adulteMin;
            $promotion->enfantMin=$enfantMin;
            $promotion->ageEnfantMax=$ageEnfantMax;
            $promotion->bebeMin=$bebeMin;
            $promotion->ageBebeMax=$ageBebeMax;
            $promotion->type=$type;
            $promotion->dateFin=$dateFin;
            $promotion->pourcentage=$pourcentage;
            $promotion->nbnuit=$nbnuit;
            $promotion->save();
            return $promotion;
    }
    function getPromotionOfHptel(Request $request){
             $id=$request->input('id');
             $promotion=hotels::find($id)->promotionHotel;
             return $promotion;
    }
    function updetePromotion(Request $request){
        $id=$request->input('id');
        $adulteMin=$request->input('adulteMin');
        $enfantMin=$request->input('enfantMin');
        $ageEnfantMax=$request->input('ageEnfantMax');
        $bebeMin=$request->input('bebeMin');
        $ageBebeMax=$request->input('ageBebeMax');
        $type=$request->input('type');
        $dateFin=$request->input('dateFin');
        $pourcentage=$request->input('pourcentage');
        $nbnuit=$request->input('nbnuit');
        $titre=$request->input('titre');
        $promotion=promotionHotel::find($id);
        $promotion->titre=$titre;
        $promotion->adulteMin=$adulteMin;
        $promotion->enfantMin=$enfantMin;
        $promotion->ageEnfantMax=$ageEnfantMax;
        $promotion->bebeMin=$bebeMin;
        $promotion->ageBebeMax=$ageBebeMax;
        $promotion->type=$type;
        $promotion->dateFin=$dateFin;
        $promotion->pourcentage=$pourcentage;
        $promotion->nbnuit=$nbnuit;
        $promotion->save();
        return $promotion;
    }
    function deletePromotion (Request $request){
        $id=$request->input('id');
        $promotion=promotionHotel::find($id);
        $promotion->delete();
        return $promotion;
    }
    function typedepromotmoiHotel(Request $request){
        $id=$request->input('id');
        $typepromot[]=['type'=>'enfant'];
        $typepromot[]=['type'=>"bebe"];
        $typepromot[]=['type'=>"sejour"];
        $promotion=hotels::find($id)->promotionHotel;
        $table=[];
        foreach($typepromot as $type){
            $existe=0;
            foreach($promotion as $p){
                if($p->type==$type['type']){
                    $existe=1;
                }
            }
            if($existe==0){
                $table[]=['type'=>$type['type']];
            }
        }
        return $table;

    }
}
