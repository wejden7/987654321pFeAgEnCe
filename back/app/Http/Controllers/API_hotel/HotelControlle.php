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
            'tel' => 'required',
            'adresse' => 'required',
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
            $tel=$request->input('tel');
            $adresse=$request->input('adresse');
            $hotels=new hotels();
            $hotels->nom=$nom;
            $hotels->ville=$ville;
            $hotels->description=$description;
            $hotels->etoile=$etoile;
            $hotels->adresse=$adresse;
            $hotels->tel=$tel;
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
    function get_hotel_by_id_of_ville(Request $request){
        $ville=$request->input('ville');
        $hotel= ville::find($ville)->hotel;
        $hotel=$hotel->where('visibility',1);
        return $hotel;
    }
    function delite_hotel_by_id(Request $request){
        $id=$request->input('id');
        $hotel=hotels::find($id);
        $name=$hotel->image;
        $image_path = "./images/hotels/hotel/".$name;
        if($hotel!=null){
        if(file_exists($image_path)){
            @unlink($image_path);
           
        }}
      $images=hotels::find($id)->photos_hotel;
        foreach($images as $i){
            $name=$i->nom;
                $image_path = "./images/hotels/hotel/".$name;
                if($i!=null){
                if(file_exists($image_path)){
                    @unlink($image_path);
                   
                }}
        }
      
        $hotel->delete();
        return $hotel;
    }
    function get_all_hotel_a_client(){
        $hotels=hotels::all();
        $table=[];
        foreach($hotels as $hotel){
            if($hotel->visibility==1){
                $ville=ville::find($hotel->ville);
                $current_date_time = Carbon::now()->format('M'); 
                $nmonth = date("m", strtotime($current_date_time));
                $prix=Tarif_chombres::where('hotel',$hotel->id)->get();
                $prix=$prix->where('mois',$nmonth)->first();
                $table[]=['id'=>$hotel->id,'nom'=>$hotel->nom,'image'=>$hotel->image,'ville'=>$ville->nom,'etoile'=>$hotel->etoile,'prix'=>$prix->prixAdulte];
          
            }
     }
        return    $table;
    }
    function get_all_hotel_a_client_of_Carousel(){
        $hotels=hotels::all();
        $tables=[];
        $nb=$hotels->count();
        $c= intval($nb/3) ;
        $d=0;
        for($i=0;$i<$c;$i++){

            for($k=$d;$k<$d+3;$k++){
                if($hotels[$k]->visibility==1){
                $ville=ville::find($hotels[$k]->ville);
               
                $table[]=['i'=>$i, 'id'=>$hotels[$k]->id,'nom'=>$hotels[$k]->nom,'image'=>$hotels[$k]->image,'ville'=>$ville->nom,'etoile'=>$hotels[$k]->etoile];
            }}
            $tables[]=$table;
            $table=[];
            $d=$d+3;
        }
        return $tables;
    }
    function updete_hotel_visible(Request $request){
        $id=$request->input('id');
        $hotel=hotels::find($id);
        if($hotel->visibility==0){
            $hotel->visibility=1;
        }else{
            $hotel->visibility=0;
        }
        $hotel->save();
        return $hotel;
        
    }
    function get_all_hotel_resulta_of_Recherche(Request $request)
{
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
        $nb_personne=0;
   for($l=1;$l<=$nb_chambre;$l++){
    $nb_personne=$nb_personne+$adulte[$l]+$enfant[$l];
   }
        $date=$request->input('date');
        $hotels=ville::find($ville)->hotel;
        $resulta=[];
    foreach($hotels as $hotel){
            $table=[];
            $chambres=hotels::find($hotel->id)->chambre;
           
            foreach($chambres as $chambre){
                $nb_chambre_existe=$chambre->nb;
                $type=type_chambre::find($chambre->type);
                for($i=1;$i<$nb_chambre+1;$i++){
                    $disponibilites=chambre::find($chambre->id)->disponibilite;
                    if($type->nb==(intval($adulte[$i])+intval($enfant[$i]))){
                        if($disponibilites->count()==0&&$nb_chambre_existe>0 ){
                            $sommes=0;
                            for($k=0;$k<$nb_nuit;$k++){
                                $tarif=chambre::find($chambre->id)->tarif;
                                $month= date("m", strtotime($date.'+'.$k.'days'));
                                $prix=$tarif->where('mois',$month)->first();
                                $sommes=$prix->prixAdulte+$sommes;
                            }
                            $sommes=$sommes*$type->nb;
                           
                            $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb_chambre_existe,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i])];
                           $nb_chambre_existe=$nb_chambre_existe-1;
                            if($nb_chambre_existe==0){
                            break;}
                        }else{
                            $nb=$nb_chambre_existe;
                            for($k=0;$k<$nb_nuit;$k++){
                               $d= date("Y-m-d", strtotime($date.'+'.$k.'days'));
                               $dispo=1;
                              
                               foreach($disponibilites as $disponibilite){
                                   
                                   if($disponibilite->date==$d&&$disponibilite->nb>=$nb_chambre_existe){
                                       $dispo=0;
                                        break;
                                   }elseif ($disponibilite->date==$d) {
                                       if($nb>$nb_chambre_existe-$disponibilite->nb){
                                        $nb=$nb_chambre_existe-$disponibilite->nb;
                                       }
                                       

                                       if($nb==0){
                                       break;
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
                                        $sommes=$prix->prixAdulte+$sommes;
                                    }
                                    $sommes=$sommes*$type->nb;
                                 $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i])];
                                 $nb_chambre_existe=$nb_chambre_existe-1;
                                }
                             
                               }
                        }
                    }
                }
            }
           if(count($table)<$nb_chambre&&count($table)!=0){
               $count=count($table);
               for($i=1;$i<=$count;$i++){
                if (array_key_exists($i, $table)) {
                    
                $w=count($table[$i]);
                $c=0;
                for($n=0;$n<$w;$n++){
                  $c= intval($table[$i][$n]['nbdesbo'])+$c;
                }
                 if($c>=($nb_chambre-$count)){
                    $m=count($table);
                    $x=$nb_chambre-$m;
                    for($k=1;$k<=$x;$k++){
                        if(count($table[$i])>1){
                            if(($adulte[$i]+$enfant[$i])==($adulte[$m+$k]+$enfant[$m+$k])){
                                $table[$m+$k][0]=$table[$i][0];
                            
                                $d=count($table[$i]);
                                for($n=1;$n<$d;$n++){
                                    $table[$i][$n-1]=$table[$i][$n];
                                }
                             
                            unset( $table[$i][$d-1]);
    
                            }
                        }
                       
                       
                    }
                 }

               }
                
            } 
            }



            if(count($table)==$nb_chambre){
               
                $p_hotel=hotels::find($hotel->id)->ponsion_hotel;
                $p_table=[];
                foreach($p_hotel as $p){
                    $pension=pension::find($p->pension);
                    $icon=icone::find($pension->icon);
                    $p_table[]=['id'=>$p->id,'titre'=>$pension->titre,'prixAdulte'=>$p->prixAdulte,'icon'=>$icon->nom];
                }
             
                $resulta[]=['id'=>$hotel->id,'nbchambre'=>$nb_chambre,'nom'=>$hotel->nom,'description'=>$hotel->description,'etoile'=>$hotel->etoile,'dateToIn'=>$date,'nuit'=>$nb_nuit,'image'=>$hotel->image,'chambres'=>$table,'pension'=>$p_table,'nbPersonne'=>$nb_personne];
            }
        }
       return  response()->json($resulta);
}
function get_hotel_resulta_of_Recherche(Request $request)
{
    $id=$request->input('id');
    $date=$request->input('date');
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
    $nb_personne=0;
    for($l=1;$l<=$nb_chambre;$l++){
     $nb_personne=$nb_personne+$adulte[$l]+$enfant[$l];
}
    
   
    $resulta=[];
        $table=[];
        $hotel=hotels::find($id);
        $chambres=hotels::find($id)->chambre;
       
        foreach($chambres as $chambre){
            $nb_chambre_existe=$chambre->nb;
            $type=type_chambre::find($chambre->type);
            for($i=1;$i<$nb_chambre+1;$i++){
                $disponibilites=chambre::find($chambre->id)->disponibilite;
                if($type->nb==(intval($adulte[$i])+intval($enfant[$i]))){
                    if($disponibilites->count()==0&&$nb_chambre_existe>0 ){
                        $sommes=0;
                        for($k=0;$k<$nb_nuit;$k++){
                            $tarif=chambre::find($chambre->id)->tarif;
                            $month= date("m", strtotime($date.'+'.$k.'days'));
                            $prix=$tarif->where('mois',$month)->first();
                            $sommes=$prix->prix+$sommes;
                        }
                        $sommes=$sommes*$type->nb;
                       
                        $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb_chambre_existe,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i])];
                       $nb_chambre_existe=$nb_chambre_existe-1;
                        if($nb_chambre_existe==0){
                        break;}
                    }else{
                        $nb=$nb_chambre_existe;
                        for($k=0;$k<$nb_nuit;$k++){
                           $d= date("Y-m-d", strtotime($date.'+'.$k.'days'));
                           $dispo=1;
                          
                           foreach($disponibilites as $disponibilite){
                               
                               if($disponibilite->date==$d&&$disponibilite->nb>=$nb_chambre_existe){
                                   $dispo=0;
                                    break;
                               }elseif ($disponibilite->date==$d) {
                                   if($nb>$nb_chambre_existe-$disponibilite->nb){
                                    $nb=$nb_chambre_existe-$disponibilite->nb;
                                   }
                                   

                                   if($nb==0){
                                   break;
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
                             $nb_chambre_existe=$nb_chambre_existe-1;
                            }
                         
                           }
                    }
                }
            }
        }
       if(count($table)<$nb_chambre&&count($table)!=0){
           $count=count($table);
           for($i=1;$i<=$count;$i++){
            if (array_key_exists($i, $table)) {
                
            $w=count($table[$i]);
            $c=0;
            for($n=0;$n<$w;$n++){
              $c= intval($table[$i][$n]['nbdesbo'])+$c;
            }
             if($c>=($nb_chambre-$count)){
                $m=count($table);
                $x=$nb_chambre-$m;
                for($k=1;$k<=$x;$k++){
                    if(count($table[$i])>1){
                        if(($adulte[$i]+$enfant[$i])==($adulte[$m+$k]+$enfant[$m+$k])){
                            $table[$m+$k][0]=$table[$i][0];
                        
                            $d=count($table[$i]);
                            for($n=1;$n<$d;$n++){
                                $table[$i][$n-1]=$table[$i][$n];
                            }
                         
                        unset( $table[$i][$d-1]);

                        }
                    }
                   
                   
                }
             }

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
         
            $resulta[]=['id'=>$hotel->id,'nbchambre'=>$nb_chambre,'nom'=>$hotel->nom,'description'=>$hotel->description,'etoile'=>$hotel->etoile,'dateToIn'=>$date,'nuit'=>$nb_nuit,'image'=>$hotel->image,'chambres'=>$table,'pension'=>$p_table,'nbPersonne'=>$nb_personne];
        }
    
   return  response()->json($resulta[0]);
    }


}

