import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{VoyageService} from '../../service/admin/voyage.service';

@Component({
  selector: 'app-omras',
  templateUrl: './omras.component.html',
  styleUrls: ['./omras.component.css']
})
export class OmrasComponent implements OnInit {

  registerForm: FormGroup;
  registerForm7:FormGroup;
  submitted:boolean;
  submitted7:boolean;
  selectfile:File=null;
  Omras:any;
  nb:number;
  updateimage:boolean[]=[false];
  visaform:FormGroup;
  submittedvisa:boolean;
  visadData:any=null;
  nbetapevisa:number=0;
  updatevisabutton:boolean=false;
  id_visa_update:any;
  id:any;
  voayge_existe:boolean;
  Loading_update_visa:boolean=false;
  Loading_save_visa:boolean=false;
  Loading_save_voyage:boolean=false;
  type_notification:string="";
  titre_notification:string="";
  soustitre_notification:string="";
  notification:boolean=false;
  msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  update_voyage:boolean=false;
  id_voyage_update:string;
  constructor(private formBuilder: FormBuilder,private service:VoyageService) {}
   get f() { return this.registerForm.controls; }
   get f2() { return this.visaform.controls; }
   get f7() { return this.registerForm7.controls; }
  ngOnInit() {
    this.getAllOmra()
    this.registerForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      nbjour:[null, [Validators.required ,Validators.min(1)]],
      nbpersonne:[null, [Validators.required ,Validators.min(1)]],
      image:[null, [Validators.required ]],});
    this.registerForm7=this.formBuilder.group({
        image:[null, [Validators.required ]],
      }) 
    this.visaform=this.formBuilder.group({
        visa:[null, [Validators.required ]],
      });
  }

  addvisa(){
    if(this.visaform.invalid){
      this.submittedvisa=true;
      return;
    }
    this.submittedvisa=false;
    this.Loading_save_visa=true;
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id);
    this.service.addvisa(fr).subscribe(
          (data)=>{
                  this.Loading_save_visa=false;
                  this.visaform.reset();
                  this.getvisaofpays();
                  },
          (err)=>{  this.Loading_save_visa=false;
                    this.type_notification='error';
                    this.titre_notification='';
                    this.soustitre_notification=this.msg;
                    this.notification=true;
                    setTimeout(()=>{ this.notification=false;},3000);})
  }
  getvisaofpays(){
    this.service.getvisaofpays(this.id).subscribe(
        (data)=>{this.visadData=data;
                  this.nbetapevisa=Object.keys(data).length;
                  },
        (err)=>{console.log(err)})
  }
  deletevisa(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.service.deletvisaofpays(id).subscribe(
    (data)=>{this.getvisaofpays();
             this.updatevisabutton=false;
             this.visaform.reset();
             },
     (err)=>{ this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);});
}
   
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
    this.service.updateVisa(fr).subscribe(
          (data)=>{
                  this.Loading_update_visa=false;
                  this.visaform.reset();
                  this.updatevisabutton=false;
                  this.getvisaofpays();
                  },
          (err)=>{
                  this.Loading_update_visa=false;
                  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);
          })
  }
  fileChange(event){
    this.selectfile=<File>event.target.files[0];
    }
  addVoyage(){
    // stop here if form is invalid
  if (this.registerForm.invalid) {
             this.submitted=true
              return;
            }
    this.Loading_save_voyage=true;
    this.submitted=true;
    const fr=new FormData();
    fr.append('image',this.selectfile,this.selectfile.name);
    fr.append('titre',this.registerForm.get('titre').value);
    fr.append('nbjour',this.registerForm.get('nbjour').value);
    fr.append('nbpersonne',this.registerForm.get('nbpersonne').value);
  
    this.service.addomra(fr).subscribe(
      (data)=>{this.getAllOmra();
        this.reset();
        this.voayge_existe=false;
        this.Loading_save_voyage=false;
       },
    (err)=>{
      this.Loading_save_voyage=false;
       if(err.error.error=='existe'){
          this.voayge_existe=true;
        }else{
              this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);
        }});
  }
  getAllOmra(){
    this.service.getAllOmra().subscribe(
      (data)=>{this.Omras=data;
              this.nb=Object.keys(data).length;
              this.id=data[0].categorie;
              this.getvisaofpays();
              console.log(data)},
      (err)=>{console.log(err)}
    )
  }
  delite(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res){
    this.service.deletevoyage(id).subscribe(
      (data)=>{this.getAllOmra();},
      (err)=>{this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);});}
     }
  visibility(x){
      this.service.visibilit(x).subscribe((data)=>{
        console.log(data);
        this.getAllOmra();
      },
      (err)=>{this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
              );
    }
  reset(){
    this.submitted=false;
    this.registerForm.reset()
  }
  Ajoute_Omra_A_la_une(id){
    this.service.Ajoute_Omra_A_la_une(id).subscribe(
      (data)=>{this.getAllOmra()},
      (err)=>{this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);});
  }
  Delete_Omra_A_la_une(id){
  

    this.service.Delete_Omra_A_la_une(id).subscribe(
      (data)=>{this.getAllOmra()},
      (err)=>{this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);});
  }
  fileChange5(event){
    this.selectfile=<File>event.target.files[0];
    }
  updateVoyageimage(i){
    for(let k=0;k<this.nb;k++){
      if(k==i){
        this.updateimage[k]=!this.updateimage[k];
      }else{
        this.updateimage[k]=false;}
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
    this.service.updeteimagevoyage(fr).subscribe(
        (data)=>{this.getAllOmra();
                this.updateimage[i]=!this.updateimage[i];
                this.registerForm7.reset();
                this.submitted7=false},
        (err)=>{this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);})
  }
  update(v){
    window.scroll(0,0)
    this.registerForm.get('titre').setValue(v.titre);
    this.registerForm.get('nbjour').setValue(v.nbjour);
    this.registerForm.get('nbpersonne').setValue(v.nbpersonne);
    this.update_voyage=true;
    this.id_voyage_update=v.id;
  }
  Mise_a_jour_voyage(){
      // stop here if form is invalid
      this.voayge_existe=false;
      if (this.registerForm.invalid) {
                 this.submitted=true
                  return;
                }
      this.Loading_save_voyage=true;
      this.submitted=false;
        const fr=new FormData();
        fr.append('id',this.id_voyage_update);
        fr.append('image',this.selectfile,this.selectfile.name);
        fr.append('titre',this.registerForm.get('titre').value);
        fr.append('nbjour',this.registerForm.get('nbjour').value);
        fr.append('nbpersonne',this.registerForm.get('nbpersonne').value);
        this.service.updatevoyage(fr).subscribe(
          (data)=>{
              this.getAllOmra();
              this.reset();
              this.voayge_existe=false;
              this.Loading_save_voyage=false;
              this.update_voyage=false;
              
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
          console.log(err)
          });
      }
}
