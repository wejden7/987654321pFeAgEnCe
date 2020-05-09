import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{VoyagesService} from '../../../service/client/voyages.service'
import { ActivatedRoute, Data } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import {formatDate} from '@angular/common';
import {MessageService} from '../../../service/admin/message.service'

@Component({
  selector: 'app-b-omra',
  templateUrl: './b-omra.component.html',
  styleUrls: ['./b-omra.component.css']
})
export class BOmraComponent implements OnInit {
  programmes:any[]=[];
  periodes:any[]=[]
  images:any[]=[];
  user:any;
  reservation_print_voyage:any;
  //******** 
  register:any;
  voyages:any;
  image_couverteur:any;
  titre:string;
  id:string;
  prix:number;
  date:Date;
  dateto:Date
  jour:number;
  id_tarif:string;
  login:boolean;
  reservation:boolean;
  error_registre=true;
  //***** 
  registerForm: FormGroup;
  submitted = false;
  Unauthorised:boolean=false;
  registerForm2: FormGroup;
  submitted2 = false;
  reserver_valide:boolean=false;
  reserve_submitted:boolean=false;
  categorie:string
  pays:string
  voyage_print:boolean=false;
  condition:any=false;
  err_condition:boolean=false;
  datavisa:any;
  nbVisa:number;
  dataNonservice:any;
  nbNonservice:number;
  dataservice:any;
  nbservice:number;
  registerForm3:FormGroup;
  submitted3:boolean=false;
  
  prixAdulte:number;
  prixEnfant:number;
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router : Router,private voyage:VoyagesService,private route: ActivatedRoute,private message:MessageService) {
 
   }

  ngOnInit() {
  this.message.setMessage("");
    window.scroll(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.login=false;
    this.reservation=false;
    this.error_registre=false
    this.getvoyage();
    this.getallprogrammeofonevoyage();
    this.getperiode();
    this.getallimageofVoyage();
    this.getServiceNonInclusOfVoyage();
    this.getServiceInclusOfVoyage();

    
    
    this.registerForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      civilite:["Civilité...", [Validators.required]],
      tel:['', [Validators.required, Validators.minLength(8)]],
      Prenom:["", [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.registerForm3 = this.formBuilder.group({
      adulte: [1, [Validators.required]],
      enfant: [0, [Validators.required]],
      });
    
  }
  get f3() { return this.registerForm3.controls; }
  myDate() {
    return formatDate(new Date(), 'd/MM/y', 'en');
 } 
 getServiceNonInclusOfVoyage(){
  this.voyage.getServiceNonInclusOfVoyage(this.id).subscribe(
       (data)=>{this.dataNonservice=data;
                  this.nbNonservice=Object.keys(data).length;
                  },
       (err)=>{console.log(err)}
  )
}
getServiceInclusOfVoyage(){
  this.voyage.getServiceInclusOfVoyage(this.id).subscribe(
    (data)=>{this.dataservice=data;
               this.nbservice=Object.keys(data).length;
               },
    (err)=>{console.log(err)}
)
}
  getallprogrammeofonevoyage(){
         this.voyage.getallprogrammeofonevoyage(this.id).subscribe(
              (data)=>{
                          this.programmes=data;
                       });
  }
 
  getvoyage(){
    this.voyage.getvoyage(this.id).subscribe((data)=>{
      this.voyages=data;
      this.titre=data.titre;
     this.image_couverteur=data.image;
      this.categorie=data.categorie;
      this.pays=data.pays;
      this.getvisaofpays();
    }
    );
  }
  getvisaofpays(){
    console.log(this.categorie)
    this.voyage.getvisaofpays(this.categorie).subscribe(
          (data)=>{this.datavisa=data;
                  this.nbVisa=Object.keys(data).length;
                  }
    )
  }
  getperiode(){
    this.voyage.getperiode(this.id).subscribe(
           (data)=>{
                      this.periodes=data;
                      console.log(data);
                      this.prixAdulte= this.periodes[0].prixAdulte;
                      this.prixEnfant= this.periodes[0].prixEnfant;
                      this.id_tarif=this.periodes[0].id;
                      this.date=this.periodes[0].date;
                      this.ajouter(this.date);},
          (err)=>{console.log(err)}
    )
  }
  
 
  filterForeCasts(p) {
    this.id_tarif=this.periodes[p].id
    this.date=this.periodes[p].date;
    this.prixAdulte= this.periodes[p].prixAdulte;
    this.prixEnfant= this.periodes[p].prixEnfant;

  }

  ajouter(date){
    this.dateto=new Date(date);
    this.jour=Number(this.voyages.nbjour);
  return  this.dateto.setDate(this.dateto.getDate()+this.jour-1 );

  }
 
  getallimageofVoyage(){
    this.voyage.getallimageofVoyage(this.id).subscribe((data)=>{
      
  
      this.images=data;
           });
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
demande(){
  this.reservation=true;
  if(localStorage.getItem('isLoggedIn') == "true"){
    this.login=true
this.auth.get_user().subscribe(
    (data)=>{
      this.user=data;
    },
    (err)=>{console.log(err)})
  }else{
    this.login=false;
    }
}
 // reservetion 
 reserver(){
  if(this.registerForm3.invalid||this.registerForm3.get("adulte").value<=0||this.registerForm3.get("enfant").value<0){
    this.submitted3=true;
    return ;
  }
  this.submitted3=false;
  if(!this.condition){
    this.err_condition=true;
    return
  }
  
  this.reserver_valide=false
  this.reserve_submitted=true;
    const fr=new FormData();
        fr.append('id_user',localStorage.getItem('id') );
        fr.append('id_voyage',this.id);
        fr.append('id_tarif',this.id_tarif);
        fr.append('adulte',this.registerForm3.get("adulte").value);
        fr.append('enfant',this.registerForm3.get("enfant").value);
    this.voyage.reserve(fr).subscribe(
      (data)=>{this.reservation_print_voyage=data[0];
      this.reserver_valide=true;
      
    },
    (err)=>{console.log(err); this.reserver_valide=false}

    );
}
  
  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm2.controls; }
  //submit of connexion de client 
onSubmit(){
  this.submitted = true;
  if (this.registerForm.invalid) {
         return;
     }
     const fr=new FormData();
                fr.append('email',this.registerForm.get('email').value);
                fr.append('password',this.registerForm.get('password').value);
    

     this.auth.login(fr).subscribe(
       (data)=>{
                  this.register=data.success;
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.register.token);
                  localStorage.setItem('name', this.register.name);
                  localStorage.setItem('role', this.register.role);
                  localStorage.setItem('id', this.register.id);
                  this.demande();
                  this.onReset();
         },
         (err)=>{
           this.Unauthorised=true;
         }
         );
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

//submit of register client 
onSubmit2() {
  this.submitted2 = true;

        if (this.registerForm2.invalid) {
               return;
           }
           const fr=new FormData();
           fr.append('civilite',this.registerForm2.get('civilite').value);
           fr.append('email',this.registerForm2.get('email').value);
           fr.append('name',this.registerForm2.get('nom').value);
           fr.append('surname',this.registerForm2.get('Prenom').value);
           fr.append('tel',this.registerForm2.get('tel').value);
           fr.append('password',this.registerForm2.get('password').value);
   this.auth.setclient(fr).subscribe(
     (data)=>{
                      this.register=data.success;
                      localStorage.setItem('isLoggedIn', "true");
                      localStorage.setItem('token', this.register.token);
                      localStorage.setItem('name', this.register.name);
                      localStorage.setItem('role', this.register.role);
                      localStorage.setItem('id', this.register.id);
                      this.demande();
                      this.onReset2()
           },
     (err)=>{this.error_registre=true}
           );
       
   }
onReset2() {
                this.submitted2 = false;
                this.registerForm2.reset();
     }
  



}
