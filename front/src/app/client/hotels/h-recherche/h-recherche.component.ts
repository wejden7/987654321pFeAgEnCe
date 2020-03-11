import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-h-recherche',
  templateUrl: './h-recherche.component.html',
  styleUrls: ['./h-recherche.component.css']
})
export class HRechercheComponent implements OnInit {
  nbchamber:number;
  minPickerDate:any;


  constructor() {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()
  };
   }

  ngOnInit() {
  
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }


}
