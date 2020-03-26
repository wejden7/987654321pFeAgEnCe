import { Component, OnInit ,ViewChild} from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import{Voyage} from '../../../admin/class/voyage';
import{Periode} from '../../../admin/class/periode';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Programme } from '../../class/programme';
import{Images} from '../../class/images'
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-voyagebyid',
  templateUrl: './voyagebyid.component.html',
  styleUrls: ['./voyagebyid.component.css']
})
export class VoyagebyidComponent implements OnInit {
  submitted:boolean;
  submittedupdete:boolean;
  submitteperiode:boolean;
  submitteprogramme:boolean;
  file:File;
  docs:any;
  length:any;
  formData:FormData;
      images:Images[]=[]
    allprogramme:Programme[]=[];
    periode:Periode[]=[];
    voyage:Voyage;
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


get f() { return this.myForm.controls; }
get f1() { return this.registerForm.controls; }
get f2() { return this.periodeForm.controls; }
get f3() { return this.ProgrammeForm.controls; }


constructor(private payerservice:VoyageService, private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    
    this.minPickerDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()};
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      file: new FormControl('', [Validators.required])}
       );
    this.registerForm = this.formBuilder.group({
      file:[null, [Validators.required ]]}
       );
      this.ProgrammeForm = this.formBuilder.group({
        programme:[null, [Validators.required ]]}
     );
     this.periodeForm = this.formBuilder.group({
      prix: [null, [Validators.required,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      dp: [null, [Validators.required]],
    }
       );
    this.add();
    this.getvoyage();
    this.getprogrammeofvoyage();
    this.getallperideofvoyage();
    this.getallimageofVoyage();
    
   
       
       
  }
  getvoyage(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.payerservice.getvoyage(this.id).subscribe((data)=>{
      this.voyage=data;
      this.name_image_of_voyage=data.image;
      this.add();} ,
      (err)=>{});
        }
 
  add(){
            this.model=null;
            this.prix="";
            this.updetedate="Periode";
            this.type="add";
            this.date="";
            this.programme="";
            this.updete_programme=false;
            this.updeteimagevalid=false;
            this.file=null;
            this.image=null;
            this.submitted = false;
            this.submittedupdete=false;
            this.submitteperiode=false;
            this.submitteprogramme=false;
          
           
  }
  addperiode(){
    if (this.date=="" && this.periodeForm.invalid) {
      this.submitteperiode=true;
        return;
}
    const fr=new FormData();
    fr.append('voyage',this.id);
    fr.append('prix',this.prix);
    fr.append('date',this.date);
    this.payerservice.addperiode(fr).subscribe((data)=>{
               this.getallperideofvoyage();
       },
       (err)=>{});
  }
  onDateChange(dt: any)
    {
      this.date= dt.year+'/'+dt.month+'/'+ dt.day ;
    }
  getallperideofvoyage(){
    this.payerservice.getperiode(this.id).subscribe((data)=>{
            this.add();
           this.periode=data;
    },
    (err)=>{});

  }
  updete(p){
         this.updetedate=p.date
         this.prix=p.prix;
         this.id_tarif=p.id;
         this.type="updete";
  }
  Updeteperiod(){
    if (this.date=="" && this.prix=="") {
      this.submitteperiode=true;
        return;
}
              const fr=new FormData();
                    fr.append('id',this.id_tarif);
                    fr.append('prix',this.prix);
              if(this.date!=""){
                      fr.append('date',this.date);
              }else{
                      fr.append('date',this.updetedate);
              }
              this.payerservice.updeteperiode(fr).subscribe((data)=>{
                        this.getallperideofvoyage();
                       
                        },
                        (err)=>{}
              );

  }
  delete(id){
    this.payerservice.deleteperiode(id).subscribe((data)=>{
      this.getallperideofvoyage();
    },
    (err)=>{});
  }
  fileChange(event){
    this.selectfile=<File>event.target.files[0];
    }

  updeteimage(){
      if (this.registerForm.invalid) {
             this.submittedupdete=true;
               return;
       }
      const fr=new FormData();
             fr.append('image',this.selectfile,this.selectfile.name);
             fr.append('id',this.id);
      this.payerservice.updeteimagevoyage(fr).subscribe((data)=>{
               this.getvoyage();
               console.log("3333");
              
      },
      (err)=>{})
    }
    addProgarmme(){
      if (this.ProgrammeForm.invalid) {
        this.submitteprogramme=true;
          return;
  }
      const fr=new FormData();
          fr.append('voyage',this.id);
          fr.append('jour',this.jour);
          fr.append('programme',this.programme);
      this.payerservice.addprogrammevoyage(fr).subscribe((data)=>{
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
           fr.append('programme',this.programme);
    this.payerservice.updeteprogramme(fr).subscribe((data)=>{
              this.getprogrammeofvoyage();
              this.updete_termine=true;
              this.termine=true;
            },
            (err)=>{});
    }
    updeteprograme(prog){
            this.id_prog=prog.id;
            this.jour=prog.jour
            this.programme=prog.description
            this.updete_termine=false;
            this.updete_programme=true;
            this.termine=false;
            
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
      const formdata = new FormData;
      for (let i = 0; i < this.length; i++) {
                  formdata.append('images'+[i], this.docs[i], this.docs[i].name );
                  formdata.append('length', this.length);
                  formdata.append('id', this.id);
              }
      this.payerservice.uplodeimages(formdata).subscribe((data)=>{
        this.getallimageofVoyage();
      },
      (err)=>{});
    }
     
    getallimageofVoyage(){
      this.payerservice.getallimageofVoyage(this.id).subscribe((data)=>{
        
        this.nbimages=Object.keys(data).length;
        this.images=data;
        this.add();      },
        (err)=>{});
    }
  
//code de coursile de images de voyage
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
