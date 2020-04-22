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
  submitted = false;
  register:any;
  Unauthorised:boolean;
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router: Router) { }

  
    ngOnInit() {
      window.scroll(0, 0);
      this.Unauthorised=false
      this.registerForm = this.formBuilder.group({

          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
       
        });}

get f() { return this.registerForm.controls; }
onSubmit(){
  this.submitted = true;

  if (this.registerForm.invalid) {
         return;
     }
     const fr=new FormData();
                fr.append('email',this.registerForm.get('email').value);
                fr.append('password',this.registerForm.get('password').value);
    

     this.auth.login(fr).subscribe(
       (data)=>{
                  this.register=data.success;
                  console.log(this.register.token);
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.register.token);
                  localStorage.setItem('name', this.register.name);
                  localStorage.setItem('role', this.register.role);
                  localStorage.setItem('id', this.register.id);
                  this.router.navigate(["/admin/voyage"]);
         },
         (err)=>{
           this.Unauthorised=true;
         }
         );
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

}
