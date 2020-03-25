<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ReservationVoyage;
use App\User;
use App\Voyage;
use App\TarifVoyage;
use App\CategorieVoyage;


class ReservationVoyageControlle extends Controller
{
    function   addreservation(Request $request){
        
        $id_user=$request->input('id_user');
        $id_voyage=$request->input('id_voyage');
        $id_tarif=$request->input('id_tarif');
        $reservation=new ReservationVoyage();
        $reservation->user=$id_user;
        $reservation->voyage=$id_voyage;
        $reservation->tarif=$id_tarif;
        $reservation->save();
        return $reservation;
}
function  getreservationpays(Request $request){
    $i=$request->input('id');
   $reservation=User::find($i)->reservation;
   foreach ($reservation as $R) {
       $id_voyage=$R->voyage;
       $id_tarif=$R->tarif;
       $voyage=Voyage::find($id_voyage);
       $id_pays=$voyage->categorie;
       $pays=CategorieVoyage::find($id_pays);
       $tarif=TarifVoyage::find($id_tarif);
       $success[]=[$voyage->titre,$pays->payer,$tarif->prix,$tarif->date,$R->etat,$R->id];
 }
 return response()->json($success);
 
}
function annulation(Request $request){
    $i=$request->input('id');
    $rev=ReservationVoyage::find($i);
    $rev->etat="annuler";
    $rev->save();
    return $rev;

}

}
