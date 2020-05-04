import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
@Component({
  selector: 'app-b-connexion',
  templateUrl: './b-connexion.component.html',
  styleUrls: ['./b-connexion.component.css']
})
export class BConnexionComponent implements OnInit {
  registerForm: FormGroup;
  registerForm2: FormGroup;
  submitted = false;
  submitted2=false;
  register:any;
  Unauthorised:boolean;
  error_registre:boolean;
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router: Router) { }

  
  ngOnInit() {
      window.scroll(0, 0);
      this.Unauthorised=false
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
        });
      this.registerForm2 = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          nom:['', [Validators.required]],
          civilite:["Civilité...", [Validators.required]],
          tel:['', [Validators.required, Validators.minLength(8)]],
          Prenom:["", [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(8)]],
       
        });
      
      }

get f() { return this.registerForm.controls; }
get f2() { return this.registerForm2.controls; }

onSubmit(){
       this.submitted = true;
       if (this.registerForm.invalid) {
             return;
           }
        const fr=new FormData();
          fr.append('email',this.registerForm.get('email').value);
          fr.append('password',this.registerForm.get('password').value);
     this.auth.login(fr).subscribe(
       (data)=>{  this.register=data.success;
                  console.log(this.register.token);
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.register.token);
                  localStorage.setItem('name', this.register.name);
                  localStorage.setItem('role', this.register.role);
                  localStorage.setItem('id', this.register.id);
                  this.router.navigate(["/admin/dashboard"]);
         },
         (err)=>{this.Unauthorised=true;});
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
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
                      this.register=data.success;
                      localStorage.setItem('isLoggedIn', "true");
                      localStorage.setItem('token', this.register.token);
                      localStorage.setItem('name', this.register.name);
                      localStorage.setItem('role', this.register.role);
                      localStorage.setItem('id', this.register.id);
                      this.onReset2()
           },
     (err)=>{this.error_registre=true}
           );
       
   }
onReset2() {
                this.submitted2 = false;
                this.registerForm2.reset();
     }

}
