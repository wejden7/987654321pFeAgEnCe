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
class reservationHotelControlle extends Controller
{
    function reservationHotel(Request $request){
        $civilite=$request->input('civilite');
        $Nom=$request->input('Nom');
        $Prenom=$request->input('Prenom');
        $Email=$request->input('Email');
        $password=$request->input('password');
        $Tel=$request->input('Tel');
        $user=new User();
        $user->name=$Nom;
        $user->email=$Email;
        $user->password= bcrypt($password);
        $user->tel=$Tel;
        $user->save();
        $hotel=$request->input('hotel');
        $pension=$request->input('pension');
        $date=$request->input('date');
        $nuit=$request->input('nuit');
        $prix=$request->input('prix');
        $nbchambre=$request->input('nbchambre');
        $reservation=new reservation_hotel();
        $reservation->user=$user->id;
        $reservation->pension=$pension;
        $reservation->hotel=$hotel;
        $reservation->date_in=$date;
        $reservation->date_out= date('Y-m-d',strtotime($date.'+'.$nuit.'days'));
        $reservation->prix=$prix;
        $reservation->save();
        
        for($i=1;$i<=$nbchambre;$i++){
            $chambre_reserver=new chambre_reserver();
            $chambre=$request->input('chambre'.$i);
            $nbadult=$request->input('chambreadulte'.$i);
            $nbenfant=$request->input('chambreenfant'.$i);
            $chambre_reserver->reservation=$reservation->id;
            $chambre_reserver->chambre=$chambre;
            $chambre_reserver->nb_enfant=$nbenfant;
            $chambre_reserver->nb_adulte=$nbadult;
            $chambre_reserver->nb_bebe=0;
            $chambre_reserver->save();
            $disponibilites=chambre::find($chambre)->disponibilite;
            if($disponibilites->count()==0){
                for($k=0;$k<$nuit;$k++){
                    $disponibilite=new disponibilite();
                    $disponibilite->chambre=$chambre;
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
                        $disponibilite->chambre=$chambre;
                        $disponibilite->date=$newdate;
                        $disponibilite->nb=1;
                        $disponibilite->save();
                    }elseif($existe->count()==0){
                        $disponibilite=new disponibilite();
                        $disponibilite->chambre=$chambre;
                        $disponibilite->date=$newdate;
                        $disponibilite->nb=1;
                        $disponibilite->save();
                    }else{
                       
                        disponibilite::where('chambre', $chambre)
                                        ->where('date', $newdate)
                                        ->update(['nb' => $existe->nb+1]);

                    }
                   
                }
            }
            

          
        }
        return $reservation;
    }

    function get_all_reservation(Request $request){
        $reservations=reservation_hotel::all();
        foreach($reservations as $reservation){
            $user=User::find($reservation->user);
            $pension_hotel=ponsion_hotel::find($reservation->pension);
            $pension=pension::find($pension_hotel->pension);
            $hotel=hotels::find($reservation->hotel);
            $resulta[]=['user'=>$user,"pension"=>$pension,'hotel'=>$hotel,'reservation'=>$reservation];
        }
        return $resulta;
    }
}
