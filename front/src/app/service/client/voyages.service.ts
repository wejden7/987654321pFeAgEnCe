import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import{Categori}from '../../admin/class/Categori';
import{Voyage} from '../../admin/class/voyage';
import{Periode} from '../../admin/class/periode';


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
}
