<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CategorieVoyage;
use Validator;
class CategorieVoyageControlle extends Controller
{ 
    public $successStatus = 200;
        //add categorie
         function addcategorie(Request $request) {

            $validator = Validator::make($request->all(),  [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);
            
            if ($validator->fails()) { 
                return response()->json(['error'=>'error'], 422);            
            }
           
                if ($request->hasFile('image')) {
                    $image = $request->file('image');
                    $name = time().'.'.$image->getClientOriginalExtension();
                    $type=$request->input('type');
                    $payer=$request->input('payer');
                    $p = CategorieVoyage::where('payer', $payer)->get();
                    ($p);
                    if($p->count()<1){
                        $categorie=new CategorieVoyage();
                        $categorie->payer=$payer;
                        $categorie->image=$name;
                        $categorie->type=$type;
                        $categorie->save();
                        $destinationPath = public_path('/images/payer');
                        $image->move($destinationPath, $name);
                         back()->with('success','Image Upload successfully');
                         return $categorie;
                    }else{
                        return "error";
                    }
                  
                }
               
           
            
            
           
           
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
