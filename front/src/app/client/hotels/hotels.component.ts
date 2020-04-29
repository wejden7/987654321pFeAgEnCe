import { Component, OnInit } from '@angular/core';
import{ServiceHotelService} from '../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from './../../service/admin/message.service';
import { interval } from 'rxjs';
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
  date:string="arrivée";
  model:any;
  recherche:boolean=false;
  pension_selecte:any[]=[];
  prix_p:any[]=[];
  prix:any[][]=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  prix_t:any[]=[];
  prix_c:any[]=[];
  
  constructor(private service:ServiceHotelService,private formBuilder: FormBuilder,private router : Router,private message:MessageService) {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+14};
   }

  ngOnInit() {
    this.message.setMessage("");
    window.scroll(0, 0);
    this.get_all_hotel_a_client_of_Carousel();
    this.get_all_hotel();
    this.get_all_ville();
    this.registerForm = this.formBuilder.group({
      ville: ["choisire un ville", [Validators.required]],
      nb_chambre: [1, [Validators.required]],
      dp:[null],
      nb_nuit: [1, [Validators.required]],
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
    this.get_resulta();
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
    if(this.registerForm.get("ville").value=="choisire un ville"|| this.date=="arrivée" ){
      this.submitted=true
      console.log("error");
      return;

    }
    const fr=new FormData();
    fr.append('ville',this.registerForm.get('ville').value);
    fr.append('nb_chambre',this.registerForm.get('nb_chambre').value);
    fr.append('nb_nuit',this.registerForm.get('nb_nuit').value);

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
        this.prix_p[resulta[k].id]=((resulta[k].pension[0].prixAdulte*resulta[k].nbAdulte)+(resulta[k].pension[0].prixEnfant*resulta[k].nbEnfant)+(resulta[k].pension[0].prixBebe*resulta[k].nbbebe))*resulta[k].nuit;                   //inesialize le prix toutale
          let x=Object.keys(resulta[k].chambres).length;   //calculer count of chombre in resulta
         
      for(let d=0;d<x;d++){                                    // parcoucrire le chambre on de rsulta
     let hotel=  Object.assign({}, resulta[k].chambres[d+1]);  //covertire le array de chombre on json
     
      this.prix[resulta[k].id][d+1]=hotel[0].sommes; //prix de primaire chambre
      
     this.prix_c[resulta[k].id]=hotel[0].sommes+this.prix_c[resulta[k].id]; //somme de prix de premier choix de chombre
          } 
          this.prix_t[resulta[k].id]=this.prix_p[resulta[k].id]+this.prix_c[resulta[k].id]; 
      }
    }
    add_prix_pension(p,hotel){
     let id  =hotel.id;
     let nbA =hotel.nbAdulte;
     let nbE =hotel.nbEnfant;
     let nbB =hotel.nbbebe;
     let nbN =hotel.nuit;
      this.pension_selecte[id]=p.id;
      console.log(p);
      this.prix_p[id]=((p.prixAdulte*nbA)+(p.prixEnfant*nbE)+(p.prixBebe*nbB))*nbN;
      this.prix_t[id]=0;
      this.prix_t[id]=this.prix_p[id]+this.prix_c[id];
    }
      
    detail_rehcerche(h){
      console.log(h);
      const fr=new FormData();
      fr.append('id',h.id);
      fr.append('ville',this.registerForm.get('ville').value);
      fr.append('nb_chambre',this.registerForm.get('nb_chambre').value);
      fr.append('nb_nuit',this.registerForm.get('nb_nuit').value);
  
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
      this.router.navigate(['/index/hotels/hotelclientAndResulta/'+h.id]);

    }
    get_resulta(){
      console.log (this.service.get_resulta_of_rechere());
     let fr= this.service.get_resulta_of_rechere()
     if(fr!=null){
      for(var pair of fr.entries()) {
        console.log(pair[1]);
        if(pair[0]!="date"){
          
          this.registerForm.get(pair[0]).setValue(Number(pair[1]));
          
        }else{
          this.date=pair[1];
        }
     }
    
      
  this.service.get_all_hotel_resulta_of_Recherche(fr).subscribe(
          (data)=>{
            this.service.set_resulta_of_rechere(null);
                    this.resulta_de_rechrech=data;
                    console.log(data);
                    this.recherche=true;
                   this.toutale_prix(data);
                  },
          (err)=>{console.log(err)})
    
      }else{
       
      }
     }
    
    

}
