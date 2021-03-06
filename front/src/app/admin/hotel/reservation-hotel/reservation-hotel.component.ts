import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../.././../service/hotels/service-hotel.service';
import{formatDate} from '@angular/common';
@Component({
  selector: 'app-reservation-hotel',
  templateUrl: './reservation-hotel.component.html',
  styleUrls: ['./reservation-hotel.component.css']
})
export class ReservationHotelComponent implements OnInit {
  reservations:any[]=[];
  searchText:any;
  nbitem=10
  hotel:any;
  chambres:any;
  valide_reservation:boolean=false;
  nbreservation:number=0;
  hotels:any;
  hotelsearchText:string="";
  searchTextetas:string="";
  polling:any=0;
  type_notification:string="";
titre_notification:string="";
soustitre_notification:string="";
notification:boolean=false;
msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  constructor(private service:ServiceHotelService) { }

  ngOnInit() {
    this.get_all_reservation();
    this.gethotel();
   this.polling= setInterval(()=>{this.get_all_reservation()},5000)
  }
ngOnDestroy() {
    clearInterval(this.polling);
}
  get_all_reservation(){
    this.service.get_all_reservation_hotel().subscribe(
      (data)=>{this.reservations=data.reverse();
              this.nbreservation=Object.keys(data).length;
              
              
                console.log(data)},
      (err)=>{console.log(err)});
    }
    edite(p){
      this.hotel=p;
      this.service.get_all_chambre_reserve(p.reservation.id).subscribe(
        (data)=>{console.log(data);this.chambres=data;this.valide_reservation=true},
        (err)=>{ this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);})
    }

    window_print(): void {
     this. valide_reservation=true
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
    myDate() {
      return formatDate(new Date(), 'd/MM/y', 'en');
   }
   vaider(id){
      this.service.validation_reservation_hotel(id).subscribe(
        (data)=>{this.get_all_reservation(),console.log(data)},
        (err)=>{ this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);
                
              });

   }
   annulation(id){
     this.service.annulation_reservation_hotel(id).subscribe(
          (data)=>{this.get_all_reservation()},
          (err)=>{ this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);});
   }
   gethotel(){
     this.service.get_all_hotel().subscribe(
       (data)=>{this.hotels=data},
       (err)=>{console.log(err)});
   }
   filterForehotel(d){
    this.hotelsearchText=d;
   }
   filterForeCasts(d){
     this.searchTextetas=d;
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
   taxeHotel(r){
    let date_in=new Date(r.date_in);
    let date_out=new Date(r.date_out);
    let s= Math.abs(date_in.getTime() - date_out.getTime()) /(1000 * 3600 * 24);
    return s*6;
  }
  prixt(r){
    const t= Number( r.prix)  + this.taxeHotel(r);
    return t;
  }
}
