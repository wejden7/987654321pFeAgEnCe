import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-b-omra',
  templateUrl: './b-omra.component.html',
  styleUrls: ['./b-omra.component.css']
})
export class BOmraComponent implements OnInit {

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
