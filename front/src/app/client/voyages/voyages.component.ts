import { Component, OnInit } from '@angular/core';
import{VoyagesService} from '../../service/client/voyages.service';
import{Categori}from '../../admin/class/Categori';

@Component({
  selector: 'app-voyages',
  templateUrl: './voyages.component.html',
  styleUrls: ['./voyages.component.css']
})
export class VoyagesComponent implements OnInit {
pays:Categori[]=[]
  constructor(private voyage:VoyagesService) { }

  ngOnInit() {
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
