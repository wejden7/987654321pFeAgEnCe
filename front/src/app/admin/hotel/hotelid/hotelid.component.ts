import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import{ServiceHotelService} from "../../../service/hotels/service-hotel.service";
@Component({
  selector: 'app-hotelid',
  templateUrl: './hotelid.component.html',
  styleUrls: ['./hotelid.component.css']
})
export class HotelidComponent implements OnInit {
  loading:boolean;
  loading_temine=false;
  existe_description:boolean;
  existe_question:boolean;
  collapseExample:boolean;
  collapseExample1:boolean;
  updete_question_collapse:boolean[]=[];
  collapse_description:boolean[]=[];
  isCollapsed_updete_pension:boolean[]=[]
  updete_chambre_hotel:boolean[]=[];
  isCollapsed: boolean[]=[];
  updete_tarif_chambre:boolean[]=[];
  length_pension:number;
  length_loisire:number;
  length_interdi:number;
  length_Type_chambre:number
  length_pension_hotel:number;
  length_loisire_hotel:number;
  length_interdi_hotel:number;
  length_Type_chambre_hotel:number
  length_question_hotel:number;
  length_description_hotel:number;
  docs:any;
  length:any;
  pension:any[];
  loisire:any[];
  interdi:any[];
  mois:any[];
  images:any[];
  Type_chambre:any[];
  chambre_hotel:any[];
  loisire_hotel:any[];
  interdi_hotel:any[];
  pension_hotel:any[];
  description_hotel:any[];
  question_hotel:any[];
id:string;
image:string="1.jpg";
nom:string="";
registerForm: FormGroup;
registerForm2: FormGroup;
registerForm3: FormGroup;
registerForm4: FormGroup;
registerForm5:FormGroup;
registerForm6:FormGroup;
registerForm_updete:FormGroup;
registerForm_updete_tarif:FormGroup;
registerForm_updete_prix_pention:FormGroup;
updete_form_registre:FormGroup;
registerForm_updete_question:FormGroup;
registerForm_promo:FormGroup;
registerForm_age:FormGroup;
myForm :FormGroup;
submitted:boolean;
submitted2:boolean;
submitted3:boolean;
submitted4:boolean;
submitted5:boolean;
submitted6:boolean;
submitted7:boolean;
submitted8:boolean;
submitted9:boolean;
submitted10:boolean;
submitted11:boolean;
submitted12:boolean;
submitted13:boolean;
submitted14:boolean;
date:any="dd/MM/yyyy";
minPickerDate:any;
datapromo:any;
updetepromobutton:boolean;
id_promot:any;
nb_promo:number;
typepromo:any;
id_age:any;
ageData:any=null;
updeteage:boolean;
ageformaAfficher:boolean=true;
afficherformPromot:boolean=true;
  constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder) { 
    this.minPickerDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate()};
  }
  
  ngOnInit() {
    window.scroll(0, 0);
    this.loading=true;
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_hotel_by_id();
    this.get_pension_moi_of_hotel();
    this.get_loisire_moi_hotel();
    this.get_interdi_moi_hotel();
    this.get_type_chambre_moi_hotel();
    this.get_mois();
    this.get_type_chambre_of_hotel();
    this.get_all_pension_of_hotel();
    this.get_all_interdi_of_hotel();
    this.get_all_loisire_of_hotel();
    this.get_all_photo_of_hotel();
    this.get_all_description_of_on_hotel();
    this.get_all_question_of_one_hotel();
    this.get_promot();
    this.getAgeMax();
    setTimeout (() => {
      this.loading=false;
      this.loading_temine=true;
   }, 3000);
    this.registerForm = this.formBuilder.group({
         prixadulte: [null, [Validators.required]],
         prixenfant: [null, [Validators.required]],
         prixbebe: [null, [Validators.required]],
         pension: ["Arrangements", [Validators.required]],
        });
    this.registerForm2 = this.formBuilder.group({
          loisire: ["loisire", [Validators.required]],
          });
    this.registerForm3 = this.formBuilder.group({
           interdi: ["interdi", [Validators.required]],
            });
    this.registerForm4 = this.formBuilder.group({
              nombre: [null, [Validators.required]],
              Type_chambre: ["Type chambré", [Validators.required]],
              prixAdulte1: [null, [Validators.required]],
              prixAdulte2: [null, [Validators.required]],
              prixAdulte3: [null, [Validators.required]],
              prixAdulte4: [null, [Validators.required]],
              prixAdulte5: [null, [Validators.required]],
              prixAdulte6: [null, [Validators.required]],
              prixAdulte7: [null, [Validators.required]],
              prixAdulte8: [null, [Validators.required]],
              prixAdulte9: [null, [Validators.required]],
              prixAdulte10: [null, [Validators.required]],
              prixAdulte11: [null, [Validators.required]],
              prixAdulte12: [null, [Validators.required]],
              prixEnfant1: [null, [Validators.required]],
              prixEnfant2: [null, [Validators.required]],
              prixEnfant3: [null, [Validators.required]],
              prixEnfant4: [null, [Validators.required]],
              prixEnfant5: [null, [Validators.required]],
              prixEnfant6: [null, [Validators.required]],
              prixEnfant7: [null, [Validators.required]],
              prixEnfant8: [null, [Validators.required]],
              prixEnfant9: [null, [Validators.required]],
              prixEnfant10: [null, [Validators.required]],
              prixEnfant11: [null, [Validators.required]],
              prixEnfant12: [null, [Validators.required]],
              prixBebe1: [null, [Validators.required]],
              prixBebe2: [null, [Validators.required]],
              prixBebe3: [null, [Validators.required]],
              prixBebe4: [null, [Validators.required]],
              prixBebe5: [null, [Validators.required]],
              prixBebe6: [null, [Validators.required]],
              prixBebe7: [null, [Validators.required]],
              prixBebe8: [null, [Validators.required]],
              prixBebe9: [null, [Validators.required]],
              prixBebe10: [null, [Validators.required]],
              prixBebe11: [null, [Validators.required]],
              prixBebe12: [null, [Validators.required]],
             });
    this.registerForm5 = this.formBuilder.group({
            titre: [null, [Validators.required]],
            programme: [null, [Validators.required]],
            
             });
    this.registerForm6 = this.formBuilder.group({
             question: [null, [Validators.required]],
             reponce: [null, [Validators.required]],
              
               });
        this.myForm = this.formBuilder.group({
                file: new FormControl('', [Validators.required])}
                 );
        this.registerForm_updete=this.formBuilder.group({
          nombre:new FormControl('',[Validators.required])
        });
        this.registerForm_updete_tarif=this.formBuilder.group({
          prixAdulte:new FormControl('',[Validators.required]),
          prixEnfant:new FormControl('',[Validators.required]),
          prixBebe:new FormControl('',[Validators.required])
        });
       this.registerForm_updete_prix_pention=this.formBuilder.group({
            prixAdulte:new FormControl('',[Validators.required]),
            prixEnfant:new FormControl('',[Validators.required]),
            prixBebe:new FormControl('',[Validators.required])
         });
        this.updete_form_registre= this.formBuilder.group({
          titre: [null, [Validators.required]],
          programme: [null, [Validators.required]],
          
           });
        this.registerForm_updete_question= this.formBuilder.group({
                    question: [null, [Validators.required]],
                    reponce: [null, [Validators.required]],
              });
        this.registerForm_age= this.formBuilder.group({
                enfant: [null, [Validators.required]],
                bebe: [null, [Validators.required]],
          });
        this.registerForm_promo=this.formBuilder.group({
              titre: ['', [Validators.required]],
              adulteMin: [1, [Validators.required]],
              enfantMin: [0, [Validators.required]],
              ageEnfantMax: [0, [Validators.required]],
              bebeMin: [0, [Validators.required]],
              ageBebeMax: [0, [Validators.required]],
              type: ["", [Validators.required]],
              pourcentage: ['', [Validators.required]],
              nbnuit: [0, [Validators.required]],
        });
            
  }
  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm4.controls; }
  get f3() { return this.registerForm5.controls; }
  get f4() { return this.registerForm6.controls; }
  get f5() { return this.myForm.controls; }
  get f6() { return this.registerForm_updete.controls; }
  get f7() { return this.registerForm_updete_tarif.controls; }
  get f8() { return this.registerForm_updete_prix_pention.controls; }
  get f9() { return this.updete_form_registre.controls; }
  get f10() { return this.registerForm_updete_question.controls; }
  get f13() { return this.registerForm_promo.controls; }
  get f14() { return this.registerForm_age.controls; }
  
  get_hotel_by_id(){
    this.service.get_hotel_by_id(this.id).subscribe(
      (data)=>{this.image=data.image;this.nom=data.nom;},
      (err)=>{console.log(err)}
    )
  }
  ajouter_pension_hotel(){
    this.submitted=true
    if (this.registerForm.invalid ||this.registerForm.get('pension').value=="pension") {
      
       return;
        }
    const fr=new FormData();
        fr.append('prixadulte',this.registerForm.get('prixadulte').value);
        fr.append('prixenfant',this.registerForm.get('prixenfant').value);
        fr.append('prixbebe',this.registerForm.get('prixbebe').value);
        fr.append('pension',this.registerForm.get('pension').value);
        fr.append('hotel',this.id);
     this.service.ajouter_pension_hotel(fr).subscribe(
       (data)=>{this.registerForm.reset();
                this.registerForm.get('pension').setValue("pension");
                this.get_pension_moi_of_hotel();
                this.get_all_pension_of_hotel();
                this.submitted=false;
      },
       (err)=>{console.log(err);
               this.submitted=false;
      }
     );   
  }
  get_pension_moi_of_hotel(){
    this.service.get_pension_moi_of_hotel(this.id).subscribe(
      (data)=>{this.pension=data;
               this.length_pension = Object.keys(data).length;
              },
      (err)=>{console.log(err)}
      )

  }
  ajouter_loisire_hotel(){
    if (this.registerForm2.get('loisire').value=="loisire") {
      this.submitted2=true
       return;
        }
        const fr=new FormData();
            fr.append('loisire',this.registerForm2.get('loisire').value);
            fr.append('hotel',this.id);
  this.service.ajouter_loisire_hotel(fr).subscribe(
              (data)=>{
                      this.registerForm2.get('loisire').setValue("loisire");
                      this.get_loisire_moi_hotel();
                      this.get_all_loisire_of_hotel();
                      this.submitted2=false;
            },
              (err)=>{console.log(err)}
            ); 
  }
  get_loisire_moi_hotel(){
  this.service.get_loisire_moi_hotel(this.id).subscribe(
    (data)=>{this.loisire=data;
            this.length_loisire=Object.keys(data).length;
            },
    (err)=>{console.log(err)}
    );

}
ajouter_interdi_hotel(){
  if (this.registerForm3.get('interdi').value=="interdi") {
    this.submitted3=true
     return;
      }
      const fr=new FormData();
            fr.append('interdi',this.registerForm3.get('interdi').value);
            fr.append('hotel',this.id);
    this.service.ajouter_interdi_hotel(fr).subscribe(
              (data)=>{this.registerForm3.get('interdi').setValue("interdi");
                      this.get_interdi_moi_hotel();
                      this.get_all_interdi_of_hotel();
                      this.submitted3=false;
            },
              (err)=>{console.log(err)}
            ); 
}
get_interdi_moi_hotel(){
  this.service.get_interdi_moi_hotel(this.id).subscribe(
    (data)=>{this.interdi=data;
              this.length_interdi=Object.keys(data).length;
            },
    (err)=>{console.log(err)}
    );
}
get_type_chambre_moi_hotel(){
  this.service.get_type_chambre_moi_hotel(this.id).subscribe(
    (data)=>{this.Type_chambre=data;
      this.length_Type_chambre=Object.keys(data).length;},
    (err)=>{console.log(err)}
    );
}
ajouter_chambre_hotels(){
  
  if (this.registerForm4.invalid ||this.registerForm4.get('Type_chambre').value=="Type chambré" ) {
    this.submitted4=true;
  
     return;
      }
    const fr=new FormData();
      fr.append('nb',this.registerForm4.get('nombre').value);
      fr.append('type',this.registerForm4.get('Type_chambre').value);
      fr.append('hotel',this.id);
      fr.append('prixAdulte1',this.registerForm4.get('prixAdulte1').value);
      fr.append('prixAdulte2',this.registerForm4.get('prixAdulte2').value);
      fr.append('prixAdulte3',this.registerForm4.get('prixAdulte3').value);
      fr.append('prixAdulte4',this.registerForm4.get('prixAdulte4').value);
      fr.append('prixAdulte5',this.registerForm4.get('prixAdulte5').value);
      fr.append('prixAdulte6',this.registerForm4.get('prixAdulte6').value);
      fr.append('prixAdulte7',this.registerForm4.get('prixAdulte7').value);
      fr.append('prixAdulte8',this.registerForm4.get('prixAdulte8').value);
      fr.append('prixAdulte9',this.registerForm4.get('prixAdulte9').value);
      fr.append('prixAdulte10',this.registerForm4.get('prixAdulte10').value);
      fr.append('prixAdulte11',this.registerForm4.get('prixAdulte11').value);
      fr.append('prixAdulte12',this.registerForm4.get('prixAdulte12').value);
      fr.append('prixEnfant1',this.registerForm4.get('prixEnfant1').value);
      fr.append('prixEnfant2',this.registerForm4.get('prixEnfant2').value);
      fr.append('prixEnfant3',this.registerForm4.get('prixEnfant3').value);
      fr.append('prixEnfant4',this.registerForm4.get('prixEnfant4').value);
      fr.append('prixEnfant5',this.registerForm4.get('prixEnfant5').value);
      fr.append('prixEnfant6',this.registerForm4.get('prixEnfant6').value);
      fr.append('prixEnfant7',this.registerForm4.get('prixEnfant7').value);
      fr.append('prixEnfant8',this.registerForm4.get('prixEnfant8').value);
      fr.append('prixEnfant9',this.registerForm4.get('prixEnfant9').value);
      fr.append('prixEnfant10',this.registerForm4.get('prixEnfant10').value);
      fr.append('prixEnfant11',this.registerForm4.get('prixEnfant11').value);
      fr.append('prixEnfant12',this.registerForm4.get('prixEnfant12').value);
      fr.append('prixBebe1',this.registerForm4.get('prixBebe1').value);
      fr.append('prixBebe2',this.registerForm4.get('prixBebe2').value);
      fr.append('prixBebe3',this.registerForm4.get('prixBebe3').value);
      fr.append('prixBebe4',this.registerForm4.get('prixBebe4').value);
      fr.append('prixBebe5',this.registerForm4.get('prixBebe5').value);
      fr.append('prixBebe6',this.registerForm4.get('prixBebe6').value);
      fr.append('prixBebe7',this.registerForm4.get('prixBebe7').value);
      fr.append('prixBebe8',this.registerForm4.get('prixBebe8').value);
      fr.append('prixBebe9',this.registerForm4.get('prixBebe9').value);
      fr.append('prixBebe10',this.registerForm4.get('prixBebe10').value);
      fr.append('prixBebe11',this.registerForm4.get('prixBebe11').value);
      fr.append('prixBebe12',this.registerForm4.get('prixBebe12').value);
      
   this.service.ajouter_chambre_hotels(fr).subscribe(
     (data)=>{this.submitted4=false;
              this.registerForm4.reset();
              this.registerForm4.get('Type_chambre').setValue("Type chambré");
              this.get_type_chambre_moi_hotel();
              this.get_type_chambre_of_hotel();


    },
     (err)=>{console.log(err)}
   ); 
   
}
get_mois(){
  this.service.get_all_moi().subscribe(
    (data)=>{this.mois=data;console.log(this.mois)},
    (err)=>{console.log(err)}
    );
}

ajouter_Description_hotel(){
  if (this.registerForm5.invalid) {
    this.submitted5=true
     return;
      }
      const fr=new FormData();
      fr.append('titre',this.registerForm5.get('titre').value);
      fr.append('description',this.registerForm5.get('programme').value);
      fr.append('hotel',this.id);
  this.service.ajouter_Description_hotel(fr).subscribe(
       (data)=>{this.registerForm5.reset();
                this.submitted5=false;
                this.get_all_description_of_on_hotel();
                this.existe_description=false;
              },
       (err)=>{this.existe_description=true;}
       );
}
ajouter_question_hotel(){
  this.submitted6=true
  if (this.registerForm6.invalid) {
    
     return;
      }
      const fr=new FormData();
              fr.append('question',this.registerForm6.get('question').value);
              fr.append('reponce',this.registerForm6.get('reponce').value);
              fr.append('hotel',this.id);
      this.service.ajouter_question_hotel(fr).subscribe(
        (data)=>{
                  this.registerForm6.reset();
                  this.submitted6=false;
                  this.get_all_question_of_one_hotel();
                  this.existe_question=false;
                },
        (err)=>{this.submitted6=false;
          this.existe_question=true;}
        );
}
onFileChange(event) {
  this.docs = <File>event.target.files;
  this.length = <File>event.target.files.length;

}
ajouter_multiple_image_of_hotel(){
  if (this.myForm.invalid) {
    this.submitted7=true
     return;
   }
const fr = new FormData;
for (let i = 0; i < this.length; i++) {
          fr.append('images'+[i], this.docs[i], this.docs[i].name );
          fr.append('length', this.length);
          fr.append('id', this.id);
  }
  this.service.ajouter_multiple_image_of_hotel(fr).subscribe(
    (data)=>{this.myForm.reset();
             this.submitted7=false;
             this.get_all_photo_of_hotel();
            },
    (err)=>{console.log();}
  );
}
get_all_photo_of_hotel(){
  this.service.get_all_photo_of_hotel(this.id).subscribe(
    (data)=>{this.images=data;console.log(this.images)},
    (err)=>{console.log(err)}
  );
}
get_type_chambre_of_hotel(){
  this.service.get_type_chambre_of_hotel(this.id).subscribe(
    (data)=>{this.chambre_hotel=data;
              this.length_Type_chambre_hotel=Object.keys(data).length;           
             },
    (err)=>{console.log(err)}
    );
}
get_all_loisire_of_hotel(){
  this.service.get_all_loisire_of_hotel(this.id).subscribe(
    (data)=>{this.loisire_hotel=data;
              this.length_loisire_hotel=Object.keys(data).length;
            },
    (err)=>{console.log(err)}
  )
}
get_all_interdi_of_hotel(){
  this.service.get_all_interdi_of_hotel(this.id).subscribe(
    (data)=>{this.interdi_hotel=data;
              this.length_interdi_hotel=Object.keys(data).length;
            },
    (err)=>{console.log(err)}
  )
}
get_all_pension_of_hotel(){
  this.service.get_all_pension_of_hotel(this.id).subscribe(
    (data)=>{this.pension_hotel=data;
              this.length_pension_hotel=Object.keys(data).length;
              },
    (err)=>{console.log(err)}
  )
}
get_all_description_of_on_hotel(){
  this.service.get_all_description_of_on_hotel(this.id).subscribe(
      (data)=>{this.description_hotel=data;
              this.length_description_hotel=Object.keys(data).length;
              },
      (err)=>{console.log(err)}
      );

}
get_all_question_of_one_hotel(){
  this.service.get_all_question_of_one_hotel(this.id).subscribe(
    (data)=>{this.question_hotel=data;
              this.length_question_hotel=Object.keys(data).length;
          },
    (err)=>{console.log(err)}
    );
}
delete_chambre_of_hotel(id,i){
  this.service.delete_chambre_of_hotel(id).subscribe(
    (data)=>{this.get_type_chambre_of_hotel();
              this.get_type_chambre_moi_hotel();
              this.updete_chambre_hotel[i]=false;
              this.isCollapsed[i] =false;
              },
    (err)=>{console.log(err)})

}
updete_nb_chambre_initialisation(c,i){
  for(let k=0;k<this.length_Type_chambre_hotel;k++){
    if(k==i){
      this.updete_chambre_hotel[k] = !this.updete_chambre_hotel[k]
    }else{
  this.updete_chambre_hotel[k] = false
    }
  }
  this.registerForm_updete.get('nombre').setValue(c.nb);
}
updete_chombre_of_hotel(id,i){
  if (this.registerForm_updete.invalid) {
    this.submitted8=true
     return;
      }
      const fr=new FormData();
            fr.append('nombre',this.registerForm_updete.get('nombre').value);
            fr.append('id',id);
       this.service.updete_chombre_of_hotel(fr).subscribe(
         (data)=>{this.get_type_chambre_of_hotel();
                  this.updete_chambre_hotel[i]=!this.updete_chambre_hotel[i];
                  this.registerForm_updete.reset();
                  },
         (err)=>{console.log(err)}
       )
}
updete_prix_chambre_initialisation(t,i){
  for(let k=0;k<12;k++){
    if(k!=i){
     this.updete_tarif_chambre[k]=false;
    }
  }
this.registerForm_updete_tarif.get('prixAdulte').setValue(t.prixAdulte);
this.registerForm_updete_tarif.get('prixEnfant').setValue(t.prixEnfant);
this.registerForm_updete_tarif.get('prixBebe').setValue(t.prixBebe);

}
updete_prix_of_chambre(id,i){
  if (this.registerForm_updete_tarif.invalid) {
    this.submitted9=true
     return;
      }
      const fr=new FormData();
            fr.append('prixAdulte',this.registerForm_updete_tarif.get('prixAdulte').value);
            fr.append('prixEnfant',this.registerForm_updete_tarif.get('prixEnfant').value);
            fr.append('prixBebe',this.registerForm_updete_tarif.get('prixBebe').value);
            fr.append('id',id);
      this.service.updete_prix_of_chambre(fr).subscribe(
          (data)=>{
                 this.get_type_chambre_of_hotel();
                  this.updete_tarif_chambre[i]=!this.updete_tarif_chambre[i];
                  this.registerForm_updete_tarif.reset();
          },
          (err)=>{console.log(err)}
      );
}
delete_loisire_of_hotel(id){
  this.service.delete_loisire_of_hotel(id).subscribe(
        (data)=>{
                    this.get_loisire_moi_hotel();
                    this.get_all_loisire_of_hotel();

                 },
        (err)=>{console.log(err)}
        );
}
delete_interdi_of_hotel(id){
  this.service.delete_interdi_of_hotel(id).subscribe(
        (data)=>{
                  this.get_interdi_moi_hotel();
                  this.get_all_interdi_of_hotel();

            },
        (err)=>{console.log(err)}
  )
}
delete_pension_of_hotel(id){
  this.service.delete_pension_of_hotel(id).subscribe(
      (data)=>{
                this.get_all_pension_of_hotel();
                this.get_pension_moi_of_hotel();
              },
      (err)=>{console.log(err)}
      );
}
updete_pention_initialisation(p,i){
  for(let k=0;k<this.length_pension_hotel;k++){
    if(k!=i){
     this.isCollapsed_updete_pension[k]=false;
    }
  }
  this.registerForm_updete_prix_pention.get('prixAdulte').setValue(p.prixAdulte);
  this.registerForm_updete_prix_pention.get('prixEnfant').setValue(p.prixEnfant);
  this.registerForm_updete_prix_pention.get('prixBebe').setValue(p.prixBebe);
}
updete_prix_pension_of_hotel(id,i){
  
  if (this.registerForm_updete_prix_pention.invalid) {
    this.submitted10=true
     return;
      }
      const fr=new FormData();
          fr.append('prixAdulte',this.registerForm_updete_prix_pention.get('prixAdulte').value);
          fr.append('prixEnfant',this.registerForm_updete_prix_pention.get('prixEnfant').value);
          fr.append('prixBebe',this.registerForm_updete_prix_pention.get('prixBebe').value);
          fr.append('id',id);
this.service.updete_prix_pension_of_hotel(fr).subscribe(
           (data)=>{
                      this.get_all_pension_of_hotel();
                      this.get_pension_moi_of_hotel();
                      this.registerForm_updete_prix_pention.reset();
                      this.isCollapsed_updete_pension[i] = !this.isCollapsed_updete_pension[i];
           },
           (err)=>{console.log(err)}
)
}
delete_description_of_hotel(id){
  this.service.delete_description_of_hotel(id).subscribe(
        (data)=>{
                  this.get_all_description_of_on_hotel();
               },
        (err)=>{console.log(err)}
        );
}
updete_description(d,i){
  this.updete_form_registre.get('titre').setValue(d.titre);
  this.updete_form_registre.get('programme').setValue(d.description);
  this.collapse_description[i]=true;
}
updete_Description_hotel(id,i){
  if (this.updete_form_registre.invalid) {
    this.submitted11=true
     return;
      }
      const fr=new FormData();
            fr.append('titre',this.updete_form_registre.get('titre').value);
            fr.append('description',this.updete_form_registre.get('programme').value);
            fr.append('id',id);
      this.service.updete_Description_hotel(fr).subscribe(
            (data)=>{ this.collapse_description[i]=false;
                      this.get_all_description_of_on_hotel();
               },
            (err)=>{console.log(err);}
            )
}
updete_question(d,i){
      this.updete_question_collapse[i]=true;
      this.registerForm_updete_question.get('question').setValue(d.question);
      this.registerForm_updete_question.get('reponce').setValue(d.reponce);
}
updete_question_hotel(id,i){
  if (this.registerForm_updete_question.invalid) {
    this.submitted12=true
     return;
      }
      const fr=new FormData();
              fr.append('question',this.registerForm_updete_question.get('question').value);
              fr.append('reponce',this.registerForm_updete_question.get('reponce').value);
              fr.append('id',id);
      this.service.updete_question_hotel(fr).subscribe(
              (data)=>{ 
                        this.updete_question_collapse[i]=false;
                        this.get_all_question_of_one_hotel();
                      },
              (err)=>{console.log(err)}
              )
}
delete_question_of_hotel(id){
  this.service.delete_question_of_hotel(id).subscribe(
          (data)=>{
                      this.get_all_question_of_one_hotel();
               },
          (err)=>{console.log(err)}
  )
}
delete_image_of_hotel(id){
this.service.delete_image_of_hotel(id).subscribe(
        (data)=>{this.get_all_photo_of_hotel()},
        (err)=>{console.log(err)});
}
onDateChange(dt: any){
  if(dt!=null){
    this.date= dt.year+'/'+dt.month+'/'+ dt.day ;
  }
}
ajouter_promot(){
  if( this.date=="date Fin" ||this.registerForm_promo.invalid ){
    this.submitted13=true;
    console.log("ff")
    return;
  }
  const fr=new FormData();
        fr.append('id',this.id);
        fr.append('titre',this.registerForm_promo.get('titre').value);
        fr.append('adulteMin',this.registerForm_promo.get('adulteMin').value);
        fr.append('enfantMin',this.registerForm_promo.get('enfantMin').value);
        fr.append('ageEnfantMax',this.registerForm_promo.get('ageEnfantMax').value);
        fr.append('bebeMin',this.registerForm_promo.get('bebeMin').value);
        fr.append('ageBebeMax',this.registerForm_promo.get('ageBebeMax').value);
        fr.append('type',this.registerForm_promo.get('type').value);
        fr.append('dateFin',this.date);
        fr.append('pourcentage',this.registerForm_promo.get('pourcentage').value);
        fr.append('nbnuit',this.registerForm_promo.get('nbnuit').value);
  this.service.addPromotionOfHotel(fr).subscribe(
        (data)=>{console.log(data);
                  this.date="dd/MM/yyyy";
                  this.registerForm_promo.reset();
                  this.submitted13=false;
                  this.get_promot();
          
                },
        (err)=>{console.log(err)});
    }
get_promot(){
  this.service.getPromotionOfHptel(this.id).subscribe(
      (data)=>{console.log(data[0]);
              this.datapromo=data[0];
              this.nb_promo=Object.keys(data).length;
              
              if(this.nb_promo==1){
               this.afficherformPromot=false;
              }else{
                this.afficherformPromot=true;
              }
             
            },
              
      (err)=>{console.log(err)});
}
deletePromot(id){
  this.service.deletePromotion(id).subscribe(
        (data)=>{console.log(data);
                 this.get_promot();
                 this.updetepromobutton=false;
                 this.registerForm_promo.reset();
                 this.submitted13=false;
                 this.metreonzero();
                },
        (err)=>{console.log(err)}
  )
}
metreonzero(){
  this.registerForm_promo.get('titre').setValue("");
  this.registerForm_promo.get('adulteMin').setValue(1);
  this.registerForm_promo.get('enfantMin').setValue(0);
  this.registerForm_promo.get('ageEnfantMax').setValue(0);
  this.registerForm_promo.get('bebeMin').setValue(0);
  this.registerForm_promo.get('ageBebeMax').setValue(0);
  this.date="dd/mm/yyyy";
  this.registerForm_promo.get('pourcentage').setValue('');
  this.registerForm_promo.get('nbnuit').setValue(0);

}
updetepromot(p){
  this.afficherformPromot=!this.afficherformPromot;
  this.updetepromobutton=true;
  this.id_promot=p.id;
  this.registerForm_promo.get('titre').setValue(p.titre);
  this.registerForm_promo.get('adulteMin').setValue(p.adulteMin);
  this.registerForm_promo.get('enfantMin').setValue(p.enfantMin);
  this.registerForm_promo.get('ageEnfantMax').setValue(p.ageEnfantMax);
  this.registerForm_promo.get('bebeMin').setValue(p.bebeMin);
  this.registerForm_promo.get('ageBebeMax').setValue(p.ageBebeMax);
  this.registerForm_promo.get('type').setValue(p.type);
  this.date=p.dateFin;
  this.registerForm_promo.get('pourcentage').setValue(p.pourcentage);
  this.registerForm_promo.get('nbnuit').setValue(p.nbnuit);
}
updetepromotHotel(){
  if( this.date=="" &&this.registerForm_promo.invalid ){
    this.submitted13=true;
    console.log("ff")
    return;
  }
  const fr=new FormData();
        fr.append('id',this.id_promot);
       fr.append('titre',this.registerForm_promo.get('titre').value);
        fr.append('adulteMin',this.registerForm_promo.get('adulteMin').value);
        fr.append('enfantMin',this.registerForm_promo.get('enfantMin').value);
        fr.append('ageEnfantMax',this.registerForm_promo.get('ageEnfantMax').value);
        fr.append('bebeMin',this.registerForm_promo.get('bebeMin').value);
        fr.append('ageBebeMax',this.registerForm_promo.get('ageBebeMax').value);
        fr.append('type',this.registerForm_promo.get('type').value);
        fr.append('dateFin',this.date);
        fr.append('pourcentage',this.registerForm_promo.get('pourcentage').value);
        fr.append('nbnuit',this.registerForm_promo.get('nbnuit').value);
  this.service.updetePromotion(fr).subscribe(
        (data)=>{console.log(data);
                  this.date="dd/mm/yyyy";
                   this.updetepromobutton=false;
                  this.afficherformPromot=false;
                  this.registerForm_promo.reset();
                  this.submitted13=false;
                  this.get_promot();
          
                },
        (err)=>{console.log(err)});
}
typedepromotmoiHotel(){
  this.service.typedepromotmoiHotel(this.id).subscribe(
        (data)=>{console.log(data);
                  this.typepromo=data;
                  },
        (err)=>{console.log(err)})
}
addageMax(){
  if(this.registerForm_age.invalid){
    this.submitted14=true;
    return;
  }
  const fr= new FormData();
       fr.append('id_hotel',this.id);
       fr.append('AgeEnfant',this.registerForm_age.get('enfant').value);
       fr.append('AgeBebe',this.registerForm_age.get('bebe').value);
    this.service.creat_ageMaxHotel(fr).subscribe(
            (data)=>{this.getAgeMax();
                    this.registerForm_age.reset();
                    this.submitted14=false;
                      },
            (err)=>{console.log(err)})
}
getAgeMax(){
this.service.get_AgeMaxHotel(this.id).subscribe(
        (data)=>{
          this.ageData=data;
          let nb=Object.keys(data).length;
          if(nb>0){
            this.ageformaAfficher=false;
          }else{
            this.ageformaAfficher=true; 
          }
          console.log(data)},
        (err)=>{console.log(err)});
}
updeteageMax(){
   this.updeteage=!this.updeteage;
   this.ageformaAfficher=true;
   this.registerForm_age.get("enfant").setValue(this.ageData.Enfant);
   this.registerForm_age.get("bebe").setValue(this.ageData.bebe);
   
}
updeteAgeMaxHotel(){
  if(this.registerForm_age.invalid){
    this.submitted14=true;
    return;
  }
  const fr= new FormData();
       fr.append('id_hotel',this.id);
       fr.append('AgeEnfant',this.registerForm_age.get('enfant').value);
       fr.append('AgeBebe',this.registerForm_age.get('bebe').value);
    this.service.update_AgeMAxHotel(fr).subscribe(
            (data)=>{this.getAgeMax();
                     this.updeteage=false;
                    this.ageformaAfficher=false;
                    this.registerForm_age.reset();
                    this.submitted14=false;
                      },
            (err)=>{console.log(err)})
}
}
