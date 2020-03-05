<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CategorieVoyage;

class CategorieVoyageControlle extends Controller
{ 

        //add categorie
         function addcategorie(Request $request) {
             $payer=$request->input('payer');
             $image=$request->input('image');
             $type=$request->input('type');
             $categorie=new CategorieVoyage();
             $categorie->payer=$payer;
             $categorie->image=$image;
             $categorie->type=$type;
             $categorie->save();
             return $categorie;
     }
        //select all categorie
        function selectcategorie(Request $request) {
            $categorie=CategorieVoyage::all();
            return $categorie;
        }
        // Select Categorie By Id
        function selectcategorieById(Request $request) {
        $id=$request->input('id');
            $categorie=CategorieVoyage::find($id);
            return response()->json($categorie);
        }
        // delete Categorie by id
        function deletecategorieById(Request $request) {
            $id=$request->input('id');
                $categorie=CategorieVoyage::find($id);
                $categorie->delete();
                return response()->json($categorie);
            }
        //delete all categorie
        function deletecategorie(Request $request) {
                    return CategorieVoyage::whereNotNull('id')->delete();
                }
    
    
}
