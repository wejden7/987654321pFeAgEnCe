import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import { variable } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  nbchamber:number;
  minPickerDate:any;
  hotels:any[];
  hotel_carousel:any[];
  ville:any[];
  resulta_de_rechrech:any[]=[];
  registerForm:FormGroup;
  submitted:boolean;
  date:string="";
  constructor(private service:ServiceHotelService,private formBuilder: FormBuilder) {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+15};
   }

  ngOnInit() {
    this.get_all_ville();
    this.get_all_hotel();
    this.get_all_hotel_a_client_of_Carousel();
    this.registerForm = this.formBuilder.group({
      ville: ["choisire un ville", [Validators.required]],
      nbchamber: [1, [Validators.required]],
      dp:[null],
      nuit: [null, [Validators.required]],
      number_adulte1: [1, [Validators.required]],
      number_enfants1: [0, [Validators.required]],
      number_adulte2: [1, [Validators.required]],
      number_enfants2: [0, [Validators.required]],
      number_adulte3: [1, [Validators.required]],
      number_enfants3: [0, [Validators.required]],
      number_adulte4: [1, [Validators.required]],
      number_enfants4: [0, [Validators.required]],
      number_adulte5: [1, [Validators.required]],
      number_enfants5: [0, [Validators.required]],
    });
   
  }
  get f() { return this.registerForm.controls; }
get_all_ville(){
  this.service.get_all_ville().subscribe(
        (data)=>{this.ville=data;},
        (err)=>{});
}
  get_all_hotel(){
    this.service.get_all_hotel_a_client().subscribe(
      (data)=>{this.hotels=data})
  }
  get_all_hotel_a_client_of_Carousel(){
    this.service.get_all_hotel_a_client_of_Carousel().subscribe(
          (data)=>{this.hotel_carousel=data;});
  }
  createRange(number){
    var items: number[] = [];
    for(var i =1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  rechercher_hotel(){
    if(this.f.nuit.errors||this.f.nbchamber.errors||this.f.ville.errors|| this.date=="" ||this.f.number_enfants1.errors||this.f.number_adulte1.errors||this.f.number_adulte2.errors||this.f.number_enfants2.errors||this.f.number_adulte3.errors||this.f.number_enfants3.errors||this.f.number_adulte4.errors||this.f.number_enfants4.errors||this.f.number_adulte5.errors||this.f.number_enfants5.errors ){
      this.submitted=true
      console.log("error");
      return;

    }
    const fr=new FormData();
    fr.append('ville',this.registerForm.get('ville').value);
    fr.append('nb_chambre',this.registerForm.get('nbchamber').value);
    fr.append('nb_nuit',this.registerForm.get('nuit').value);
    fr.append('number_enfants1',this.registerForm.get('number_enfants1').value);
    fr.append('number_adulte1',this.registerForm.get('number_adulte1').value);
    fr.append('number_enfants2',this.registerForm.get('number_enfants2').value);
    fr.append('number_adulte2',this.registerForm.get('number_adulte2').value);
    fr.append('number_enfants3',this.registerForm.get('number_enfants3').value);
    fr.append('number_adulte3',this.registerForm.get('number_adulte3').value);
    fr.append('number_enfants4',this.registerForm.get('number_enfants4').value);
    fr.append('number_adulte4',this.registerForm.get('number_adulte4').value);
    fr.append('number_enfants5',this.registerForm.get('number_enfants5').value);
    fr.append('number_adulte5',this.registerForm.get('number_adulte5').value);
    fr.append('date',this.date);
    this.service.get_all_hotel_resulta_of_Recherche(fr).subscribe(
          (data)=>{console.log(data),
                    this.resulta_de_rechrech=data;
                    
                    
                  },
          (err)=>{console.log(err)})
  }
  onDateChange(dt: any)
    {
      this.date= dt.year+'/'+dt.month+'/'+dt.day;
    
    }

}
