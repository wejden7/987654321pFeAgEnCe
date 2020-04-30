import {Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ServiceHotelService} from '../../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import{formatDate}from '@angular/common';
import {MessageService} from '../../../service/admin/message.service'
@Component({
  selector: 'app-hotelid-client',
  templateUrl: './hotelid-client.component.html',
  styleUrls: ['./hotelid-client.component.css']
})
export class HotelidClientComponent implements OnInit {

user:any;
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
registerForm2:FormGroup;
registerFormlogin:FormGroup;
submitted:boolean;
submitted2:boolean;
submittedlogin:boolean;
date:string="arrivée";
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
rechereche_afficher:boolean=true;
resertvation:boolean=false;
valide_reservation:boolean;
login:boolean;
reservation_print:any;
error_registre:boolean=false;
Unauthorised:boolean=false;
error_disponibilite:boolean;
constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder,private auth: AuthService,private message:MessageService) {
    this. minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate()+14};
   }
ngOnInit() {
  this.valide_reservation=false;
  this.message.setMessage("");
    window.scroll(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_hotel_by_id();
    this.get_all_photo_of_hotel();
    this.get_all_loisire_of_hotel();
    this.get_all_description_of_on_hotel();
    this.get_all_question_of_one_hotel();
    this.get_all_interdi_of_hotel();
   
    this.registerForm = this.formBuilder.group({
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
    this.registerForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      civilite:["Civilité...", [Validators.required]],
      tel:['', [Validators.required, Validators.minLength(8)]],
      Prenom:["", [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
   
    this.registerFormlogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
    this.get_resulta();
  }
  get f() { return this.registerForm.controls; }
  get f3() { return this.registerForm2.controls; }
  get f2() { return this.registerFormlogin.controls; }
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
           if(h[i].adulte!=0&&h[i].enfant==0&&h[i].bebe==0){
            this.type_chambre_selecte[i]=h[i].type+": "+h[i].adulte+" Adulte";
           }else{
             if(h[i].adulte!=0&&h[i].enfant!=0&&h[i].bebe==0){
              this.type_chambre_selecte[i]=h[i].type+": "+h[i].adulte+" Adulte  "+h[i].enfant+" Enfant";
             }else{
               if(h[i].adulte!=0&&h[i].enfant!=0&&h[i].bebe!=0){
                this.type_chambre_selecte[i]=h[i].type+": "+h[i].adulte+" Adulte  "+h[i].enfant+" Enfant "+h[i].bebe +" Bebe";

               }
             }
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
         this.prix_p[resulta.id]=((resulta.pension[0].prixAdulte*resulta.nbAdulte)+(resulta.pension[0].prixEnfant*resulta.nbEnfant)+(resulta.pension[0].prixBebe*resulta.nbbebe))*resulta.nuit;                   //inesialize le prix toutale
           let x=Object.keys(resulta.chambres).length;   //calculer count of chombre in resulta
          
       for(let d=0;d<x;d++){                                    // parcoucrire le chambre on de rsulta
      let hotel=  Object.assign({}, resulta.chambres[d+1]);  //covertire le array de chombre on json
      
       this.prix[d+1]=hotel[0].sommes; //prix de primaire chambre
       this.chambre[d+1]=hotel[0].id
       if(hotel[0].adulte!=0&&hotel[0].enfant==0&&hotel[0].bebe==0){
        this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte";
       }else{
        if(hotel[0].adulte!=0&&hotel[0].enfant!=0&&hotel[0].bebe==0){
        this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte  "+hotel[0].enfant+" Enfant";
        }else{
          if(hotel[0].adulte!=0&&hotel[0].enfant!=0&&hotel[0].bebe!=0){
            this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte  "+hotel[0].enfant+" Enfant "+hotel[0].bebe+" Bebe";
          }else{
            if(hotel[0].adulte!=0&&hotel[0].enfant==0&&hotel[0].bebe!=0){
              this.type_chambre_selecte[d+1]=hotel[0].type+": "+hotel[0].adulte+" Adulte  "+hotel[0].bebe+" Bebe";

            }
          }
        }
       }
       
      this.prix_c[resulta.id]=hotel[0].sommes+this.prix_c[resulta.id]; //somme de prix de premier choix de chombre
           }
           this.prix_t[resulta.id]=this.prix_p[resulta.id]+this.prix_c[resulta.id]; 
       
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
     rechercher_hotel(){
      if(this.date=="arrivée"){
        this.submitted=true
        console.log("error");
        return;
      }
      const fr=new FormData();
      fr.append('id',this.id);
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
      this.service.get_hotel_resulta_of_Recherche(fr).subscribe(
            (data)=>{console.log(data);
                let n=Object.keys(data).length;
              if(n>0){
                this.hotel=data;
                this.rechereche_afficher=false;
               this.toutale_prix(data);
              }else{
                this.hotel=null;
                this.rechereche_afficher=true;
                this.error_disponibilite=true;
              }
                     
                    },
            (err)=>{console.log(err);
                    this.error_disponibilite=true;
                  })
    }
    modifier(){
      this.rechereche_afficher=true;
    }
    get_resulta(){
      console.log (this.service.get_resulta_of_rechere());
      let fr=this.service.get_resulta_of_rechere();
     if(fr!=null){
      for(var pair of fr.entries()) {
        console.log(pair[0]);
        if(pair[0]!='ville'&&pair[0]!='id'){
          if(pair[0]!="date"){
          
            this.registerForm.get(pair[0]).setValue(Number(pair[1]));
            
          }else{
            this.date=pair[1];
          }
        }
       
     }
      this.service.get_hotel_resulta_of_Recherche(fr).subscribe(
        (data)=>{
          this.service.set_resulta_of_rechere(null);
          let n=Object.keys(data).length;
          if(n>0){
            this.hotel=data;
            this.rechereche_afficher=false;
           this.toutale_prix(data);
          }else{
            this.hotel=null;
            this.rechereche_afficher=true;
            this.error_disponibilite=true;

          }
                  
                },
        (err)=>{console.log(err);
               this.error_disponibilite=true;
              })
      
     }
     
    }
ajouter(date){
      let dateto=new Date(date);
      let nuit=Number(this.registerForm.get('nb_nuit').value);
    return  dateto.setDate(dateto.getDate()+nuit );
  
    }
Reserve_hotel(){
  this.rechereche_afficher=true;
      if(this.registerForm.invalid){
        this.submitted=true;
    }
    const fr=new FormData();
        fr.append('id_user',localStorage.getItem('id'));
        fr.append('hotel',this.id);
        fr.append('pension', this.pension_selecte[this.id]);
        fr.append('date', this.date);
        fr.append('nuit',this.hotel.nuit);
        fr.append('prix',this.prix_t[this.id]);
        fr.append('nbchambre',this.hotel.nbchambre);
      for(let i=1;i<=this.hotel.nbchambre;i++){
          fr.append('chambre'+i,this.chambre[i]);
          fr.append('chambreadulte'+i,this.hotel.chambres[i][0].adulte);
          fr.append('chambreenfant'+i,this.hotel.chambres[i][0].enfant);
          fr.append('chambrebebe'+i,this.hotel.chambres[i][0].bebe);
        }
        
  this.service.resereve_hotel(fr).subscribe(
        (data)=>{console.log(data);
          let n=Object.keys(data).length;
          if(n>0){
            this.valide_reservation=true;
            this.reservation_print=data;
          }else{
            this.hotel=null;
            this.error_disponibilite=true;
            this.resertvation=false;
          }
          },
        (err)=>{this.resertvation=false;console.log(err)})
        
    }
myDate() {
      return formatDate(new Date(), 'd/MM/y', 'en');
   } 
window_print(): void {
  let printContents, popupWin;
  printContents = document.getElementById('print-section').innerHTML;
  popupWin = window.open('', '_blank', 'top=0,left=50%,height=100%,width=auto');
  popupWin.document.open();
  popupWin.document.write(`
    <html>
    <head><link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="stylesheet" href="./assets/dist/admint.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    </head>
  <body onload="window.print();window.close()">`+printContents +`</body>
    </html>`
  );
  popupWin.document.close();
}
onSubmit(){
  if (this.registerFormlogin.invalid) {
       this.submittedlogin = true;
         return;
     }
     const fr=new FormData();
                fr.append('email',this.registerFormlogin.get('email').value);
                fr.append('password',this.registerFormlogin.get('password').value);
     this.auth.login(fr).subscribe(
       (data)=>{
                  this.user=data.success;
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.user.token);
                  localStorage.setItem('name', this.user.name);
                  localStorage.setItem('role', this.user.role);
                  localStorage.setItem('id', this.user.id);
                  this.demonde();
                  this.onReset();
         },
         (err)=>{
           this.Unauthorised=true;
         }
         );
}
onReset() {
  this.submittedlogin = false;
  this.registerFormlogin.reset();
}
onSubmit2() {
 
  this.submitted2 = true;

  if (this.registerForm2.invalid) {
         return;
     }
           const fr=new FormData();
           fr.append('civilite',this.registerForm2.get('civilite').value);
           fr.append('email',this.registerForm2.get('email').value);
           fr.append('name',this.registerForm2.get('nom').value);
           fr.append('surname',this.registerForm2.get('Prenom').value);
           fr.append('tel',this.registerForm2.get('tel').value);
           fr.append('password',this.registerForm2.get('password').value);
   this.auth.setclient(fr).subscribe(
     (data)=>{
                      this.user=data.success;
                      localStorage.setItem('isLoggedIn', "true");
                      localStorage.setItem('token', this.user.token);
                      localStorage.setItem('name', this.user.name);
                      localStorage.setItem('role', this.user.role);
                      localStorage.setItem('id', this.user.id);
                      this.demonde();
                      this.onReset2()
           },
     (err)=>{this.error_registre=true}
           );
       
   }
onReset2() {
                this.submitted2 = false;
                this.registerForm2.reset();
     }

demonde(){
  this.resertvation=true
  if(localStorage.getItem('isLoggedIn') == "true"){
    this.login=true;
    this.auth.get_user().subscribe(
      (data)=>{
        this.user=data;
      },
      (err)=>{console.log(err)})
  }else{
    this.login=false;
  }
     }
}
