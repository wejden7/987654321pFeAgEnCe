<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\serviceInclus;
use App\Voyage;
class serviceInclusControlle extends Controller
{
    function AddServiceInvlus(Request $request){
        $id=$request->input('id');
        $service=$request->input('service');
        $serviceInclus=new serviceInclus();
        $serviceInclus->service=$service;
        $serviceInclus->voyage=$id;
        $serviceInclus->save();
        return $serviceInclus;
    }
    function deleteServiceInclus(Request $request){
        $id=$request->input('id');
        $service=serviceInclus::find($id);
        $service->delete();
        return $service;
    }
    function getServiceInclusOfVoyage(Request $request){
        $id=$request->input('id');
        return $service= Voyage::find($id)->serviceInclus;
    }
    function updeteServiceInclus(Request $request){
        $id=$request->input('id');
        $service=$request->input('service');
        $serviceInclus=serviceInclus::find($id);
        $serviceInclus->service=$service;
        $serviceInclus->save();
        return $serviceInclus;

    }

    
}
