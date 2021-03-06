import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import {formatDate} from '@angular/common';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
reservation:any[]=[];
pays:any;
voyages:any=null;
searchText:string;
voyage:any="";
_pays:string="";
nbitem:any=10;
voyege_res:any=null;
search:string;
searchvoyage:string="";
data:any="Tout";
nbReservaion:number=0;
polling:any=0;
      type_notification:string="";
      titre_notification:string="";
      soustitre_notification:string="";
      notification:boolean=false;
      msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  constructor(private service:VoyageService) { }

  ngOnInit() {
    this.getallrezervation();
    this.getpays();
    this.polling=setInterval(()=>{ this.getallrezervation();},5000)
   
  }
  ngOnDestroy() {
      clearInterval(this.polling);
  }
  getallrezervation(){
          this.service.getallrezervation().subscribe(
              (data)=>{ console.log(data)
                       this.nbReservaion=Object.keys(data).length;
                       if(this.nbReservaion>0){
                        this.reservation=data;
                        this.reservation.reverse();
                       }else{
                         this.reservation=null;
                       }},
            (err)=>{console.log(err)}           );
                      }
   annulation(id){
    this.service.annulation(id).subscribe(
      (data)=>{this.getallrezervation();},
      (err)=>{this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);});
   }
   validation(id){
    this.service.validation(id).subscribe(
      (data)=>{ this.getallrezervation();},
      (err)=>{
        if(err.error.error=="complete"){
          this.type_notification='error';
          this.titre_notification='';
          this.soustitre_notification="nombre de place et indesponible";
          this.notification=true;
        }else{this.type_notification='error';
        this.titre_notification='';
        this.soustitre_notification=this.msg;
        this.notification=true;}
              
              setTimeout(()=>{ this.notification=false;},3000);});
   }
   enatente(id){
    this.service.enatente(id).subscribe(
      (data)=>{ this.getallrezervation();},
      (err)=>{
            this.type_notification='error';
            this.titre_notification='';
            this.soustitre_notification=this.msg;
            this.notification=true;
            setTimeout(()=>{ this.notification=false;},3000);
      });
   }
   getpays(){
     this.service.getpaye().subscribe((data)=>{
      this.pays=data;
     });
   }
   getvoyage(id){
     this.service.getallvoyage(id).subscribe(
       (data)=>{
         if(Object.keys(data).length<1){
          this.voyages=null;
        
         }else{
          this.voyages=data;
         }
    
     },
     (err)=>{
      this.voyages=null;
     })
   }
 
   
   myDate() {
    return formatDate(new Date(), 'd/MM/y', 'en');
 } 
 print(r){
   this.voyege_res=r;
 }
   window_print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=50%,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
      <head><link rel="stylesheet" type="text/css" href="style.css" />
      <link rel="stylesheet" href="./assets/dist/admint.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

      </head>
    <body onload="window.print();window.close()">`+printContents +`</body>
      </html>`
    );
    popupWin.document.close();
}
filterForeCasts(d){
 console.log(d);
 this.searchText=d;
 }
 filterForepays(p){
   console.log(p)
  this._pays=p.payer
  if(p=="Tout"){
    this.searchvoyage="";
    this.voyages=null;
  }else{
    this.getvoyage(p.id)
  }}
 filterForeVoyage(p){
this.searchvoyage=p;
 }
 traduction(f){
  if(f=='valider'){
    return 'confirmé';
  }else if(f=='annuler'){
    return 'annulée';
  }else if(f=='en attente'){
   return 'en attente';
  }
}
}
