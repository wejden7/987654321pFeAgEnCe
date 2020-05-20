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
      voyage_of_pays(id){
        return this.http.post(this.url+"getvoyagevisibleofpays",{'id':id});
      }
   
    addomra(p){
      return this.http.post<any>(this.url+"addomra",p);
    } 
    getAllOmra(){
      return this.http.get<any>(this.url+"geAllOmra");

    }
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
      delete_immage_voyage(id){
      return this.http.post<any[]>(this.url+"deletephoto",{'id':id});
      }
    //end uplode images
    //reservation

    getreservaionnb(){
      return this.http.get(this.url+"getreservaion");
    }
    getallrezervation(){
      return this.http.get<any>(this.url+"getallrezervation");
    }
    getallrezervationOmra(){
      return this.http.get<any>(this.url+"getallrezervationOmra");
    }
    getreservaionOmranb(){
      return this.http.get(this.url+"getreservaionOmra");
      
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
    get_count_reservation_voyage_of_omra(){
      return this.http.get<any>(this.url+"get_count_reservation_voyage_of_omra");
    }
    Ajoute_Voyage_A_la_une(id){
      return this.http.post<any>(this.url+"ajouter_voyagenormal",{"id_voyage":id})
    }
    Delete_Voyage_A_la_une(id){
      return this.http.post<any>(this.url+"delete_voyageNormal",{"id_voyage":id})
    }
    Ajoute_Omra_A_la_une(id){
      return this.http.post<any>(this.url+"ajouter_voyageOmra",{"id_voyage":id})
    }
    Delete_Omra_A_la_une(id){
      return this.http.post<any>(this.url+"delete_voyageOmra",{"id_voyage":id})
    }
    addvisa(fr){
      return this.http.post<any>(this.url+"addVisaPays",fr);
    }
    updateVisa(fr){
      return this.http.post<any>(this.url+"updateVisa",fr);
    }
    getvisaofpays(id){
      return this.http.post<any>(this.url+"getVisaOfPays",{'id':id});
    }
    deletvisaofpays(id){
      return this.http.post<any>(this.url+"deletevisa",{'id':id});
    }
    AddServiceInvlus(fr){
      return this.http.post<any>(this.url+"AddServiceInvlus",fr);
    }
    updeteServiceInclus(fr){
      return this.http.post<any>(this.url+"updeteServiceInclus",fr);
    }
    deleteServiceInclus(id){
      return this.http.post<any>(this.url+"deleteServiceInclus",{'id':id});
    }
    getServiceInclusOfVoyage(id){
      return this.http.post<any>(this.url+"getServiceInclusOfVoyage",{'id':id});
    }
    AddServiceNonInvlus(fr){
      return this.http.post<any>(this.url+"AddServiceNonInvlus",fr);
    }
    updeteServiceNonInclus(fr){
      return this.http.post<any>(this.url+"updeteServiceNonInclus",fr);
    }
    deleteServiceNonInclus(id){
      return this.http.post<any>(this.url+"deleteServiceNonInclus",{'id':id});
    }
    getServiceNonInclusOfVoyage(id){
      return this.http.post<any>(this.url+"getServiceNonInclusOfVoyage",{'id':id});
    }
}
