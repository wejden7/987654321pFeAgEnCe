import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient,private router : Router) { }
  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.router.navigate(['/index/accueil']);
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
