import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../service/admin/voyage.service';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nbreservation:any=0;
  nbreservation_hotel:any=0;
  nbreservation_omra:any=0;
  constructor(private service:VoyageService,private hotelserver:ServiceHotelService) { }

  ngOnInit() {
    setInterval(() => {
      this.getreservation();
      this.getreservationhotel();
      this.getreservationOmra();
          },3000);
    
  }
  getreservation(){
    this.service.getreservaion().subscribe((data)=>{
      console.log(data);
     this.nbreservation=data;

    });
  }
getreservationhotel(){
  this.hotelserver.get_all_reservation_hotel().subscribe(
    (data)=>{this.nbreservation_hotel=Object.keys(data).length},
    (err)=>{console.log(err)}
  );

}
getreservationOmra(){
  this.service.getallrezervationOmra().subscribe((data)=>{this.nbreservation_omra=Object.keys(data).length})
}
}
