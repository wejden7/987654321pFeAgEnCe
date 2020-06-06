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
  registerFormmotpasseoublie:FormGroup;
  registerFormcodemotpasseoublie:FormGroup;
  registerFormnewmotpasse:FormGroup
  submitted = false;
  submitted2=false;
  submitted3=false;
  submitted4=false;
  submitted5=false;
  register:any;
  Unauthorised:boolean;
  error_registre:boolean;
  inscription:boolean=false;
  Loading_insecription:boolean=false;
  Loading_connexion:boolean=false;
  mot_passe_oublie:boolean=false;
  from_mot_passe_oublie:boolean=false;
  code_mot_passe_oublie:boolean=false;
  emailneexistepas:boolean=false;
  code_error:boolean=false;
  code:string='';
  id_user:string;
  formpasswored:boolean=false;
  constructor(private formBuilder: FormBuilder,private auth:AuthService,private router: Router) { }

  
  ngOnInit() {
      window.scroll(0, 0);
      this.Unauthorised=false
      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
        });
        this.registerFormnewmotpasse = this.formBuilder.group({
          password: ['', [Validators.required, Validators.minLength(8)]],
        });
      this.registerFormmotpasseoublie = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]]
        });
      this.registerFormcodemotpasseoublie = this.formBuilder.group({
          code: ['', [Validators.required,]]
        });
      this.registerForm2 = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          nom:['', [Validators.required]],
          civilite:["Civilité...", [Validators.required]],
          tel:['', [Validators.required, Validators.minLength(8),Validators.pattern('[0-9]*')]],
          Prenom:["", [Validators.required]],
          password: ['', [Validators.required, Validators.minLength(8)]],
       
        });
      
      }

get f() { return this.registerForm.controls; }
get f2() { return this.registerForm2.controls; }
get f3() { return this.registerFormmotpasseoublie.controls; }
get f4() { return this.registerFormcodemotpasseoublie.controls; }
get f5() { return this.registerFormnewmotpasse.controls; }

onSubmit(){
  this.mot_passe_oublie=false;
       if (this.registerForm.invalid) {
       this.submitted = true;
             return;
           }
       this.submitted = false;
      this.Loading_connexion=true;
        const fr=new FormData();
          fr.append('email',this.registerForm.get('email').value);
          fr.append('password',this.registerForm.get('password').value);
     this.auth.login(fr).subscribe(
       (data)=>{  this.register=data.success;
                  this.Loading_connexion=false;
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('token', this.register.token);
                  localStorage.setItem('name', this.register.name);
                  localStorage.setItem('role', this.register.role);
                  localStorage.setItem('id', this.register.id);
                  this.router.navigate(["/admin/dashboard"]);
         },
         (err)=>{this.Unauthorised=true;this.Loading_connexion=false;this.mot_passe_oublie=true});
}
onReset() {
  this.submitted = false;
  this.registerForm.reset();
}
onSubmit2() {
  this.error_registre=false;
        if (this.registerForm2.invalid) {
              this.submitted2 = true;
               return;
           }
    this.Loading_insecription=true;
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
                      this.Loading_insecription=false;
                      localStorage.setItem('isLoggedIn', "true");
                      localStorage.setItem('token', this.register.token);
                      localStorage.setItem('name', this.register.name);
                      localStorage.setItem('role', this.register.role);
                      localStorage.setItem('id', this.register.id);
                      this.onReset2();
                      this.router.navigate(["/index/accueil"]);
           },
     (err)=>{this.error_registre=true;
      this.Loading_insecription=false;
      console.log(err)
    }
           );
       
   }
onReset2() {
                this.submitted2 = false;
                this.registerForm2.reset();
                this.registerForm2.get('civilite').setValue('Civilité...');
     }
emailrecherche(){
  this.code_mot_passe_oublie=false;
  this.emailneexistepas=false

       if(this.registerFormmotpasseoublie.invalid){
         this.submitted3=true;
         return
       }  
       this.Loading_connexion=true;
  this.submitted3=false;
const fr=new FormData();
fr.append('email',this.registerFormmotpasseoublie.get('email').value);
   
this.auth.recherchermail(fr).subscribe(
         (data)=>{this.code_mot_passe_oublie=true;
                   
                  this.code=data['code'];
                  this.id_user=data['user_id']
                  this.Loading_connexion=false;},
         (err)=>{this.emailneexistepas=true;this.Loading_connexion=false;});
     }
verifier_code(){
  this.code_error=false;
  if(this.registerFormcodemotpasseoublie.invalid){
    this.submitted4=true;
    return
  } 
  this.submitted4=false;
  this.Loading_connexion=true;
  if(this.code==this.registerFormcodemotpasseoublie.get('code').value){
        this.formpasswored=true;
        this.Loading_connexion=false;
  }else{
    this.Loading_connexion=false;
    this.code_error=true;
  }
}
updatemotpasse(){
  if (this.registerFormnewmotpasse.invalid) {
    this.submitted5 = true;
          return;
        }
  this.Loading_connexion=true;
  this.submitted5=false;
  const fr=new FormData();
fr.append('id',this.id_user);
fr.append('mot_passe',this.registerFormnewmotpasse.get('password').value);
  this.auth.update_mot_passe(fr).subscribe(
    (data)=>{ this.annuler()

    },
    (err)=>{
            this.Loading_connexion=false;

    }
  )

}
annuler(){this.code_error=false;
              this.Unauthorised=false;
              this.from_mot_passe_oublie=false;
              this.code_mot_passe_oublie=false;
              this.mot_passe_oublie=false;
              this.formpasswored=false;
              this.Loading_connexion=false;
              this.inscription=false;
              this.registerForm.reset();
              this.registerForm2.reset();
              this.registerFormcodemotpasseoublie.reset();
              this.registerFormmotpasseoublie.reset();
              this.registerFormnewmotpasse.reset();
              this.submitted=false;
              this.submitted2=false;
              this.submitted3=false;
              this.submitted4=false;
              this.submitted5=false;

            }
}
