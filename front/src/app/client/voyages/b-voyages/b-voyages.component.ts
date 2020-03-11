import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-b-voyages',
  templateUrl: './b-voyages.component.html',
  styleUrls: ['./b-voyages.component.css']
})
export class BVoyagesComponent implements OnInit {

  constructor() { }

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
