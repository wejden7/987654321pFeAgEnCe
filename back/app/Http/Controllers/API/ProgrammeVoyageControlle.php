<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ProgrammeVoyage;
use App\Voyage;

class ProgrammeVoyageControlle extends Controller
{
         function   addprogramme(Request $request){
                       $id=$request->input('voyage');
                       $jour=$request->input('jour');
                       $prog=$request->input('programme');
                       $programme=new ProgrammeVoyage();
                       $programme->voyage=$id;
                       $programme->jour=$jour;
                       $programme->description=$prog;
                       $programme->save();
                       return $programme;
    }
     // get programme of one voyage
     function getprogrammeofonevoyage(Request $request){
        $i=$request->input('id');
        return Voyage::find($i)->programme;
    }
    //updete programme by id
    function updeteprogramme(Request $request){
        $i=$request->input('id');
        $prog=$request->input('programme');
        $programme=ProgrammeVoyage::find($i);
        $programme->description=$prog;
        $programme->save();
        return $programme;
    }
}
