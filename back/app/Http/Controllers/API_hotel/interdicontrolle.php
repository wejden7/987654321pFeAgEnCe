<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\interdi;
use App\hotels;
use App\icone;
use Validator;
class interdicontrolle extends Controller
{
    function create_interdi(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'image' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        $existe=interdi::where('titre',$request->input('titre'));
        if($existe->count()<1){
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $name = time().'.'.$image->getClientOriginalExtension();
          
            $icone=new icone();
            $icone->nom=$name;
            $icone->save();
            $destinationPath = public_path('/images/hotels/icons');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
    
            $titre=$request->input('titre');
            $icon=$request->input('icon');
            $interdi=new interdi();
            $interdi->titre=$titre;
            $interdi->icon=$icone->id;
            $interdi->save();
            return $interdi;
            }
        }
        return response()->json(['error'=>'existe'], 500);
    }
    function get_all_interdi(Request $request){
        return interdi::all();
    }
    function get_interdi_moi_hotel(Request $request){
        $id=$request->input('id');
        $interdis=interdi::all();
        $i_hotel=hotels::find($id)->interdi_hotel;
        $table=[];
        foreach($interdis as $interdi){
            $existe=0;
            foreach($i_hotel as $l){
                if($l->interdi==$interdi->id){
                    $existe=1;
                }
            }
            if($existe==0){
                $table[]=$interdi;
            }
        }
        return $table;
    }
    
}
