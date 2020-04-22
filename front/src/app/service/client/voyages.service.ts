import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class VoyagesService {
  url:string="http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }
  getpaye():Observable<any[]>
  {
    return this.http.get<any[]>(this.url+"selectcategorie");
  }
  getvoyagedepays(id){
    return this.http.post<any[]>(this.url+"getvoyageofpays",{'id':id});
  }
  getvoyagevisibleofpays(id){
    return this.http.post<any[]>(this.url+"getvoyagevisibleofpays",{'id':id});
  }
  
  getallprogrammeofonevoyage(id):Observable<any[]>
    {
      return this.http.post<any[]>(this.url+"getprogrammeofonevoyage",{'id':id})

    }
    getperiode(id):Observable<any[]>
      
    {
    return this.http.post<any[]>(this.url+"getperiodeofvoyage",{'id':id});
    }
    getvoyage(id):Observable<any>
      
      {
      return this.http.post<any>(this.url+"selectvoyageById",{'id':id});
      }
      getallimageofVoyage(id):Observable<any[]>
      {
        return this.http.post<any[]>(this.url+"getallimageofVoyage",{'id':id});
        }
      
        reserve(fr:FormData):Observable<any>
        {
          return this.http.post<any>(this.url+"addreservation",fr);
        }
        getreservationvoyage(id):Observable<any[]>
        {
          return this.http.post<any[]>(this.url+"getreservationofuser",{'id':id});
        }
     
        annulation(id):Observable<any>
        {
      return this.http.post<any>(this.url+"annulation",{'id':id});
        }
      
}
