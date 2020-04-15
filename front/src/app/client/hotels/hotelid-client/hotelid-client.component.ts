import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ServiceHotelService} from '../../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { escapeRegExp } from '@angular/compiler/src/util';
@Component({
  selector: 'app-hotelid-client',
  templateUrl: './hotelid-client.component.html',
  styleUrls: ['./hotelid-client.component.css']
})
export class HotelidClientComponent implements OnInit {
  descriptions_hotel:boolean[]=[];
  question_hotel:boolean[]=[];
id:any;
images:any;
image:any;
ville:any;
nb_etoile:any;
hotels_de_meme_ville:any;
amenagement:any;
nom_hotel:string;
dscription:string;
descriptions:any;
question:any;
interdi:any;
registerForm:FormGroup;
registerFormUser:FormGroup;
submitted:boolean;
submitteduser:boolean;
date:string="date de arreve";
hotel:any=null;
pension_selecte:any[]=[];
pension_selecte_titre:any[]=[];
type_chambre_selecte:any[]=[];
prix_p:any[]=[];
prix:any[]=[];
chambre:any[]=[];
prix_t:any[]=[];
prix_c:any[]=[];
minPickerDate:any;
rechereche_afficher:boolean;
resertvation:boolean;
login:boolean;
  constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder) {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+15};
   }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.login=true;
    }else{
      this.login=false;
    }
  this.rechereche_afficher=true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_hotel_by_id();
    this.get_all_photo_of_hotel();
    this.get_all_loisire_of_hotel();
    this.get_all_description_of_on_hotel();
    this.get_all_question_of_one_hotel();
    this.get_all_interdi_of_hotel();
   
    this.registerForm = this.formBuilder.group({
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
    this.registerFormUser=this.formBuilder.group({
      civilite:["Civilité...", [Validators.required]],
      Nom:["", [Validators.required]],
      Prenom:["", [Validators.required]],
      Email:["", [Validators.required,Validators.email]],
      Tel:["", [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
      password:["", [Validators.required,Validators.minLength(8)]],

    });
    this.get_resulta();
  }
  get f() { return this.registerForm.controls; }
  get f1() { return this.registerFormUser.controls; }
  get_all_photo_of_hotel(){
this.service.get_all_photo_of_hotel(this.id).subscribe(
        (data)=>{this.images=data
                console.log(data);
                },
        (err)=>{console.log(err)})
  }
  get_hotel_by_id(){
    this.service.get_hotel_by_id(this.id).subscribe(
      (data)=>{this.dscription=data.description; this.image=data.image;this.nom_hotel=data.nom;this.ville=data.ville;this.nb_etoile=data.etoile; this.get_hotels_of_ville();},
      (err)=>{console.log(err)}
    )
  }
  get_all_loisire_of_hotel(){
    this.service.get_all_loisire_of_hotel(this.id).subscribe(
            (data)=>{this.amenagement=data;console.log(data)},
            (err)=>{console.log(err)}
            )
  }
  get_all_description_of_on_hotel(){
    this.service.get_all_description_of_on_hotel(this.id).subscribe(
         (data)=>{this.descriptions=data;console.log(data)},
         (err)=>{console.log(err)});

    }
    get_all_question_of_one_hotel(){
      this.service.get_all_question_of_one_hotel(this.id).subscribe(
              (data)=>{this.question=data;console.log(data)},
              (err)=>{console.log(err)})
    }
    get_hotels_of_ville(){
    this.service.get_hotels_of_ville(this.ville).subscribe(
          (data)=>{this.hotels_de_meme_ville=data;},
          (err)=>{console.log(err)});
    }
    get_all_interdi_of_hotel(){
      this.service.get_all_interdi_of_hotel(this.id).subscribe(
            (data)=>{this.interdi=data;},
            (err)=>{console.log(err)}
            )
    }
    createRange(number){
      var items: number[] = [];
      for(var i =1; i <= number; i++){
         items.push(i);
      }
      return items;
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
       this.prix[chambre]=0;
       for (let i = 0; i < len; i++) {
         if(h[i].id==c){
           console.log(h[i].sommes);
           this.prix[chambre]=h[i].sommes;
           this.chambre[chambre]=h[i].id
           if(h[i].adulte!=0&&h[i].enfant==0){
            this.type_chambre_selecte[i]=h[i].type+": "+h[i].adulte+" Adulte";
           }else{
            this.type_chambre_selecte[i]=h[i].type+": "+h[i].adulte+" Adulte  "+h[i].enfant+" Enfant";
           }
         } 
        }
        this.prix_c[id]=0
        for(let k=0;k<nb;k++){
         this.prix_c[id]=this.prix[k+1]+this.prix_c[id];
        }
        this.prix_t[id]=this.prix_p[id]+this.prix_c[id];
     }
 //pour calculer le prix de hotel _ prondre let prix de le 1ere choix de chombre 
     toutale_prix(resulta){
                     //par_courire le resulta
         this.prix_c[resulta.id]=0;  
         this.pension_selecte[resulta.id]=resulta.pension[0].id;
         this.pension_selecte_titre[resulta.id]=resulta.pension[0].titre;
         this.prix_p[resulta.id]=resulta.pension[0].prix*resulta.nbPersonne*resulta.nuit;                   //inesialize le prix toutale
           let x=Object.keys(resulta.chambres).length;   //calculer count of chombre in resulta
          
       for(let d=0;d<x;d++){                                    // parcoucrire le chambre on de rsulta
      let hotel=  Object.assign({}, resulta.chambres[d+1]);  //covertire le array de chombre on json
      
       this.prix[d+1]=hotel[0].sommes; //prix de primaire chambre
       this.chambre[d+1]=hotel[0].id
       if(hotel[0].adulte!=0&&hotel[0].enfant==0){
        this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte";
       }else{
        this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte  "+hotel[0].enfant+" Enfant";
       }
       
      this.prix_c[resulta.id]=hotel[0].sommes+this.prix_c[resulta.id]; //somme de prix de premier choix de chombre
           }
           this.prix_t[resulta.id]=this.prix_p[resulta.id]+this.prix_c[resulta.id]; 
       
     }
     add_prix_pension(p,id,nbP,nbN){
       this.pension_selecte[id]=p.id;
       this.pension_selecte_titre[id]=p.titre;
       console.log(p);
       this.prix_p[id]=p.prix*nbP*nbN;
       this.prix_t[id]=0;
       this.prix_t[id]=this.prix_p[id]+this.prix_c[id];
       
     }
     rechercher_hotel(){
      if(this.f.nuit.errors||this.f.nbchamber.errors|| this.date=="date de arreve" ||this.f.number_enfants1.errors||this.f.number_adulte1.errors||this.f.number_adulte2.errors||this.f.number_enfants2.errors||this.f.number_adulte3.errors||this.f.number_enfants3.errors||this.f.number_adulte4.errors||this.f.number_enfants4.errors||this.f.number_adulte5.errors||this.f.number_enfants5.errors ){
        this.submitted=true
        console.log("error");
        return;
      }
      const fr=new FormData();
      fr.append('id',this.id);
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
      this.service.get_hotel_resulta_of_Recherche(fr).subscribe(
            (data)=>{
                      this.hotel=data;
                      console.log(data);
                      this.rechereche_afficher=false;
                     this.toutale_prix(data);
                    },
            (err)=>{console.log(err)})
    }
    modifier(){
      this.rechereche_afficher=true;
    }
    get_resulta(){
      console.log (this.service.get_resulta_of_rechere());
     if(this.service.get_resulta_of_rechere()!=null){
      if(this.service.get_resulta_of_rechere().id!=this.id){
        this.hotel==null;
      }else{
       this.hotel=this.service.get_resulta_of_rechere();
       this.rechereche_afficher=false;
      this.registerForm.get('nuit').setValue(this.hotel.nuit);
      this.date=this.hotel.dateToIn;
      this.registerForm.get('nbchamber').setValue(this.hotel.nbchambre);
      for(let i=1;i<=this.hotel.nbchambre;i++){
        this.registerForm.get('number_adulte'+i).setValue(this.hotel.chambres[i][0].adulte);
        this.registerForm.get('number_enfants'+i).setValue(this.hotel.chambres[i][0].enfant);
      }
    
      
      
      this.toutale_prix(this.hotel);
      }
     }
    
    }
    ajouter(date){
      let dateto=new Date(date);
      let nuit=Number(this.hotel.nuit);
    return  dateto.setDate(dateto.getDate()+nuit );
  
    }
    Reserve_hotel(){
        if(this.registerFormUser.invalid){
            this.submitteduser=true;
        }
        const fr=new FormData();
        fr.append('civilite',this.registerFormUser.get('civilite').value);
        fr.append('Nom',this.registerFormUser.get('Nom').value);
        fr.append('Prenom',this.registerFormUser.get('Prenom').value);
        fr.append('Email',this.registerFormUser.get('Email').value);
        fr.append('password',this.registerFormUser.get('password').value);
        fr.append('Tel',this.registerFormUser.get('Tel').value);
        fr.append('hotel',this.id);
        fr.append('pension', this.pension_selecte[this.id]);
        fr.append('date', this.date);
        fr.append('nuit',this.hotel.nuit);
        fr.append('prix',this.prix_t[this.id]);
        fr.append('nbchambre',this.hotel.nbchambre);
      for(let i=1;i<=this.hotel.nbchambre;i++){
          fr.append('chambre'+i,this.chambre[i]);
          fr.append('chambreadulte'+i,this.registerForm.get('number_adulte'+i).value);
          fr.append('chambreenfant'+i,this.registerForm.get('number_enfants'+i).value);
        }
        new Response(fr).text().then(console.log)
  this.service.resereve_hotel(fr).subscribe(
        (data)=>{console.log(data)},
        (err)=>{console.log(err)})
        
    }
}
