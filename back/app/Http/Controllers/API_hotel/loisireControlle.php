<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\loisire;
use App\icone;
use Validator;
class loisireControlle extends Controller
{
    function create_loisire(Request $request){
        $validator = Validator::make($request->all(),  [
            'titre' => 'required',
            'image' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
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
        $loisire=new loisire();
        $loisire->titre=$titre;
        $loisire->icon=$icone->id;
        $loisire->save();
        return $loisire;
        }
    }
    function get_all_loisire(Request $request){
        return loisire::all();
    }
}
