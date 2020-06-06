<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\reservation_hotel;
use App\chambre_reserver;
use App\chambre;
use App\disponibilite;
use App\ponsion_hotel;
use App\pension;
use App\hotels;
use App\type_chambre;
class reservationHotelControlle extends Controller
{ 
    
    function save_chambre_reserve ($request,$reservation){
                $nbchambre=$request->input('nbchambre');
                for($i=1;$i<=$nbchambre;$i++){
                    $chambre_reserver=new chambre_reserver();
                    $chambre=$request->input('chambre'.$i);
                    $nbadult=$request->input('chambreadulte'.$i);
                    $nbenfant=$request->input('chambreenfant'.$i);
                    $nbbebe=$request->input('chambrebebe'.$i);
                    $chambre_reserver->reservation=$reservation->id;
                    $chambre_reserver->chambre=$chambre;
                    $chambre_reserver->nb_enfant=$nbenfant;
                    $chambre_reserver->nb_adulte=$nbadult;
                    $chambre_reserver->nb_bebe=$nbbebe;
                    $chambre_reserver->save();
                    }

    } 
    function reservationHotel(Request $request){
        if($this->test_disponibilite_avant($request)){
            $id_user=$request->input('id_user');
            $hotel=$request->input('hotel');
            $pension=$request->input('pension');
            $date=$request->input('date');
            $nuit=$request->input('nuit');
            $prix=$request->input('prix');
            $nbchambre=$request->input('nbchambre');
            $reservation=new reservation_hotel();
            $reservation->user=$id_user;
            $reservation->pension=$pension;
            $reservation->hotel=$hotel;
            $reservation->date_in=$date;
            $reservation->date_out= date('Y-m-d',strtotime($date.'+'.$nuit.'days'));
            $reservation->prix=$prix;
            $reservation->save();
            $this->save_chambre_reserve($request,$reservation);
            $chambres=[];
            $chambres_reserves=reservation_hotel::find($reservation->id)->chambre_reserver;
            foreach($chambres_reserves as $chambres_reserve){
                $chambre=chambre::find($chambres_reserve->chambre);
                $type=type_chambre::find($chambre->type);
                $chambres[]=['adulte'=>$chambres_reserve->nb_adulte,'enfant'=>$chambres_reserve->nb_enfant,'bebe'=>$chambres_reserve->nb_bebe,'type'=>$type->nom];
            }
            $pension_hotel=ponsion_hotel::find($reservation->pension);
            $pension=pension::find($pension_hotel->pension);
            $hotel=hotels::find($reservation->hotel);
            $table=["pension"=>$pension,'hotel'=>$hotel,'reservation'=>$reservation,'chombres'=>$chambres,'nuit'=>$nuit];
            return $table;
        }else{
              return [];
             }
    }
    function get_all_reservation(Request $request){
        $reservations=reservation_hotel::all();
        $resulta=[];
        foreach($reservations as $reservation){
            if( $this->test_disponibilite($reservation->id)){
                $despo=true;
            }else{
                $despo=false;
            }
           
            $user=User::find($reservation->user);
            $pension_hotel=ponsion_hotel::find($reservation->pension);
            $pension=pension::find($pension_hotel->pension);
            $hotel=hotels::find($reservation->hotel);
            $resulta[]=['user'=>$user,"pension"=>$pension,'hotel'=>$hotel,'reservation'=>$reservation,"disponibilite"=>$despo];
        }
        return $resulta;
    }
    function get_all_chambre_of_hotel(Request $request){  
        $id=$request->input('id');
        $chambres_reserves=reservation_hotel::find($id)->chambre_reserver;
         foreach($chambres_reserves as $chambres_reserve){
            $chambre=chambre::find($chambres_reserve->chambre);
            $type=type_chambre::find($chambre->type);
            $table[]=['adulte'=>$chambres_reserve->nb_adulte,'enfant'=>$chambres_reserve->nb_enfant,'bebe'=>$chambres_reserve->nb_bebe,'type'=>$type->nom];
        }
      return $table;
        
    }
    function get_all_reservation_of_user(Request $request){
        $id=$request->input('id');
        $reservations= User::find($id)->reservation_hotel;
        $resulta=[];
        foreach($reservations as $reservation){
            $table=[];
            $chambres_reserves=reservation_hotel::find($reservation->id)->chambre_reserver;
            foreach($chambres_reserves as $chambres_reserve){
               $chambre=chambre::find($chambres_reserve->chambre);
               $type=type_chambre::find($chambre->type);
               $table[]=['adulte'=>$chambres_reserve->nb_adulte,'enfant'=>$chambres_reserve->nb_enfant,'bebe'=>$chambres_reserve->nb_bebe,'type'=>$type->nom];
           }
            $pension_hotel=ponsion_hotel::find($reservation->pension);
            $pension=pension::find($pension_hotel->pension);
            $hotel=hotels::find($reservation->hotel);
            $resulta[]=["pension"=>$pension,'hotel'=>$hotel,'reservation'=>$reservation,'chombres'=>$table];
        }
      return  $resulta;
    }
    function get_count_reservation_of_hotel(Request $request){
        $hotels=hotels::all();
        $table=[];
        foreach($hotels as $hotel){
            $data=[];
            $reservation=hotels::find($hotel->id)->reservation;
            $data[]=$reservation->count();
            $table[]=["name"=>$hotel->nom,"data"=>$data];
        }
        return $table;
    }
    function add_disponibilite($id){
        $chambres= reservation_hotel::find($id)->chambre_reserver;
        $reservation=reservation_hotel::find($id);
        $date=$reservation->date_in;
        $nuit= $this->calculernuit($reservation->date_out,$date);
        foreach($chambres as $chambre){
        $disponibilites=chambre::find($chambre->chambre)->disponibilite;
       
        if($disponibilites->count()==0){
            
            for($k=0;$k<$nuit;$k++){
              
                $disponibilite=new disponibilite();
                $disponibilite->chambre=$chambre->chambre;
                $disponibilite->date=date('Y-m-d',strtotime($date.'+'.$k.'days'));
                $disponibilite->nb=1;
                $disponibilite->save();
            }
        }else{
            for($k=0;$k<$nuit;$k++){
               
                $newdate=date('Y-m-d',strtotime($date.'+'.$k.'days'));
                $existe=$disponibilites->where('date',$newdate)->first();
               
                if($existe==null){
                    $disponibilite=new disponibilite();
                    $disponibilite->chambre=$chambre->chambre;
                    $disponibilite->date=$newdate;
                    $disponibilite->nb=1;
                    $disponibilite->save();
                }elseif($existe->count()==0){
                    $disponibilite=new disponibilite();
                    $disponibilite->chambre=$chambre->chambre;
                    $disponibilite->date=$newdate;
                    $disponibilite->nb=1;
                    $disponibilite->save();
                }else{
                   
                    disponibilite::where('chambre', $chambre->chambre)
                                    ->where('date', $newdate)
                                    ->update(['nb' => $existe->nb+1]);

                }
               
            }
        }
        

      
     }
    }
    function validation_reservation(Request $request){
        $id=$request->input('id');
        $reservation= reservation_hotel::find($id);
        if($reservation->etat!="valider"){
            if($this->test_disponibilite($id)){
                $reservation->etat="valider";
               $this->add_disponibilite($id);
                $reservation->save();
                return $reservation;
            }else{
                return response()->json(['error'=>'les chambre ne pas desponible'], 401); 
            }
        }
    }
    function  delte_disponibilite($id){
        $reservation=reservation_hotel::find($id);
            $chambres= reservation_hotel::find($id)->chambre_reserver;
            $date=$reservation->date_in;
            $nuit= $this->calculernuit($reservation->date_out,$date);
            foreach($chambres as $chambre){
            $disponibilites=chambre::find($chambre->chambre)->disponibilite;
            if($disponibilites->count()!=0){
                for($k=0;$k<$nuit;$k++){
                
                    $newdate=date('Y-m-d',strtotime($date.'+'.$k.'days'));
                    $existe=$disponibilites->where('date',$newdate)->first();
                
                    if($existe!=null)
                        disponibilite::where('chambre', $chambre->chambre)
                                        ->where('date', $newdate)
                                        ->update(['nb' => $existe->nb-1]);
                    }
                }
        }
    }
    function anulation_reservation(Request $request){
       $id=$request->input('id');
       $reservation= reservation_hotel::find($id);
       
      
       if($reservation->etat=="valider"){
       $this->delte_disponibilite($id);
       }
       $reservation->etat="annuler";
       $reservation->save();
       return $reservation;
       
    }
    function test_disponibilite_avant($request){
        $hotel=$request->input('hotel');
        $nbchambre=$request->input('nbchambre');
        $date=$request->input('date');
        $nuit=$request->input('nuit');
        $chambre_hotels=hotels::find($hotel)->chambre;
        $table=[];
        foreach($chambre_hotels as $chambre){
            $nb=0;
            $x=0;
            for($i=1;$i<=$nbchambre;$i++){
            $chambreInput=$request->input('chambre'.$i);
            if($chambreInput==$chambre->id){
                $x=1;
                $nb++;
              }
            }
            if($x==1){
            $chambre->nbb=$nb;
            $table[]=$chambre;
            }
       }
       foreach($table as $chambre){
        $disponibilites=chambre::find($chambre->id)->disponibilite;
        if($disponibilites->count()!=0){
            for($k=0;$k<$nuit;$k++){
                $newdate=date('Y-m-d',strtotime($date.'+'.$k.'days'));
                $existe=$disponibilites->where('date',$newdate)->first();
                if($existe!=null){  
                 if(($existe->nb+$chambre->nbb)>$chambre->nb){
                     return false;
                 }
                }
            }
        }
     }
     return true;

    }
    function test_disponibilite($id){
        $chambres= reservation_hotel::find($id)->chambre_reserver;
        $reservation=reservation_hotel::find($id);
        $date=$reservation->date_in;
      $nuit= $this->calculernuit($reservation->date_out,$date);
        
        $chambre_hotels=hotels::find($reservation->hotel)->chambre;
        $table=[];
        foreach($chambre_hotels as $chambre){
            $nb=0;
            $x=0;
            foreach($chambres as $ch){
                if($ch->chambre==$chambre->id){
                    $x=1;
                    $nb++;
                }
            }
            if($x==1){
                $chambre->nbb=$nb;
                $table[]=$chambre;
            }
        }
        foreach($table as $chambre){
        $disponibilites=chambre::find($chambre->id)->disponibilite;
        if($disponibilites->count()!=0){
            for($k=0;$k<$nuit;$k++){
                $newdate=date('Y-m-d',strtotime($date.'+'.$k.'days'));
                $existe=$disponibilites->where('date',$newdate)->first();
                if($existe!=null){  
                 if(($existe->nb+$chambre->nbb)>$chambre->nb){
                     return false;
                 }
                }
            }
        }
     }
     return true;
    }
    function calculernuit($out,$in){
        $deff_mois=date('m',strtotime($out))-date('m',strtotime($in));
        $in=date('Y-m-d',strtotime($in));
        $out=date('Y-m-d',strtotime($out));
        $i=0;
        while($in!=$out){
            $i++;
            $k=1;
            $in=date('Y-m-d',strtotime($in.'+'.$k.'days'));
            
        }
        
         return $i;
    }
    function nbreservationEnAttente(){
        $reservations=reservation_hotel::where('etat','en attente')->get();
        $nb=$reservations->count();
        return $nb;
    }
    function paymenetreservation(Request $request){
       if($this->payment($request)){
       return $this->reserver($request);
    
       }
    }
  function  reserver($request){
    if($this->test_disponibilite_avant($request))
    {
        $id_user=$request->input('id_user');
        $hotel=$request->input('hotel');
        $pension=$request->input('pension');
        $date=$request->input('date');
        $nuit=$request->input('nuit');
        $prix=$request->input('prix');
        $nbchambre=$request->input('nbchambre');
        $reservation=new reservation_hotel();
        $reservation->user=$id_user;
        $reservation->pension=$pension;
        $reservation->hotel=$hotel;
        $reservation->date_in=$date;
        $reservation->date_out= date('Y-m-d',strtotime($date.'+'.$nuit.'days'));
        $reservation->prix=$prix;
        $reservation->paiement='ligne';
        $reservation->save();
        $this->save_chambre_reserve($request,$reservation);
        $chambres=[];
        $chambres_reserves=reservation_hotel::find($reservation->id)->chambre_reserver;
        foreach($chambres_reserves as $chambres_reserve){
            $chambre=chambre::find($chambres_reserve->chambre);
            $type=type_chambre::find($chambre->type);
            $chambres[]=['adulte'=>$chambres_reserve->nb_adulte,'enfant'=>$chambres_reserve->nb_enfant,'bebe'=>$chambres_reserve->nb_bebe,'type'=>$type->nom];
        }
        $pension_hotel=ponsion_hotel::find($reservation->pension);
        $pension=pension::find($pension_hotel->pension);
        $hotel=hotels::find($reservation->hotel);
        if($reservation->etat!="valider"){
            if($this->test_disponibilite($reservation->id)){
                $reservation->etat="valider";
               $this->add_disponibilite($reservation->id);
                $reservation->save();
            }else{
                return response()->json(['error'=>'les chambre ne pas desponible'], 401); 
            }
        }
        $table=["pension"=>$pension,'hotel'=>$hotel,'reservation'=>$reservation,'chombres'=>$chambres,'nuit'=>$nuit];
        return $table;
     }else{
          return [];
         }
  }
    function payment($request){
        return true;
    }
}

