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
nom:string;
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

  constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    window.document.activeElement.scrollTop = 0;
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
    setTimeout (() => {
      this.loading=false;
      this.loading_temine=true;
   }, 3000);
    this.registerForm = this.formBuilder.group({
         prix: [null, [Validators.required]],
         pension: ["pension", [Validators.required]],
        });
    this.registerForm2 = this.formBuilder.group({
          loisire: ["loisire", [Validators.required]],
          });
    this.registerForm3 = this.formBuilder.group({
           interdi: ["interdi", [Validators.required]],
            });
    this.registerForm4 = this.formBuilder.group({
              nombre: [null, [Validators.required]],
              Type_chambre: ["Type_chambre", [Validators.required]],
              prix1: [null, [Validators.required]],
              prix2: [null, [Validators.required]],
              prix3: [null, [Validators.required]],
              prix4: [null, [Validators.required]],
              prix5: [null, [Validators.required]],
              prix6: [null, [Validators.required]],
              prix7: [null, [Validators.required]],
              prix8: [null, [Validators.required]],
              prix9: [null, [Validators.required]],
              prix10: [null, [Validators.required]],
              prix11: [null, [Validators.required]],
              prix12: [null, [Validators.required]]
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
          prix:new FormControl('',[Validators.required])
        });
       this.registerForm_updete_prix_pention=this.formBuilder.group({
          prix:new FormControl('',[Validators.required])
        });
        this.updete_form_registre= this.formBuilder.group({
          titre: [null, [Validators.required]],
          programme: [null, [Validators.required]],
          
           });
           this.registerForm_updete_question= this.formBuilder.group({
                    question: [null, [Validators.required]],
                    reponce: [null, [Validators.required]],
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
        fr.append('prix',this.registerForm.get('prix').value);
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
  
  if (this.registerForm4.invalid ||this.registerForm4.get('Type_chambre').value=="Type_chambre" ) {
    this.submitted4=true;
  
     return;
      }
    const fr=new FormData();
      fr.append('nb',this.registerForm4.get('nombre').value);
      fr.append('type',this.registerForm4.get('Type_chambre').value);
      fr.append('hotel',this.id);
      fr.append('prix1',this.registerForm4.get('prix1').value);
      fr.append('prix2',this.registerForm4.get('prix2').value);
      fr.append('prix3',this.registerForm4.get('prix3').value);
      fr.append('prix4',this.registerForm4.get('prix4').value);
      fr.append('prix5',this.registerForm4.get('prix5').value);
      fr.append('prix6',this.registerForm4.get('prix6').value);
      fr.append('prix7',this.registerForm4.get('prix7').value);
      fr.append('prix8',this.registerForm4.get('prix8').value);
      fr.append('prix9',this.registerForm4.get('prix9').value);
      fr.append('prix10',this.registerForm4.get('prix10').value);
      fr.append('prix11',this.registerForm4.get('prix11').value);
      fr.append('prix12',this.registerForm4.get('prix12').value);
      
   this.service.ajouter_chambre_hotels(fr).subscribe(
     (data)=>{this.submitted4=false;
              this.registerForm4.reset();
              this.registerForm4.get('Type_chambre').setValue("Type_chambre");
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
updete_prix_of_chambre(id,i){
  if (this.registerForm_updete_tarif.invalid) {
    this.submitted9=true
     return;
      }
      const fr=new FormData();
            fr.append('prix',this.registerForm_updete_tarif.get('prix').value);
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
updete_prix_pension_of_hotel(id,i){
  
  if (this.registerForm_updete_prix_pention.invalid) {
    this.submitted10=true
     return;
      }
      const fr=new FormData();
          fr.append('prix',this.registerForm_updete_prix_pention.get('prix').value);
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
}
