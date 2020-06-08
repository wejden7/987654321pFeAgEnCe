<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Voyage;
use App\CategorieVoyage;
use App\TarifVoyage;

class VoyageControlle extends Controller
{
    //add voyage
    function addvoyage(Request $request){
        $categorie=$request->input('id');
        $titre=$request->input('titre');
        $nbjour=$request->input('nbjour');
        $nbpersonne=$request->input('nbpersonne');
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
       $cle= CategorieVoyage::find($categorie);
       $existe=Voyage::where('titre',$titre)->first();
       if($existe==null){
        if($cle!=null ){
            $voyage=new Voyage();
            $voyage->categorie=$categorie;
            $voyage->titre=$titre;
            $voyage->nbjour=$nbjour;
            $voyage->nbpersonne=$nbpersonne;

            $voyage->image=$name;
            $destinationPath = public_path('/images/voyage');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
            $voyage->save();
            return $voyage;
           }else{
            return response()->json(['error'=>'errr'], 401); 
           } 
       }else{
        return response()->json(['error'=>'existe'], 401); 
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
       $voyages= CategorieVoyage::find($i)->voyage;
       foreach($voyages as $voyage){
        $AlaUnes=Voyage::find($voyage->id)->Ala_uneVoyageNormale;
        if($AlaUnes->count()==1){
            $voyage->alaune=true;
        }else{
            $voyage->alaune=false;
        }

       }
       return $voyages;

    }
    //get voyage of paye visible
    function  getvoyagevisibleofpays(Request $request){
        $i=$request->input('id');
        $table=[];
        $voyage=CategorieVoyage::find($i)->voyage;
        $newDate= date("Y-m-d");
        $k=10;
        $EndDate= date("Y-m-d", strtotime($newDate.'+'.$k.'days'));
        if(count($voyage)!=0){
                 foreach($voyage as $v){
                    $dateselect=[];
                   $dates=Voyage::find($v->id)->periode;
                   $existe=0;
                   if($v->visibility==1){
                      
                   foreach($dates as $date){
                       $d= date("Y-m-d", strtotime($date->date));
                       $nb=TarifVoyage::find($date->id)->rservationofonevoyage->where('etat','valider')->count();
                       if($d>$EndDate&&$nb<$v->nbpersonne){
                           $dateselect[]=$d;
                          
                        $existe=1;
                       }
                   }
                   if($existe==1){
                       $v->date=$dateselect;
                     $table[]=$v;
                   }
                      
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
    
    function addomra(Request $request){
        $payes=CategorieVoyage::where("type","omra")->first();
        $titre=$request->input('titre');
        $nbjour=$request->input('nbjour');
        $nbpersonne=$request->input('nbpersonne');
        
        $existe=Voyage::where('titre',$titre)->first();
       if($existe==null){
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
      
       if($payes->count()!=0){
        $voyage=new Voyage();
        $voyage->categorie=$payes->id;
        $voyage->titre=$titre;
        $voyage->nbjour=$nbjour;
        $voyage->nbpersonne=$nbpersonne;
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
     }else{
        return response()->json(['error'=>'existe'], 401); 
       }
    }
    function geAllOmra(){
            $payes=CategorieVoyage::where("type","omra")->first();
            $voyages=CategorieVoyage::find($payes->id)->voyage;
            foreach($voyages as $voyage){
                $AlaUnes=Voyage::find($voyage->id)->Ala_uneVoyageOmra;
                if($AlaUnes->count()==1){
                    $voyage->alaune=true;
                }else{
                    $voyage->alaune=false;        }
            }
            return $voyages;
    }
    function geAllOmraVisible(){
        $payes=CategorieVoyage::where("type","omra")->first();
        $voyage=CategorieVoyage::find($payes->id)->voyage;
        $table=[];
        $newDate= date("Y-m-d");
        $k=10;
        $EndDate= date("Y-m-d", strtotime($newDate.'+'.$k.'days'));
        if(count($voyage)!=0){
            foreach($voyage as $v){
                $dates=Voyage::find($v->id)->periode;
                $existe=0;
                if($v->visibility==1){
                    foreach($dates as $date){
                        $v->prixAdulte=$date->prixAdulte;
                        $nb=TarifVoyage::find($date->id)->rservationofonevoyage->where('etat','valider')->count();
                        $d= date("Y-m-d", strtotime($date->date));
                        if($d>$EndDate&&$nb<$v->nbpersonne){
                            $dateselect[]=$d;
                           
                         $existe=1;
                        }
                    }
                    if($existe==1){
                        $v->date=$dateselect;
                      $table[]=$v;
                    }
                      
                }
            }
                    return response()->json($table);
           }else{
            return response()->json(0); 
           }
        }
 function updatevoyage(Request $request){
    $id=$request->input('id');
    $voyage=Voyage::find($id);
    $titre=$request->input('titre');
    $nbjour=$request->input('nbjour');
    $nbpersonne=$request->input('nbpersonne');
   $existe=Voyage::where('titre',$titre)->where('id','<>',$id)->exists();
   if(!$existe){
        $voyage->titre=$titre;
        $voyage->nbjour=$nbjour;
        $voyage->nbpersonne=$nbpersonne;
       $d= $this->updeteimage($request);
        $voyage->save();
        return $voyage;
 }else{
    return response()->json(['error'=>'existe'], 401); 
 }
}
function updeteimage($request){
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
         return;
        }
}

}
