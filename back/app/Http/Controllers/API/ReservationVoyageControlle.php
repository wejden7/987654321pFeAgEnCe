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
function  addreservation(Request $request){
        
        $id_user=$request->input('id_user');
        $id_voyage=$request->input('id_voyage');
        $id_tarif=$request->input('id_tarif');
        $adulte=$request->input('adulte');
        $enfant=$request->input('enfant');
        $reservation=new ReservationVoyage();
        $reservation->user=$id_user;
        $reservation->voyage=$id_voyage;
        $reservation->tarif=$id_tarif;
        $reservation->adulte=$adulte;
        $reservation->enfant=$enfant;
        $reservation->save();
        $voyage=Voyage::find($id_voyage);
        $id_pays=$voyage->categorie;
        $pays=CategorieVoyage::find($id_pays);
        $tarif=TarifVoyage::find($id_tarif);
        $success[]=['id'=>$reservation->id,'titer'=>$voyage->titre,'pays'=>$pays->payer,'prixAdulte'=>$tarif->prixAdulte,'prixEnfant'=>$tarif->prixEnfant,'date'=>$tarif->date,'etas'=>$reservation->etat,'created_at'=>$reservation->created_at,'jour'=>$voyage->nbjour,'adulte'=>$reservation->adulte,'enfant'=>$reservation->enfant];
        return $success;
}
//satestique
function get_count_reservation_voyage_of_pays(Request $request){
    $categorie=CategorieVoyage::all();
    $categorie=$categorie->where('type','normal');
    $table=[];
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
    

}
function get_count_reservation_voyage_of_omra(Request $request){
    $omra=CategorieVoyage::where('type','omra')->first();
    $table=[];
    $id_pay=$omra->id;
    $voyages=CategorieVoyage::find($id_pay)->voyage;
   
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
      
        $table[]=["voyage"=>$voyage->titre,"nb"=> count($reservation),'image'=>$voyage->image];

    }
    return $table;
}
//get reservation of user
function  getreservationofuser(Request $request){
    $i=$request->input('id');
   $reservation=User::find($i)->reservation;
   $success=[];
   foreach ($reservation as $R) {
       $id_voyage=$R->voyage;
       $id_tarif=$R->tarif;
       $voyage=Voyage::find($id_voyage);
       $id_pays=$voyage->categorie;
       $pays=CategorieVoyage::find($id_pays);
       $tarif=TarifVoyage::find($id_tarif);
       $success[]=['id'=>$R->id,'titer'=>$voyage->titre,'pays'=>$pays->payer,'prixAdulte'=>$tarif->prixAdulte,'prixEnfant'=>$tarif->prixEnfant,'date'=>$tarif->date,'etas'=>$R->etat,'created_at'=>$R->created_at,'jour'=>$voyage->nbjour,'adulte'=>$R->adulte,'enfant'=>$R->enfant];
 }
 return response()->json($success);
 
}
// get all reservation de voyage normale
function getallrezervation(){
    $categorie=CategorieVoyage::all();
    $categorie=$categorie->where('type','normal');
    $success=[];
    foreach($categorie as $pays){
    $id_pay=$pays->id;
    $voyages=CategorieVoyage::find($id_pay)->voyage;
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
        foreach($reservation as $R){
            $complet=false;
            $id_user=$R->user;
            $id_voyage=$R->voyage;
            $id_tarif=$R->tarif;
            $user=User::find($id_user);
            $voyage=Voyage::find($id_voyage);
            $nb=TarifVoyage::find($id_tarif)->rservationofonevoyage->where('etat','valider')->count();

            if($nb==$voyage->nbpersonne){
                $complet=true;
            }
            $id_pays=$voyage->categorie;
            $pays=CategorieVoyage::find($id_pays);
            $tarif=TarifVoyage::find($id_tarif);
            $success[]=[$user,$voyage,$pays,$tarif,$R,'complet'=>$complet];
        
      }
    }
  
    }
 

 
  return response()->json($success);

}
// get all reservation de voyage de omra
function getallrezervationOmra(){
    $omra=CategorieVoyage::where('type','omra')->first();
    $success=[];
    $voyages=CategorieVoyage::find($omra->id)->voyage;
    $nb=0;
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
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
// nombre de reservation de voyage normale 
function getreservaion(){
    $categorie=CategorieVoyage::all();
    $categorie=$categorie->where('type','normal');
    $table=[];
    $nb=0;
    foreach($categorie as $pays){
    $id_pay=$pays->id;
    $voyages=CategorieVoyage::find($id_pay)->voyage;
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
        foreach($reservation as $res){
            if($res->etat=='en attente'){
                $nb++;
            }
        }
    }
    }
    return $nb;
}
//nombre de reservation de voyage de omra
function getreservaionOmra(){
    $categorie=CategorieVoyage::all();
    $categorie=$categorie->where('type','omra');
    $table=[];
    $nb=0;
    foreach($categorie as $pays){
    $id_pay=$pays->id;
    $voyages=CategorieVoyage::find($id_pay)->voyage;
    foreach($voyages as $voyage){
        $id_voyage=$voyage->id;
        $reservation=Voyage::find($id_voyage)->rservationofonevoyage;
        foreach($reservation as $res){
            if($res->etat=='en attente'){
                $nb++;
            }
        }
    }
    }
    return $nb;
}

}
