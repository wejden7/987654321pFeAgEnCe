import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import{Categori}from '../../admin/class/Categori';
import{Voyage} from '../../admin/class/voyage';
import{Periode} from '../../admin/class/periode';
import{Programme} from '../../admin/class/programme';
import{Images} from '../../admin/class/images';
import{ReservationV} from '../../admin/class/reservation-v';


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
      getallimageofVoyage(id):Observable<Images[]>
      {
        return this.http.post<Images[]>(this.url+"getallimageofVoyage",{'id':id});
        }
        user():Observable<any>
        {
            const token="Bearer "+localStorage.getItem('token');
            let headers: HttpHeaders = new HttpHeaders();
            headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers = headers.append('Authorization', token);
            return this.http.post<any>(this.url+"details",{},{headers});
        }
        reserve(fr:FormData):Observable<any>
        {
          return this.http.post<any>(this.url+"addreservation",fr);
        }
        getreservationvoyage(id):Observable<ReservationV[]>
        {
          return this.http.post<ReservationV[]>(this.url+"getreservationpays",{'id':id});
        }
     
        annulation(id):Observable<any>
        {
      return this.http.post<any>(this.url+"annulation",{'id':id});
        }
      
}
