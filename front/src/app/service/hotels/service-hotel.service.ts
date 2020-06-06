import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceHotelService {
  url:string="http://127.0.0.1:8000/api/";
  data:any;
  constructor(private http:HttpClient) { }
create_ville(fr){
    return this.http.post<any>(this.url+"cretate_ville",fr);
  }
get_all_ville(){
    return this.http.get<any>(this.url+"get_all_ville");
  }
  delete_ville_chambre(id){
    return this.http.post<any>(this.url+"delete_ville_chambre",{'id':id});
  }
ajouter_Type_Chambre(fr){
    return this.http.post<any>(this.url+"create_type_chambre",fr);
  }
get_all_Type_chambre(){
  return this.http.get<any>(this.url+"get_all_type_chambre");
}
get_type_chambre_moi_hotel(id){
  return this.http.post<any>(this.url+"get_type_chambre_moi_hotel",{'id':id});
}
delete_type_chambre(id){
  return this.http.post<any>(this.url+"delete_type_chambre",{'id':id});

}
get_all_moi(){
  return this.http.get<any>(this.url+"get_all_mois");
}
ajouter_pension(fr){
  return this.http.post<any>(this.url+"create_pension",fr);
}
ajouter_loisire(fr){
  return this.http.post<any>(this.url+"create_loisire",fr);
}
ajouter_interdit(fr){
  return this.http.post<any>(this.url+"create_interdi",fr);
}
ajouter_hotel(fr){
  return this.http.post<any>(this.url+"create_hotel",fr);
}
updete_hotel(fr){
  return this.http.post<any>(this.url+"update_hotel",fr);
}
get_all_hotel(){
  return this.http.get<any>(this.url+"get_all_hotel");
}
get_hotel_by_id(id){
 return this.http.post<any>(this.url+"get_hotel_by_id",{'id':id});
}
get_all_pension(){
  return this.http.get<any>(this.url+"get_all_pension");
}
get_pension_moi_of_hotel(id){
  return this.http.post<any>(this.url+"get_pension_moi_of_hotel",{'id':id});
}
ajouter_pension_hotel(fr){
  return this.http.post<any>(this.url+"create_ponsion_hotel",fr)

}
get_all_loisire(){
  return this.http.get<any>(this.url+"get_all_loisire");
}
get_loisire_moi_hotel(id){
  return this.http.post<any>(this.url+"get_loisire_moi_hotel",{'id':id});
}
get_interdi_moi_hotel(id){
 return this.http.post<any>(this.url+"get_interdi_moi_hotel",{'id':id});
}
ajouter_loisire_hotel(fr){
  return this.http.post<any>(this.url+"create_loisire_hotel",fr)
}
get_all_interdi(){
  return this.http.get<any>(this.url+"get_all_interdi");
}
ajouter_interdi_hotel(fr){
  return this.http.post<any>(this.url+"create_interdi_hotel",fr)
}
ajouter_chambre_hotels(fr){
  return this.http.post<any>(this.url+"create_chombre_of_hotel",fr)
}
get_type_chambre_of_hotel(id){
  return this.http.post<any>(this.url+"get_type_chambre_of_hotel",{'id':id});
}
ajouter_Description_hotel(fr){
  return this.http.post<any>(this.url+"create_description_hotel",fr);
}
ajouter_question_hotel(fr){
  return this.http.post<any>(this.url+"create_question_hotel",fr)
}
ajouter_multiple_image_of_hotel(fr){
  return this.http.post<any>(this.url+"uplode_photos_of_hotel",fr);
}
get_all_photo_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_photo_of_hotel",{'id':id});
}
get_all_loisire_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_loisire_of_hotel",{'id':id});
}
delete_loisire_by_id(id){
  return this.http.post<any>(this.url+"delete_loisire_by_id",{'id':id});
}
get_all_interdi_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_interdi_of_hotel",{'id':id});
}
delete_interdi_by_id(id){
  return this.http.post<any>(this.url+"delete_interdi_by_id",{'id':id});
}
get_all_pension_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_pension_of_hotel",{'id':id});
}
delete_pension_by_id(id){
  return this.http.post<any>(this.url+"delete_pension_by_id",{'id':id});
}
get_all_description_of_on_hotel(id){
  return this.http.post<any>(this.url+"get_all_description_of_on_hotel",{'id':id});
}
get_all_question_of_one_hotel(id){
  return this.http.post<any>(this.url+"get_all_question_of_one_hotel",{'id':id});

}
delete_chambre_of_hotel(id){
  return this.http.post(this.url+"delete_chambre_of_hotel",{'id':id});
}
updete_chombre_of_hotel(fr){
return this.http.post(this.url+"updete_chombre_of_hotel",fr);
}
updete_prix_of_chambre(fr){
  return this.http.post(this.url+"updete_prix_of_chambre",fr);
}
delete_loisire_of_hotel(id){
  return this.http.post(this.url+"delete_loisire_of_hotel",{'id':id});
}
delete_interdi_of_hotel(id){
  return this.http.post(this.url+"delete_interdi_of_hotel",{'id':id});
}
delete_pension_of_hotel(id){
  return this.http.post(this.url+"delete_pension_of_hotel",{'id':id});
}
updateimagehotel(fr){
  return this.http.post(this.url+"updateimagehotel",fr);

}
updete_prix_pension_of_hotel(fr){
  return this.http.post(this.url+"updete_prix_pension_of_hotel",fr);
}
delete_description_of_hotel(id){
  return this.http.post(this.url+"delete_description_of_hotel",{"id":id});
}
updete_Description_hotel(fr){
  return this.http.post<any>(this.url+"updete_Description_hotel",fr);
}
updete_question_hotel(fr){
  return this.http.post<any>(this.url+"updete_question_hotel",fr);
}
delete_question_of_hotel(id){
  return this.http.post(this.url+"delete_question_of_hotel",{"id":id});
}
delite_hotel_by_id(id){
  return this.http.post(this.url+"delite_hotel_by_id",{"id":id});
}
get_all_hotel_a_client(){
  return this.http.get<any>(this.url+"get_all_hotel_a_client");
}
get_all_hotel_a_client_of_Carousel(){
  return this.http.get<any>(this.url+"get_all_hotel_a_client_of_Carousel");
}
get_all_hotel_resulta_of_Recherche(fr):Observable<any>
{
  return this.http.post<any>(this.url+"get_all_hotel_resulta_of_Recherche",fr);
}
get_hotel_resulta_of_Recherche(fr){
  return this.http.post<any>(this.url+"get_hotel_resulta_of_Recherche",fr);
}
get_hotels_of_ville(ville){
  return this.http.post<any>(this.url+"get_hotel_by_id_of_ville",{'ville':ville});
}
delete_image_of_hotel(id){
  return this.http.post<any>(this.url+"delete_image_of_hotel",{'id':id});
}
resereve_hotel(fr){
  return this.http.post<any>(this.url+"reservationHotel",fr);
}
paymenetreservation(fr){
  return this.http.post<any>(this.url+"paymenetreservation",fr);

}
get_all_reservation_hotel(){
  return this.http.get<any>(this.url+"get_all_reservation_hotel");

}
get_all_chambre_reserve(id){
  return this.http.post<any>(this.url+"get_all_chambre_of_hotel",{'id':id});
}
updete_hotel_visible(id){
  return this.http.post<any>(this.url+"updete_hotel_visible",{'id':id});
}
get_all_reservation_of_user(id){
return this.http.post<any>(this.url+"get_all_reservation_of_user",{'id':id});
}
annulation_reservation_hotel(id){
  return this.http.post<any>(this.url+"anulation_reservation_hotel",{'id':id});

}
validation_reservation_hotel(id){
  return this.http.post<any>(this.url+"validation_reservation",{'id':id});
}
get_count_reservation_of_hotel(){
   return this.http.get<any>(this.url+"get_count_reservation_of_hotel");
}
set_resulta_of_rechere(r){
this.data=r;
}
get_resulta_of_rechere(){
  return this.data;
}
ajouter_Hotel_A_La_une(id){
return this.http.post<any>(this.url+"ajouter_hotel",{'id_hotel':id});
}
delete_Hotel_A_La_une(id){
  return this.http.post<any>(this.url+"delete_hotel",{'id_hotel':id});
  }
  //promot hotel
  addPromotionOfHotel(fr){
    return this.http.post<any>(this.url+"addPromotionOfHotel",fr);
   }
   getPromotionOfHptel(id){
    return this.http.post<any>(this.url+"getPromotionOfHptel",{'id':id});
   }
   updetePromotion(fr){
    return this.http.post<any>(this.url+"updetePromotion",fr);
   }
   deletePromotion(id){
    return this.http.post<any>(this.url+"deletePromotion",{'id':id});
   }
   typedepromotmoiHotel(id){
    return this.http.post<any>(this.url+"typedepromotmoiHotel",{'id':id});
   }
   //Age Max hotel
   creat_ageMaxHotel(fr){
    return this.http.post<any>(this.url+"creat_ageMaxHotel",fr);
   }
   update_AgeMAxHotel(fr){
    return this.http.post<any>(this.url+"update_AgeMAxHotel",fr);
   }
   get_AgeMaxHotel(id){
    return this.http.post<any>(this.url+"get_AgeMaxHotel",{'id_hotel':id});
   }
getNbReservationEnatent(){
  return this.http.get<any>(this.url+"nbreservationEnAttente");
}

}
