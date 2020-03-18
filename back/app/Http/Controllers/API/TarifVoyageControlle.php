<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TarifVoyage;
use App\Voyage;
class TarifVoyageControlle extends Controller
{           
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
        function deletetarifvoyageById(Request $request){
            $id=$request->input('id');
            $tarif=TarifVoyage::find($id);
            $tarif->delete();
            return $tarif;
        }
        function deletetarifvoyage(Request $request){

            return TarifVoyage::whereNotNull('id')->delete();
           
        }
        function selecttarifVoyageById(Request $request){

            $id=$request->input('id');
            $tarif=TarifVoyage::find($id);
            
            return $tarif;
        }
        function selecttarifVoyage(Request $request){

            
            $tarif=TarifVoyage::all();
            
            return $tarif;
        }
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
        function getperiodeofvoyage(Request $request){
            $i=$request->input('id');
            return Voyage::find($i)->peride;
        }
    
}
