import { Component, OnInit } from '@angular/core';
import{VoyagesService} from '../../service/client/voyages.service';
import {MessageService} from '../../service/admin/message.service'

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {
pays:any[]=[]
searchText:string;
errer_voyage_not_found:boolean;
  constructor(private voyage:VoyagesService,private message:MessageService) { }

  ngOnInit() {
    this.message.setMessage("");
    window.scroll(0, 0);
    this.getallpays();
  }
  getallpays(){
    this.voyage.getpaye().subscribe(
      (data)=>{
        this.pays=data;
        if(Object.keys(data).length==0){
          this.errer_voyage_not_found=true;
        }
      },
      (err)=>{this.errer_voyage_not_found=true}
      );
  }

}
