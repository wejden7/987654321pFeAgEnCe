import { Component, OnInit } from '@angular/core';
import{VoyagesService}from '../../service/client/voyages.service';
import{AuthService}from '../../service/auth.service';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';
FormData
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

reservationV:any[];
user:any=null;
reservation_print:any;
reservation_print_voyage:any;
nb_reservation_hotel:number=0;
nb_reservation_voyage:number=0;
reservation_hotel:any;
print:boolean;
hotel_print:boolean;
voyage_print:boolean;
registerFormUser:FormGroup;
submitteduser:boolean;
  constructor(private service:VoyagesService,private auth:AuthService,private serviceHotel:ServiceHotelService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerFormUser=this.formBuilder.group({
      civilite:["Civilité...", [Validators.required]],
      Nom:["", [Validators.required]],
      Prenom:["", [Validators.required]],
      Email:["", [Validators.required,Validators.email]],
      Tel:["", [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
    });
    this.get_user();
    this.getreservationvoyage();
   this.get_all_reservation_hotel_of_user();
  }
  getreservationvoyage(){
    this.service.getreservationvoyage(localStorage.getItem('id')).subscribe((data)=>{
        this.reservationV=data;
        this.nb_reservation_voyage= Object.keys(data).length;
    });
  }
  annulation_voyage(id){
    console.log(id);
      this.service.annulation(id).subscribe((data)=>{});
      this.getreservationvoyage();
  }
  annulation_hotel(id){
    console.log(id);
      this.serviceHotel.annulation_reservation_hotel(id).subscribe((data)=>{});
      this.get_all_reservation_hotel_of_user();
  }
  get_user(){
    this.auth.get_user().subscribe(
      (data)=>{this.user=data;this.set_user() },
      (err)=>{console.log(err)})
  }
  get_all_reservation_hotel_of_user(){
    this.serviceHotel.get_all_reservation_of_user(localStorage.getItem('id')).subscribe(
      (data)=>{this.nb_reservation_hotel= Object.keys(data).length;this.reservation_hotel=data.reverse();console.log(data)},
      (err)=>{console.log(err)})
  }
print_hotel(r){
  this.reservation_print=r;
    this.print=true;
    this.hotel_print=true;
}
print_voyage(r){
  this.reservation_print_voyage=r;
    this.print=true;
    this.voyage_print=true;
}
window_print(){
  window.print();
}
myDate() {
   return formatDate(new Date(), 'd/MM/y', 'en');
} 
set_user(){
  this.registerFormUser.get('Nom').setValue(this.user.name);
  this.registerFormUser.get('Prenom').setValue(this.user.surname);
  this.registerFormUser.get('Email').setValue(this.user.email);
  this.registerFormUser.get('Tel').setValue(this.user.tel);
}
updete_user(){
  if(this.registerFormUser.invalid){
    this.submitteduser=true;
}
const fr=new FormData();
  fr.append('id',this.user.id);
  fr.append('name',this.registerFormUser.get('Nom').value);
  fr.append('surname',this.registerFormUser.get('Prenom').value);
  fr.append('email',this.registerFormUser.get('Email').value);
  fr.append('tel',this.registerFormUser.get('Tel').value);
  this.auth.udete_user(fr).subscribe(
    (data)=>{console.log(data); this.get_user();},
    (err)=>{console.log(err)})
}
get f1() { return this.registerFormUser.controls; }

}
