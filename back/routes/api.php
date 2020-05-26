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
Route::post('updete_user', 'API\UserControlle@updete_user');
Route::get('countuser','API\UserControlle@countuser');
Route::get('getuser','API\UserControlle@getuser');
Route::post('deleteclient','API\UserControlle@deleteclient');

Route::group(['middleware' => 'auth:api'], function(){
Route::post('details', 'API\UserControlle@details');
Route::post('isAdmin','API\UserControlle@isAdmin');
});
//end ROUTER OF USER
//Route message
Route::post('envoyerMessageAadmine','API\messageControlle@envoyerMessageAadmine');
Route::post('envoyerMessageDeAdmine','API\messageControlle@envoyerMessageDeAdmine');
Route::post('MessageEnvoyer','API\messageControlle@MessageEnvoyer');
Route::post('MessageRemis','API\messageControlle@MessageRemis');
Route::post('envoyerMessagevisiteurs','API\messageControlle@envoyerMessagevisiteurs');
Route::Post('messageVu','API\messageControlle@messageVu');
Route::Post('delete','API\messageControlle@delete');
Route::get('get_nb_message_new_admin','API\messageControlle@get_nb_message_new_admin');
//end message
//A La une 
Route::post('ajouter_hotel','API_hotel\alaUneControlle@ajouter_hotel');
Route::post('delete_hotel','API_hotel\alaUneControlle@delete_hotel');
Route::post('ajouter_voyagenormal','API_hotel\alaUneControlle@ajouter_voyagenormal');
Route::post('delete_voyageNormal','API_hotel\alaUneControlle@delete_voyageNormal');
Route::post('ajouter_voyageOmra','API_hotel\alaUneControlle@ajouter_voyageOmra');
Route::post('delete_voyageOmra','API_hotel\alaUneControlle@delete_voyageOmra');
Route::get('get_All_Ala_une','API_hotel\alaUneControlle@get_All_Ala_une');
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
//Route visa
Route::post('addVisaPays','API\paysVisaController@addVisaPays');
Route::post('updateVisa','API\paysVisaController@updateVisa');
Route::post('getVisaOfPays','API\paysVisaController@getVisaOfPays');
Route::post('deletevisa','API\paysVisaController@deletevisa');
//end route visa
//router service inclus
Route::post('AddServiceInvlus','API\serviceInclusControlle@AddServiceInvlus');
Route::post('deleteServiceInclus','API\serviceInclusControlle@deleteServiceInclus');
Route::post('getServiceInclusOfVoyage','API\serviceInclusControlle@getServiceInclusOfVoyage');
Route::post('updeteServiceInclus','API\serviceInclusControlle@updeteServiceInclus');
//end router service
//router service inclus
Route::post('AddServiceNonInvlus','API\serviceNonInclusControlle@AddServiceNonInvlus');
Route::post('deleteServiceNonInclus','API\serviceNonInclusControlle@deleteServiceNonInclus');
Route::post('getServiceNonInclusOfVoyage','API\serviceNonInclusControlle@getServiceNonInclusOfVoyage');
Route::post('updeteServiceNonInclus','API\serviceNonInclusControlle@updeteServiceNonInclus');
//end router service
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
//route Omra
Route::post('addomra','API\VoyageControlle@addomra');
Route::get('geAllOmra','API\VoyageControlle@geAllOmra');
Route::get('geAllOmraVisible','API\VoyageControlle@geAllOmraVisible');

//router of tarif
Route::post('addtarifvoyage','API\TarifVoyageControlle@addtarifvoyage');
Route::post('deletetarifvoyageById','API\TarifVoyageControlle@deletetarifvoyageById');
Route::get('deletetarifvoyage','API\TarifVoyageControlle@deletetarifvoyage');
Route::post('selecttarifVoyageById','API\TarifVoyageControlle@selecttarifVoyageById');
Route::get('selecttarifVoyage','API\TarifVoyageControlle@selecttarifVoyage');
Route::post('updatetarifvoyage','API\TarifVoyageControlle@updatetarifvoyage');
Route::post('getperiodeofvoyage','API\TarifVoyageControlle@getperiodeofvoyage');
Route::post('getperiodeofvoyageofAdmin','API\TarifVoyageControlle@getperiodeofvoyageofAdmin');

//end router of tarif
//router of Programme
Route::post('addprogramme','API\ProgrammeVoyageControlle@addprogramme');
Route::post('getprogrammeofonevoyage','API\ProgrammeVoyageControlle@getprogrammeofonevoyage');
Route::post('updeteprogramme','API\ProgrammeVoyageControlle@updeteprogramme');
//end Programme
//router of rezervation
Route::post('addreservation','API\ReservationVoyageControlle@addreservation');
Route::post('getreservationofuser','API\ReservationVoyageControlle@getreservationofuser');
Route::post('annulation','API\ReservationVoyageControlle@annulation');
Route::post('enatente','API\ReservationVoyageControlle@enatente');
Route::post('validation','API\ReservationVoyageControlle@validation');
Route::get('getreservaion','API\ReservationVoyageControlle@getreservaion');
Route::get('getallrezervation','API\ReservationVoyageControlle@getallrezervation');
Route::get('getallrezervationOmra','API\ReservationVoyageControlle@getallrezervationOmra');
Route::get('getreservaionOmra','API\ReservationVoyageControlle@getreservaionOmra');
Route::get('get_count_reservation_voyage_of_pays','API\ReservationVoyageControlle@get_count_reservation_voyage_of_pays');
Route::get('get_count_reservation_voyage_of_omra','API\ReservationVoyageControlle@get_count_reservation_voyage_of_omra');

//end reservetion

//gestion de hotel
     
//ville
Route::post('cretate_ville','API_hotel\villes@cretate_ville');
Route::post('delete_ville_chambre','API_hotel\villes@delete_ville_chambre');
Route::get('get_all_ville','API_hotel\villes@get_all_ville');

//mois
Route::post('create_mois','API_hotel\MoisControlle@create_mois');
Route::get('get_all_mois','API_hotel\MoisControlle@get_all_mois');
//type_chambre
Route::post('create_type_chambre','API_hotel\TypeChambreControlle@create_type_chambre');
Route::get('get_all_type_chambre','API_hotel\TypeChambreControlle@get_all_type_chambre');
Route::post('get_type_chambre_moi_hotel','API_hotel\TypeChambreControlle@get_type_chambre_moi_hotel');
Route::post('delete_type_chambre','API_hotel\TypeChambreControlle@delete_type_chambre');
//icon
Route::post('create_icone','API_hotel\iconsControlle@create_icone');
Route::get('get_all_icone','API_hotel\iconsControlle@get_all_icone');
Route::post('delete_icone','API_hotel\iconsControlle@delete_icone');
//loisire
Route::post('create_loisire','API_hotel\loisireControlle@create_loisire');
Route::get('get_all_loisire','API_hotel\loisireControlle@get_all_loisire');
Route::post('get_loisire_moi_hotel','API_hotel\loisireControlle@get_loisire_moi_hotel');
Route::post('delete_loisire_by_id','API_hotel\loisireControlle@delete_loisire_by_id');

//interdi
Route::post('create_interdi','API_hotel\interdicontrolle@create_interdi');
Route::get('get_all_interdi','API_hotel\interdicontrolle@get_all_interdi');
Route::post('get_interdi_moi_hotel','API_hotel\interdicontrolle@get_interdi_moi_hotel');
Route::post('delete_interdi_by_id','API_hotel\interdicontrolle@delete_interdi_by_id');

//pension
Route::post('create_pension','API_hotel\pensionControlle@create_pension');
Route::get('get_all_pension','API_hotel\pensionControlle@get_all_pension');
Route::post('get_pension_moi_of_hotel','API_hotel\pensionControlle@get_pension_moi_of_hotel');
Route::post('delete_pension_by_id','API_hotel\pensionControlle@delete_pension_by_id');


//loisire_hotel
Route::post('create_loisire_hotel','API_hotel\loisireHotelControlle@create_loisire_hotel');
Route::get('get_all_loisire_hotel','API_hotel\loisireHotelControlle@get_all_loisire_hotel');
Route::post('get_all_loisire_of_hotel','API_hotel\loisireHotelControlle@get_all_loisire_of_hotel');
Route::post('delete_loisire_of_hotel','API_hotel\loisireHotelControlle@delete_loisire_of_hotel');

//interdi_hotel
Route::post('create_interdi_hotel','API_hotel\interdiHotelControlle@create_interdi_hotel');
Route::get('get_all_interdi_hotel','API_hotel\interdiHotelControlle@get_all_interdi_hotel');
Route::post('get_all_interdi_of_hotel','API_hotel\interdiHotelControlle@get_all_interdi_of_hotel');
Route::post('delete_interdi_of_hotel','API_hotel\interdiHotelControlle@delete_interdi_of_hotel');

//pention_Hotel
Route::post('create_ponsion_hotel','API_hotel\pentionHotelControlle@create_ponsion_hotel');
Route::get('get_all_ponsion_hotel','API_hotel\pentionHotelControlle@get_all_ponsion_hotel');
Route::post('get_all_pension_of_hotel','API_hotel\pentionHotelControlle@get_all_pension_of_hotel');
Route::post('delete_pension_of_hotel','API_hotel\pentionHotelControlle@delete_pension_of_hotel');
Route::post('updete_prix_pension_of_hotel','API_hotel\pentionHotelControlle@updete_prix_pension_of_hotel');


//description_hotel
Route::post('create_description_hotel','API_hotel\descriptionHotelControlle@create_description_hotel');
Route::get('get_all_description_hotel','API_hotel\descriptionHotelControlle@get_all_description_hotel');
Route::post('get_all_description_of_on_hotel','API_hotel\descriptionHotelControlle@get_all_description_of_on_hotel');
Route::post('delete_description_of_hotel','API_hotel\descriptionHotelControlle@delete_description_of_hotel');
Route::post('updete_Description_hotel','API_hotel\descriptionHotelControlle@updete_Description_hotel');

//question_hotel
Route::post('create_question_hotel','API_hotel\questionHotelControlle@create_question_hotel');
Route::get('get_all_question_hotel','API_hotel\questionHotelControlle@get_all_question_hotel');
Route::post('get_all_question_of_one_hotel','API_hotel\questionHotelControlle@get_all_question_of_one_hotel');
Route::post('updete_question_hotel','API_hotel\questionHotelControlle@updete_question_hotel');
Route::post('delete_question_of_hotel','API_hotel\questionHotelControlle@delete_question_of_hotel');
//age Max
Route::post("creat_ageMaxHotel","API_hotel\ageMaxHotelControlle@creat_ageMaxHotel");
Route::post("update_AgeMAxHotel","API_hotel\ageMaxHotelControlle@update_AgeMAxHotel");
Route::post("get_AgeMaxHotel","API_hotel\ageMaxHotelControlle@get_AgeMaxHotel");


//create_hotel
Route::post('create_hotel','API_hotel\HotelControlle@create_hotel');
Route::post('update_hotel','API_hotel\HotelControlle@update_hotel');
Route::get('get_all_hotel','API_hotel\HotelControlle@get_all_hotel');
Route::post('get_hotel_by_id','API_hotel\HotelControlle@get_hotel_by_id');
Route::post('delite_hotel_by_id','API_hotel\HotelControlle@delite_hotel_by_id');
Route::get('get_all_hotel_a_client','API_hotel\HotelControlle@get_all_hotel_a_client');
Route::get('get_all_hotel_a_client_of_Carousel','API_hotel\HotelControlle@get_all_hotel_a_client_of_Carousel');
Route::post('get_all_hotel_resulta_of_Recherche','API_hotel\HotelControlle@get_all_hotel_resulta_of_Recherche');
Route::post('get_hotel_by_id_of_ville','API_hotel\HotelControlle@get_hotel_by_id_of_ville');
Route::post('get_hotel_resulta_of_Recherche','API_hotel\HotelControlle@get_hotel_resulta_of_Recherche');
Route::post('updete_hotel_visible','API_hotel\HotelControlle@updete_hotel_visible');
Route::post('updateimagehotel','API_hotel\HotelControlle@updateimagehotel');

//photos_of_hotel
Route::post('uplode_photos_of_hotel','API_hotel\photo_Hotel_Controlle@uplode_photos_of_hotel');
Route::post('get_all_photo_of_hotel','API_hotel\photo_Hotel_Controlle@get_all_photo_of_hotel');
Route::post('delete_image_of_hotel','API_hotel\photo_Hotel_Controlle@delete_image_of_hotel');

//chombre_of_hotel
Route::post('create_chombre_of_hotel','API_hotel\chambre_Hotel_Controlle@create_chombre_of_hotel');
Route::post('get_type_chambre_of_hotel','API_hotel\chambre_Hotel_Controlle@get_type_chambre_of_hotel');
Route::post('delete_chambre_of_hotel','API_hotel\chambre_Hotel_Controlle@delete_chambre_of_hotel');
Route::post('updete_chombre_of_hotel','API_hotel\chambre_Hotel_Controlle@updete_chombre_of_hotel');
Route::post('updete_prix_of_chambre','API_hotel\chambre_Hotel_Controlle@updete_prix_of_chambre');
//reservation hotel
Route::post('reservationHotel','API_hotel\reservationHotelControlle@reservationHotel');
Route::get('get_all_reservation_hotel','API_hotel\reservationHotelControlle@get_all_reservation');
Route::post('get_all_chambre_of_hotel','API_hotel\reservationHotelControlle@get_all_chambre_of_hotel');
Route::post('get_all_reservation_of_user','API_hotel\reservationHotelControlle@get_all_reservation_of_user');
Route::post('anulation_reservation_hotel','API_hotel\reservationHotelControlle@anulation_reservation');
Route::post('validation_reservation','API_hotel\reservationHotelControlle@validation_reservation');
Route::get('get_count_reservation_of_hotel','API_hotel\reservationHotelControlle@get_count_reservation_of_hotel');
Route::get('nbreservationEnAttente','API_hotel\reservationHotelControlle@nbreservationEnAttente');
//promot hotel
Route::post('addPromotionOfHotel','API_hotel\promotionHotelController@addPromotionOfHotel');
Route::post('getPromotionOfHptel','API_hotel\promotionHotelController@getPromotionOfHptel');
Route::post('updetePromotion','API_hotel\promotionHotelController@updetePromotion');
Route::post('deletePromotion','API_hotel\promotionHotelController@deletePromotion');
Route::post('typedepromotmoiHotel','API_hotel\promotionHotelController@typedepromotmoiHotel');
