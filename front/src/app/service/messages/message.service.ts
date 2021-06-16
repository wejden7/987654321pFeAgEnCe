import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }

  envoyerMessageAadmine(fr){
    return this.http.post<any>(this.url+"envoyerMessageAadmine",fr);
  }
  envoyerMessageDeAdmine(fr){
    return this.http.post<any>(this.url+"envoyerMessageDeAdmine",fr);
  }
  getMessageEnvoyer(id){
    return this.http.post<any>(this.url+"MessageEnvoyer",{'id':id});
  }
  getMessageRemis(id){
    return this.http.post<any>(this.url+"MessageRemis",{'id':id});
  }
  envoyerMessagevisiteurs(fr){
    return this.http.post<any>(this.url+"envoyerMessagevisiteurs",fr);
  }
  messageVu(id){
return this.http.post<any>(this.url+"messageVu",{'id':id});
  }
  getuser(){
    return this.http.get<any>(this.url+"getuser");
}
delete(id){
  return this.http.post<any>(this.url+"delete",{'id':id});
}
getnbmessagenewAdmin(){
  return this.http.get<any>(this.url+"get_nb_message_new_admin");
}
}
