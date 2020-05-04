<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\serviceNonInclus;
use App\Voyage;
class serviceNonInclusControlle extends Controller
{
    function AddServiceNonInvlus(Request $request){
        $id=$request->input('id');
        $service=$request->input('service');
        $serviceNonInclus=new serviceNonInclus();
        $serviceNonInclus->service=$service;
        $serviceNonInclus->voyage=$id;
        $serviceNonInclus->save();
        return $serviceNonInclus;
    }
    function deleteServiceNonInclus(Request $request){
        $id=$request->input('id');
        $service=serviceNonInclus::find($id);
        $service->delete();
        return $service;
    }
    function getServiceNonInclusOfVoyage(Request $request){
        $id=$request->input('id');
        return $service= Voyage::find($id)->serviceNonInclus;
    }
    function updeteServiceNonInclus(Request $request){
        $id=$request->input('id');
        $service=$request->input('service');
        $serviceNonInclus=serviceNonInclus::find($id);
        $serviceNonInclus->service=$service;
        $serviceNonInclus->save();
        return $serviceNonInclus;

    }
}
