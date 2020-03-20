import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import{Categori}from '../../admin/class/Categori';
import{Voyage} from '../../admin/class/voyage';
import{Periode} from '../../admin/class/periode';
import{Programme} from '../../admin/class/programme';


@Injectable({
  providedIn: 'root'
})
export class VoyagesService {
  url:string="http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }
  getpaye():Observable<Categori[]>
  {
    return this.http.get<Categori[]>(this.url+"selectcategorie");
  }
  getvoyagedepays(id){
    return this.http.post<Voyage[]>(this.url+"getvoyageofpays",{'id':id});
  }
  getallprogrammeofonevoyage(id):Observable<Programme[]>
    {
      return this.http.post<Programme[]>(this.url+"getprogrammeofonevoyage",{'id':id})

    }
    getperiode(id):Observable<Periode[]>
      
    {
    return this.http.post<Periode[]>(this.url+"getperiodeofvoyage",{'id':id});
    }
    getvoyage(id):Observable<Voyage>
      
      {
      return this.http.post<Voyage>(this.url+"selectvoyageById",{'id':id});
      }
  
}
