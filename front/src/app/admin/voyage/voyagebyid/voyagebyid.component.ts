import { Component, OnInit ,ViewChild} from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';

@Component({
  selector: 'app-voyagebyid',
  templateUrl: './voyagebyid.component.html',
  styleUrls: ['./voyagebyid.component.css']
})
export class VoyagebyidComponent implements OnInit {
    
    submitted:boolean;
    submitteperiode:boolean;
    submitteprogramme:boolean;
    docs:any;
    length:any;
    formData:FormData;
    images:any[]=[]
    allprogramme:any[]=[];
    periode:any[]=[];
    voyage:any;
    id:string;
    id_tarif:string;
    date:string;
    minPickerDate:any;
    updetedate:string;
    type:string;
    selectfile:File=null;
    ProgrammeForm:FormGroup;
    periodeForm:FormGroup;
    jour:string='1';
    termine:boolean=false;
    id_prog:string;
    jour_updete:string;
    updete_termine:boolean;
    updete_programme:boolean;
    myForm :FormGroup;
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
    name_image_of_voyage:any;
    periode_existe:boolean=false;
    model:any;
get f() { return this.myForm.controls; }
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
    window.scroll(0, 0);
    this.myForm = this.formBuilder.group({
      file: new FormControl('', [Validators.required])}
       );
    
      this.ProgrammeForm = this.formBuilder.group({
        programme:[null, [Validators.required ]]}
     );
     this.formService = this.formBuilder.group({
            service:[null, [Validators.required ]]}
      ); 
     this.formNonService = this.formBuilder.group({
            service:[null, [Validators.required ]]}
      );
     this.periodeForm = this.formBuilder.group({
          prixAdulte: [null, [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validators.min(0)]],
          prixEnfant: [null, [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),Validators.min(0)]],
        });
    this.id = this.route.snapshot.paramMap.get('id');
    this.date="Periode";
    this.type="add"
    this.add();
    this.getvoyage();
    this.getservice();
    this.getNonservice()
    this.getprogrammeofvoyage();
    this.getallperideofvoyage();
    this.getallimageofVoyage();     
  }
  addservise(){
    if(this.formService.invalid){
      this.submittedService=true;
      return;
    }
    console.log("ee")
    const fr=new FormData();
          fr.append('id',this.id);
          fr.append('service',this.formService.get('service').value);
    this.payerservice.AddServiceInvlus(fr).subscribe(
          (data)=>{this.getservice();
                  this.formService.reset();
                  this.submittedService=false;
                  },
          (err)=>{console.log(err)})
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
    this.payerservice.deleteServiceInclus(id).subscribe(
      (data)=>{this.getservice();
               this.formService.reset();
               this.buttonUpdeteservice=false;
                })
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
    console.log("ee")
    const fr=new FormData();
          fr.append('id',this.id_service);
          fr.append('service',this.formService.get('service').value);
    this.payerservice.updeteServiceInclus(fr).subscribe(
          (data)=>{this.getservice();
                    this.formService.reset();
                    this.submittedService=false;
                    this.buttonUpdeteservice=false;
                  },
          (err)=>{console.log(err)})
  }
//
addNonservise(){
  if(this.formNonService.invalid){
    this.submittedNonService=true;
    return;
  }
  const fr=new FormData();
        fr.append('id',this.id);
        fr.append('service',this.formNonService.get('service').value);
  this.payerservice.AddServiceNonInvlus(fr).subscribe(
        (data)=>{this.getNonservice();
                this.formNonService.reset();
                this.submittedNonService=false;
                },
        (err)=>{console.log(err)})
}
getNonservice(){
  this.payerservice.getServiceNonInclusOfVoyage(this.id).subscribe(
          (data)=>{this.dataNonService=data;
            
                    this.nbNonService=Object.keys(data).length;
                  },
          (err)=>{console.log(err)});
}
deletNoneservice(id){
  this.payerservice.deleteServiceNonInclus(id).subscribe(
    (data)=>{this.getNonservice();
             this.formNonService.reset();
             this.buttonUpdateNonservice=false;
              });
}
updeteNonservice(s){
  this.formNonService.get('service').setValue(s.service);
  this.buttonUpdateNonservice=true;
  this.id_Non_service=s.id;
  window.scroll(100, 850);
}
updeteNonserviceOfVoyage(){
  if(this.formNonService.invalid){
    this.submittedNonService=true;
    return;
  }
  console.log("ee")
  const fr=new FormData();
        fr.append('id',this.id_Non_service);
        fr.append('service',this.formNonService.get('service').value);
  this.payerservice.updeteServiceNonInclus(fr).subscribe(
        (data)=>{this.getNonservice();
                  this.formNonService.reset();
                  this.submittedNonService=false;
                  this.buttonUpdateNonservice=false;
                },
        (err)=>{console.log(err)})
}
  //
  getvoyage(){

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
    const fr=new FormData();
    fr.append('voyage',this.id);
    fr.append('prixAdulte',this.periodeForm.get('prixAdulte').value);
    fr.append('prixEnfant',this.periodeForm.get('prixEnfant').value);
    fr.append('date',this.date);
    this.payerservice.addperiode(fr).subscribe((data)=>{
               
               this.periodeForm.reset();
               this.model=null;
               this.date="Periode"
               this.periode_existe=false;
               this.getallperideofvoyage();
       },
       (err)=>{console.log(err);
              if(err.error.error="existe"){
                this.periode_existe=true;
              }
              
              });
  }
  onDateChange(dt: any){
      if(dt!=null){
        this.date= dt.year+'/'+dt.month+'/'+ dt.day ;
      }
  }
  getallperideofvoyage(){
    this.payerservice.getperiode(this.id).subscribe((data)=>{
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
    if (this.date=="" && this.periodeForm.invalid) {
      this.submitteperiode=true;
        return;
}
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
                        this.getallperideofvoyage();
                        this.type="add";
                        this.model=null;
                       this.date="Periode"
                       this.periode_existe=false;
                        
                        this.periodeForm.reset();
                        },
                        (err)=>{console.log(err);
                          if(err.error.error="existe"){
                          this.periode_existe=true;
                        }}
              );

  }
  delete(id){
    this.payerservice.deleteperiode(id).subscribe((data)=>{
      this.model=null;
      this.date="Periode"
      this.periode_existe=false;
      this.submitteperiode=false;
      this.periodeForm.reset();
      this.getallperideofvoyage();
    },
    (err)=>{});
  }
   fileChange(event){
    this.selectfile=<File>event.target.files[0];
    }
    addProgarmme(){
      if (this.ProgrammeForm.invalid) {
        this.submitteprogramme=true;
          return;
  }
      const fr=new FormData();
          fr.append('voyage',this.id);
          fr.append('jour',this.jour);
          fr.append('programme',this.ProgrammeForm.get("programme").value);
      this.payerservice.addprogrammevoyage(fr).subscribe(
        (data)=>{
                  this.ProgrammeForm.reset();
                  this.getprogrammeofvoyage();
                  },
        (err)=>{})
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
      const fr=new FormData();
           fr.append('id',this.id_prog);
           fr.append('programme',this.ProgrammeForm.get("programme").value);
    this.payerservice.updeteprogramme(fr).subscribe(
      (data)=>{
              this.getprogrammeofvoyage();
              this.updete_termine=true;
              this.termine=true;
              this.ProgrammeForm.reset();
            },
            (err)=>{});
    }
    updeteprograme(prog){
            this.id_prog=prog.id;
            this.jour=prog.jour
            this.ProgrammeForm.get("programme").setValue(prog.description);
            this.updete_termine=false;
            this.updete_programme=true;
            this.termine=false;
            window.scroll(0,500);
    }
    onFileChange(event){
         this.docs = <File>event.target.files;
         this.length = <File>event.target.files.length;
     
    }
    submit(){
    if (this.myForm.invalid) {
               this.submitted=true
                return;}
      const formdata = new FormData;
            for (let i = 0; i < this.length; i++) {
                  formdata.append('images'+[i], this.docs[i], this.docs[i].name );
                  formdata.append('length', this.length);
                  formdata.append('id', this.id);}
        this.payerservice.uplodeimages(formdata).subscribe(
            (data)=>{this.submitted=false;
                      this.myForm.reset();
                     this.getallimageofVoyage();
                    },
            (err)=>{});} 
    getallimageofVoyage(){
      this.payerservice.getallimageofVoyage(this.id).subscribe(
          (data)=>{
                   
                    this.images=data;},
          (err)=>{});
    }
  
    delete_image_of_hotel(id){
      this.payerservice.delete_immage_voyage(id).subscribe(
          (data)=>{this.getallimageofVoyage();},
          (err)=>{console.log(err)})
    }
}
