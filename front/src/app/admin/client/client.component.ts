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
  Loading:boolean=false;
  Loading_delete:boolean[]=[false];
  type_notification:string="";
    titre_notification:string="";
    soustitre_notification:string="";
    notification:boolean=false;
    msg='Désolé un problème technique est survenu. Veillez réssayer plus tard.'
  constructor(private service:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm2 = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nom:['', [Validators.required]],
      civilite:["Civilité...", [Validators.required]],
      tel:['', [Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(8),Validators.maxLength(8)]],
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
 let res= confirm("Êtes-vous sûr de vouloir supprimer?");
 if(res){
   this.Loading_delete[id]=true;
  this.service.delete_client(id).subscribe(
    (data)=>{this.get_All_Client();this.Loading_delete[id]=false;},
    (err)=>{this.Loading_delete[id]=false;
            this.type_notification='error';
            this.titre_notification='';
            this.soustitre_notification=this.msg;
            this.notification=true;
            setTimeout(()=>{ this.notification=false;},3000);
            });
 }
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
       (err)=>{if(err.error.error=='existe'){
                        this.Loading=false;
                        this.type_notification='error';
                        this.titre_notification='';
                        this.soustitre_notification="L'e-mail existe déjà";
                        this.notification=true;
                        setTimeout(()=>{ this.notification=false;},3000); 
                }else{
                  this.Loading=false;
                  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000); 
                }
              }
             );
         
     }
     bloquer(id){
      this.service.bloquer(id).subscribe(
        (data)=>{this.get_All_Client();},
        (err)=>{  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);});
     }
     debloquer(id){
      this.service.debloquer(id).subscribe(
        (data)=>{this.get_All_Client()},
        (err)=>{  this.type_notification='error';
                  this.titre_notification='';
                  this.soustitre_notification=this.msg;
                  this.notification=true;
                  setTimeout(()=>{ this.notification=false;},3000);});
     }
}
