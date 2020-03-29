<?php

namespace App\Http\Controllers\API_hotel;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\question_hotel;
use Validator;
class questionHotelControlle extends Controller
{
    function create_question_hotel(Request $request){
        $validator = Validator::make($request->all(),  [
            'question' => 'required',
            'hotel' => 'required',
            'reponce' => 'required',
           ]);

        if ($validator->fails()) { 
                 return response()->json(['error'=>'error'], 422);            
        }

        $question=$request->input('question');
        $hotel=$request->input('hotel');
        $reponce=$request->input('reponce');
        $question_hotel=new question_hotel();
        $question_hotel->question=$question;
        $question_hotel->hotel=$hotel;
        $question_hotel->reponce=$reponce;
        $question_hotel->save();
        return $question_hotel;
    }
    function get_all_question_hotel(Request $request){
        return question_hotel::all();
    }
}