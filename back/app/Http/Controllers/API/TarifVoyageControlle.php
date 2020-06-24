<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TarifVoyage;
use App\Voyage;
class TarifVoyageControlle extends Controller
{           //add periode
        function addtarifvoyage(Request $request){

            $voyage=$request->input('voyage');
            $date=$request->input('date');
            $prixAdulte=$request->input('prixAdulte');
            $prixEnfant=$request->input('prixEnfant');
            $existe=TarifVoyage::where('voyage',$voyage)->where('date',$date);
            if($existe->count()==0){
                $tarif=new TarifVoyage();
            $tarif->voyage=$voyage;
            $tarif->date=$date;
            $tarif->prixAdulte=$prixAdulte;
            $tarif->prixEnfant=$prixEnfant;
            $tarif->save();
            return $tarif; 
            }else{
                return response()->json(['error'=>'existe'], 401); 
            }
           
        }
        //delete periode by id
        function deletetarifvoyageById(Request $request){
            $id=$request->input('id');
            $tarif=TarifVoyage::find($id);
            $tarif->delete();
            return $tarif;
        }
        // delete all periode
        function deletetarifvoyage(Request $request){
            return TarifVoyage::whereNotNull('id')->delete();
        }
        //select periode by id
        function selecttarifVoyageById(Request $request){
            $id=$request->input('id');
            $tarif=TarifVoyage::find($id);
            return $tarif;
        }
        //select all tarif
        function selecttarifVoyage(Request $request){
            $tarif=TarifVoyage::all();
            return $tarif;
        }
        //updete tarife
        function updatetarifvoyage(Request $request){
            $date= $EndDate= date("Y-m-d", strtotime($request->input('date')));
            $id=$request->input('id');
            $prixAdulte=$request->input('prixAdulte');
            $prixEnfant=$request->input('prixEnfant');
            $tarif=TarifVoyage::find($id);
            $existe=TarifVoyage::where('voyage',$tarif->voyage)->where('date',$date);
            if($existe->count()==0||$date==$tarif->date){
            $tarif->date=$date;
            $tarif->prixAdulte=$prixAdulte;
            $tarif->prixEnfant=$prixEnfant;
            $tarif->save();
            return $tarif;
            }else{
                return response()->json(['error'=>'existe',"nb"=>$existe->count(),'date'=>$date,"v"=>$tarif->date], 401); 
            }
        }
        // get periode of one voyage
        function getperiodeofvoyage(Request $request){
            $i=$request->input('id');
            $newDate= date("Y-m-d");
            $k=10;
            $EndDate= date("Y-m-d", strtotime($newDate.'+'.$k.'days'));
            $v=Voyage::find($i);
            $dates= Voyage::find($i)->periode;
            $dateselect=[];
            foreach($dates as $date){
                $d= date("Y-m-d", strtotime($date->date));
                $nb=$this->countreservation($date->id);
                if($d>$EndDate&&$nb<$v->nbpersonne){
                    $dateselect[]=$date;
                }
                   
            }
            return $dateselect;
        }
        function countreservation($id_tarif){
            $reservations=TarifVoyage::find($id_tarif)->rservationofonevoyage->where('etat','valider');
            $nb=0;
            foreach($reservations as $reservetion){
                $nb=$nb+$reservetion->adulte+$reservetion->enfant;
            }
        return $nb;
        }
        function getperiodeofvoyageofAdmin(Request $request){
            $i=$request->input('id');
           
            $dates= Voyage::find($i)->periode;
         
            return $dates;
        }
    
}
