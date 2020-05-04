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
  dataSource: Object;
  chartConfig: Object;
  minPickerDate:any;
  nb:number;
  image:File;
  paye_image:any;
  updeteimagevaide:boolean;
  submitted:boolean;
  submitted7:boolean;
  submittedupdete:boolean;
  
  //le ng model
  selectfile:File=null;
  nbjour:string;
  titre:string;
  nbplace:string;
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

  constructor(private formBuilder: FormBuilder, private payerservice:VoyageService, private route: ActivatedRoute) {
   
   
   }
   get f() { return this.registerForm.controls; }
   get f1() { return this.updeteimageform.controls; }
   get f7() { return this.registerForm7.controls; }
   get f2() { return this.visaform.controls; }
   
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getpayebyid();
    this.getvoyage();
    this.getvisaofpays();
    this.registerForm = this.formBuilder.group({
            titre: [null, [Validators.required]],
            nbjour:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
            image:[null, [Validators.required ]],});
   this.updeteimageform = this.formBuilder.group({
              file:[null, [Validators.required ]],});
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
  const fr=new FormData();
    fr.append('titre',this.visaform.get('visa').value);
    fr.append('id',this.id);
    this.payerservice.addvisa(fr).subscribe(
          (data)=>{console.log(data);
                    this.getvisaofpays();
                    this.visaform.reset();
                    this.submittedvisa=false;
                  },
          (err)=>{console.log(err)})
  }
  getvisaofpays(){
    this.payerservice.getvisaofpays(this.id).subscribe(
        (data)=>{this.visadData=data;
                  this.nbetapevisa=Object.keys(data).length;
                  },
        (err)=>{console.log(err)})
  }
  deletevisa(id){
    this.payerservice.deletvisaofpays(id).subscribe(
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
    this.payerservice.updateVisa(fr).subscribe(
          (data)=>{console.log(data);
                  this.getvisaofpays();
                  this.visaform.reset();
                  this.updatevisabutton=false;
                  this.submittedvisa=false;
                  },
          (err)=>{console.log(err)})
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
        (err)=>{console.log(err)})
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
    (err)=>{}
    );
    

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
    fr.append('id',this.id);
    fr.append('titre',this.titre);
    fr.append('nbjour',this.nbjour);
  
    this.payerservice.addvoyage(fr).subscribe((data)=>{
          this.getvoyage();
          
    },
    (err)=>{});
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
           this.payerservice.deletevoyage(id).subscribe((data)=>{
                 this.getvoyage();
               });
  }
  add(){
          this.image=null;
          this.nbjour="";
          this.titre="";
          this.nbplace="";
         this.submittedupdete=false;
         this.updeteimagevaide=false;
         this.submitted = false;
  }
  updeteimage(){
      this.submittedupdete = false;
      // stop here if form is invalid
    if (this.updeteimageform.invalid) {
               this.submittedupdete=true
                return;
              }
      const fr=new FormData();
           fr.append('image',this.selectfile,this.selectfile.name);
           fr.append('id',this.id);
      this.payerservice.updetepayvoyage(fr).subscribe((data)=>{
           this.getpayebyid();
           
      },
      (err)=>{});
  } 
  Ajoute_Voyage_A_la_une(id){
             this.payerservice.Ajoute_Voyage_A_la_une(id).subscribe(
                      (data)=>{console.log(data);this.getvoyage();},
                      (err)=>{console.log(err);})
  }
  Delete_Voyage_A_la_une(id){
      this.payerservice.Delete_Voyage_A_la_une(id).subscribe(
        (data)=>{console.log(data);this.getvoyage();},
        (err)=>{console.log(err)}
      )
  }
  
}
