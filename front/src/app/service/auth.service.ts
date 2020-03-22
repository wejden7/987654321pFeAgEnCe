import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient) { }
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  } 
  setclient(p:FormData):Observable<any>
  {
    return this.http.post<any>(this.url+"register",p);
  }
  login(p):Observable<any>
  {
    return this.http.post<any>(this.url+"login",p);
  }
  

}
