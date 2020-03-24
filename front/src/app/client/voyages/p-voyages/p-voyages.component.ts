import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{VoyagesService} from '../../../service/client/voyages.service'
import { ActivatedRoute, Data } from '@angular/router';
import{Periode} from '../../../admin/class/periode';
import{Programme} from '../../../admin/class/programme';
import{Voyage} from '../../../admin/class/voyage';
import{Images} from '../../../admin/class/images';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import{Register} from '../../../admin/class/register';

@Component({
  selector: 'app-p-voyages',
  templateUrl: './p-voyages.component.html',
  styleUrls: ['./p-voyages.component.css']
})
export class PVoyagesComponent implements OnInit {
  programmes:Programme[]=[];
  periodes:Periode[]=[]
  images:Images[]=[];
  //******** 
  register:Register;
  voyages:Voyage;
 
  id:string;
  prix:number;
  date:Date;
  dateto:Date
  jour:number;
  id_tarif:string;
  registre:boolean;
  login:boolean;
  //***** 
  registerForm: FormGroup;
  submitted = false;
  Unauthorised:boolean;
  registerForm2: FormGroup;
  submitted2 = false;
  reserver_valide:boolean=false;
  reserve_submitted:boolean=false;
  id_user:string;
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router : Router,private voyage:VoyagesService,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.registerForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      prenom:['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.registre=false;
    this.login=false;
    this.getvoyage();
    this.getallprogrammeofonevoyage();
    this.getperiode();
    this.getallimageofVoyage();
    
  }

  getallprogrammeofonevoyage(){
         this.voyage.getallprogrammeofonevoyage(this.id).subscribe(
              (data)=>{
                          this.programmes=data;
                       });
  }
  getperiode(){
    this.voyage.getperiode(this.id).subscribe(
      (data)=>{
        this.periodes=data;
        this.prix= this.periodes[0].prix;
       this.id_tarif=this.periodes[0].id;
      
      }
    )
  }
  getvoyage(){
    this.voyage.getvoyage(this.id).subscribe((data)=>{
      this.voyages=data;
    }
    );
  }
 
  filterForeCasts(p) {
    this.id_tarif=this.periodes[p].id
    this.prix= this.periodes[p].prix;
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
  onPrint() {
    window.print();
  }
 // reservetion 
  reserver(){
    this.reserver_valide=false
    this.reserve_submitted=true;
    if(localStorage.getItem('isLoggedIn') == "true"){
      const fr=new FormData();
          fr.append('id_user',localStorage.getItem('id') );
          fr.append('id_voyage',this.id);
          fr.append('id_tarif',this.id_tarif);
      this.voyage.reserve(fr).subscribe(
        (data)=>{
        this.reserver_valide=true;
        this.login=false;
        this.registre=false;
      },
      (err)=>{this.reserver_valide=false}

      );
    
    }else{
    this.login=true;
    }
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
                  console.log(this.register);
                  console.log(this.register.token);
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.register.token);
                  localStorage.setItem('name', this.register.name);
                  localStorage.setItem('role', this.register.role);
                  localStorage.setItem('id', this.register.id);
                  this.reserver();
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
           fr.append('email',this.registerForm2.get('email').value);
           fr.append('name',this.registerForm2.get('nom').value);
           fr.append('password',this.registerForm2.get('password').value);
           fr.append('c_password',this.registerForm2.get('password').value);
   this.auth.setclient(fr).subscribe((data)=>{
                      this.register=data.success;
                      console.log(this.register);
                      console.log(this.register.token);
                      localStorage.setItem('isLoggedIn', "true");
                      localStorage.setItem('token', this.register.token);
                      localStorage.setItem('name', this.register.name);
                      localStorage.setItem('role', this.register.role);
                      localStorage.setItem('id', this.register.id);
                      this.reserver();
                      this.onReset2()
           });
       
   }
   onReset2() {
                this.submitted = false;
                this.registerForm.reset();
     }
         

}

