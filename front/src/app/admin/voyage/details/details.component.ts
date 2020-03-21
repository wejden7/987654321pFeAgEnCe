import { Component, OnInit } from '@angular/core';
import{Categori}from '../../class/Categori';
import{Voyage} from '../../../admin/class/voyage';
import{VoyageService} from '../../../service/admin/voyage.service';
import{MessageService}from '../../../service/admin/message.service';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  id:string;
  cat:Categori;
  voyage:Voyage[]=[];
  dataSource: Object;
  chartConfig: Object;
  minPickerDate:any;
  nb:number;
  image:File;
  updeteimagevaide:boolean;
  submitted:boolean;
  submittedupdete:boolean;
  
  //le ng model
  selectfile:File=null;
  nbjour:string;
  titre:string;
  nbplace:string;
  //end ng model
  registerForm: FormGroup;
  updeteimageform:FormGroup;

  constructor(private formBuilder: FormBuilder, private payerservice:VoyageService, private route: ActivatedRoute) {
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
   get f() { return this.registerForm.controls; }
   get f1() { return this.updeteimageform.controls; }
   
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
            titre: [null, [Validators.required]],
            nbjour:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
            nbplace:[null, [Validators.required ,Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
            image:[null, [Validators.required ]],});
   this.updeteimageform = this.formBuilder.group({
              file:[null, [Validators.required ]],});

    this.id = this.route.snapshot.paramMap.get('id');
    this.getpayebyid();
    this.getvoyage();
   
  }
  getpayebyid(){
    this.payerservice.getpayebyid(this.id).subscribe((data)=>{
          this.cat=data;
          this.add();
        },
          (err)=>{});

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
    fr.append('nbplace',this.nbplace);
    this.payerservice.addvoyage(fr).subscribe((data)=>{
          this.getvoyage();
          
    });
  }
  getvoyage(){
    this.payerservice.getallvoyage(this.id).subscribe((data)=>{
             this.voyage=data;
             this.add();
           this.nb=Object.keys(this.voyage).length;
         });
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
           
      });
    }
   
}
