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
  submitted:boolean;
  submitted2:boolean;
  submitted3:boolean;
  submitted4:boolean;
  submitted5:boolean;
  ville:any[];
  type_chambre:any[];
  mois:any[];
  constructor(private formBuilder: FormBuilder,private service:ServiceHotelService) {}
  ngOnInit() {
    this.get_all_ville();
    this.get_all_type_chambre();
    this.get_all_moi();
    this.registerForm = this.formBuilder.group({
        ville: [null, [Validators.required]],
      });
    this.registerForm2 = this.formBuilder.group({
        Type_Chambre: [null, [Validators.required]],
        nombre: [null, [Validators.required]],
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
              
              }


  get f() { return this.registerForm.controls; }
  get f2() { return this.registerForm2.controls; }
  get f3() { return this.registerForm3.controls; }
  get f4() { return this.registerForm4.controls; }
  get f5() { return this.registerForm5.controls; }
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
        },(err)=>{
          console.log(err);
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
          (data)=>{ this.registerForm2.reset();},
          (err)=>{console.log(err)}

          
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
      (data)=>{this.registerForm3.reset();},
      (err)=>{console.log(err);}
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
    (data)=>{this.registerForm4.reset();},
    (err)=>{console.log(err);}
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
      (data)=>{this.registerForm5.reset();},
      (err)=>{console.log(err)}
    )

}
}
