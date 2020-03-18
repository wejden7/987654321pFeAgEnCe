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
  
  //le ng model
  selectfile:File=null;
  nbjour:string;
  titre:string;
  nbplace:string;
 

  //end ng model
registerForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private payerservice:VoyageService,private msg:MessageService, private route: ActivatedRoute) {
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
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
  };
   }
   get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getpayebyid();
    this.getvoyage();
    this.msg.getMessage().subscribe((data)=>{
      this.getvoyage();
    });
    this.registerForm = this.formBuilder.group({
      titre: [null, [Validators.required]],
      nbjour:[null, [Validators.required ]],
      nbplace:[null, [Validators.required ]],
      image:[null, [Validators.required ]],
     
      
    }
     
       );
  }
  getpayebyid(){
    this.payerservice.getpayebyid(this.id).subscribe(
      (data)=>{this.cat=data;
      console.log(this.cat);},
      (err)=>{}
      );

  }
  fileChange(event){
    this.selectfile=<File>event.target.files[0];
    }
    
  
  addVoyage(){
    const fr=new FormData();
    fr.append('image',this.selectfile,this.selectfile.name);
    fr.append('id',this.id);
    fr.append('titre',this.titre);
    fr.append('nbjour',this.nbjour);
    fr.append('nbplace',this.nbplace);
    this.payerservice.addvoyage(fr).subscribe(
      (data)=>{
      console.log(data);
     this.getvoyage();
      this.add();
    }
    );

  }
  getvoyage(){
    this.payerservice.getallvoyage(this.id).subscribe((data)=>{
      this.voyage=data;
      console.log(this.voyage);
      this.nb=Object.keys(this.voyage).length;
    }
    );
  }
  delite(id){
    this.payerservice.deletevoyage(id)
    .subscribe(
      (data)=>{
      this.getvoyage();
              }
              );
            }
    add(){
   this.selectfile=null;
 this.nbjour="";
 this.titre="";
  this.nbplace="";
    }
    updeteimage(){
      const fr=new FormData();
      fr.append('image',this.selectfile,this.selectfile.name);
      fr.append('id',this.id);
      this.payerservice.updetepayvoyage(fr).subscribe((data)=>{
        this.getpayebyid();
      })
    }

}
