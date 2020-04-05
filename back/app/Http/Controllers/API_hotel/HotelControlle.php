<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\hotels;
use App\ville;
use Carbon\Carbon;
use App\Tarif_chombres;
use App\type_chambre;
use App\chambre;
use App\pension;
use App\icone;
use Validator;
class HotelControlle extends Controller
{
    function create_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
            'ville' => 'required',
            'description' => 'required',
            'etoile' => 'required',
            'image' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        $existe=hotels::where('nom',$request->input('nom'));
        $existe=$existe->where('ville',$request->input('ville'));
        if($existe->count()<1){
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
            $nom=$request->input('nom');
            $ville=$request->input('ville');
            $description=$request->input('description');
            $etoile=$request->input('etoile');
            $hotels=new hotels();
            $hotels->nom=$nom;
            $hotels->ville=$ville;
            $hotels->description=$description;
            $hotels->etoile=$etoile;
            $hotels->image=$name;
            $destinationPath = public_path('/images/hotels/hotel');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
            $hotels->save();
            return $hotels;
            }
        }
        return response()->json(['error'=>'existe'], 500); 
    }
    function get_all_hotel(Request $request){
        return hotels::all();
    }
    function get_hotel_by_id(Request $request){
        $id=$request->input('id');
        return hotels::find($id);
    }
    function delite_hotel_by_id(Request $request){
        $id=$request->input('id');
        $hotel=hotels::find($id);
        $hotel->delete();
        return $hotel;
    }
    function get_all_hotel_a_client(){
        $hotels=hotels::all();
        foreach($hotels as $hotel){
            $ville=ville::find($hotel->ville);
            $current_date_time = Carbon::now()->format('M'); 
            $nmonth = date("m", strtotime($current_date_time));
            $prix=Tarif_chombres::where('hotel',$hotel->id)->get();
            $prix=$prix->where('mois',$nmonth)->first();
            $table[]=['id'=>$hotel->id,'nom'=>$hotel->nom,'image'=>$hotel->image,'ville'=>$ville->nom,'etoile'=>$hotel->etoile,'prix'=>$prix->prix];
        }
        return    $table;
    }
    function get_all_hotel_a_client_of_Carousel(){
        $hotels=hotels::all();
        $tables=[];
        for($i=0;$i<3;$i++){
            $table=[];
            foreach($hotels as $hotel){
                $ville=ville::find($hotel->ville);
                $current_date_time = Carbon::now()->format('M'); 
                $nmonth = date("m", strtotime($current_date_time));
                $prix=Tarif_chombres::where('hotel',$hotel->id)->get();
                $prix=$prix->where('mois',$nmonth)->first();
                $table[]=['i'=>$i, 'id'=>$hotel->id,'nom'=>$hotel->nom,'image'=>$hotel->image,'ville'=>$ville->nom,'etoile'=>$hotel->etoile,'prix'=>$prix->prix];
            }
            $tables[]=$table;
        }
        return $tables;
    }
    function get_all_hotel_resulta_of_Recherche(Request $request){
        $ville=$request->input('ville');
        $nb_chambre=$request->input('nb_chambre');
        $nb_nuit=$request->input('nb_nuit');
        $enfant[1]=$request->input('number_enfants1');
        $adulte[1]=$request->input('number_adulte1');
        $enfant[2]=$request->input('number_enfants2');
        $adulte[2]=$request->input('number_adulte2');
        $enfant[3]=$request->input('number_enfants3');
        $adulte[3]=$request->input('number_adulte3');
        $enfant[4]=$request->input('number_enfants4');
        $adulte[4]=$request->input('number_adulte4');
        $enfant[5]=$request->input('number_enfants5');
        $adulte[5]=$request->input('number_adulte5');
   
        $date=$request->input('date');
        $hotels=ville::find($ville)->hotel;
        $resulta=[];
    foreach($hotels as $hotel){
            $table=[];
            $chambres=hotels::find($hotel->id)->chambre;
           
            foreach($chambres as $chambre){
                $type=type_chambre::find($chambre->type);
                for($i=1;$i<$nb_chambre+1;$i++){
                    $disponibilites=chambre::find($chambre->id)->disponibilite;
                    if($type->nb==(intval($adulte[$i])+intval($enfant[$i]))){
                        if($disponibilites->count()==0 ){
                            $sommes=0;
                            for($k=0;$k<$nb_nuit;$k++){
                                $tarif=chambre::find($chambre->id)->tarif;
                                $month= date("m", strtotime($date.'+'.$k.'days'));
                                $prix=$tarif->where('mois',$month)->first();
                                $sommes=$prix->prix+$sommes;
                            }
                            $sommes=$sommes*$type->nb;
                           
                            $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$chambre->nb,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i])];
                        }else{
                            $nb=$chambre->nb;
                            for($k=0;$k<$nb_nuit;$k++){
                               $d= date("Y-m-d", strtotime($date.'+'.$k.'days'));
                               $dispo=1;
                               foreach($disponibilites as $disponibilite){
                                   
                                   if($disponibilite->date==$d&&$disponibilite->nb>=$chambre->nb){
                                       $dispo=0;
                                        break;
                                   }elseif ($disponibilite->date==$d) {
                                       if(($chambre->nb-$disponibilite->nb)<$nb){
                                            $nb=$chambre->nb-$disponibilite->nb;
                                    }
                                  }
                               }
                               if($dispo==0){
                               break;
                               }
                            }
                            if($dispo==1){
                                
                                if($nb>0){
                                        $sommes=0;
                                    for($k=0;$k<$nb_nuit;$k++){
                                        $tarif=chambre::find($chambre->id)->tarif;
                                        $month= date("m", strtotime($date.'+'.$k.'days'));
                                        $prix=$tarif->where('mois',$month)->first();
                                        $sommes=$prix->prix+$sommes;
                                    }
                                    $sommes=$sommes*$type->nb;
                                 $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i])];
                                }
                                if($nb==$i){
                                break;
                           }
                               }
                        }
                    }
                }
            }
            if(count($table)<$nb_chambre){
                $w=count($table[1]);
                $c=0;
                for($n=0;$n<$w;$n++){
                  $c= intval($table[1][$n]['nbdesbo'])+$c;
                }
                 if($c>=$nb_chambre){
                    $m=count($table);
                    $x=$nb_chambre-$m;
                    for($k=1;$k<$x+1;$k++){
                        $table[$m+$k][0]=$table[$k][0];
                        
                        $d=count($table[$k]);
                        for($n=1;$n<$d;$n++){
                            $table[$k][$n-1]=$table[$k][$n];
                        }
                     
                    unset( $table[$k][$d-1]);
                    }
                 }
                    
            }



            if(count($table)==$nb_chambre){
               
                $p_hotel=hotels::find($hotel->id)->ponsion_hotel;
                $p_table=[];
                foreach($p_hotel as $p){
                    $pension=pension::find($p->pension);
                    $icon=icone::find($pension->icon);
                    $p_table[]=['id'=>$p->id,'titre'=>$pension->titre,'prix'=>$p->prix,'icon'=>$icon->nom];
                }
             
                $resulta[]=['id'=>$hotel->id,'nbchambre'=>$nb_chambre,'nom'=>$hotel->nom,'description'=>$hotel->description,'etoile'=>$hotel->etoile,'nuit'=>$nb_nuit,'image'=>$hotel->image,'chambres'=>$table,'pension'=>$p_table];
            }
        }
       return  response()->json($resulta);
    }
}
