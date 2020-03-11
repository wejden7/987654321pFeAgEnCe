import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
 
choix:number;
aller:boolean;
chombre:any[]=[];
nbchamber:number;
 date :string;
d:Date;
minPickerDate:any;


    


  constructor( ) {
  this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
  };
   
   }
  ngOnInit() {
   
    this.aller=true;
   
  
    
    this.choix=1;
    
  }
      //choix de recherche de hotel ou vol si choix=1 aficher le bar de recherche de hotel el choix=2 de vol
      dochoix(d){
                 this.choix=d;
                 console.log(this.date);
                 }
   //chois de vol aller ou aller/retour si aller==false donc le vol et aller/retour
     cheked(n){
               if(n==1){this.aller=false;}else{this.aller=true;}
               }
    //le clinet donne les nombre de chonbre que rezerver et je affiche pour remplire nb adultes,enfant et bebes
    createRange(number){
                var items: number[] = [];
                for(var i = 1; i <= number; i++){
                   items.push(i);
                }
                return items;
              }
}
