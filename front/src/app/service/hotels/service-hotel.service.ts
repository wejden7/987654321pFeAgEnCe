import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceHotelService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }
create_ville(fr){
    return this.http.post<any>(this.url+"cretate_ville",fr);
  }
get_all_ville(){
    return this.http.get<any>(this.url+"get_all_ville");
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
get_all_interdi_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_interdi_of_hotel",{'id':id});
}
get_all_pension_of_hotel(id){
  return this.http.post<any>(this.url+"get_all_pension_of_hotel",{'id':id});
}
get_all_description_of_on_hotel(id){
  return this.http.post<any>(this.url+"get_all_description_of_on_hotel",{'id':id});
}
get_all_question_of_one_hotel(id){
  return this.http.post<any>(this.url+"get_all_question_of_one_hotel",{'id':id});

}
}
