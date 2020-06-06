import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-omraid',
  templateUrl: './omraid.component.html',
  styleUrls: ['./omraid.component.css']
})
export class OmraidComponent implements OnInit {
  submitted:boolean;
  submittedupdete:boolean;
  submitteperiode:boolean;
  submitteprogramme:boolean;
  file:File;
  docs:any;
  length:any;
  formData:FormData;
  images:any[]=[]
  allprogramme:any[]=[];
  periode:any[]=[];
  voyage:any;
  id:string;
  id_tarif:string;
  nb:number=0;
  date:string;
  model:Date;
    dp:Date;
    prix:string;
    minPickerDate:any;
    updetedate:string;
    type:string;
    selectfile:File=null;
    image:File;
    registerForm: FormGroup;
    ProgrammeForm:FormGroup;
    periodeForm:FormGroup;
    programme:any;
    jour:string='1';
    termine:boolean=false;
    id_prog:string;
    jour_updete:string;
    updete_termine:boolean;
    updete_programme:boolean;
    updeteimagevalid:boolean;
    nbimages:number;
    myForm :FormGroup;
    name_image_of_voyage:any;
    formService:FormGroup;
    formNonService:FormGroup;
    submittedService:boolean;
    submittedNonService:boolean;
    buttonUpdeteservice:boolean;
    buttonUpdateNonservice:boolean;
    dataService:any;
    dataNonService:any;
    nbService:number;
    nbNonService:number;
    id_service:any;
    id_Non_service:any;
    Loading_images:boolean=false;
    Loading_programme:boolean=false;
    Loading_periode:boolean=false;
    Loading_service_inclus:boolean=false;
    Loading_service_Non_inclus:boolean=false;
    periode_existe:boolean=false;
get f() { return this.myForm.controls; }
get f1() { return this.registerForm.controls; }
get f2() { return this.periodeForm.controls; }
get f3() { return this.ProgrammeForm.controls; }
get f4() { return this.formService.controls; }
get f5() { return this.formNonService.controls; }
constructor(private payerservice:VoyageService, private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    
  this.minPickerDate = {
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate()};
}

ngOnInit() {
  window.scroll(0,0);
  this.myForm = this.formBuilder.group({
    file: new FormControl('', [Validators.required])}
     );
 
    this.ProgrammeForm = this.formBuilder.group({
      programme:[null, [Validators.required ]]}
   );
   this.periodeForm = this.formBuilder.group({
    prixAdulte: [null, [Validators.required,Validators.min(0)]],
    prixEnfant: [null, [Validators.required,Validators.min(0)]],
    });
  this.formService = this.formBuilder.group({
    service:[null, [Validators.required ]]}
); 
this.formNonService = this.formBuilder.group({
    service:[null, [Validators.required ]]}
);
this.date="Periode";
this.type="add"
  this.add();
  this.getvoyage();
  this.getprogrammeofvoyage();
  this.getallperideofvoyage();
  this.getallimageofVoyage(); 
  this.getNonservice();
  this.getservice();
}

addservise(){
  if(this.formService.invalid){
    this.submittedService=true;
    return;
  }
  this.Loading_service_inclus=true;
  console.log("ee")
  const fr=new FormData();
        fr.append('id',this.id);
        fr.append('service',this.formService.get('service').value);
  this.payerservice.AddServiceInvlus(fr).subscribe(
        (data)=>{
                this.formService.reset();
                this.submittedService=false;
                this.Loading_service_inclus=false;
                this.getservice();
                },
        (err)=>{
                this.Loading_service_inclus=false;
                 console.log(err)})
}
getservice(){
  this.payerservice.getServiceInclusOfVoyage(this.id).subscribe(
          (data)=>{this.dataService=data;
            console.log(data);
                    this.nbService=Object.keys(data).length;
                  },
          (err)=>{console.log(err)});
}
deleteservice(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.payerservice.deleteServiceInclus(id).subscribe(
    
    (data)=>{this.getservice();
             this.formService.reset();
             this.buttonUpdeteservice=false;
              })}
}
updeteservice(s){
  this.formService.get('service').setValue(s.service);
  this.buttonUpdeteservice=true;
  this.id_service=s.id;
  window.scroll(100, 700);
}
updeteserviceOfVoyage(){
  if(this.formService.invalid){
    this.submittedService=true;
    return;
  }
  this.Loading_service_inclus=true;
  const fr=new FormData();
        fr.append('id',this.id_service);
        fr.append('service',this.formService.get('service').value);
  this.payerservice.updeteServiceInclus(fr).subscribe(
        (data)=>{this.getservice();
                  this.formService.reset();
                  this.submittedService=false;
                  this.buttonUpdeteservice=false;
                  this.Loading_service_inclus=false;
                },
        (err)=>{
          this.Loading_service_inclus=false;
          console.log(err)})
}
//
addNonservise(){
if(this.formNonService.invalid){
  this.submittedNonService=true;
  return;
}
this.Loading_service_Non_inclus=true;
const fr=new FormData();
      fr.append('id',this.id);
      fr.append('service',this.formNonService.get('service').value);
this.payerservice.AddServiceNonInvlus(fr).subscribe(
      (data)=>{
              this.formNonService.reset();
              this.submittedNonService=false;
              this.Loading_service_Non_inclus=false;
              this.getNonservice();
              
              },
      (err)=>{
              this.Loading_service_Non_inclus=false;
               console.log(err)});
}
getNonservice(){
this.payerservice.getServiceNonInclusOfVoyage(this.id).subscribe(
        (data)=>{this.dataNonService=data;
          
                  this.nbNonService=Object.keys(data).length;
                },
        (err)=>{console.log(err)});
}
deletNoneservice(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
this.payerservice.deleteServiceNonInclus(id).subscribe(
  (data)=>{this.getNonservice();
           this.formNonService.reset();
           this.buttonUpdateNonservice=false;
            });}
}
updeteNonservice(s){
this.formNonService.get('service').setValue(s.service);
this.buttonUpdateNonservice=true;
this.id_Non_service=s.id;
window.scroll(100, 950);
}
updeteNonserviceOfVoyage(){
if(this.formNonService.invalid){
  this.submittedNonService=true;
  return;
}
this.Loading_service_Non_inclus=true;
const fr=new FormData();
      fr.append('id',this.id_Non_service);
      fr.append('service',this.formNonService.get('service').value);
this.payerservice.updeteServiceNonInclus(fr).subscribe(
      (data)=>{
                this.formNonService.reset();
                this.submittedNonService=false;
                this.buttonUpdateNonservice=false;
                this.Loading_service_Non_inclus=false;
                this.getNonservice();
              },
      (err)=>{
              this.Loading_service_Non_inclus=false;
              console.log(err)})
}
getvoyage(){
  this.id = this.route.snapshot.paramMap.get('id');
  this.payerservice.getvoyage(this.id).subscribe((data)=>{
    this.voyage=data;
    console.log(data);
    this.name_image_of_voyage=data.image;
    this.add();} ,
    (err)=>{console.log(err)});
      }
add(){
  this.updete_programme=false;
  this.submitted = false
  this.submitteperiode=false;
  this.submitteprogramme=false;
        
         
}
addperiode(){
  if (this.date=="Periode" || this.periodeForm.invalid) {
    this.submitteperiode=true;
      return;
  }
  this.submitteperiode=false;

  this.Loading_periode=true
  const fr=new FormData();
  fr.append('voyage',this.id);
  fr.append('prixAdulte',this.periodeForm.get('prixAdulte').value);
  fr.append('prixEnfant',this.periodeForm.get('prixEnfant').value);
  fr.append('date',this.date);
  this.payerservice.addperiode(fr).subscribe((data)=>{
             this.periodeForm.reset();
             this.model=null;
             this.date="Periode"
             this.Loading_periode=false;
             this.periode_existe=false;
             this.getallperideofvoyage();

     },
     (err)=>{
             this.Loading_periode=false;
             console.log(err);
            if(err.error.error="existe"){
              this.periode_existe=true;
            }});
}
onDateChange(dt: any)
  {
    if(dt!=null){
      this.date= dt.year+'/'+dt.month+'/'+ dt.day ;
    }
   
  }
getallperideofvoyage(){
  this.payerservice.getperiode(this.id).subscribe((data)=>{
          this.add();
         this.periode=data;
  },
  (err)=>{});

}
updete(p){
  this.periodeForm.reset()
  this.date=p.date;
  this.periodeForm.get('prixAdulte').setValue(p.prixAdulte)
  this.periodeForm.get('prixEnfant').setValue(p.prixEnfant)
  this.id_tarif=p.id;
  this.type="updete";
}
Updeteperiod(){
if (this.date=="Periode" || this.periodeForm.invalid) {
this.submitteperiode=true;
 return;
}
this.submitteperiode=false;
this.Loading_periode=true
       const fr=new FormData();
             fr.append('id',this.id_tarif);
             fr.append('prixAdulte',this.periodeForm.get('prixAdulte').value);
             fr.append('prixEnfant',this.periodeForm.get('prixEnfant').value);
       if(this.date!=""){
               fr.append('date',this.date);
       }else{
               fr.append('date',this.updetedate);
       }
       this.payerservice.updeteperiode(fr).subscribe((data)=>{
                 this.type="add";
                 this.model=null;
                 this.date="Periode";
                 this.periode_existe=false
                 this.periodeForm.reset();
                 this.Loading_periode=false;
                 this.getallperideofvoyage();
                 },
                 (err)=>{
                          this.Loading_periode=false;
                          if(err.error.error="existe"){
                            this.periode_existe=true;
                          }
                           console.log(err)}
       );

}
delete(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.payerservice.deleteperiode(id).subscribe((data)=>{
    this.periode_existe=false;
    this.model=null;
    this.date="Periode";
    this.getallperideofvoyage();
  },
  (err)=>{});}
}
fileChange(event){
  this.selectfile=<File>event.target.files[0];
  }
  addProgarmme(){
    if (this.ProgrammeForm.invalid) {
      this.submitteprogramme=true;
        return;
}
this.Loading_programme=true;
    const fr=new FormData();
        fr.append('voyage',this.id);
        fr.append('jour',this.jour);
        fr.append('programme',this.programme);
    this.payerservice.addprogrammevoyage(fr).subscribe((data)=>{
           this.getprogrammeofvoyage();
           this.submitteprogramme=false;
            this.Loading_programme=false;
           this.ProgrammeForm.reset();
      
     },
     (err)=>{
              this.Loading_programme=false;
     })
   }
  getprogrammeofvoyage(){
    this.payerservice.getallprogrammeofonevoyage(this.id).subscribe((data)=>
    { 
        this.allprogramme=data;
        this.jour=String(Object.keys(data).length);
        if(Number(this.jour)>=Number(this.voyage.nbjour)){
          this.termine=true;
        }else{
          this.jour=String(Number(this.jour)+1);
        }
        this.add();
        
      },
      (err)=>{});

  }
  updetemodifier(){
    if (this.ProgrammeForm.invalid) {
      this.submitteprogramme=true;
        return;
}
this.Loading_programme=true;
    const fr=new FormData();
         fr.append('id',this.id_prog);
         fr.append('programme',this.programme);
  this.payerservice.updeteprogramme(fr).subscribe((data)=>{
            this.Loading_programme=false;
            this.ProgrammeForm.reset();
            this.submitteprogramme=false;
            this.updete_termine=true;
            this.termine=true;
            this.getprogrammeofvoyage();
          },
          (err)=>{
            this.Loading_programme=false;
          });
  }
  updeteprograme(prog){
          this.id_prog=prog.id;
          this.jour=prog.jour
          this.programme=prog.description
          this.updete_termine=false;
          this.updete_programme=true;
      this.termine=false;
          window.scroll(0,500);
          
  }
  onFileChange(event) {
       this.docs = <File>event.target.files;
       this.length = <File>event.target.files.length;
   
  }
  submit(){
    
    // stop here if form is invalid
  if (this.myForm.invalid) {
             this.submitted=true
              return;
            }
            this.Loading_images=true;
    const formdata = new FormData;
    for (let i = 0; i < this.length; i++) {
                formdata.append('images'+[i], this.docs[i], this.docs[i].name );
                formdata.append('length', this.length);
                formdata.append('id', this.id);
            }
    this.payerservice.uplodeimages(formdata).subscribe((data)=>{
      this.submitted=false;
      this.myForm.reset();
      this.getallimageofVoyage();
      this.Loading_images=false;
    
    },
    (err)=>{
      this.Loading_images=false;
    });
  }
   
  getallimageofVoyage(){
    this.payerservice.getallimageofVoyage(this.id).subscribe((data)=>{
      
      this.nbimages=Object.keys(data).length;
      this.images=data;
      this.add();      },
      (err)=>{});
  }

  delete_image_of_voyage(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
    if(res){
      this.payerservice.delete_immage_voyage(id).subscribe(
        (data)=>{this.getallimageofVoyage();},
        (err)=>{console.log(err)})
    }
  
  }

}
