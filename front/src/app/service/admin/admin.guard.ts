import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable ,of} from 'rxjs';
import {AuthService}from '../auth.service';
import { map, catchError } from 'rxjs/operators';
import{HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  url:string="http://127.0.0.1:8000/api/";
  constructor(private http:HttpClient,private authService: AuthService,private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var reqHeader = new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
     });
  return   this.http.post(this.url+"isAdmin","", { headers: reqHeader }).pipe(
      map(res => {
          return true;
      }),
      catchError((err) => {
        this.router.navigate(['/index/accueil']);
        return of(false);
      })
    );
  }
  
}
