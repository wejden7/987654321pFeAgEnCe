import { Injectable } from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class AuthGuardService {

  constructor(private router : Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      let url: string = state.url; 
      return true; 
      //return this.verifyLogin(url);
  }

/*  verifyLogin(url) : boolean{
      if(!this.isLoggedIn()){
          this.router.navigate(['/index/accueil']);
          return false;
      }
      else if(this.isLoggedIn()){
          return true;
      }
  }
  public isLoggedIn(): boolean{
      let status = false;
      if( localStorage.getItem('isLoggedIn') == "true"){
        if(localStorage.getItem('role')=="admin"){
          status = true;
        }else{
          status = false;
        }
        
      }
      else{
        status = false;
      }
      return status;
  }*/
}
