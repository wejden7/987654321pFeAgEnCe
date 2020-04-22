import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng4-validators';
import {Router,  } from '@angular/router';
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
  resulta_de_rechrech:any[];
  registerForm:FormGroup;
  submitted:boolean;
  date:string="";
  recherche:boolean=false;
  pension_selecte:any[]=[];
  prix_p:any[]=[];
  prix:any[][]=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  prix_t:any[]=[];
  prix_c:any[]=[];
  
  constructor(private service:ServiceHotelService,private formBuilder: FormBuilder,private router : Router) {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+14};
   }

  ngOnInit() {
    window.scroll(0, 0);
    this.get_all_hotel_a_client_of_Carousel();
    this.get_all_hotel();
    this.get_all_ville();
    this.service.set_resulta_of_rechere(null);
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
          (data)=>{this.hotel_carousel=data;console.log(this.hotel_carousel)},
          (err)=>{console.log(err)});
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
          (data)=>{
                    this.resulta_de_rechrech=data;
                    console.log(data);
                    this.recherche=true;
                   this.toutale_prix(data);
                  },
          (err)=>{console.log(err)})
  }
  onDateChange(dt: any)
    {
      if(dt!=null){
        this.date= dt.year+'/'+dt.month+'/'+dt.day;
      }
    }
    filterForeCasts(c,h,id,nb,chambre){
     // this.chaked_chambre[]
     var len = Object.keys(h).length;
      this.prix[id][chambre]=0;
      for (let i = 0; i < len; i++) {
        if(h[i].id==c){
          console.log(h[i].sommes);
          this.prix[id][chambre]=h[i].sommes;
        } 
       }
       this.prix_c[id]=0

       for(let k=0;k<nb;k++){
        this.prix_c[id]=this.prix[id][k+1]+this.prix_c[id];
       }
       this.prix_t[id]=this.prix_p[id]+this.prix_c[id];
      
    }
//pour calculer le prix de hotel _ prondre let prix de le 1ere choix de chombre 
    toutale_prix(resulta){
      
      var len = Object.keys(resulta).length;//calculer count of ruslta d
      for(let k=0;k<len;k++){   
                    //par_courire le resulta
        this.prix_c[resulta[k].id]=0;  
        this.pension_selecte[resulta[k].id]=resulta[k].pension[0].id;
        this.prix_p[resulta[k].id]=resulta[k].pension[0].prix*resulta[k].nbPersonne*resulta[k].nuit;                   //inesialize le prix toutale
          let x=Object.keys(resulta[k].chambres).length;   //calculer count of chombre in resulta
         
      for(let d=0;d<x;d++){                                    // parcoucrire le chambre on de rsulta
     let hotel=  Object.assign({}, resulta[k].chambres[d+1]);  //covertire le array de chombre on json
     
      this.prix[resulta[k].id][d+1]=hotel[0].sommes; //prix de primaire chambre
      
     this.prix_c[resulta[k].id]=hotel[0].sommes+this.prix_c[resulta[k].id]; //somme de prix de premier choix de chombre
          } 
          this.prix_t[resulta[k].id]=this.prix_p[resulta[k].id]+this.prix_c[resulta[k].id]; 
      }
    }
    add_prix_pension(p,id,nbP,nbN){
      this.pension_selecte[id]=p.id;
      console.log(p);
      this.prix_p[id]=p.prix*nbP*nbN;
      this.prix_t[id]=0;
      this.prix_t[id]=this.prix_p[id]+this.prix_c[id];
      console.log("termine");
      console.log(this.prix_t[id])
      console.log(this.prix_p[id])
      console.log(this.prix_c[id])
    }
      
    detail_rehcerche(h){
      this.service.set_resulta_of_rechere(h);
      this.router.navigate(['/index/hotels/hotelclientAndResulta/'+h.id]);

    }
   

}
