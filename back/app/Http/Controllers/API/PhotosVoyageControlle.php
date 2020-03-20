<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PhotosVoyage as p;
use App\Voyage;

class PhotosVoyageControlle extends Controller
{
 
    function addphotosvoyage(Request $request){
        $length =  $request->length;
        for ($i=0; $i < $length; $i++) { 
            $img[$i]= $request->file('images'.$i);
            $image =$i.time().'.'.$img[$i]->getClientOriginalExtension();
            $destinationPath = public_path('/images/voyage');
            $img[$i]->move($destinationPath, $image);
            $photo=new p();
            $voyage=$request->input('id');
            $photo->voyage=$voyage;
            $photo->name=$image;
            $photo->save();
            back()->with('success','Image Upload successfully');
            $images[] = $image;
            }
            return 1;
 }
        function deletephoto(Request $request){
            $id = $request->input('id');
            $photo=p::find($id);
            $name=$photo->name;
            $image_path = "./images/".$name;  // Value is not URL but directory file path
            if(file_exists($image_path)){
                @unlink($image_path);
                $photo->delete();
                 return $photo;
            }
            return 0;
    }
     // get images of one voyage
     function getallimageofVoyage(Request $request){
        $i=$request->input('id');
        return Voyage::find($i)->images;
    }

   
}
