import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-h-body',
  templateUrl: './h-body.component.html',
  styleUrls: ['./h-body.component.css']
})
export class HBodyComponent implements OnInit {
 

  t:number
nb:number;
k:number
choix:number;

  constructor() { }

  ngOnInit() {
    this.t=12;
    this.nb=3;
    this.k=1;
    this.choix=1
  }
  createRange(number){
    var items: number[] = [];
    for(var i =1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  createRange2(number){
    var items2: number[] = [];
    for(var i =this.k; i <= number; i++){
       items2.push(i);
    }
    return items2;
  }
  avent(){
    if(this.nb<this.t){
      this.nb=this.nb+1;
    }else{
      this.nb=3;
    }
    if(this.nb!=3){
      this.k=this.k+1;
    }else{
      this.k=1;
    }
   
    

  }
  apret(){
    if(this.k>1){
      this.k=this.k-1;
    }else{
      this.k=10;
    }
    if(this.k!=10){
      this.nb=this.nb-1;
    }else{
      this.nb=12;
    }
  }

}