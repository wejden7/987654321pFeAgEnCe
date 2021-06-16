import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }
  get_All_Ala_une(){
    return this.http.get<any>(this.url+"get_All_Ala_une");
  }
}
