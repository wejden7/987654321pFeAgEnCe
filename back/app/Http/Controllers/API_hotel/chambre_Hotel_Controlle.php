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
            'prix1'=>'required',
            'prix2'=>'required',
            'prix3'=>'required',
            'prix4'=>'required',
            'prix5'=>'required',
            'prix6'=>'required',
            'prix7'=>'required',
            'prix8'=>'required',
            'prix9'=>'required',
            'prix10'=>'required',
            'prix11'=>'required',
            'prix12'=>'required',
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
              $tarif->prix=$request->input('prix1');
              $tarif->mois=1;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix2');
              $tarif->mois=2;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix3');
              $tarif->mois=3;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix4');
              $tarif->mois=4;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix5');
              $tarif->mois=5;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix6');
              $tarif->mois=6;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix7');
              $tarif->mois=7;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix8');
              $tarif->mois=8;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix9');
              $tarif->mois=9;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix10');
              $tarif->mois=10;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix11');
              $tarif->mois=11;
              $tarif->save();
        $tarif=new Tarif_chombres();
              $tarif->chambre=$id_chambre;
              $tarif->hotel=$hotel;
              $tarif->prix=$request->input('prix12');
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
              $table1[]=['id'=>$t->id,'prix'=>$t->prix,'mois'=>$mois->nom];
        }
        $table[]=['id'=>$chambre->id,'type'=>$type->nom,'nb'=>$chambre->nb ,'tarif'=>$table1];
      }
      return $table;
  }

  function delete_chambre_of_hotel(Request $request){
        $id=$request->input('id');
        $chambre=chambre::find($id);
        $chambre->delete();
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
      $prix=$request->input('prix');
      $tarif=Tarif_chombres::find($id);
      $tarif->prix=$prix;
      $tarif->save();
      return $tarif;
 }
}
