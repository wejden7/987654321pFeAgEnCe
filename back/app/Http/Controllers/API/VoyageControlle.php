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
        $categorie=$request->input('id');
        $titre=$request->input('titre');
        $nbjour=$request->input('nbjour');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
       $cle= CategorieVoyage::find($categorie);
       if($cle!=null ){
        $voyage=new Voyage();
        $voyage->categorie=$categorie;
        $voyage->titre=$titre;
        $voyage->nbjour=$nbjour;
        $voyage->image=$name;
        $destinationPath = public_path('/images/voyage');
        $image->move($destinationPath, $name);
         back()->with('success','Image Upload successfully');
        $voyage->save();
        return $voyage;
       }else{
        return response()->json(['error'=>'errr'], 401); 
       } 
    }
    }
    //end add voyage
    //select voyage 
    function selectvoyage(Request $request){
        $voyage=Voyage::all();
        return $voyage->count();
    }
    //select voyage by id
    function selectvoyageById(Request $request){
        $id=$request->input('id');
        $voyage=Voyage::find($id);
        $car=CategorieVoyage::find($voyage->categorie);
        $voyage->pays=$car->payer;
        $voyage->pays_id=$car->id;
        return $voyage;
    }
    //updete image of voyage
    function updeteimagevoyage(Request $request){
        $id=$request->input('id');
        $voyage=Voyage::find($id);
        $name=$voyage->image;
        $image_path = "./images/voyage/".$name;  // Value is not URL but directory file path
        if($voyage!=null){
        if(file_exists($image_path)){
            @unlink($image_path);
           
        }}
            if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
            
            $voyage->image=$name;
            $destinationPath = public_path('/images/voyage');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
             $voyage->save();
             return $voyage;
            }
    }
    //end updete image of voyage
    //delete all voyage
    function deletevoyage(Request $request){
        return Voyage::whereNotNull('id')->delete();
    }
    //delete voyage by id
    function deletevoyageById(Request $request){
        $id=$request->input('id');
      $images=Voyage::find($id)->images;
        foreach($images as $i){
            $name=$i->name;
                $image_path = "./images/voyage/".$name;
                if($i!=null){
                if(file_exists($image_path)){
                    @unlink($image_path);
                   
                }}
        }
        $voyage=Voyage::find($id);
        $name=$voyage->image;
        $image_path = "./images/voyage/".$name;  // Value is not URL but directory file path
        if($voyage!=null){
        if(file_exists($image_path)){
            @unlink($image_path);
           
        }
        
            $voyage->delete();
            return $voyage;
        }else{
            return response()->json(['error'=>'voyage not found'], 401); 
        }
       

    }
    // get all voyage of one pays
    function  getvoyageofpays(Request $request){
        $i=$request->input('id');
       return CategorieVoyage::find($i)->voyage;

    }
    //get voyage of paye visible
    function  getvoyagevisibleofpays(Request $request){
        $i=$request->input('id');
        $table=[];
       $voyage=CategorieVoyage::find($i)->voyage;
       if(count($voyage)!=0){
        foreach($voyage as $v){
            if($v->visibility==1){
                $table[]=$v;
            }
        }
                return response()->json($table);
       }else{
        return response()->json(0); 
       }
       
    }

    function visibility(Request $request){
        $id=$request->input('id');
        $voyage=Voyage::find($id);
        if($voyage->visibility==0){
            $voyage->visibility=1;
        }else{
            $voyage->visibility=0;
        }
        $voyage->save();
        return $voyage;

    }
    


}
