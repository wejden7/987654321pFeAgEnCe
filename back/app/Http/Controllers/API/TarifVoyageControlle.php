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
            $prix=$request->input('prix');
            $tarif=new TarifVoyage();
            $tarif->voyage=$voyage;
            $tarif->date=$date;
            $tarif->prix=$prix;
            $tarif->save();
            return $tarif;

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
            $date=$request->input('date');
            $prix=$request->input('prix');
            $id=$request->input('id');
            $tarif=TarifVoyage::find($id);
            $tarif->date=$date;
            $tarif->prix=$prix;
            $tarif->save();
            return $tarif;

        }
        // get periode of one voyage
        function getperiodeofvoyage(Request $request){
            $i=$request->input('id');
            return Voyage::find($i)->periode;
        }
    
}
