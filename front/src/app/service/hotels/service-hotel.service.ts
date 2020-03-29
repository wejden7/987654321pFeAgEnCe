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
}
