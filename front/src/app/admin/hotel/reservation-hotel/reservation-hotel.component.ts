import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../.././../service/hotels/service-hotel.service'
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
  constructor(private service:ServiceHotelService) { }

  ngOnInit() {
    this.get_all_reservation();
  }
  get_all_reservation(){
    this.service.get_all_reservation_hotel().subscribe(
      (data)=>{this.reservations=data.reverse()},
      (err)=>{console.log(err)});
    }
    edite(p){
      this.hotel=p;
    }
    printToCart(printSectionId: string){
      let popupWinindow
      let innerContents = document.getElementById(printSectionId).innerHTML;
      popupWinindow = window.open('', '_blank', 'scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
      popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</body></html>');
      popupWinindow.document.close();
}

}
