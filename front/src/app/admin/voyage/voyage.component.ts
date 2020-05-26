import { Component, OnInit } from '@angular/core';

import{VoyageService} from '../../service/admin/voyage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService}from '../../service/admin/message.service';


@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit {
  data:any[]=[];
  type:string="normal";
  selectfile:File=null;
  nb:number;
  registerForm: FormGroup;
  submitted :boolean;
  succes:boolean;
  valide:boolean=false;
  existe:boolean=false;
  statistiques:any;
  cherche:string="";

  constructor( private payerservice:VoyageService,private formBuilder: FormBuilder) {
     
    

  }
  ngOnInit() {
    window.scroll(0, 0);
          this.getAllPaye();
          this.registerForm = this.formBuilder.group({
                payer: [null, [Validators.required]],
                image:[null, [Validators.required ]]}
                 );
  }
//control
  get f() { return this.registerForm.controls; }
//end control

//file image uplode
         fileChange(event){
                      this.selectfile=<File>event.target.files[0];
                      }
//end file change 
//add pays of categorie
  ajouter_payer(){
        this.submitted = false;
         // stop here if form is invalid
       if (this.registerForm.invalid) {
                  this.submitted=true
                  this.succes=false;
                  this.valide=false;
                  this.existe=false;
                   return;
                 }
        const fr=new FormData();
          fr.append('image',this.selectfile,this.selectfile.name);
          fr.append('payer',this.registerForm.get("payer").value);
          fr.append('type',this.type);
     this.payerservice.ajouter_payer(fr).subscribe(
            (data)=>{
                   this.registerForm.reset();
                    this.submitted = false;
                    this.valide=true;
                    this.succes=true; 
                    setTimeout (() => {
                      this.valide=false;
                    this.succes=false; 
                    }, 3000);
                    this.existe=false;
                    this.getAllPaye();
                  },
             (err)=>{
                      this.submitted = false;
                      this.existe=true;
                      
                    } 
                    );
}
//end add pays

// get all pays
        getAllPaye(){
                  this.payerservice.getpaye().subscribe((data)=>{
                  this.data=data;
                  console.log(this.data)
                  this.statistique()
                  this.nb=Object.keys(this.data).length;
             });
            } 
//end get all pays

//delete pays by id 
            delete(id){
              this.payerservice.deletebyid(id).subscribe((data)=>{
                this.getAllPaye();
              }

              );
             
            }
//end delete 
//add sur button pays 
            add()  {
            this.submitted = false;
            this.succes=true;
            this.registerForm.reset();
            this.valide=false;
            this.existe=false;
            }    
//end button    
//statistique
statistique(){
  this.payerservice.get_count_reservation_voyage_of_pays().subscribe((data)=>{
    console.log(data);
    this.statistiques=data;
  });

}
}
