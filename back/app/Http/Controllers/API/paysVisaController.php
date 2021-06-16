<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\paysVisa;
use App\CategorieVoyage;
class paysVisaController extends Controller
{
    function addVisaPays(Request $request){
        $id=$request->input('id');
        $titre=$request->input('titre');
        $visa=new paysVisa();
        $visa->pays=$id;
        $visa->titre=$titre;;
        $visa->save();
        return $visa;
    }
    function updateVisa(Request $request){
        $id=$request->input('id');
        $titre=$request->input('titre');
        $visa=paysVisa::find($id);
        $visa->titre=$titre;
        $visa->save();
    }
    function getVisaOfPays(Request $request){
        $id=$request->input('id');
       return $visa=CategorieVoyage::find($id)->visa;
    }
    function deletevisa(Request $request){
        $id=$request->input('id');
        $visa=paysVisa::find($id);
        $visa->delete();
        return $visa;
    }
}
