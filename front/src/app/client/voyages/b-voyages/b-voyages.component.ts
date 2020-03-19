import { Component, OnInit,Input } from '@angular/core';
import{VoyagesService} from '../../../service/client/voyages.service'
import{Categori}from '../../../admin/class/Categori';

@Component({
  selector: 'app-b-voyages',
  templateUrl: './b-voyages.component.html',
  styleUrls: ['./b-voyages.component.css']
})
export class BVoyagesComponent implements OnInit {
  @Input()paye:Categori[];
  searchText:any;
  constructor(private voyage:VoyagesService) { }

  ngOnInit() {
   
  }

  createRange(number){
    var items: number[] = [];
    for(var i =0; i <= number; i++){
       items.push(i);
    }
    return items;
  }

 
}
