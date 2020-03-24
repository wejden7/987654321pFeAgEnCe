import { Component, OnInit } from '@angular/core';
import{VoyagesService}from '../../service/client/voyages.service';
import{ReservationV}from '../../admin/class/reservation-v';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
reservationV:ReservationV[]=[];
  constructor(private service:VoyagesService) { }

  ngOnInit() {
    this.getreservationvoyage();
  }
  getreservationvoyage(){

    this.service.getreservationvoyage(localStorage.getItem('id')).subscribe((data)=>{
        console.log(data);
        this.reservationV=data;
    });

  }

}
