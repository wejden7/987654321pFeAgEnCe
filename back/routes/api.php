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

// Route Of Categorie 
Route::post('addcatagorie', 'API\CategorieVoyageControlle@addcategorie');
Route::get('selectcategorie', 'API\CategorieVoyageControlle@selectcategorie');
Route::post('selectcategorieById', 'API\CategorieVoyageControlle@selectcategorieById');
Route::post('deletecategorieById', 'API\CategorieVoyageControlle@deletecategorieById');
Route::get('deletecategorie', 'API\CategorieVoyageControlle@deletecategorie');
//End Route Categorie

//router of voyage
Route::post('addvoyage', 'API\VoyageControlle@addvoyage');
Route::get('selectvoyage','API\VoyageControlle@selectvoyage');
Route::post('selectvoyageById','API\VoyageControlle@selectvoyageById');
Route::post('deletevoyageById','API\VoyageControlle@deletevoyageById');
Route::get('deletevoyage','API\VoyageControlle@deletevoyage');

//end router of voyage
//router of photo
Route::post('addphotosvoyage','API\PhotosVoyageControlle@addphotosvoyage');
Route::post('deletephoto','API\PhotosVoyageControlle@deletephoto');
//end photo