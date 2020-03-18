import { Injectable } from '@angular/core';
import{Categori}from '../../admin/class/Categori';
import{Voyage} from '../../admin/class/voyage';
import{Periode} from '../../admin/class/periode';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
url:string="http://127.0.0.1:8000/api/addcatagorie";
urlget:string="http://127.0.0.1:8000/api/selectcategorie";
urlgetpaybyid="http://127.0.0.1:8000/api/selectcategorieById"
urladdVoyage="http://127.0.0.1:8000/api/addvoyage";
urlgetvoyage="http://127.0.0.1:8000/api/getvoyageofpays";
urldeleteVoyage="http://127.0.0.1:8000/api/deletevoyageById";
urlselecByIDtVoyage="http://127.0.0.1:8000/api/selectvoyageById";
urlAddTarifByIdVoyage="http://127.0.0.1:8000/api/addtarifvoyage";
urlselectTarifByIdVoyage="http://127.0.0.1:8000/api/getperiodeofvoyage";
urlUpdeteTarif="http://127.0.0.1:8000/api/updatetarifvoyage";
urldeleteperoide="http://127.0.0.1:8000/api/deletetarifvoyageById";
urlupdeteimage="http://127.0.0.1:8000/api/updeteimagevoyage";
urlupdeteimagepay="http://127.0.0.1:8000/api/updetepaysvoyage";


urldelete="http://127.0.0.1:8000/api/deletecategorieById";
  constructor(private http:HttpClient) { }


//service of payes
      ajouter_payer(p:FormData):Observable<Categori>
            {
              return  this.http.post<Categori>(this.url,p);
            }
      getpaye():Observable<Categori[]>
            {
              return this.http.get<Categori[]>(this.urlget);
            }
      deletebyid(id):Observable<Categori>
            {
              return this.http.post<Categori>(this.urldelete,{'id':id});
            }
      getpayebyid(id):Observable<Categori>
            {
              return this.http.post<Categori>(this.urlgetpaybyid,{'id':id});
            }
            updetepayvoyage(fr):Observable<Categori>{
              return this.http.post<Categori>(this.urlupdeteimagepay,fr);
            }
  //end service pays
  //service voyage
      addvoyage(p:FormData):Observable<Voyage>
            {
              return this.http.post<Voyage>(this.urladdVoyage,p);
            }
      getallvoyage(id):Observable<Voyage[]>
            {
              return this.http.post<Voyage[]>(this.urlgetvoyage,{'id':id});
            }
      deletevoyage(id):Observable<Voyage>
            {
            return this.http.post<Voyage>(this.urldeleteVoyage,{'id':id});
            }
      getvoyage(id):Observable<Voyage>
      
      {
      return this.http.post<Voyage>(this.urlselecByIDtVoyage,{'id':id});
      }
      updeteimagevoyage(fr):Observable<Voyage>{
        return this.http.post<Voyage>(this.urlupdeteimage,fr);
      }
    //end service voyage    
    //add tarif
    addperiode(p:FormData):Observable<Periode>
    {
            return this.http.post<Periode>(this.urlAddTarifByIdVoyage,p)
    }
    getperiode(id):Observable<Periode[]>
      
      {
      return this.http.post<Periode[]>(this.urlselectTarifByIdVoyage,{'id':id});
      }
      updeteperiode(p:FormData):Observable<Periode>
      
      {
      return this.http.post<Periode>(this.urlUpdeteTarif,p);
      }
      deleteperiode(id):Observable<Periode>
      {
      return this.http.post<Periode>(this.urldeleteperoide,{'id':id});
      }

    //end tarif    
}
