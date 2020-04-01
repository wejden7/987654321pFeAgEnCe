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
  submitted:boolean;
  submitted2:boolean;
  submitted3:boolean;
  submitted4:boolean;
  submitted5:boolean;
  submitted6:boolean;
  ville:any[];
  type_chambre:any[];
  mois:any[];
  hotels:any[];
  existe_ville:boolean;
  existe_type_chambre:boolean;
  existe_pension:boolean;
  existe_loisire:boolean;
  existe_interdit:boolean;
  existe_hotel:boolean;
  Recherche:string;
  constructor(private formBuilder: FormBuilder,private service:ServiceHotelService) {}
  ngOnInit() {
    this.get_all_ville();
    this.get_all_type_chambre();
    this.get_all_moi();
    this.gat_all_hotel();
    this.registerForm = this.formBuilder.group({
        ville: [null, [Validators.required]],
      });
    this.registerForm2 = this.formBuilder.group({
        Type_Chambre: [null, [Validators.required]],
        nombre: [null, [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
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
              ville: ["choisire un ville",[Validators.required]],
              image:[null, [Validators.required ]],
              etoile:[null, [Validators.required , Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
              programme:[null, [Validators.required ]],});
              
                
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
  ajouter_ville(){
      if (this.registerForm.invalid) {
           this.submitted=true
            return;
      }
          const fr=new FormData();
                fr.append('nom',this.registerForm.get('ville').value);
        this.service.create_ville(fr).subscribe(
          (data)=>{
                    this.registerForm.reset();
                    this.get_all_ville();
                    this.existe_ville=false;
                    this.submitted=false;
        },(err)=>{
                  if(err.error.error =="existe"){
                    this.existe_ville=true;
        }
          
        });}
  get_all_ville(){
    this.service.get_all_ville().subscribe(
                (data)=>{this.ville=data;console.log(this.ville);},
                (err)=>{console.log(err);});
  }
  ajouter_Type_Chambre(){
    if (this.registerForm2.invalid) {
      this.submitted2=true
       return;
        }
        const fr=new FormData();
                fr.append('nom',this.registerForm2.get('Type_Chambre').value);
                fr.append('nb',this.registerForm2.get('nombre').value);
        this.service.ajouter_Type_Chambre(fr).subscribe(
          (data)=>{ this.registerForm2.reset();
                    this.existe_type_chambre=false;
                  },
          (err)=>{
                    if(err.error.error=="existe"){
                      this.existe_type_chambre=true;
                    }

                   }
        );
      
  }
get_all_type_chambre(){
  this.service.get_all_Type_chambre().subscribe(
    (data)=>{this.type_chambre=data;console.log(this.type_chambre);},
    (err)=>{console.log(err)}
    );
}
get_all_moi(){
  this.service.get_all_moi().subscribe(
    (data)=>{this.mois=data;console.log(this.mois);},
    (err)=>{console.log(err);}
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
      const fr=new FormData();
            fr.append('titre',this.registerForm3.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
    this.service.ajouter_pension(fr).subscribe(
      (data)=>{this.registerForm3.reset();
          this.existe_pension=false;
                },
      (err)=>{if(err.error.error=="existe"){
          this.existe_pension=true;
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
      const fr=new FormData();
            fr.append('titre',this.registerForm4.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
  this.service.ajouter_loisire(fr).subscribe(
    (data)=>{this.registerForm4.reset();
            this.existe_loisire=false;
            },
    (err)=>{if(err.error.error=="existe"){
            this.existe_loisire=true;
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
      const fr=new FormData();
            fr.append('titre',this.registerForm5.get('titre').value);
            fr.append('image',this.selectfile,this.selectfile.name);
    this.service.ajouter_interdit(fr).subscribe(
      (data)=>{this.registerForm5.reset();
                 this.existe_interdit=false;
              },
      (err)=>{
              if(err.error.error=="existe"){
                this.existe_interdit=true;
              }

      }
    )

}
fileChange4(event){
  this.selectfile=<File>event.target.files[0];
  }
ajouter_hotel(){
  if (this.registerForm6.invalid ||this.registerForm6.get('ville').value=="choisire un ville") {
    this.submitted6=true
     return;
      }
      const fr=new FormData();
         fr.append('nom',this.registerForm6.get('nom').value);
         fr.append('ville',this.registerForm6.get('ville').value);
         fr.append('etoile',this.registerForm6.get('etoile').value);
         fr.append('description',this.registerForm6.get('programme').value);
         fr.append('image',this.selectfile,this.selectfile.name);
this.service.ajouter_hotel(fr).subscribe(
  (data)=>{this.registerForm6.reset();
          this.registerForm6.get('ville').setValue('choisire un ville');
          this.gat_all_hotel();
          this.existe_hotel=false;
          },
  (err)=>{
     if(err.error.error=="existe"){
       this.existe_hotel=true;
     }
  });
}
gat_all_hotel(){
  this.service.get_all_hotel().subscribe(
    (data)=>{this.hotels=data;},
    (err)=>{console.log(err)}
  )
}
delite_hotel_by_id(id){
 this.service.delite_hotel_by_id(id).subscribe(
              (data)=>{
                        this.gat_all_hotel();
              },
              (err)=>{});
}
}
