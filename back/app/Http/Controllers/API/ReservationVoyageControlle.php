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
//satestique
function statistique(Request $request){
    $categorie=CategorieVoyage::all();
    foreach($categorie as $pays){
    $id_pay=$pays->id;
    $voyages=CategorieVoyage::find($id_pay)->voyage;
    $nb=0;
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
        $nb=$nb+count($reservation);
    }
    $table[]=["pays"=>$pays->payer,"nb"=>$nb,'image'=>$pays->image];

    }
    return $table;
    return response()->json(['success'=>$success], $this-> successStatus); 
    

}
//get reservation of user
function  getreservationofuser(Request $request){
    $i=$request->input('id');
   $reservation=User::find($i)->reservation;
   foreach ($reservation as $R) {
       $id_voyage=$R->voyage;
       $id_tarif=$R->tarif;
       $voyage=Voyage::find($id_voyage);
       $id_pays=$voyage->categorie;
       $pays=CategorieVoyage::find($id_pays);
       $tarif=TarifVoyage::find($id_tarif);
       $success[]=['id'=>$R->id,'titer'=>$voyage->titre,'pays'=>$pays->payer,'prix'=>$tarif->prix,'date'=>$tarif->date,'etas'=>$R->etat,'created_at'=>$R->created_at,'jour'=>$voyage->nbjour];
 }
 return response()->json($success);
 
}
function getallrezervation(){
    $reservation=ReservationVoyage::all();
    foreach($reservation as $R){
        $id_user=$R->user;
        $id_voyage=$R->voyage;
        $id_tarif=$R->tarif;
        $user=User::find($id_user);
        $voyage=Voyage::find($id_voyage);
        $id_pays=$voyage->categorie;
        $pays=CategorieVoyage::find($id_pays);
        $tarif=TarifVoyage::find($id_tarif);
        $success[]=[$user,$voyage,$pays,$tarif,$R];
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
function enatente(Request $request){
    $i=$request->input('id');
    $rev=ReservationVoyage::find($i);
    $rev->etat="en attente";
    $rev->save();
    return $rev;
}
function validation(Request $request){
    $i=$request->input('id');
    $rev=ReservationVoyage::find($i);
    $rev->etat="valider";
    $rev->save();
    return $rev;
}
function getreservaion()
{
  return  ReservationVoyage::where('etat','=',"en attente")->get()->count();
}


}
