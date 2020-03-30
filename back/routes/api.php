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
Route::post('getvoyagevisibleofpays','API\VoyageControlle@getvoyagevisibleofpays');

Route::post('updeteimagevoyage','API\VoyageControlle@updeteimagevoyage');
Route::post('visibility','API\VoyageControlle@visibility');

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
Route::post('getreservationpays','API\ReservationVoyageControlle@getreservationofuser');
Route::post('annulation','API\ReservationVoyageControlle@annulation');
Route::post('enatente','API\ReservationVoyageControlle@enatente');
Route::post('validation','API\ReservationVoyageControlle@validation');
Route::get('getreservaion','API\ReservationVoyageControlle@getreservaion');
Route::get('getallrezervation','API\ReservationVoyageControlle@getallrezervation');
Route::get('statistique','API\ReservationVoyageControlle@statistique');
//end reservetion

//gestion de hotel
     
//ville
Route::post('cretate_ville','API_hotel\villes@cretate_ville');
Route::get('get_all_ville','API_hotel\villes@get_all_ville');
//mois
Route::post('create_mois','API_hotel\MoisControlle@create_mois');
Route::get('get_all_mois','API_hotel\MoisControlle@get_all_mois');
//type_chambre
Route::post('create_type_chambre','API_hotel\TypeChambreControlle@create_type_chambre');
Route::get('get_all_type_chambre','API_hotel\TypeChambreControlle@get_all_type_chambre');
Route::post('get_type_chambre_moi_hotel','API_hotel\TypeChambreControlle@get_type_chambre_moi_hotel');

//icon
Route::post('create_icone','API_hotel\iconsControlle@create_icone');
Route::get('get_all_icone','API_hotel\iconsControlle@get_all_icone');
Route::post('delete_icone','API_hotel\iconsControlle@delete_icone');
//loisire
Route::post('create_loisire','API_hotel\loisireControlle@create_loisire');
Route::get('get_all_loisire','API_hotel\loisireControlle@get_all_loisire');
Route::post('get_loisire_moi_hotel','API_hotel\loisireControlle@get_loisire_moi_hotel');

//interdi
Route::post('create_interdi','API_hotel\interdicontrolle@create_interdi');
Route::get('get_all_interdi','API_hotel\interdicontrolle@get_all_interdi');
Route::post('get_interdi_moi_hotel','API_hotel\interdicontrolle@get_interdi_moi_hotel');

//pension
Route::post('create_pension','API_hotel\pensionControlle@create_pension');
Route::get('get_all_pension','API_hotel\pensionControlle@get_all_pension');
Route::post('get_pension_moi_of_hotel','API_hotel\pensionControlle@get_pension_moi_of_hotel');

//loisire_hotel
Route::post('create_loisire_hotel','API_hotel\loisireHotelControlle@create_loisire_hotel');
Route::get('get_all_loisire_hotel','API_hotel\loisireHotelControlle@get_all_loisire_hotel');
Route::post('get_all_loisire_of_hotel','API_hotel\loisireHotelControlle@get_all_loisire_of_hotel');
//interdi_hotel
Route::post('create_interdi_hotel','API_hotel\interdiHotelControlle@create_interdi_hotel');
Route::get('get_all_interdi_hotel','API_hotel\interdiHotelControlle@get_all_interdi_hotel');
Route::post('get_all_interdi_of_hotel','API_hotel\interdiHotelControlle@get_all_interdi_of_hotel');
//pention_Hotel
Route::post('create_ponsion_hotel','API_hotel\pentionHotelControlle@create_ponsion_hotel');
Route::get('get_all_ponsion_hotel','API_hotel\pentionHotelControlle@get_all_ponsion_hotel');
Route::post('get_all_pension_of_hotel','API_hotel\pentionHotelControlle@get_all_pension_of_hotel');
//description_hotel
Route::post('create_description_hotel','API_hotel\descriptionHotelControlle@create_description_hotel');
Route::get('get_all_description_hotel','API_hotel\descriptionHotelControlle@get_all_description_hotel');
Route::post('get_all_description_of_on_hotel','API_hotel\descriptionHotelControlle@get_all_description_of_on_hotel');

//question_hotel
Route::post('create_question_hotel','API_hotel\questionHotelControlle@create_question_hotel');
Route::get('get_all_question_hotel','API_hotel\questionHotelControlle@get_all_question_hotel');
Route::post('get_all_question_of_one_hotel','API_hotel\questionHotelControlle@get_all_question_of_one_hotel');

//create_hotel
Route::post('create_hotel','API_hotel\HotelControlle@create_hotel');
Route::get('get_all_hotel','API_hotel\HotelControlle@get_all_hotel');
Route::post('get_hotel_by_id','API_hotel\HotelControlle@get_hotel_by_id');

//photos_of_hotel
Route::post('uplode_photos_of_hotel','API_hotel\photo_Hotel_Controlle@uplode_photos_of_hotel');
Route::post('get_all_photo_of_hotel','API_hotel\photo_Hotel_Controlle@get_all_photo_of_hotel');
//chombre_of_hotel
Route::post('create_chombre_of_hotel','API_hotel\chambre_Hotel_Controlle@create_chombre_of_hotel');
Route::post('get_type_chambre_of_hotel','API_hotel\chambre_Hotel_Controlle@get_type_chambre_of_hotel');















