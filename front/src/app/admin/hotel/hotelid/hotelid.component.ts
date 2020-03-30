import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{ServiceHotelService} from "../../../service/hotels/service-hotel.service";
@Component({
  selector: 'app-hotelid',
  templateUrl: './hotelid.component.html',
  styleUrls: ['./hotelid.component.css']
})
export class HotelidComponent implements OnInit {
  pension:any[];
  loisire:any[];
  interdi:any[];
  mois:any[];
  Type_chambre:any[];
  chambre_hotel:any[];
id:string;
image:string="1.jpg";
nom:string;
registerForm: FormGroup;
registerForm2: FormGroup;
registerForm3: FormGroup;
registerForm4: FormGroup;
registerForm5:FormGroup;
registerForm6:FormGroup;
submitted:boolean;
submitted2:boolean;
submitted3:boolean;
submitted4:boolean;
submitted5:boolean;
submitted6:boolean;
  constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder) { }
  hotel:any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_hotel_by_id();
    this.get_all_pension();
    this.get_all_loisire();
    this.get_all_interdi();
    this.get_type_chambre_moi_hotel();
    this.get_mois();
    this.get_type_chambre_of_hotel();
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
            
  }
  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm4.controls; }
  get f3() { return this.registerForm5.controls; }
  get f4() { return this.registerForm6.controls; }
  get_hotel_by_id(){
    this.service.get_hotel_by_id(this.id).subscribe(
      (data)=>{this.image=data.image;this.nom=data.nom;},
      (err)=>{console.log(err)}
    )
  }
  ajouter_pension_hotel(){
    if (this.registerForm.invalid ||this.registerForm.get('pension').value=="pension") {
      this.submitted=true
       return;
        }
    const fr=new FormData();
        fr.append('prix',this.registerForm.get('prix').value);
        fr.append('pension',this.registerForm.get('pension').value);
        fr.append('hotel',this.id);
     this.service.ajouter_pension_hotel(fr).subscribe(
       (data)=>{this.registerForm.get('prix').reset();
                this.registerForm.get('pension').setValue("pension");
      },
       (err)=>{console.log(err)}
     );   
  }
  get_all_pension(){
    this.service.get_all_pension().subscribe(
      (data)=>{this.pension=data},
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
              (data)=>{this.registerForm2.get('loisire').setValue("loisire");},
              (err)=>{console.log(err)}
            ); 
  }
get_all_loisire(){
  this.service.get_all_loisire().subscribe(
    (data)=>{this.loisire=data},
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
              (data)=>{this.registerForm3.get('interdi').setValue("interdi");},
              (err)=>{console.log(err)}
            ); 
}
get_all_interdi(){
  this.service.get_all_interdi().subscribe(
    (data)=>{this.interdi=data},
    (err)=>{console.log(err)}
    );
}
get_type_chambre_moi_hotel(){
  this.service.get_type_chambre_moi_hotel(this.id).subscribe(
    (data)=>{this.Type_chambre=data;},
    (err)=>{console.log(err)}
    );
}
ajouter_chambre_hotels(){
  
  if (this.registerForm4.invalid ||this.registerForm4.get('Type_chambre').value=="Type_chambre") {
    this.submitted4=true
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
get_type_chambre_of_hotel(){

  this.service.get_type_chambre_of_hotel(this.id).subscribe(
    (data)=>{this.chambre_hotel=data;},
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
       (data)=>{this.registerForm5.reset();this.submitted5=false;},
       (err)=>(console.log(err))
       );
}
ajouter_question_hotel(){
  if (this.registerForm6.invalid) {
    this.submitted6=true
     return;
      }
      const fr=new FormData();
              fr.append('question',this.registerForm6.get('question').value);
              fr.append('reponce',this.registerForm6.get('reponce').value);
              fr.append('hotel',this.id);
      this.service.ajouter_question_hotel(fr).subscribe(
        (data)=>{this.registerForm6.reset();this.submitted6=false;},
        (err)=>{console.log(err)}
        );
}
}
