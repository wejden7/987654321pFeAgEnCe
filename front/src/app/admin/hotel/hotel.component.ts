import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  selectfile:File=null;
  registerForm: FormGroup;
  registerForm2:FormGroup;
  registerForm3:FormGroup;
  registerForm4:FormGroup;
  registerForm5:FormGroup;
  registerForm6:FormGroup;
  registerForm7:FormGroup;
  submitted:boolean;
  submitted2:boolean;
  submitted3:boolean;
  submitted4:boolean;
  submitted5:boolean;
  submitted6:boolean;
  submitted7:boolean;
  villes:any[];
  type_chambre:any[];
  mois:any[];
  hotels:any[];
  pensions:any[];
  loisires:any[];
  interdits:any[];
  hotel_Al_a_une:any[];
  hotel_non_A_la_une:any[];
  nb_hotel_non_A_la_une:number;
  existe_ville:boolean;
  existe_type_chambre:boolean;
  existe_pension:boolean;
  existe_loisire:boolean;
  existe_interdit:boolean;
  existe_hotel:boolean;
  Recherche:string;
  updateimage:boolean[]=[false];
  updatehotel:boolean=false;
  hotel_id:any;
  Loading_save_hotel:boolean=false;
  Loading_updete_hotel:boolean=false;
  Loading_save_ville:boolean=false;
  Loading_save_type_chambre:boolean=false;
  Loading_save_arrangements:boolean=false;
  Loading_save_service:boolean=false;
  Loading_save_interdit:boolean=false;
  p:any;
  type_notification:string="";
  titre_notification:string="";
  soustitre_notification:string="";
  notification:boolean=false;
  msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  constructor(private formBuilder: FormBuilder,private service:ServiceHotelService) {
  
  }
  ngOnInit() {
    this.get_all_ville();
    this.get_all_type_chambre();
    this.gat_all_hotel();
    this.get_all_pension();
    this.get_all_loisires();
    this.get_all_interdit();
    this.registerForm = this.formBuilder.group({
        ville: [null, [Validators.required]],
      });
    this.registerForm2 = this.formBuilder.group({
        Type_Chambre: [null, [Validators.required]],
        nombre: [null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/),Validators.min(1)]],
      });
    this.registerForm3 = this.formBuilder.group({
        titre: [null, [Validators.required]],
        image:[null, [Validators.required ]],});
    this.registerForm4 = this.formBuilder.group({
          titre: [null, [Validators.required]],
          image:[null, [Validators.required ]],});
    this.registerForm5 = this.formBuilder.group({
            titre: [null, [Validators.required]],
            image:[null, [Validators.required ]],});
    this.registerForm6 = this.formBuilder.group({
              nom: [null, [Validators.required]],
              tel: [null, [Validators.required,Validators.maxLength(8),Validators.minLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
              adresse: [null, [Validators.required]],
              ville: ["choisire un ville",[Validators.required]],
              image:[null, [Validators.required ]],
              etoile:["Nombre de etoile", [Validators.required ]],
              description:[null, [Validators.required ]],});
      this.registerForm7=this.formBuilder.group({
        image:[null, [Validators.required ]],
      })   
                
              }
createRange(number){
                var items: number[] = [];
                for(var i =1; i <= number; i++){
                   items.push(i);
                }
                return items;
              }

  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm2.controls; }
  get f3() { return this.registerForm3.controls; }
  get f4() { return this.registerForm4.controls; }
  get f5() { return this.registerForm5.controls; }
  get f6() { return this.registerForm6.controls; }
  get f7() { return this.registerForm7.controls; }
ajouter_ville(){
      if (this.registerForm.invalid) {
           this.submitted=true
            return;
      }
      this.submitted=false;
      this.Loading_save_ville=true;
          const fr=new FormData();
                fr.append('nom',this.registerForm.get('ville').value);
        this.service.create_ville(fr).subscribe(
          (data)=>{
                    this.registerForm.reset();
                    this.existe_ville=false;
                   
                    this.Loading_save_ville=false;
                    this.get_all_ville();
        },(err)=>{this.Loading_save_ville=false;
                  if(err.error.error =="existe"){
                    this.existe_ville=true;
        }else{
          this.type_notification='error';
          this.titre_notification='';
          this.soustitre_notification=this.msg;
          this.notification=true;
          setTimeout(()=>{ this.notification=false;},3000);
        }
          
        });
      }
get_all_ville(){
    this.service.get_all_ville().subscribe(
                (data)=>{this.villes=data;console.log(this.villes);},
                (err)=>{console.log(err);});
  }
ajouter_Type_Chambre(){
    if (this.registerForm2.invalid) {
      this.submitted2=true;
       return;
        }
        this.submitted2=false;
        this.Loading_save_type_chambre=true;
        const fr=new FormData();
                fr.append('nom',this.registerForm2.get('Type_Chambre').value);
                fr.append('nb',this.registerForm2.get('nombre').value);
        this.service.ajouter_Type_Chambre(fr).subscribe(
          (data)=>{ this.registerForm2.reset();
                    this.existe_type_chambre=false;
                    this.Loading_save_type_chambre=false;
                    this.get_all_type_chambre();
                  },
                   
          (err)=>{ this.Loading_save_type_chambre=false;
                    if(err.error.error=="existe"){
                      this.existe_type_chambre=true;
                    }else{
                      this.type_notification='error';
                      this.titre_notification='';
                      this.soustitre_notification=this.msg;
                      this.notification=true;
                      setTimeout(()=>{ this.notification=false;},3000);
                    }

                   }
        );
      
  }
get_all_type_chambre(){
  this.service.get_all_Type_chambre().subscribe(
    (data)=>{this.type_chambre=data;console.log(this.type_chambre);},
    (err)=>{this.type_notification='error';
            this.titre_notification='';
            this.soustitre_notification=this.msg;
            this.notification=true;
            setTimeout(()=>{ this.notification=false;},3000);}
            );
  }
fileChange(event){
  this.selectfile=<File>event.target.files[0];
  }
ajouter_pension(){
  if (this.registerForm3.invalid) {
    this.submitted3=true
     return;
      }
      this.submitted3=false;
      this.Loading_save_arrangements=true;
      const fr=new FormData();
            fr.append('titre',this.registerForm3.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
    this.service.ajouter_pension(fr).subscribe(
      (data)=>{this.registerForm3.reset();
               this.existe_pension=false;
               this.Loading_save_arrangements=false;
               
               this.get_all_pension();
                },
      (err)=>{this.Loading_save_arrangements=false;
              if(err.error.error=="existe"){
               this.existe_pension=true;
      }else{
        this.type_notification='error';
        this.titre_notification='';
        this.soustitre_notification=this.msg;
        this.notification=true;
        setTimeout(()=>{ this.notification=false;},3000);
      }
          }
      );
}
fileChange2(event){
  this.selectfile=<File>event.target.files[0];
  }
ajouter_loisire(){
  if (this.registerForm4.invalid) {
    this.submitted4=true
     return;
      }
      this.submitted4=false;
      this.Loading_save_service=true;
      const fr=new FormData();
            fr.append('titre',this.registerForm4.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
  this.service.ajouter_loisire(fr).subscribe(
    (data)=>{this.registerForm4.reset();
              this.get_all_loisires();
            this.existe_loisire=false;
             this.Loading_save_service=false;

            },
    (err)=>{this.Loading_save_service=false;
            if(err.error.error=="existe"){
            this.existe_loisire=true;
    }else{
      this.type_notification='error';
      this.titre_notification='';
      this.soustitre_notification=this.msg;
      this.notification=true;
      setTimeout(()=>{ this.notification=false;},3000);
    }
      
    }
  )
}
fileChange3(event){
  this.selectfile=<File>event.target.files[0];
  }
ajouter_interdit(){
  if (this.registerForm5.invalid) {
    this.submitted5=true
     return;
      }
      this.submitted5=false;
      this.Loading_save_interdit=true;
      const fr=new FormData();
            fr.append('titre',this.registerForm5.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
    this.service.ajouter_interdit(fr).subscribe(
      (data)=>{this.registerForm5.reset();
                this.get_all_interdit();
                 this.existe_interdit=false;
                 this.Loading_save_interdit=false;
              },
      (err)=>{this.Loading_save_interdit=false
              if(err.error.error=="existe"){
                this.existe_interdit=true;
              }else{
                this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);
              }

      }
    )

}
fileChange4(event){
  this.selectfile=<File>event.target.files[0];
  }
fileChange5(event){
    this.selectfile=<File>event.target.files[0];
    }
ajouter_hotel(){
  if (this.registerForm6.invalid ||this.registerForm6.get('ville').value=="choisire un ville") {
    this.submitted6=true
     return;
      }
      this.submitted6=false;
      this.Loading_save_hotel=true;
      const fr=new FormData();
         fr.append('nom',this.registerForm6.get('nom').value);
         fr.append('ville',this.registerForm6.get('ville').value);
         fr.append('adresse',this.registerForm6.get('adresse').value);
         fr.append('tel',this.registerForm6.get('tel').value);
         fr.append('etoile',this.registerForm6.get('etoile').value);
         fr.append('description',this.registerForm6.get('description').value);
         fr.append('image',this.selectfile,this.selectfile.name);
this.service.ajouter_hotel(fr).subscribe(
  (data)=>{this.registerForm6.reset();
          
          this.registerForm6.get('ville').setValue('choisire un ville');
          this.registerForm6.get('etoile').setValue('Nombre de etoile')
          this.existe_hotel=false;
          this.Loading_save_hotel=false;
          this.gat_all_hotel();
         
          },
  (err)=>{console.log(err);
    this.Loading_save_hotel=false;
     if(err.error.error=="existe"){
       this.existe_hotel=true;
     }else{
      this.type_notification='error';
      this.titre_notification='';
      this.soustitre_notification=this.msg;
      this.notification=true;
      setTimeout(()=>{ this.notification=false;},3000);
     }
  });
}
updeteHotelButton(v){
  this.updatehotel=true;
  window.scroll(0,0);
  this.hotel_id=v.id;
  this.registerForm6.get('nom').setValue(v.nom);
  this.registerForm6.get('ville').setValue(v.villeid);
  this.registerForm6.get('adresse').setValue(v.adresse);
  this.registerForm6.get('tel').setValue(v.tel);
  this.registerForm6.get('etoile').setValue(v.etoile);
  this.registerForm6.get('description').setValue(v.description);
  this.registerForm6.get('image').setValue("c");
}
updeteHotel(){

  if (this.registerForm6.invalid ||this.registerForm6.get('ville').value=="choisire un ville") {
    this.submitted6=true
     return;
      }
      this.submitted6=false;
      this.Loading_updete_hotel=true;
      const fr=new FormData();
         fr.append('id',this.hotel_id);
         fr.append('nom',this.registerForm6.get('nom').value);
         fr.append('ville',this.registerForm6.get('ville').value);
         fr.append('adresse',this.registerForm6.get('adresse').value);
         fr.append('tel',this.registerForm6.get('tel').value);
         fr.append('etoile',this.registerForm6.get('etoile').value);
         fr.append('description',this.registerForm6.get('description').value);
this.service.updete_hotel(fr).subscribe(
  (data)=>{this.registerForm6.reset();
         
          this.updatehotel=false;
          this.registerForm6.get('ville').setValue('choisire un ville');
          this.registerForm6.get('etoile').setValue('Nombre de etoile');
          this.Loading_updete_hotel=false;
          this.gat_all_hotel();},
  (err)=>{this.Loading_updete_hotel=false;
          this.type_notification='error';
          this.titre_notification='';
          this.soustitre_notification=this.msg;
          this.notification=true;
          setTimeout(()=>{ this.notification=false;},3000);});
      }
updateHotelimage(i){
  this.updateimage[i]=!this.updateimage[i];
  this.registerForm7.reset();
}
updateimagehotel(id,i){
  if (this.registerForm7.invalid ) {
    this.submitted7=true
     return;
      }
      this.submitted7=false;
      const fr=new FormData();
       fr.append('image',this.selectfile,this.selectfile.name);
       fr.append('id',id);
  this.service.updateimagehotel(fr).subscribe(
      (data)=>{this.gat_all_hotel();
              this.updateimage[i]=!this.updateimage[i];
              this.registerForm7.reset();
              
            },
      (err)=>{  this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);})
}
gat_all_hotel(){
  this.service.get_all_hotel().subscribe(
    (data)=>{this.hotels=data;},
    (err)=>{console.log(err)}
  )
}
delite_hotel_by_id(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
 this.service.delite_hotel_by_id(id).subscribe(
              (data)=>{
                        this.registerForm6.reset();
                        this.updatehotel=false;
                        this.registerForm6.get('ville').setValue('choisire un ville');
                        this.registerForm6.get('etoile').setValue('Nombre de etoile');
                        this.p=1;
                        this.gat_all_hotel();
                        
              },
              (err)=>{  this.type_notification='error';
                        this.titre_notification='';
                        this.soustitre_notification=this.msg;
                        this.notification=true;
                        setTimeout(()=>{ this.notification=false;},3000);});
            }
}
get_all_pension(){
  this.service.get_all_pension().subscribe(
        (data)=>{this.pensions=data;console.log(data)},
        (err)=>{  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);}
  );
}
get_all_loisires(){
  this.service.get_all_loisire().subscribe(
      (data)=>{this.loisires=data;},
      (err)=>{  this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);});
}
get_all_interdit(){
  this.service.get_all_interdi().subscribe(
              (data)=>{this.interdits=data},
              (err)=>{  this.type_notification='error';
                        this.titre_notification='';
                        this.soustitre_notification=this.msg;
                        this.notification=true;
                        setTimeout(()=>{ this.notification=false;},3000);});
}
delete_interdi_by_id(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
this.service.delete_interdi_by_id(id).subscribe(
  (data)=>{this.get_all_interdit()},
  (err)=>{  this.type_notification='error';
            this.titre_notification='';
            this.soustitre_notification=this.msg;
            this.notification=true;
            setTimeout(()=>{ this.notification=false;},3000);}
);}
}
delete_loisire_by_id(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.service.delete_loisire_by_id(id).subscribe(
    (data)=>{this.get_all_loisires()},
    (err)=>{  this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
  );}
}
delete_pension_by_id(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.service.delete_pension_by_id(id).subscribe(
    (data)=>{this.get_all_pension()},
    (err)=>{ this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
  );}
}
delete_type_chambre(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.service.delete_type_chambre(id).subscribe(
    (data)=>{this.get_all_type_chambre()},
    (err)=>{  this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
  )
}
}
delete_ville_chambre(id){
  let res= confirm("Êtes-vous sûr de vouloir supprimer?");
if(res){
  this.service.delete_ville_chambre(id).subscribe(
    (data)=>{this.get_all_ville();this.gat_all_hotel()},
    (err)=>{  this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);}
    );}
}
updete_hotel_visible(id){
this.service.updete_hotel_visible(id).subscribe(
      (data)=>{this.gat_all_hotel()},
      (err)=>{
            if(err.error.error=="invalide"){
              this.type_notification='error';
              this.titre_notification="invalide";
              this.soustitre_notification="les chambre ou les Age Max ou les arrangements vide"
              this.notification=true;
             
              setTimeout(()=>{ this.notification=false;},3000);
            }else{
              this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);
            }
            });
}
ajouter_Hotel_A_La_une(id){
 
this.service.ajouter_Hotel_A_La_une(id).subscribe(
            (data)=>{
              this.gat_all_hotel()
                   },
            (err)=>{console.log(err);
              if(err.error.error=="invalide"){
                this.type_notification='error';
                this.titre_notification="invalide";
                this.soustitre_notification="les chambre ou les Age Max ou les arrangements vide"
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);
              }else{
                this.type_notification='error';
                this.titre_notification='';
                this.soustitre_notification=this.msg;
                this.notification=true;
                setTimeout(()=>{ this.notification=false;},3000);}});
}
delete_Hotel_A_La_une(id){
  this.service.delete_Hotel_A_La_une(id).subscribe(
    (data)=>{
              this.gat_all_hotel()
              console.log(data)},
    (err)=>{  this.type_notification='error';
              this.titre_notification='';
              this.soustitre_notification=this.msg;
              this.notification=true;
              setTimeout(()=>{ this.notification=false;},3000);})
}
}
