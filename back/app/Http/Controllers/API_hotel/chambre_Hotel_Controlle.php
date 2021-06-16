<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\chambre;
use App\hotels;
use App\type_chambre;
use App\Tarif_chombres;
use App\mois;
use Validator;
class chambre_Hotel_Controlle extends Controller
{
    function create_chombre_of_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'type' => 'required',
            'hotel' => 'required',
            'nb' => 'required',
            'prixAdulte1'=>'required',
            'prixAdulte2'=>'required',
            'prixAdulte3'=>'required',
            'prixAdulte4'=>'required',
            'prixAdulte5'=>'required',
            'prixAdulte6'=>'required',
            'prixAdulte7'=>'required',
            'prixAdulte8'=>'required',
            'prixAdulte9'=>'required',
            'prixAdulte10'=>'required',
            'prixAdulte11'=>'required',
            'prixAdulte12'=>'required',
            'prixEnfant1'=>'required',
            'prixEnfant2'=>'required',
            'prixEnfant3'=>'required',
            'prixEnfant4'=>'required',
            'prixEnfant5'=>'required',
            'prixEnfant6'=>'required',
            'prixEnfant7'=>'required',
            'prixEnfant8'=>'required',
            'prixEnfant9'=>'required',
            'prixEnfant10'=>'required',
            'prixEnfant11'=>'required',
            'prixEnfant12'=>'required',
            'prixBebe1'=>'required',
            'prixBebe2'=>'required',
            'prixBebe3'=>'required',
            'prixBebe4'=>'required',
            'prixBebe5'=>'required',
            'prixBebe6'=>'required',
            'prixBebe7'=>'required',
            'prixBebe8'=>'required',
            'prixBebe9'=>'required',
            'prixBebe10'=>'required',
            'prixBebe11'=>'required',
            'prixBebe12'=>'required',
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
        $id_chambre=$chambre->id;
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte1');
              $tarif->prixEnfant=$request->input('prixEnfant1');
              $tarif->prixBebe=$request->input('prixBebe1');
              $tarif->mois=1;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte2');
              $tarif->prixEnfant=$request->input('prixEnfant2');
              $tarif->prixBebe=$request->input('prixBebe2');
              $tarif->mois=2;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte3');
              $tarif->prixEnfant=$request->input('prixEnfant3');
              $tarif->prixBebe=$request->input('prixBebe3');
              $tarif->mois=3;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte4');
              $tarif->prixEnfant=$request->input('prixEnfant4');
              $tarif->prixBebe=$request->input('prixBebe4');
              $tarif->mois=4;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte5');
              $tarif->prixEnfant=$request->input('prixEnfant5');
              $tarif->prixBebe=$request->input('prixBebe5');
              $tarif->mois=5;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte6');
              $tarif->prixEnfant=$request->input('prixEnfant6');
              $tarif->prixBebe=$request->input('prixBebe6');
              $tarif->mois=6;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte7');
              $tarif->prixEnfant=$request->input('prixEnfant7');
              $tarif->prixBebe=$request->input('prixBebe7');
              $tarif->mois=7;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte8');
              $tarif->prixEnfant=$request->input('prixEnfant8');
              $tarif->prixBebe=$request->input('prixBebe8');
              $tarif->mois=8;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte9');
              $tarif->prixEnfant=$request->input('prixEnfant9');
              $tarif->prixBebe=$request->input('prixBebe9');
              $tarif->mois=9;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte10');
              $tarif->prixEnfant=$request->input('prixEnfant10');
              $tarif->prixBebe=$request->input('prixBebe10');
              $tarif->mois=10;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte11');
              $tarif->prixEnfant=$request->input('prixEnfant11');
              $tarif->prixBebe=$request->input('prixBebe10');
              $tarif->mois=11;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prixAdulte=$request->input('prixAdulte12');
              $tarif->prixEnfant=$request->input('prixEnfant12');
              $tarif->prixBebe=$request->input('prixBebe12');
              $tarif->mois=12;
              $tarif->save();

    }
    
    
  function  get_type_chambre_of_hotel(Request $request){
        $id=$request->input('id');
      $chambres=hotels::find($id)->chambre;
     
      $table=[];
      foreach($chambres as $chambre){
            $tarif=chambre::find($chambre->id)->tarif;
        $id_type=$chambre->type;
        $type=type_chambre::find($id_type);
        $table1=[];
        foreach($tarif as $t){
              $mois=mois::find($t->mois);
              $table1[]=['id'=>$t->id,'prixAdulte'=>$t->prixAdulte,'prixEnfant'=>$t->prixEnfant,'prixBebe'=>$t->prixBebe,'mois'=>$mois->nom];
        }
        $table[]=['id'=>$chambre->id,'type'=>$type->nom,'nb'=>$chambre->nb ,'tarif'=>$table1];
      }
      return $table;
  }

  function delete_chambre_of_hotel(Request $request){
        $id=$request->input('id');
        $chambre=chambre::find($id);
        $chambre->delete();
        $chambres=hotels::find($chambre->hotel)->chambre;
        if($chambres->count()==0){
            $hotel=hotels::find($chambre->hotel);
            if($hotel->visibility==1){
                  $hotel->visibility=0;
                  $hotel->save();
              }
              $AlaUnes=hotels::find($chambre->hotel)->ALaUne_Hotel;
              if($AlaUnes->count()==1){
                  $AlaUnes[0]->delete();
              }
             
        }
        return $chambre;
  }
 function updete_chombre_of_hotel(Request $request){
      $id=$request->input('id');
      $nb=$request->input('nombre');
      $chambre=chambre::find($id);
      $chambre->nb=$nb;
      $chambre->save();
      return $chambre;
 }
 function updete_prix_of_chambre(Request $request){
      $id=$request->input('id');
      $prixAdulte=$request->input('prixAdulte');
      $prixEnfant=$request->input('prixEnfant');
      $prixBebe=$request->input('prixBebe');
      $tarif=Tarif_chombres::find($id);
      $tarif->prixAdulte=$prixAdulte;
      $tarif->prixEnfant=$prixEnfant;
      $tarif->prixBebe=$prixBebe;
      $tarif->save();
      return $tarif;
 }
}
