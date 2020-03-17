import { Component, OnInit } from '@angular/core';
import{Categori}from '../class/Categori';
import{VoyageService} from '../../service/admin/voyage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService}from '../../service/admin/message.service';


@Component({
  selector: 'app-voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.css']
})
export class VoyageComponent implements OnInit {
  cat:Categori[]=[];
  payer:string="";
  type:string="normal";
  image:File;
  selectfile:File=null;
  dataSource: Object;
  chartConfig: Object;
  nb:number;
  registerForm: FormGroup;
  submitted :boolean;
  succes:boolean;
  valide:boolean=false;
  existe:boolean=false;
  

  constructor( private payerservice:VoyageService,private msg:MessageService,private formBuilder: FormBuilder) {
       this.chartConfig = {
        
          type: 'column2d',
          dataFormat: 'json',
      };

      this.dataSource = {
          "chart": {
            "caption": "Reservation Voyage par payer",
            "subCaption": "In MMbbl = One Million barrels",
            "xAxisName": "Country",
            "yAxisName": "Reserves (MMbbl)",
            "numberSuffix": "R",
            "theme": "fusion",
          },
          "data": [{
            "label": "Venezuela",
            "value": "290"
          }, {
            "label": "Saudi",
            "value": "260"
          }, {
            "label": "Canada",
            "value": "180"
          }, {
            "label": "Iran",
            "value": "140"
          }, {
            "label": "Russia",
            "value": "115"
          }, {
            "label": "UAE",
            "value": "100"
          }, {
            "label": "US",
            "value": "30"
          }, {
            "label": "China",
            "value": "30"
          }]
        };

  }
  ngOnInit() {
          this.getAllPaye();
          this.msg.getMessage().subscribe((data)=>{
              this.getAllPaye();
            });
          this.registerForm = this.formBuilder.group({
                payer: [null, [Validators.required]],
                image:[null, [Validators.required ]]}
                 );
  }
//control
  get f() { return this.registerForm.controls; }
//end control

//fil image uplode
         fileChange(event){
                      this.selectfile=<File>event.target.files[0];
                      }
//end file change 
//add pays of categorie
  ajouter_payer(){
        this.submitted = false;
         // stop here if form is invalid
       if (this.registerForm.invalid) {
                  this.submitted=true
                  this.succes=false;
                  this.valide=false;
                  this.existe=false;
                   return;
                 }
        const fr=new FormData();
          fr.append('image',this.selectfile,this.selectfile.name);
          fr.append('payer',this.payer);
          fr.append('type',this.type);
     this.payerservice.ajouter_payer(fr).subscribe(
            (data)=>{
                    this.payer=null;
                    this.image=null;
                    this.msg.setMessage('something happen');
                    this.submitted = false;
                    this.valide=true;
                    this.succes=true; 
                    this.existe=false;},
             (err)=>{
                      this.existe=true;
                      this.add();
                    } 
                    );
}
//end add pays

// get all pays
        getAllPaye(){
                  this.payerservice.getpaye().subscribe((date)=>{
                  this.cat=date;
                  console.log(this.cat);
                  this.nb=Object.keys(this.cat).length;
             });
            } 
//end get all pays

//delete pays by id 
            delete(id){
              this.payerservice.deletebyid(id).subscribe((data)=>{
                this.msg.setMessage('something happen');
              }

              );
             
            }
//end delete 
//add sur button pays 
            add()  {
            this.submitted = false;
            this.succes=true;
            this.payer=null;
            this.image=null;
            this.valide=false;
            }    
//end button    

}
