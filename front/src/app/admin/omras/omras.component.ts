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
  submitted:boolean;
  selectfile:File=null;
  Omras:any;
  nb:number;
  constructor(private formBuilder: FormBuilder,private payerservice:VoyageService) {
  
    
   }
   get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.getAllOmra()
    this.registerForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      nbjour:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      image:[null, [Validators.required ]],});
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
  
    this.payerservice.addomra(fr).subscribe(
      (data)=>{this.getAllOmra();
       },
    (err)=>{console.log(err)});
  }
  getAllOmra(){
    this.payerservice.getAllOmra().subscribe(
      (data)=>{this.Omras=data;this.nb=Object.keys(data).length},
      (err)=>{console.log(err)}
    )
  }
  delite(id){
    this.payerservice.deletevoyage(id).subscribe((data)=>{
          this.getAllOmra();
        });
     }
  visibility(x){
      this.payerservice.visibilit(x).subscribe((data)=>{
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
}
