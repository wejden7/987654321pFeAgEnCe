import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
logout:boolean;
  constructor(private authe:AuthService) { }

  ngOnInit() {
this.logout=false;
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.logout=true;
    }
  }
  deconnexion(){
    this.authe.logout();
    this.logout=false;
  }
}
