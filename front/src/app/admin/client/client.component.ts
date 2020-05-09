import { Component, OnInit } from '@angular/core';
import{AuthService} from '../../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients:any;
  searchText:string="";
  nbitem:number=10;
  nbclient:number;
  registerForm2: FormGroup;
  submitted2=false;
  error_registre:boolean=false;
  Loading:boolean=false;
  constructor(private service:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      civilite:["Civilité...", [Validators.required]],
      tel:['', [Validators.required, Validators.minLength(8)]],
      Prenom:["", [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
   
    });
    this.get_All_Client();
    setInterval(()=>{this.get_All_Client},4000)
  }
  get_All_Client(){
    this.service.get_All_Client().subscribe(
        (data)=>{this.clients=data;
                  this.nbclient=Object.keys(data).length},
        (err)=>{console.log(err)})
  }
  delete(id){
this.service.delete_client(id).subscribe(
    (data)=>{this.get_All_Client();},
    (err)=>{console.log(err)});
  }
  get f2() { return this.registerForm2.controls; }
  onSubmit2() {
    
          if (this.registerForm2.invalid) {
            this.submitted2 = true;
                 return;
             }
             this.Loading=true;
             const fr=new FormData();
             fr.append('civilite',this.registerForm2.get('civilite').value);
             fr.append('email',this.registerForm2.get('email').value);
             fr.append('name',this.registerForm2.get('nom').value);
             fr.append('surname',this.registerForm2.get('Prenom').value);
             fr.append('tel',this.registerForm2.get('tel').value);
             fr.append('password',this.registerForm2.get('password').value);
     this.service.setclient(fr).subscribe(
       (data)=>{this.get_All_Client();
                this.registerForm2.reset();
                this.submitted2=false;
                this.Loading=false;      
             },
       (err)=>{this.error_registre=true;this.Loading=false;}
             );
         
     }
}
