<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\PhotosVoyage as p;
class PhotosVoyageControlle extends Controller
{
    function addphotosvoyage(Request $request){
        $this->validate($request, [
            'name' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
    
        if ($request->hasFile('name')) {
            $image = $request->file('name');
            $name = time().'.'.$image->getClientOriginalExtension();
            $voyage=$request->input('voyage');
            $photo=new p();
            $photo->voyage=$voyage;
            $photo->name=$name;
            $photo->save();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $name);
             back()->with('success','Image Upload successfully');
             return $photo;
        }
       



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
}
