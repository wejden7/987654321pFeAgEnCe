import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,of} from "rxjs";
import {Router} from '@angular/router';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Admin:boolean=false;
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient,private router : Router) {}
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
  isAdmine(){
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
   });
   this.http.post(this.url+"isAdmin","", { headers: reqHeader }).pipe(
    map(res => {
      if (res['Error']) {
        alert("Movie not found at guard!");
        return false;
      } else {
        return true;
      }
    }),
    catchError((err) => {
      return of(false);
    })
  );
   
  }
get_user(){
  var reqHeader = new HttpHeaders({ 
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
 });
  return this.http.post(this.url+"details","",{ headers: reqHeader });
}
udete_user(fr){
  return this.http.post(this.url+"updete_user",fr);
}

get_all(){
  return this.http.get(this.url+"countuser");
   
}
}
