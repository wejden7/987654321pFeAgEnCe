import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../service/admin/voyage.service';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service'
import {MessageService} from '../../service/admin/message.service';
import{AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nbreservation:any=0;
  nbreservation_hotel:any=0;
  nbreservation_omra:any=0;
  constructor(private authe:AuthService,private service:VoyageService,private hotelserver:ServiceHotelService ,private message:MessageService) { }

  ngOnInit() {  
    setInterval(() => {
      this.getreservationhotel()
      this.getreservation();
      this.getreservationOmra();
          },3000);

  }
  getreservation(){
    this.service.getreservaionnb().subscribe((data)=>{
     this.nbreservation=data;

    });
  }
getreservationhotel(){
  this.hotelserver.getNbReservationEnatent().subscribe(
    (data)=>{this.nbreservation_hotel=data},
    (err)=>{console.log(err)}
  );

}
getreservationOmra(){
  this.service.getreservaionOmranb().subscribe(
    (data)=>{this.nbreservation_omra=data})
}
deconnexion(){
  this.authe.logout();
}
}
