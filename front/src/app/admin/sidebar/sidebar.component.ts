import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
link:number;
url:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.link=0;
    this.focus();
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
