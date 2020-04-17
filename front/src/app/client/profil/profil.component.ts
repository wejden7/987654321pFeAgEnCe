import { Component, OnInit } from '@angular/core';
import{VoyagesService}from '../../service/client/voyages.service';
import{AuthService}from '../../service/auth.service';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

reservationV:any[];
user:any=null;
voyage:string;
tarif:string;
nbreservation:number;
nb_reservation_hotel:number=0;
reservation_hotel:any;
  constructor(private service:VoyagesService,private auth:AuthService,private serviceHotel:ServiceHotelService) { }

  ngOnInit() {
    this.get_user();
    this.getreservationvoyage();
   this.get_all_reservation_hotel_of_user();
  }
  getreservationvoyage(){
    this.service.getreservationvoyage(localStorage.getItem('id')).subscribe((data)=>{
        this.reservationV=data;
        this.nbreservation = Object.keys(data).length;
        console.log(this.reservationV);
        
    });
  }
  annulation(id){
    console.log(id);
      this.service.annulation(id).subscribe((data)=>{});
      this.getreservationvoyage();
  }
  get_user(){
    this.auth.get_user().subscribe(
      (data)=>{this.user=data },
      (err)=>{console.log(err)})
  }
  get_all_reservation_hotel_of_user(){
    this.serviceHotel.get_all_reservation_of_user(localStorage.getItem('id')).subscribe(
      (data)=>{this.nb_reservation_hotel= Object.keys(data).length;this.reservation_hotel=data.reverse();console.log(data)},
      (err)=>{console.log(err)})
  }
}
