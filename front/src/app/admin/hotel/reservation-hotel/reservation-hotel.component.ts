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
  constructor(private service:ServiceHotelService) { }

  ngOnInit() {
    this.get_all_reservation();
  }
  get_all_reservation(){
    this.service.get_all_reservation_hotel().subscribe(
      (data)=>{this.reservations=data.reverse(),console.log(data)},
      (err)=>{console.log(err)});
    }
    edite(p){
      this.hotel=p;
      this.service.get_all_chambre_reserve(p.reservation.id).subscribe(
        (data)=>{console.log(data);this.chambres=data;this.valide_reservation=true},
        (err)=>{console.log(err)})
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
    myDate() {
      return formatDate(new Date(), 'd/MM/y', 'en');
   }
   vaider(id){
      this.service.validation_reservation_hotel(id).subscribe(
        (data)=>{this.get_all_reservation(),console.log(data)},
        (err)=>{console.log(err);
                
              });

   }
   annulation(id){
     this.service.annulation_reservation_hotel(id).subscribe(
          (data)=>{this.get_all_reservation()},
          (err)=>{console.log(err)});
   }
}
