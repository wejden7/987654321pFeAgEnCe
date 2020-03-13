import { Injectable } from '@angular/core';
import{Categori}from '../../admin/class/Categori';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VoyageService {
url:string="http://127.0.0.1:8000/api/addcatagorie";
urlget:string="http://127.0.0.1:8000/api/selectcategorie";
  constructor(private http:HttpClient) { }



  ajouter_payer(p:FormData):Observable<Categori>
  {
    return  this.http.post<Categori>(this.url,p);
  }
  getpaye():Observable<Categori[]>
  {
    return this.http.get<Categori[]>(this.urlget);
  }
}
