<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\photos_hotel ;
use App\hotels;
class photo_Hotel_Controlle extends Controller
{
    function uplode_photos_of_hotel(Request $request){
        $length =  $request->length;
        for ($i=0; $i < $length; $i++) { 
            $img[$i]= $request->file('images'.$i);
            $image =$i.time().'.'.$img[$i]->getClientOriginalExtension();
            $destinationPath = public_path('/images/hotels/hotel');
            $img[$i]->move($destinationPath, $image); 
            $hotel=$request->input('id');
            $photo=new photos_hotel();
            $photo->hotel=$hotel;
            $photo->nom=$image;
            $photo->save();
            back()->with('success','Image Upload successfully');
            $images[] = $image;
            }
            return 1;
    }
    function get_all_photo_of_hotel(Request $request){
        $id=$request->input('id');
        return hotels::find($id)->photos_hotel();

    }
    
}
