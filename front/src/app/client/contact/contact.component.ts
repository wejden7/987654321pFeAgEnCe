import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService} from "../../service/messages/message.service";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  valide:boolean=false;
  errors:boolean=false;
  constructor(private formBuilder: FormBuilder,private service:MessageService) { }

  ngOnInit() {
    window.scroll(0, 0);
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      civilite:["", [Validators.required]],
      tel:['', [Validators.required, Validators.minLength(8),Validators.maxLength(8),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      prenom:["", [Validators.required]],
      objet: ['', [Validators.required]],
      message: ['', [Validators.required]],
   
    });
  }
get f() { return this.registerForm.controls; }

  Envoyer(){
    this.valide=false;
    this.errors=false;
    if (this.registerForm.invalid) {
      this.submitted = true;
          return;
        }
     const fr=new FormData();
     fr.append('name',this.registerForm.get("nom").value);
     fr.append('surname',this.registerForm.get("prenom").value);
     fr.append('civilite',this.registerForm.get("civilite").value);
     fr.append('tel',this.registerForm.get("tel").value);
     fr.append('email',this.registerForm.get("email").value);
     fr.append('password',this.registerForm.get("email").value);
     fr.append('objet',this.registerForm.get("objet").value);
     fr.append('message',this.registerForm.get("message").value);
    this.service.envoyerMessagevisiteurs(fr).subscribe(
         (data)=>{this.valide=true;
                  this.registerForm.reset();
                setTimeout(()=>{this.valide=false;},3000)},
         (err)=>{this.errors=true;
                  console.log(err);
                  setTimeout(()=>{this.errors=false;},3000)})
  }
  Resete(){
    this.registerForm.reset();
    this.submitted=false;
    this.valide=false;
    this.errors=false;
  }

}
