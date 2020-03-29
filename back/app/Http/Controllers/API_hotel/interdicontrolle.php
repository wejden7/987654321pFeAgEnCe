<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\interdi;
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
    function get_all_interdi(Request $request){
        return interdi::all();
    }
}
