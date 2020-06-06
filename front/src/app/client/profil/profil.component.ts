import { Component, OnInit } from '@angular/core';
import{VoyagesService}from '../../service/client/voyages.service';
import{AuthService}from '../../service/auth.service';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService} from '../../service/messages/message.service';
import {formatDate} from '@angular/common';

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
hotel_print:boolean;
voyage_print:boolean;
registerFormUser:FormGroup;
registerForm:FormGroup;
submitted:boolean;
submitteduser:boolean;
message_resu:any;
nb_message_resu:number=0;
messages_envoyer:any;
nb_messages_envoyer:number=0;
message:any;
collapseExample:boolean[]=[false];
cheked:any[]=[];
cherche_message_resu:string;
cherche_message_envoyer:string;
nbitem_m_envoyer:number=3;
nbitem_m_resu:number=3;
nbnewmessage:number=0;
polling:any=1;
Loading_facture_voyage:boolean[]=[false];
Loading_annulation_voyage:boolean[]=[false]
Loading_facture_hotel:boolean[]=[false];
Loading_annulation_hotel:boolean[]=[false]
Loading_update_user:boolean=false;
Loading_envoyer_message:boolean=false;
message_false:boolean=false;
message_true:boolean=false;
  constructor(private service:VoyagesService,private auth:AuthService,private serviceHotel:ServiceHotelService,private formBuilder: FormBuilder,private messageserve:MessageService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.collapse(1);
    this.get_user();
    this.get_all_reservation_hotel_of_user();
    this.getreservationvoyage();
    this.getMessageEnvoyer();
    this.getMessageRemis();
    this.polling= setInterval(()=>{
      this.getMessageRemis();
      this.getMessageEnvoyer();
      this.getreservationvoyage();
      this.get_all_reservation_hotel_of_user();},5000);
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
       
     
  }
  ngOnDestroy() {
    clearInterval(this.polling);
}
  getreservationvoyage(){
    this.service.getreservationvoyage(localStorage.getItem('id')).subscribe((data)=>{
        this.reservationV=data;
        console.log(data);
        this.nb_reservation_voyage= Object.keys(data).length;
    });
  }
  annulation_voyage(id,i){
    console.log(id);
this.Loading_annulation_voyage[i]=true;
      this.service.annulation(id).subscribe(
        (data)=>{this.getreservationvoyage();
                  this.Loading_annulation_voyage[i]=false},
        (err)=>{this.Loading_annulation_voyage[i]=false});
      
  }
  annulation_hotel(id,i){
    console.log(id);
    this.Loading_annulation_hotel[i]=true;
      this.serviceHotel.annulation_reservation_hotel(id).subscribe(
        (data)=>{this.get_all_reservation_hotel_of_user();
                this.Loading_annulation_hotel[i]=false;},
          (err)=>{this.Loading_annulation_hotel[i]=false;});
      
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
print_hotel(r,i){
  this.Loading_facture_hotel[i]=true
  this.reservation_print=r;
    this.hotel_print=true;
    setTimeout(()=>{this.window_print_hotel();this.Loading_facture_hotel[i]=false;},2000);

}
print_voyage(r,i){
  this.Loading_facture_voyage[i]=true;
  this.reservation_print_voyage=r;
    this.voyage_print=true;
    setTimeout(()=>{this.window_print_Voayge();this.Loading_facture_voyage[i]=false},2000);
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
    return;
}
this.Loading_update_user=true;
const fr=new FormData();
  fr.append('id',this.user.id);
  fr.append('name',this.registerFormUser.get('Nom').value);
  fr.append('surname',this.registerFormUser.get('Prenom').value);
  fr.append('email',this.registerFormUser.get('Email').value);
  fr.append('tel',this.registerFormUser.get('Tel').value);
  this.auth.udete_user(fr).subscribe(
    (data)=>{console.log(data);
             this.submitteduser=false;
             this.get_user();
            this.Loading_update_user=false;},
    (err)=>{console.log(err);
            this.Loading_update_user=false;
    })
}
get f1() { return this.registerFormUser.controls; }
get f() { return this.registerForm.controls; }
envoyermessage(){
  if (this.registerForm.invalid ) {
    this.submitted=true
     return;
      }
      this.Loading_envoyer_message=true;
  const fr=new FormData();
      fr.append('id',this.user.id);
      fr.append('objet',this.registerForm.get('objet').value);
      fr.append('message',this.registerForm.get('message').value);
    this.messageserve.envoyerMessageAadmine(fr).subscribe(
          (data)=>{ console.log(data);
                  this.Loading_envoyer_message=false;
                  this.submitted=false;
                  this.registerForm.reset();
                  this.getMessageEnvoyer();
                  this.notifaction_message_envoyer(true);
                  },
            (err)=>{console.log(err); this.notifaction_message_envoyer(false); this.Loading_envoyer_message=false;});

}
getMessageEnvoyer(){
  this.messageserve.getMessageEnvoyer(localStorage.getItem('id')).subscribe(
    (data)=>{console.log(data);this.messages_envoyer=data.reverse();this.nb_messages_envoyer=Object.keys(data).length},
    (err)=>{console.log(err)}
  )
}
getMessageRemis(){
  this.messageserve.getMessageRemis(localStorage.getItem('id')).subscribe(
      (data)=>{console.log(data);this.message_resu=data.reverse();this.newmessage(data);this.nb_message_resu=Object.keys(data).length;},
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
  this.collapse(4);
  console.log(this.message)
}
msg1(m){
  this.message=m;
  this.collapse(4);
  this.messageVu(m.id);
  console.log(this.message)
}
collapse(x){
  this.cheked[1]=true;
  for(let i=1;i<=4;i++){
    if(x==i){
      this.collapseExample[i]=true;
    }else{
      this.collapseExample[i]=false;
    }
  }
}
  delete(id){
    this.messageserve.delete(id).subscribe(
          (data)=>{ this.getMessageEnvoyer();
                     this.getMessageRemis();},
          (err)=>{console.log(err);})
  }
messageVu(id){
  this.messageserve.messageVu(id).subscribe(
    (data)=>{
             this.getMessageRemis();})
}
newmessage(data){
  let n=0;
  data.forEach(function (d) {
    if(d.vu==0){
      n=n+1;
    }
});
this.nbnewmessage=n;
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
notifaction_message_envoyer(t){
if(t==true){
  console.log(t);
  this.message_true=true;
  setTimeout(()=>{this.message_true=false},2000)
}else{
  this.message_false=true;
  setTimeout(()=>{this.message_false=false},3000)
}
}
}


