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
    function updateimagehotel(Request $request){
        $id=$request->input('id');
        $hotels=hotels::find($id);
        if ($request->hasFile('image')) {
            $name=$hotels->image;
            $image_path = "./images/hotels/hotel/".$name;
            if($hotels!=null){
            if(file_exists($image_path)){
                @unlink($image_path);
               
            }}
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            $hotels->image=$name;
            $destinationPath = public_path('/images/hotels/hotel');
            $image->move($destinationPath, $name);
            $hotels->save();
        }
        return $hotels;
    }
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
    function update_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
            'ville' => 'required',
            'tel' => 'required',
            'adresse' => 'required',
            'description' => 'required',
            'etoile' => 'required',
            'id' => 'required',
           ]);
        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
            $id=$request->input('id');
            $nom=$request->input('nom');
            $ville=$request->input('ville');
            $description=$request->input('description');
            $etoile=$request->input('etoile');
            $tel=$request->input('tel');
            $adresse=$request->input('adresse');
            $hotels=hotels::find($id);
            $hotels->nom=$nom;
            $hotels->ville=$ville;
            $hotels->description=$description;
            $hotels->etoile=$etoile;
            $hotels->adresse=$adresse;
            $hotels->tel=$tel;
            $hotels->save();
            return $hotels;
            
       
    }
    function get_all_hotel(Request $request){
        $hotels=hotels::all();
        foreach($hotels as $hotel){
        $ville=ville::find($hotel->ville);
        $hotel->ville=$ville->nom;
        $hotel->villeid=$ville->id;
        $AlaUne=hotels::find($hotel->id)->ALaUne_Hotel;
            if($AlaUne->count()==1){
                $hotel->alaune=true;
            }else{
                $hotel->alaune=false;
            }
        }
        return $hotels;
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
                $promo=false;
                $titrepromo="";
                $ville=ville::find($hotel->ville);
                $promotion=hotels::find($hotel->id)->promotionHotel->first();
                $newDate= date("Y-m-d");
              
                if($promotion!=null){
                    $EndDate= date("Y-m-d", strtotime($promotion->dateFin));
                    if($newDate<=$EndDate){
                        $promo=true;
                        $titrepromo=$promotion->titre;
                    }
                    
                }
                $current_date_time = Carbon::now()->format('M'); 
                $nmonth = date("m", strtotime($current_date_time));
                $prix=Tarif_chombres::where('hotel',$hotel->id)->get();
                $prix=$prix->where('mois',$nmonth)->first();
                $table[]=['id'=>$hotel->id,'nom'=>$hotel->nom,'image'=>$hotel->image,'ville'=>$ville->nom,'etoile'=>$hotel->etoile,'prix'=>$prix->prixAdulte,'promos'=>$promo,'titrepromos'=>$titrepromo];
          
            }
     }
        return $table;
    }
    function get_all_hotel_a_client_of_Carousel(){
        $hotels=hotels::where('etoile',5)->get();
        $tables=[];
        $nb=$hotels->count();
        
        $d=0;
        for($i=0;$i<$nb;$i++){
            for($k=$d;$k<$d+3;$k++){
                if($k>=$nb){
                    if($hotels[$k-$nb]->visibility==1){
                        $ville=ville::find($hotels[$k-$nb]->ville);
                       
                        $table[]=['i'=>$i, 'id'=>$hotels[$k-$nb]->id,'nom'=>$hotels[$k-$nb]->nom,'image'=>$hotels[$k-$nb]->image,'ville'=>$ville->nom,'etoile'=>$hotels[$k-$nb]->etoile];
                    }
                }else{
                    if($hotels[$k]->visibility==1){
                        $ville=ville::find($hotels[$k]->ville);
                       
                        $table[]=['i'=>$i, 'id'=>$hotels[$k]->id,'nom'=>$hotels[$k]->nom,'image'=>$hotels[$k]->image,'ville'=>$ville->nom,'etoile'=>$hotels[$k]->etoile];
                    }
                }
             
        }
            $tables[]=$table;
            $table=[];
            $d=$d+1;
        }
        
        return $tables;
    }
    function updete_hotel_visible(Request $request){
        $id=$request->input('id');
        $hotel=hotels::find($id);
        $chambres=hotels::find($hotel->id)->chambre;
        $ageMaxs=hotels::find($hotel->id)->AgeMax;
        $p_hotel=hotels::find($hotel->id)->ponsion_hotel;
        if($ageMaxs->count()==2&&$chambres->count()>0&&$p_hotel->count()>0){
            if($hotel->visibility==0){
                $hotel->visibility=1;
            }else{
                $hotel->visibility=0;
            }
            $hotel->save();
            return $hotel;
        }else{
            return response()->json(['error'=>'invalide'], 401); 
        }
        
        
    }
    function get_all_hotel_resulta_of_Recherche(Request $request){
            $ville=$request->input('ville');
            $hotels=ville::find($ville)->hotel;
            $resulta=[];
            foreach($hotels as $hotel){ 
                $R=$this->get_reselte_de_un_hotel($request,$hotel->id);
                if(count($R )>0){
                    $resulta[]=$R;
                }
            }
            return  $resulta;
    }
    function get_hotel_resulta_of_Recherche(Request $request){
        $id=$request->input('id');
        return  $this->get_reselte_de_un_hotel($request,$id);
    }
    function get_chambre_despo_de_un_hotel($chambres,$nb_chambre,$adulte,$enfant,$bebe,$nb_nuit,$date){
        $table=[];
        foreach($chambres as $chambre){
            $nb_chambre_existe=$chambre->nb;
            $type=type_chambre::find($chambre->type);
            for($i=1;$i<$nb_chambre+1;$i++){
                $disponibilites=chambre::find($chambre->id)->disponibilite;
                if(($type->nb==(intval($adulte[$i])+intval($enfant[$i])))&&(intval($bebe[$i])<=2)){
                    if($disponibilites->count()==0&&$nb_chambre_existe>0 ){
                        $sommes=0;
                        for($k=0;$k<$nb_nuit;$k++){
                            $tarif=chambre::find($chambre->id)->tarif;
                            $month= date("m", strtotime($date.'+'.$k.'days'));
                            $prix=$tarif->where('mois',$month)->first();
                            $sommes=($prix->prixAdulte*$adulte[$i])+($prix->prixEnfant*$enfant[$i])+($prix->prixBebe*$bebe[$i])+$sommes;
                        }
                    
                    
                        $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb_chambre_existe,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i]),'bebe'=>intval($bebe[$i])];
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
                                    $sommes=($prix->prixAdulte*$adulte[$i])+($prix->prixEnfant*$enfant[$i])+($prix->prixBebe*$bebe[$i])+$sommes;
                                }
                                
                            $table[$i][]=['id'=>$chambre->id,'hotel'=>$chambre->hotel,'type'=>$type->nom,'nbdesbo'=>$nb,"sommes"=>$sommes,"adulte"=>intval($adulte[$i]),"enfant"=>intval($enfant[$i]),'bebe'=>intval($bebe[$i])];
                            $nb_chambre_existe=$nb_chambre_existe-1;
                            }
                        
                        }
                    }
                }
            }
        }
        return $table;
    }
    function test_et_Modifier_chambre_despo_de_un_hotel($table,$nb_chambre,$enfant,$adulte){
            if(count($table)<$nb_chambre&&count($table)!=0){
                    $count=count($table);
                    for($i=1;$i<=$count;$i++){
                    if (array_key_exists($i, $table)) {
                        
                    $w=count($table[$i]);
                    $c=0;
                    for($n=0;$n<$w;$n++){
                    $c= intval($table[$i][$n]['nbdesbo'])+$c;//despo de chambre i
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

            return $table;
    }
    function get_reslulta_final_de_chambres_de_un_hotel($table,$nb_chambre,$hotel,$date,$nb_nuit,$nb_Adulte,$nb_Enfant,$nb_Bebe,$request){
        $resulta=[];
        if(count($table)==$nb_chambre){
            $p_hotel=hotels::find($hotel->id)->ponsion_hotel;
            $p_table=[];
            foreach($p_hotel as $p){
                $pension=pension::find($p->pension);
                $icon=icone::find($pension->icon);
                $p_table[]=['id'=>$p->id,'titre'=>$pension->titre,'prixAdulte'=>$p->prixAdulte,'prixEnfant'=>$p->prixEnfant,'prixBebe'=>$p->prixBebe,'icon'=>$icon->nom];
            }
            $promo=$this->add_Promot($request,$hotel->id,$table,$nb_Adulte,$nb_Enfant,$nb_Bebe);
            $resulta=['id'=>$hotel->id,'nbchambre'=>$nb_chambre,'nom'=>$hotel->nom,'description'=>$hotel->description,'etoile'=>$hotel->etoile,'dateToIn'=>$date,'nuit'=>$nb_nuit,'image'=>$hotel->image,'chambres'=>$table,'pension'=>$p_table,'nbAdulte'=>$nb_Adulte,'nbEnfant'=>$nb_Enfant,'nbbebe'=>$nb_Bebe,'promot'=>$promo];
        }
        return $resulta;
    }
    function get_reselte_de_un_hotel($request,$id){
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
        $hotel=hotels::find($id);
        $chambres=hotels::find($id)->chambre;
        $ageMaxs=hotels::find($hotel->id)->AgeMax;
        for($i=1;$i<=$nb_chambre;$i++){
            $bebe[$i]=0;
            $nb=$enfant[$i];
            for($k=1;$k<=$nb;$k++){
                if($ageMaxs[0]->age < $request->input('age_enfants'.$i.''.$k)){
                    $enfant[$i]--;
                    $adulte[$i]++;
                }else if($ageMaxs[0]->age>=intval($request->input('age_enfants'.$i."".$k))){
                    if($ageMaxs[1]->age>=$request->input('age_enfants'.$i."".$k)){
                        $enfant[$i]--;
                        $bebe[$i]++;
                    }
                }
              
            }
            
        }
        $nb_Adulte=0;
        $nb_Enfant=0;
        $nb_Bebe=0;
        for($l=1;$l<=$nb_chambre;$l++){
             $nb_Adulte=$nb_Adulte+$adulte[$l];
             $nb_Enfant=$nb_Enfant+$enfant[$l];
             $nb_Bebe=$nb_Bebe+$bebe[$l];
        }
       
        $table=$this->get_chambre_despo_de_un_hotel($chambres,$nb_chambre,$adulte,$enfant,$bebe,$nb_nuit,$date);
        $table=$this->test_et_Modifier_chambre_despo_de_un_hotel($table,$nb_chambre,$enfant,$adulte);
        $resulta=$this->get_reslulta_final_de_chambres_de_un_hotel($table,$nb_chambre,$hotel,$date,$nb_nuit,$nb_Adulte,$nb_Enfant,$nb_Bebe,$request);
        return  $resulta;
    }
    function   add_Promot($request,$id,$table,$nb_Adulte,$nb_Enfant,$nb_Bebe){
        $promotions=hotels::find($id)->promotionHotel;
        $resulta=[];
        $resulta['bebe']=[];
        $resulta['enfant']=[];
        $resulta['sejour']=[];
        if($promotions->count()>0){
            foreach($promotions as $promot){
                
                if($promot->type=="bebe"){
                   $r=$this->promotbebe($request,$id,$promot,$table);
                  
                    $resulta['bebe']=$r;
                }
                if($promot->type=='enfant'){
                    $resulta['enfant']=$this->promotenfant($request,$id,$promot,$table);
                
                }
                if($promot->type=='sejour'){
                    $resulta['sejour']=$this->promotsejour($request,$id,$promot,$table,$nb_Adulte,$nb_Enfant,$nb_Bebe);
                }
            }}
            return $resulta;
    }
function  promotbebe($request,$id,$promot,$table){
  
       $date=$request->input('date');
       $nb_chambre=$request->input('nb_chambre');
       $nb_nuit=$request->input('nb_nuit');
       $t=[];
            for($i=1;$i<=$nb_chambre;$i++){
                $bebe=0;
                $nb=0;
                $nb=intval($request->input('number_enfants'.$i));
                
                for($k=1;$k<=$nb;$k++){
                        if($promot->ageBebeMax>=intval($request->input('age_enfants'.$i."".$k))){
                            $bebe++;
                        }
                }
                $s=[];
                if(($bebe>=$promot->bebeMin)&&($table[$i][0]['adulte']>=$promot->adulteMin)){
                    for($x=0;$x<count($table[$i]);$x++){
                        $sommes=0;
                      for($k=0;$k<$nb_nuit;$k++){
                            $tarif=chambre::find($table[$i][$x]['id'])->tarif;
                            $month= date("m", strtotime($date.'+'.$k.'days'));
                            $prix=$tarif->where('mois',$month)->first();
                            $sommes=($prix->prixBebe)+$sommes;
                        }
                        $s[$x]=["type"=>'bebe','porsontage'=>$promot->pourcentage,"sommes"=>$sommes*$promot->pourcentage/100,'i'=>$i,'x'=>$x,'nb'=>$nb,'$bebe'=>$bebe,'bebemin'=>$promot->bebeMin,'titre'=>$promot->titre];
                    }
                    }else{
                        for($x=0;$x<count($table[$i]);$x++){
                            $s[$x]=["type"=>'bebe','porsontage'=>0,"sommes"=>0,'i'=>$i,'x'=>$x,'nb'=>$nb,'$bebe'=>$bebe,'bebemin'=>$promot->bebeMin];
                        }
                    }
            
                $t[$i]=$s;
            
           
        }
           return $t;
}
function  promotenfant($request,$id,$promot,$table){
    $ageMaxs=hotels::find($id)->AgeMax;
    $date=$request->input('date');
    $nb_chambre=$request->input('nb_chambre');
    $nb_nuit=$request->input('nb_nuit');
    $t=[];
         for($i=1;$i<=$nb_chambre;$i++){
             $enfant=0;
             $nb=intval($request->input('number_enfants'.$i));
             for($k=1;$k<=$nb;$k++){
                     if($promot->ageEnfantMax>=intval($request->input('age_enfants'.$i."".$k))&&$ageMaxs[1]->age<intval($request->input('age_enfants'.$i."".$k))){
                         $enfant++;
                     }
             }
             $s=[];
             if(($enfant>=$promot->enfantMin)&&($table[$i][0]['adulte']>=$promot->adulteMin)){
                 for($x=0;$x<count($table[$i]);$x++){
                     $sommes=0;
                   for($k=0;$k<$nb_nuit;$k++){
                         $tarif=chambre::find($table[$i][$x]['id'])->tarif;
                         $month= date("m", strtotime($date.'+'.$k.'days'));
                         $prix=$tarif->where('mois',$month)->first();
                         $sommes=($prix->prixEnfant)+$sommes;
                     }
                     $s[$x]=["type"=>'enfant','porsontage'=>$promot->pourcentage,"sommes"=>$sommes*$promot->pourcentage/100,'titre'=>$promot->titre];
                 }
                 }else{
                    for($x=0;$x<count($table[$i]);$x++){
                    $s[$x]=["type"=>'enfant','porsontage'=>0,"sommes"=>0];
                    }
                 }
        $t[$i]=$s;
     }
        return $t ;
}
function promotsejour($request,$id,$promot,$table,$nb_Adulte,$nb_Enfant,$nb_Bebe){
        $date=$request->input('date');
        $nb_chambre=$request->input('nb_chambre');
        $nb_nuit=$request->input('nb_nuit');
    if((intval($nb_nuit)>=$promot->nbnuit)&&($promot->adulteMin<=$nb_Adulte)&&($promot->enfantMin<=$nb_Enfant)&&($promot->bebeMin<=$nb_Bebe)){
        $s=["type"=>'sejour','porsontage'=>$promot->pourcentage,'titre'=>$promot->titre];
    }else{
        $s=["type"=>'sejour','porsontage'=>0];

    }
    return $s;
}
}

