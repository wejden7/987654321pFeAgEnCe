import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-r-vol',
  templateUrl: './r-vol.component.html',
  styleUrls: ['./r-vol.component.css']
})
export class RVolComponent implements OnInit {

  nbchamber:number;
  minPickerDate:any;
  aller:boolean


  constructor() {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()
  };
   }

  ngOnInit() {
    this.aller=true;
  
  }
  cheked(n){
    if(n==1){this.aller=false;}else{this.aller=true;}
    }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
