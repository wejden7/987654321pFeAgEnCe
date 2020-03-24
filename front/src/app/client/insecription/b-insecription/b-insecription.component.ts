import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../service/auth.service';
import{Register} from '../../../admin/class/register';


@Component({
  selector: 'app-b-insecription',
  templateUrl: './b-insecription.component.html',
  styleUrls: ['./b-insecription.component.css']
})
export class BInsecriptionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  register:Register;
  
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router: Router) { }

  ngOnInit() {
            this.registerForm = this.formBuilder.group({

                email: ['', [Validators.required, Validators.email]],
                nom:['', [Validators.required]],
                prenom:['', Validators.required],
                password: ['', [Validators.required, Validators.minLength(8)]],
             
              });}

get f() { return this.registerForm.controls; }
         
onSubmit() {
              this.submitted = true;

                    if (this.registerForm.invalid) {
                           return;
                       }
                       const fr=new FormData();
                       fr.append('email',this.registerForm.get('email').value);
                       fr.append('name',this.registerForm.get('nom').value);
                       fr.append('password',this.registerForm.get('password').value);
                       fr.append('c_password',this.registerForm.get('password').value);
               this.auth.setclient(fr).subscribe((data)=>{
                 this.register=data.success;
                 console.log(this.register.token);
                 localStorage.setItem('isLoggedIn', "true");
                 localStorage.setItem('token', this.register.token);
                 localStorage.setItem('name', this.register.name);
                 localStorage.setItem('role', this.register.role);
                 localStorage.setItem('id', this.register.id);
                 this.router.navigate(["/index/accueil"]);
                 this.onReset()
                       });
                   
               }
               onReset() {
                this.submitted = false;
                this.registerForm.reset();
            }
                     

}
