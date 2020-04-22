import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
url:string="http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }
//service of payes
      ajouter_payer(p:FormData):Observable<any>
            {
              return  this.http.post<any>(this.url+"addcatagorie",p);
            }
      getpaye():Observable<any[]>
            {
              return this.http.get<any[]>(this.url+"selectcategorie");
            }
      deletebyid(id):Observable<any>
            {
              return this.http.post<any>(this.url+"deletecategorieById",{'id':id});
            }
      getpayebyid(id):Observable<any>
            {
              return this.http.post<any>(this.url+"selectcategorieById",{'id':id});
            }
      updetepayvoyage(fr):Observable<any>{
              return this.http.post<any>(this.url+"updetepaysvoyage",fr);
            }
  //end service pays
  //service voyage
      addvoyage(p:FormData):Observable<any>
            {
              return this.http.post<any>(this.url+"addvoyage",p);
            }
      getallvoyage(id):Observable<any[]>
            {
              return this.http.post<any[]>(this.url+"getvoyageofpays",{'id':id});
            }
      deletevoyage(id):Observable<any>
            {
            return this.http.post<any>(this.url+"deletevoyageById",{'id':id});
            }
      getvoyage(id):Observable<any>
      
      {
      return this.http.post<any>(this.url+"selectvoyageById",{'id':id});
      }
      updeteimagevoyage(fr):Observable<any>{
        return this.http.post<any>(this.url+"updeteimagevoyage",fr);
      }
      visibilit(id):Observable<any>
      {
         return this.http.post<any>(this.url+"visibility",{'id':id});
      }
      voyage():Observable<any>
      {
        return this.http.get<any>(this.url+"selectvoyage");
      }
    //end service voyage    
    //add tarif
    addperiode(p:FormData):Observable<any>
    {
            return this.http.post<any>(this.url+"addtarifvoyage",p)
    }
    getperiode(id):Observable<any[]>
      
      {
      return this.http.post<any[]>(this.url+"getperiodeofvoyage",{'id':id});
      }
      updeteperiode(p:FormData):Observable<any>
      
      {
      return this.http.post<any>(this.url+"updatetarifvoyage",p);
      }
      deleteperiode(id):Observable<any>
      {
      return this.http.post<any>(this.url+"deletetarifvoyageById",{'id':id});
      }

    //end tarif   
    //add programme
    addprogrammevoyage(p:FormData):Observable<any>
    {
      
      return  this.http.post<any>(this.url+"addprogramme",p);

    }

    getallprogrammeofonevoyage(id):Observable<any[]>
    {
      return this.http.post<any[]>(this.url+"getprogrammeofonevoyage",{'id':id})

    }
    updeteprogramme(p:FormData):Observable<any>
    {
        return this.http.post<any>(this.url+"updeteprogramme",p);
    }
    //end voyage voyage 
    //uplode image 

    uplodeimages(p:FormData):Observable<any>
    {
      return this.http.post<any>(this.url+"addphotosvoyage",p);
    }
    getallimageofVoyage(id):Observable<any[]>
    {
      return this.http.post<any[]>(this.url+"getallimageofVoyage",{'id':id});
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
    //statistique
    get_count_reservation_voyage_of_pays(){
      return this.http.get<any>(this.url+"get_count_reservation_voyage_of_pays");
    }
    //end
}
