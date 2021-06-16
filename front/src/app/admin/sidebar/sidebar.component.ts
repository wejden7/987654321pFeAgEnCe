import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';4
import{MessageService} from '../../service/messages/message.service'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
link:number;
url:string;
nbnewmsg:number;
  constructor(private router:Router,private servicemsg:MessageService) { }

  ngOnInit() {
    this.link=0;
    this.focus();
    this.getnbmessagenewAdmin();
    setInterval(()=>{this.getnbmessagenewAdmin();},3000);
  }
  focus(){
    console.log(this.router.url);
    let rev = this.router.url.split('/').reverse().join('/');
    const mois = this.router.url.split('/');
    this.url=mois[2];
   }
   getnbmessagenewAdmin(){
    this.servicemsg.getnbmessagenewAdmin().subscribe((data)=>{this.nbnewmsg=data;})
   }
}
