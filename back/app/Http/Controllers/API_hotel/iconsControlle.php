<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\icone;
use Validator;
class iconsControlle extends Controller
{
    function create_icone(Request $request){
        $validator = Validator::make($request->all(),  [
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
        return $icone;
        }
        return response()->json(['error'=>'error'], 401);

    }
    function get_all_icone(Request $request){
        return icone::all();
    }
    function delete_icone(Request $request){
        $id=$request->input('id');
        $icone=icone::find($id);
        $name=$icone->nom;
        $image_path = "./images/hotels/icons/".$name;  // Value is not URL but directory file path
        if($icone!=null){
        if(file_exists($image_path)){
            @unlink($image_path);
        }
            $icone->delete();
            return $icone;
    }
    }
}
