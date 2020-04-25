<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CategorieVoyage;
use App\Voyage;
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
            $categorie=$categorie->where("type","normal");
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
               $voyage= CategorieVoyage::find($id)->voyage;
               foreach($voyage as $v){
                   $i=$v->id;
                $images=Voyage::find($i)->images;
                foreach($images as $i){
                    $name=$i->name;
                        $image_path = "./images/voyage/".$name;
                        if($i!=null){
                        if(file_exists($image_path)){
                            @unlink($image_path);
                           
                        }}
                }
                $name=$v->image;
                $image_path = "./images/voyage/".$name;
                if($v!=null){
                if(file_exists($image_path)){
                    @unlink($image_path);
                   
                }}
               }
                $categorie=CategorieVoyage::find($id);
                $name=$categorie->image;
                $image_path = "./images/payer/".$name;  // Value is not URL but directory file path
                if(file_exists($image_path)){
                    @unlink($image_path);
                   
                }
                $categorie->delete();
                return response()->json($categorie);
            }




        //delete all categorie
        function deletecategorie(Request $request) {
                    return CategorieVoyage::whereNotNull('id')->delete();
                }
//updete image of pays
        function updetepaysvoyage(Request $request){
                    $id=$request->input('id');
                    $pays=CategorieVoyage::find($id);
                    $name=$pays->image;
                    $image_path = "./images/payer/".$name;  // Value is not URL but directory file path
                    if($pays!=null){
                    if(file_exists($image_path)){
                        @unlink($image_path);
                       
                    }}
                        if ($request->hasFile('image')) {
                        $image = $request->file('image');
                        $name = time().'.'.$image->getClientOriginalExtension();
                        
                        $pays->image=$name;
                        $destinationPath = public_path('/images/payer');
                        $image->move($destinationPath, $name);
                         back()->with('success','Image Upload successfully');
                         $pays->save();
                         return $pays;
                        }
                }
    
    
}
