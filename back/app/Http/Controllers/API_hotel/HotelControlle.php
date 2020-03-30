<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\hotels;
use Validator;
class HotelControlle extends Controller
{
    function create_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'nom' => 'required',
            'ville' => 'required',
            'description' => 'required',
            'etoile' => 'required',
            'image' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time().'.'.$image->getClientOriginalExtension();
        $nom=$request->input('nom');
        $ville=$request->input('ville');
        $description=$request->input('description');
        $etoile=$request->input('etoile');
        $hotels=new hotels();
        $hotels->nom=$nom;
        $hotels->ville=$ville;
        $hotels->description=$description;
        $hotels->etoile=$etoile;
        $hotels->image=$name;
        $destinationPath = public_path('/images/hotels/hotel');
        $image->move($destinationPath, $name);
         back()->with('success','Image Upload successfully');
        $hotels->save();
        return $hotels;
        }
    }
    function get_all_hotel(Request $request){
        return hotels::all();
    }
    function get_hotel_by_id(Request $request){
        $id=$request->input('id');
        return hotels::find($id);
    }
}
