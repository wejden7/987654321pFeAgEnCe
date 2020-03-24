<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//ROUTE OF USER
Route::post('login', 'API\UserControlle@login');
Route::post('register', 'API\UserControlle@register');

Route::group(['middleware' => 'auth:api'], function(){
Route::post('details', 'API\UserControlle@details');
});
//end ROUTER OF USER
//route of images voyage
Route::post('addphotosvoyage', 'API\PhotosVoyageControlle@addphotosvoyage');
Route::post('getallimageofVoyage', 'API\PhotosVoyageControlle@getallimageofVoyage');
Route::post('deletephoto','API\PhotosVoyageControlle@deletephoto');
//end voyage
// Route Of Categorie 
Route::post('addcatagorie', 'API\CategorieVoyageControlle@addcategorie');
Route::get('selectcategorie', 'API\CategorieVoyageControlle@selectcategorie');
Route::post('selectcategorieById', 'API\CategorieVoyageControlle@selectcategorieById');
Route::post('deletecategorieById', 'API\CategorieVoyageControlle@deletecategorieById');
Route::get('deletecategorie', 'API\CategorieVoyageControlle@deletecategorie');
Route::post('updetepaysvoyage', 'API\CategorieVoyageControlle@updetepaysvoyage');

//End Route Categorie

//router of voyage
Route::post('addvoyage', 'API\VoyageControlle@addvoyage');
Route::get('selectvoyage','API\VoyageControlle@selectvoyage');
Route::post('selectvoyageById','API\VoyageControlle@selectvoyageById');
Route::post('deletevoyageById','API\VoyageControlle@deletevoyageById');
Route::get('deletevoyage','API\VoyageControlle@deletevoyage');
Route::post('getvoyageofpays','API\VoyageControlle@getvoyageofpays');
Route::post('updeteimagevoyage','API\VoyageControlle@updeteimagevoyage');
//end router of voyage
//router of tarif
Route::post('addtarifvoyage','API\TarifVoyageControlle@addtarifvoyage');
Route::post('deletetarifvoyageById','API\TarifVoyageControlle@deletetarifvoyageById');
Route::get('deletetarifvoyage','API\TarifVoyageControlle@deletetarifvoyage');
Route::post('selecttarifVoyageById','API\TarifVoyageControlle@selecttarifVoyageById');
Route::get('selecttarifVoyage','API\TarifVoyageControlle@selecttarifVoyage');
Route::post('updatetarifvoyage','API\TarifVoyageControlle@updatetarifvoyage');
Route::post('getperiodeofvoyage','API\TarifVoyageControlle@getperiodeofvoyage');
//end router of tarif
//router of Programme
Route::post('addprogramme','API\ProgrammeVoyageControlle@addprogramme');
Route::post('getprogrammeofonevoyage','API\ProgrammeVoyageControlle@getprogrammeofonevoyage');
Route::post('updeteprogramme','API\ProgrammeVoyageControlle@updeteprogramme');
//end Programme
//router of rezervation
Route::post('addreservation','API\ReservationVoyageControlle@addreservation');
Route::post('getreservationpays','API\ReservationVoyageControlle@getreservationpays');

//end reservetion