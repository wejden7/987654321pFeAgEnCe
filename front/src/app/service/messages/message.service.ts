import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }

  envoyermessage(fr){
    return this.http.post<any>(this.url+"envoyerMessage",fr);
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
}
