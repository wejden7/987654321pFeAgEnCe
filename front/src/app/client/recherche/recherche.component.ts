import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent implements OnInit {
 
collapseExample:boolean[]=[];
aller:boolean;
date :string="";
minPickerDate:any;
registerForm:FormGroup;
submitted:boolean;
ville:any;
    


constructor(private formBuilder: FormBuilder,private service:ServiceHotelService ,private router : Router) {
  let   d=new Date(new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()+ 14);
  this. minPickerDate = {
    year: d.getFullYear(),
    month: d.getMonth(),
    day: d.getDate()};
      
   }
  ngOnInit() {
    this.collapse(1);
    this.aller=true;
    this.registerForm = this.formBuilder.group({
      ville: ["choisire un ville", [Validators.required]],
      nbchamber: [1, [Validators.required]],
      dp:[null],
      nuit: [1, [Validators.required]],
      number_adulte1: [1, [Validators.required]],
      number_enfants1: [0, [Validators.required]],
      age_enfants11: [1, [Validators.required]],
      age_enfants12: [1, [Validators.required]],
      age_enfants13: [1, [Validators.required]],
      age_enfants14: [1, [Validators.required]],
      age_enfants15: [1, [Validators.required]],
      number_adulte2: [1, [Validators.required]],
      number_enfants2: [0, [Validators.required]],
      age_enfants21: [1, [Validators.required]],
      age_enfants22: [1, [Validators.required]],
      age_enfants23: [1, [Validators.required]],
      age_enfants24: [1, [Validators.required]],
      age_enfants25: [1, [Validators.required]],
      number_adulte3: [1, [Validators.required]],
      number_enfants3: [0, [Validators.required]],
      age_enfants31: [1, [Validators.required]],
      age_enfants32: [1, [Validators.required]],
      age_enfants33: [1, [Validators.required]],
      age_enfants34: [1, [Validators.required]],
      age_enfants35: [1, [Validators.required]],
      number_adulte4: [1, [Validators.required]],
      number_enfants4: [0, [Validators.required]],
      age_enfants41: [1, [Validators.required]],
      age_enfants42: [1, [Validators.required]],
      age_enfants43: [1, [Validators.required]],
      age_enfants44: [1, [Validators.required]],
      age_enfants45: [1, [Validators.required]],
      number_adulte5: [1, [Validators.required]],
      number_enfants5: [0, [Validators.required]],
      age_enfants51: [1, [Validators.required]],
      age_enfants52: [1, [Validators.required]],
      age_enfants53: [1, [Validators.required]],
      age_enfants54: [1, [Validators.required]],
      age_enfants55: [1, [Validators.required]],
    });
    this.get_all_ville();
  }
     
cheked(n){
               if(n==1){
                 this.aller=false;
                }else{
                 this.aller=true;}
        }
createRange(number){
                var items: number[] = [];
                for(var i = 1; i <= number; i++){
                   items.push(i);
                }
                return items;
              }
get f() { return this.registerForm.controls; } 
get_all_ville(){
    this.service.get_all_ville().subscribe(
          (data)=>{this.ville=data;},
          (err)=>{});
  }
onDateChange(dt: any)
              {
                if(dt!=null){
                  this.date= dt.year+'/'+dt.month+'/'+dt.day;
                }
              }
rechercher_hotel(){
    if(this.registerForm.get("ville").value=="choisire un ville"|| this.date=="" ){
                  this.submitted=true
                  console.log("error");
                  return;
            
                }
                const fr=new FormData();
                fr.append('ville',this.registerForm.get('ville').value);
                fr.append('nb_chambre',this.registerForm.get('nbchamber').value);
                fr.append('nb_nuit',this.registerForm.get('nuit').value);
            
                fr.append('number_adulte1',this.registerForm.get('number_adulte1').value);
                fr.append('number_enfants1',this.registerForm.get('number_enfants1').value);
            
                fr.append('age_enfants11',this.registerForm.get('age_enfants11').value);
                fr.append('age_enfants12',this.registerForm.get('age_enfants12').value);
                fr.append('age_enfants13',this.registerForm.get('age_enfants13').value);
                fr.append('age_enfants14',this.registerForm.get('age_enfants14').value);
                fr.append('age_enfants15',this.registerForm.get('age_enfants15').value);
            
                fr.append('number_adulte2',this.registerForm.get('number_adulte2').value);
                fr.append('number_enfants2',this.registerForm.get('number_enfants2').value);
            
                fr.append('age_enfants21',this.registerForm.get('age_enfants21').value);
                fr.append('age_enfants22',this.registerForm.get('age_enfants22').value);
                fr.append('age_enfants23',this.registerForm.get('age_enfants23').value);
                fr.append('age_enfants24',this.registerForm.get('age_enfants24').value);
                fr.append('age_enfants25',this.registerForm.get('age_enfants25').value);
            
                fr.append('number_adulte3',this.registerForm.get('number_adulte3').value);
                fr.append('number_enfants3',this.registerForm.get('number_enfants3').value);
            
                fr.append('age_enfants31',this.registerForm.get('age_enfants31').value);
                fr.append('age_enfants32',this.registerForm.get('age_enfants32').value);
                fr.append('age_enfants33',this.registerForm.get('age_enfants33').value);
                fr.append('age_enfants34',this.registerForm.get('age_enfants34').value);
                fr.append('age_enfants35',this.registerForm.get('age_enfants35').value);
            
                fr.append('number_adulte4',this.registerForm.get('number_adulte4').value);
                fr.append('number_enfants4',this.registerForm.get('number_enfants4').value);
            
                fr.append('age_enfants41',this.registerForm.get('age_enfants41').value);
                fr.append('age_enfants42',this.registerForm.get('age_enfants42').value);
                fr.append('age_enfants43',this.registerForm.get('age_enfants43').value);
                fr.append('age_enfants44',this.registerForm.get('age_enfants44').value);
                fr.append('age_enfants45',this.registerForm.get('age_enfants45').value);
            
                fr.append('number_adulte5',this.registerForm.get('number_adulte5').value);
                fr.append('number_enfants5',this.registerForm.get('number_enfants5').value);
            
                fr.append('age_enfants51',this.registerForm.get('age_enfants51').value);
                fr.append('age_enfants52',this.registerForm.get('age_enfants52').value);
                fr.append('age_enfants53',this.registerForm.get('age_enfants53').value);
                fr.append('age_enfants54',this.registerForm.get('age_enfants54').value);
                fr.append('age_enfants55',this.registerForm.get('age_enfants55').value);
                fr.append('date',this.date);
                this.service.set_resulta_of_rechere(fr);
                this.router.navigate(['/index/hotels']);
              
              }
collapse(x){
  for(let i=1;i<=2;i++){
    if(i==x){
     this.collapseExample[i]=true;
    }else{
      this.collapseExample[i]=false;
    }
  }
}
}
