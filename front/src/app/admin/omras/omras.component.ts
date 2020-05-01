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
  constructor(private formBuilder: FormBuilder,private service:VoyageService) {
  
    
   }
   get f() { return this.registerForm.controls; }
   get f7() { return this.registerForm7.controls; }
  ngOnInit() {
    this.getAllOmra()
    this.registerForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      nbjour:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      image:[null, [Validators.required ]],});
    this.registerForm7=this.formBuilder.group({
        image:[null, [Validators.required ]],
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
      (data)=>{this.Omras=data;this.nb=Object.keys(data).length},
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
