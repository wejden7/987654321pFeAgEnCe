import { Component, OnInit ,} from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import{Voyage} from '../../../admin/class/voyage';
import{Periode} from '../../../admin/class/periode';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-voyagebyid',
  templateUrl: './voyagebyid.component.html',
  styleUrls: ['./voyagebyid.component.css']
})
export class VoyagebyidComponent implements OnInit {
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


registerForm: FormGroup;

  constructor(private payerservice:VoyageService, private route: ActivatedRoute,private formBuilder: FormBuilder) { 
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()
  };
  }

  ngOnInit() {
    this.add();
    
    this.getvoyage();
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

}
