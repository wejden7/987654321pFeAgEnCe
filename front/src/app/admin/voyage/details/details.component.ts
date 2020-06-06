import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id:string;
  cat:any;
  voyage:any[]=[];
  nb:number;
  paye_image:any;
  updeteimagevaide:boolean;
  submitted:boolean;
  submitted7:boolean;
  submittedupdete:boolean;
  
  //le ng model
  selectfile:File=null;
  pays:string;
  visadData:any=null;
  //end ng model
  registerForm: FormGroup;
  registerForm7: FormGroup;
  updeteimageform:FormGroup;
  visaform:FormGroup;
  submittedvisa:boolean;
  updatevisabutton:boolean=false;
  id_visa_update:any;
  nbetapevisa:number=0;
  updateimage:boolean[]=[false];
  sherche:string="";
  voayge_existe:boolean;
  //Loding
  Loading_update_image:boolean=false;
  Loading_save_voyage:boolean=false;
  Loading_save_visa:boolean=false;
  Loading_update_visa:boolean=false;
  type_notification:string="";
  titre_notification:string="";
  soustitre_notification:string="";
  notification:boolean=false;
  msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  constructor(private formBuilder: FormBuilder, private payerservice:VoyageService, private route: ActivatedRoute) {
   
   
   }
   get f() { return this.registerForm.controls; }
   get f1() { return this.updeteimageform.controls; }
   get f7() { return this.registerForm7.controls; }
   get f2() { return this.visaform.controls; }
   
  ngOnInit() {
    window.scroll(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.getpayebyid();
    this.getvoyage();
    this.getvisaofpays();
    this.registerForm = this.formBuilder.group({
            titre: [null, [Validators.required]],
            nbjour:[null, [Validators.required,Validators.min(1)]],
            image:[null, [Validators.required ]],});
   this.updeteimageform = this.formBuilder.group({
              file:['', [Validators.required ]],});
  this.registerForm7=this.formBuilder.group({
                image:[null, [Validators.required ]],
              });
  this.visaform=this.formBuilder.group({
                visa:[null, [Validators.required ]],
              });
              
  }
  addvisa(){
    if(this.visaform.invalid){
      this.submittedvisa=true;
      return;
    }
    this.Loading_save_visa=true;
    this.submittedvisa=false;
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id);
    this.payerservice.addvisa(fr).subscribe(
          (data)=>{this.Loading_save_visa=false;
                    this.visaform.reset();
                    this.getvisaofpays();
                  },
          (err)=>{this.Loading_save_visa=false;
                  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);})
  }
  getvisaofpays(){
    this.payerservice.getvisaofpays(this.id).subscribe(
        (data)=>{this.visadData=data;
                  this.nbetapevisa=Object.keys(data).length;
                  },
        (err)=>{console.log(err)})
  }
  deletevisa(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
    this.payerservice.deletvisaofpays(id).subscribe(
       (data)=>{this.getvisaofpays();
                this.updatevisabutton=false;
                this.visaform.reset();
                },
        (err)=>{this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);});}
  }
  updatevisa(v){
    this.updatevisabutton=true;
    this.visaform.get('visa').setValue(v.titre);
    this.id_visa_update=v.id
  }
  updatevisaofpays(){
    if(this.visaform.invalid){
      this.submittedvisa=true;
      return;
    }
  this.submittedvisa=false;
  this.Loading_update_visa=true;
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id_visa_update);
    this.payerservice.updateVisa(fr).subscribe(
          (data)=>{
                  this.Loading_update_visa=false
                  this.updatevisabutton=false;
                  this.getvisaofpays();
                  this.visaform.reset();
                  },
          (err)=>{this.Loading_update_visa=false;
                  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);})
  }
  fileChange5(event){
    this.selectfile=<File>event.target.files[0];
  }
  updateVoyageimage(i){
    for(let k=0;k<this.nb;k++){
      if(k==i){
        this.updateimage[k]=!this.updateimage[k];
      }else{
        this.updateimage[k]=false;
      }   
    }
   
    this.registerForm7.reset();
    this.submitted7=false;
  }
  updateimagevoyage(id,i){
    if (this.registerForm7.invalid ) {
      this.submitted7=true
       return;
        }
        const fr=new FormData();
         fr.append('image',this.selectfile,this.selectfile.name);
         fr.append('id',id);
    this.payerservice.updeteimagevoyage(fr).subscribe(
        (data)=>{this.getvoyage();
                this.updateimage[i]=!this.updateimage[i];
                this.registerForm7.reset();
                this.submitted7=false},
        (err)=>{this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);})
  }
  getpayebyid(){
    this.payerservice.getpayebyid(this.id).subscribe((data)=>{
          this.cat=data;
          this.paye_image=data.image;
          this.pays=data.payer;
          this.add();
        },
          (err)=>{});

  }
  visibility(x){
    this.payerservice.visibilit(x).subscribe((data)=>{
      console.log(data);
      this.getvoyage();
    },
    (err)=>{   this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
    );
    

  }
  fileChange(event){
    this.selectfile=<File>event.target.files[0];
  }
  addVoyage(){
    // stop here if form is invalid
    this.voayge_existe=false;
  if (this.registerForm.invalid) {
             this.submitted=true
              return;
            }
  this.Loading_save_voyage=true;
  this.submitted=false;
    const fr=new FormData();
    fr.append('image',this.selectfile,this.selectfile.name);
    fr.append('id',this.id);
    fr.append('titre',this.registerForm.get('titre').value);
    fr.append('nbjour',this.registerForm.get('nbjour').value);
    this.payerservice.addvoyage(fr).subscribe(
      (data)=>{
          this.Loading_save_voyage=false;
          this.getvoyage();
        },
    (err)=>{this.Loading_save_voyage=false;
      if(err.error.error=='existe'){
        this.voayge_existe=true;
      }else{
        this.type_notification='error';
        this.titre_notification='';
        this.soustitre_notification=this.msg;
        this.notification=true;
        setTimeout(()=>{ this.notification=false;},3000);
      }
      });
  }
  getvoyage(){
    this.payerservice.getallvoyage(this.id).subscribe((data)=>{
             this.voyage=data;
             console.log(this.voyage);
             this.add();
           this.nb=Object.keys(this.voyage).length;
         },
         (err)=>{}
         );
  }
  delite(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
           this.payerservice.deletevoyage(id).subscribe(
             (data)=>{
                 this.getvoyage();
               },
            (err)=>{  this.type_notification='error';
                      this.titre_notification='';
                      this.soustitre_notification=this.msg;
                      this.notification=true;
                      setTimeout(()=>{ this.notification=false;},3000);});}
  }
  add(){
          this.registerForm.reset()
         this.submittedupdete=false;
         this.updeteimagevaide=false;
         this.submitted = false;
  }
  updeteimage(){
      // stop here if form is invalid
    if (this.updeteimageform.invalid) {
               this.submittedupdete=true
                return;
              }
      this.submittedupdete = false;
      this.Loading_update_image=true;
      const fr=new FormData();
           fr.append('image',this.selectfile,this.selectfile.name);
           fr.append('id',this.id);
      this.payerservice.updetepayvoyage(fr).subscribe(
        (data)=>{
                this.Loading_update_image=false;
                this.getpayebyid();
              },
      (err)=>{
             this.Loading_update_image=false;
             this.type_notification='error';
             this.titre_notification='';
             this.soustitre_notification=this.msg;
             this.notification=true;
             setTimeout(()=>{ this.notification=false;},3000);

             });
  } 
  Ajoute_Voyage_A_la_une(id){
             this.payerservice.Ajoute_Voyage_A_la_une(id).subscribe(
                      (data)=>{console.log(data);this.getvoyage();},
                      (err)=>{    this.type_notification='error';
                                  this.titre_notification='';
                                  this.soustitre_notification=this.msg;
                                  this.notification=true;
                                  setTimeout(()=>{ this.notification=false;},3000);})
  }
  Delete_Voyage_A_la_une(id){
      this.payerservice.Delete_Voyage_A_la_une(id).subscribe(
        (data)=>{console.log(data);this.getvoyage();},
        (err)=>{    this.type_notification='error';
                    this.titre_notification='';
                    this.soustitre_notification=this.msg;
                    this.notification=true;
                    setTimeout(()=>{ this.notification=false;},3000);}
      )
  }
  
}
