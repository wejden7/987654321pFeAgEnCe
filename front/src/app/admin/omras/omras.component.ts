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
  constructor(private formBuilder: FormBuilder,private service:VoyageService) {
  
    
   }
   get f() { return this.registerForm.controls; }
   get f2() { return this.visaform.controls; }
   get f7() { return this.registerForm7.controls; }
  ngOnInit() {
    this.getAllOmra()
    this.registerForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      nbjour:[null, [Validators.required ,Validators.min(1)]],
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
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id);
    this.service.addvisa(fr).subscribe(
          (data)=>{console.log(data);
                    this.getvisaofpays();
                    this.visaform.reset();
                    this.submittedvisa=false;
                  },
          (err)=>{console.log(err)})
  }
  getvisaofpays(){
    this.service.getvisaofpays(this.id).subscribe(
        (data)=>{this.visadData=data;
                  this.nbetapevisa=Object.keys(data).length;
                  },
        (err)=>{console.log(err)})
  }
  deletevisa(id){
    this.service.deletvisaofpays(id).subscribe(
       (data)=>{this.getvisaofpays();
                this.updatevisabutton=false;
                this.visaform.reset();
                },
        (err)=>{console.log(err)});
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
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id_visa_update);
    this.service.updateVisa(fr).subscribe(
          (data)=>{console.log(data);
                  this.getvisaofpays();
                  this.visaform.reset();
                  this.updatevisabutton=false;
                  this.submittedvisa=false;
                  },
          (err)=>{console.log(err)})
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
    const fr=new FormData();
    fr.append('image',this.selectfile,this.selectfile.name);
    fr.append('titre',this.registerForm.get('titre').value);
    fr.append('nbjour',this.registerForm.get('nbjour').value);
  
    this.service.addomra(fr).subscribe(
      (data)=>{this.getAllOmra();
       },
    (err)=>{console.log(err)});
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
    this.service.deletevoyage(id).subscribe((data)=>{
          this.getAllOmra();
        });
     }
  visibility(x){
      this.service.visibilit(x).subscribe((data)=>{
        console.log(data);
        this.getAllOmra();
      },
      (err)=>{}
      );
    }
  reset(){
    this.submitted=false;
    this.registerForm.reset()
  }
  Ajoute_Omra_A_la_une(id){
    this.service.Ajoute_Omra_A_la_une(id).subscribe(
      (data)=>{this.getAllOmra()},
      (err)=>{console.log()});
  }
  Delete_Omra_A_la_une(id){
    this.service.Delete_Omra_A_la_une(id).subscribe(
      (data)=>{this.getAllOmra()},
      (err)=>{console.log(err)});
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
    this.service.updeteimagevoyage(fr).subscribe(
        (data)=>{this.getAllOmra();
                this.updateimage[i]=!this.updateimage[i];
                this.registerForm7.reset();
                this.submitted7=false},
        (err)=>{console.log(err)})
  }
}
