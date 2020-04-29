import { Component, OnInit } from '@angular/core';
import{VoyagesService}from '../../service/client/voyages.service';
import{AuthService}from '../../service/auth.service';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService} from '../../service/messages/message.service';
import {formatDate} from '@angular/common';
import { from } from 'rxjs';
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
registerForm:FormGroup;
submitted:boolean;
submitteduser:boolean;
message_resu:any;
messages:any;
message:any;
collapseExample:boolean[]=[false];
cheked:any[]=[];
cherche_message_resu:string;
cherche_message_envoyer:string;
nbitem_m_envoyer:number=3;
nbitem_m_resu:number=3;
  constructor(private service:VoyagesService,private auth:AuthService,private serviceHotel:ServiceHotelService,private formBuilder: FormBuilder,private messageserve:MessageService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.registerFormUser=this.formBuilder.group({
          civilite:["Civilité...", [Validators.required]],
          Nom:["", [Validators.required]],
          Prenom:["", [Validators.required]],
          Email:["", [Validators.required,Validators.email]],
          Tel:["", [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
    });
    this.registerForm = this.formBuilder.group({
          objet: [null, [Validators.required]],
          message: [null, [Validators.required]],
        });
        this.collapse(1);
        this.getMessageEnvoyer();
        this.getMessageRemis();
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
window_print_hotel(): void {
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
window_print_Voayge(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-Voyage').innerHTML;
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
get f() { return this.registerForm.controls; }
envoyermessage(){
  if (this.registerForm.invalid ) {
    this.submitted=true
     return;
      }
  const fr=new FormData();
      fr.append('id',this.user.id);
      fr.append('a',localStorage.getItem('id'));
      fr.append('objet',this.registerForm.get('objet').value);
      fr.append('message',this.registerForm.get('message').value);
    this.messageserve.envoyermessage(fr).subscribe(
            (data)=>{console.log(data);
               this.getMessageEnvoyer();
               this.registerForm.reset();
                },
            (err)=>{console.log(err)})

}
getMessageEnvoyer(){
  this.messageserve.getMessageEnvoyer(localStorage.getItem('id')).subscribe(
    (data)=>{console.log(data);this.messages=data},
    (err)=>{console.log(err)}
  )
}
getMessageRemis(){
  this.messageserve.getMessageRemis(localStorage.getItem('id')).subscribe(
      (data)=>{console.log(data);this.message_resu=data},
      (err)=>{console.log(err)});
}
date(d){
  
  let date=new Date()
  let datec=new Date(d.created_at)
 let s= Math.abs(date.getTime() - datec.getTime()) / 60000;
  let time= Math.round( s);
  if(time==0){
    return "a linstent"
  }else if(time<60){
    return " Il y a "+ time +" minutes ";
  }else if(time>=60){
    let heur= Math.round(time/60);
    if(heur<24){
      return " Il y a "+ heur +" heur";
    }else{
      return " Il y a "+ Math.round(heur/24)+ " jour";
    }
  }
}
msg(m){
  this.message=m;
  console.log(this.message)
}
collapse(x){
  this.cheked[1]=true;
  for(let i=1;i<=3;i++){
    if(x==i){
      this.collapseExample[i]=true;
    }else{
      this.collapseExample[i]=false;

    }
    
  }

}
}
