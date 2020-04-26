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
  submittedupdete:boolean;
  
  //le ng model
  selectfile:File=null;
  nbjour:string;
  titre:string;
  nbplace:string;
  pays:string;
  //end ng model
  registerForm: FormGroup;
  updeteimageform:FormGroup;

  constructor(private formBuilder: FormBuilder, private payerservice:VoyageService, private route: ActivatedRoute) {
   
   
   }
   get f() { return this.registerForm.controls; }
   get f1() { return this.updeteimageform.controls; }
   
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.getpayebyid();
    this.getvoyage();
    this.registerForm = this.formBuilder.group({
            titre: [null, [Validators.required]],
            nbjour:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
            image:[null, [Validators.required ]],});
   this.updeteimageform = this.formBuilder.group({
              file:[null, [Validators.required ]],});

   
   
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
   
   
}
