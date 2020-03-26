import { Injectable } from '@angular/core';
import{Categori}from '../../admin/class/Categori';
import{Voyage} from '../../admin/class/voyage';
import{Periode} from '../../admin/class/periode';
import{Programme} from '../../admin/class/programme';
import{Images}from '../../admin/class/images';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
url:string="http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }
//service of payes
      ajouter_payer(p:FormData):Observable<Categori>
            {
              return  this.http.post<Categori>(this.url+"addcatagorie",p);
            }
      getpaye():Observable<Categori[]>
            {
              return this.http.get<Categori[]>(this.url+"selectcategorie");
            }
      deletebyid(id):Observable<Categori>
            {
              return this.http.post<Categori>(this.url+"deletecategorieById",{'id':id});
            }
      getpayebyid(id):Observable<Categori>
            {
              return this.http.post<Categori>(this.url+"selectcategorieById",{'id':id});
            }
      updetepayvoyage(fr):Observable<Categori>{
              return this.http.post<Categori>(this.url+"updetepaysvoyage",fr);
            }
  //end service pays
  //service voyage
      addvoyage(p:FormData):Observable<Voyage>
            {
              return this.http.post<Voyage>(this.url+"addvoyage",p);
            }
      getallvoyage(id):Observable<Voyage[]>
            {
              return this.http.post<Voyage[]>(this.url+"getvoyageofpays",{'id':id});
            }
      deletevoyage(id):Observable<Voyage>
            {
            return this.http.post<Voyage>(this.url+"deletevoyageById",{'id':id});
            }
      getvoyage(id):Observable<Voyage>
      
      {
      return this.http.post<Voyage>(this.url+"selectvoyageById",{'id':id});
      }
      updeteimagevoyage(fr):Observable<Voyage>{
        return this.http.post<Voyage>(this.url+"updeteimagevoyage",fr);
      }
      visibilit(id):Observable<Voyage>
      {
         return this.http.post<Voyage>(this.url+"visibility",{'id':id});
      }
      voyage():Observable<any>
      {
        return this.http.get<any>(this.url+"selectvoyage");
      }
    //end service voyage    
    //add tarif
    addperiode(p:FormData):Observable<Periode>
    {
            return this.http.post<Periode>(this.url+"addtarifvoyage",p)
    }
    getperiode(id):Observable<Periode[]>
      
      {
      return this.http.post<Periode[]>(this.url+"getperiodeofvoyage",{'id':id});
      }
      updeteperiode(p:FormData):Observable<Periode>
      
      {
      return this.http.post<Periode>(this.url+"updatetarifvoyage",p);
      }
      deleteperiode(id):Observable<Periode>
      {
      return this.http.post<Periode>(this.url+"deletetarifvoyageById",{'id':id});
      }

    //end tarif   
    //add programme
    addprogrammevoyage(p:FormData):Observable<Programme>
    {
      
      return  this.http.post<Programme>(this.url+"addprogramme",p);

    }

    getallprogrammeofonevoyage(id):Observable<Programme[]>
    {
      return this.http.post<Programme[]>(this.url+"getprogrammeofonevoyage",{'id':id})

    }
    updeteprogramme(p:FormData):Observable<Programme>
    {
        return this.http.post<Programme>(this.url+"updeteprogramme",p);
    }
    //end voyage voyage 
    //uplode image 

    uplodeimages(p:FormData):Observable<Images>
    {
      return this.http.post<Images>(this.url+"addphotosvoyage",p);
    }
    getallimageofVoyage(id):Observable<Images[]>
    {
      return this.http.post<Images[]>(this.url+"getallimageofVoyage",{'id':id});
      }
    //end uplode images
    //reservation

    getreservaion(){
      return this.http.get(this.url+"getreservaion");
    }
    getallrezervation(){
      return this.http.get(this.url+"getallrezervation");
    }
    annulation(id){
      return this.http.post(this.url+"annulation",{'id':id});
    }
    validation(id){
      return this.http.post(this.url+"validation",{'id':id});
    }
    enatente(id){
      return this.http.post(this.url+"enatente",{'id':id});
    }

    
    //end reservation
}
