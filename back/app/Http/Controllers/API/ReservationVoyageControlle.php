<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ReservationVoyage;
use App\User;

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
        $reservation->valid=0;
        $reservation->save();
        return $reservation;
}
function  getreservationpays(Request $request){
    $i=$request->input('id');
   return User::find($i)->reservation;
}

}
