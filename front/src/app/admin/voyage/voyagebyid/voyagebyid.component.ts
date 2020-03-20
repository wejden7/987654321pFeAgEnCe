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
programme:any;
jour:string='1';
termine:boolean=false;
id_prog:string;
jour_updete:string;
updete_termine:boolean;
myForm = new FormGroup({
  file: new FormControl('', [Validators.required]),
  fileSource: new FormControl('', [Validators.required])
});



  constructor(private payerservice:VoyageService, private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
  };
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
          image:[null, [Validators.required ]]}
       );
      this.ProgrammeForm = this.formBuilder.group({
        programme:[null, [Validators.required ]]}
     );
    this.add();
    
    this.getvoyage();
    this.getprogrammeofvoyage();
    this.getallimageofVoyage();
    this.registerForm = this.formBuilder.group({
      prix: [null, [Validators.required]],
      dp:[null, [Validators.required ]]}
       );
       
       this.getallperideofvoyage();
  }
  getvoyage(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.payerservice.getvoyage(this.id).subscribe((data)=>{
      this.voyage=data;
      
      
    }
    );
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  add(){
    this.model=null;
    this.prix="";
    this.updetedate="Periode";
    this.type="add";
    this.date="";
  }
  addperiode(){
    const fr=new FormData();
    fr.append('voyage',this.id);
    fr.append('prix',this.prix);
    fr.append('date',this.date);
    this.payerservice.addperiode(fr).subscribe(
      (data)=>{
        this.add();
        this.getallperideofvoyage();
       });
  }
  onDateChange(dt: any)
    {
      this.date= dt.year+'/'+dt.month+'/'+ dt.day ;
    }
  getallperideofvoyage(){
    this.payerservice.getperiode(this.id).subscribe((data)=>{
      this.periode=data;
    });

  }
  updete(p){
    this.updetedate=p.date
    this.prix=p.prix;
    this.id_tarif=p.id;
  this.type="updete";
  }
  Updeteperiod(){
              const fr=new FormData();
                    fr.append('id',this.id_tarif);
                    fr.append('prix',this.prix);
              if(this.date!=""){
                      fr.append('date',this.date);
              }else{
                      fr.append('date',this.updetedate);
              }
              this.payerservice.updeteperiode(fr).subscribe(
                (data)=>{
                        this.getallperideofvoyage();
                        this.add();
                        }
              );

  }
  delete(id){
    this.payerservice.deleteperiode(id).subscribe((data)=>{
      this.getallperideofvoyage();
    })
  }
  fileChange(event){
    this.selectfile=<File>event.target.files[0];
    }
    updeteimage(){
      const fr=new FormData();
      fr.append('image',this.selectfile,this.selectfile.name);
      fr.append('id',this.id);
      this.payerservice.updeteimagevoyage(fr).subscribe((data)=>{
        this.getvoyage();
      })
    }
    addProgarmme(){
     const fr=new FormData();
    fr.append('voyage',this.id);
    fr.append('jour',this.jour);
    fr.append('programme',this.programme);
      this.payerservice.addprogrammevoyage(fr).subscribe((data)=>{
        this.programme="";
        this.getprogrammeofvoyage();
        console.log(this.jour);
      })
    }
    getprogrammeofvoyage(){
      this.payerservice.getallprogrammeofonevoyage(this.id).subscribe(
        (data)=>{ console.log(data);
          this.allprogramme=data;
          this.jour=String(Object.keys(data).length);
          if(Number(this.jour)==Number(this.voyage.nbjour)){
            this.termine=true;
          }else{
            this.jour=String(Number(this.jour)+1);
          }

        }
        );

    }
    updetemodifier(){
      const fr=new FormData();
    fr.append('id',this.id_prog);
    fr.append('programme',this.programme);
    this.payerservice.updeteprogramme(fr).subscribe((data)=>{
      this.getprogrammeofvoyage();
      this.updete_termine=true;
    })

     

    }
    updeteprograme(prog){
      this.id_prog=prog.id;
      this.jour_updete=prog.jour
      this.programme=prog.description
      this.updete_termine=false;
    }
    onFileChange(event) {
      console.log(event);
         this.docs = <File>event.target.files;
         this.length = <File>event.target.files.length;
     
    }
    submit(){
      const formdata = new FormData;
      for (let i = 0; i < this.length; i++) {
                  formdata.append('images'+[i], this.docs[i], this.docs[i].name );
                  formdata.append('length', this.length);
                  formdata.append('id', this.id);
              }
      this.payerservice.uplodeimages(formdata).subscribe((data)=>{
        console.log(data);
        this.getallimageofVoyage();

      });
    }
     
    getallimageofVoyage(){
      this.payerservice.getallimageofVoyage(this.id).subscribe((data)=>{
        console.log(data);
        this.images=data;
        
      });
    }
    
  


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
