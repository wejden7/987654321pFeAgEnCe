import { Component, OnInit } from '@angular/core';
import{VoyagesService} from '../../service/client/voyages.service';


@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {
pays:any[]=[]
searchText:string;
  constructor(private voyage:VoyagesService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.getallpays();
  }
  getallpays(){
    this.voyage.getpaye().subscribe(
      (data)=>{
        console.log(data);
        this.pays=data;
      }
      );
  }

}
