<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Voyage;
use App\CategorieVoyage;
class VoyageControlle extends Controller
{
    //add voyage
    function addvoyage(Request $request){
        $categorie=$request->input('categorie');
        $titre=$request->input('titre');
        $nbjour=$request->input('nbjour');
        $nbplace=$request->input('nbplace');
        $image=$request->input('image');
       $cle= CategorieVoyage::find($categorie);
       if($cle!=null ){
        $voyage=new Voyage();
        $voyage->categorie=$categorie;
        $voyage->titre=$titre;
        $voyage->nbjour=$nbjour;
        $voyage->nbplace=$nbplace;
        $voyage->image=$image;
        $voyage->save();
        return $voyage;
       }else{
        return response()->json(['error'=>'errr'], 401); 
       } 
    }
    //end add voyage
    //select voyage 
    function selectvoyage(Request $request){
        $voyage=Voyage::all();
        return $voyage;
    }
    function selectvoyageById(Request $request){
        $id=$request->input('id');
        $voyage=Voyage::find($id);
        return $voyage;
    }
    function deletevoyage(Request $request){
        return Voyage::whereNotNull('id')->delete();
    }
    function deletevoyageById(Request $request){
        $id=$request->input('id');
        $voyage=Voyage::find($id);
        if($voyage!=null){
            $voyage->delete();
            return $voyage;
        }else{
            return response()->json(['error'=>'voyage not found'], 401); 
        }
       

    }
}
