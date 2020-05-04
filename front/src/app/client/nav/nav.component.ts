import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import { Router } from '@angular/router';
import {MessageService} from '../../service/admin/message.service'
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
logout:boolean;
url:string
role:any;
  constructor(private authe:AuthService,private router:Router,private message:MessageService) { }

  ngOnInit() {
    this.focus();
    this.logout=false;
    
    this.message.getMessage().subscribe(
            (data)=>{this.focus(),
                      console.log(data)});
    setInterval(() => {
            if(localStorage.getItem('isLoggedIn') == "true"){
            this.logout=true;
            this.role=localStorage.getItem('role');
          }},1);
   
  }
  deconnexion(){
    this.authe.logout();
    this.logout=false;
  }
 focus(){
  console.log(this.router.url);
  let rev = this.router.url.split('/').reverse().join('/');
  console.log(rev)
  const mois = this.router.url.split('/');
  console.log(mois[2]);
  this.url=mois[2];
 }

}
