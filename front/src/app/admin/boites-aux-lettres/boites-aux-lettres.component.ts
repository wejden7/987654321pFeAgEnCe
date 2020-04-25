import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import{MessageService} from '../../service/messages/message.service';
@Component({
  selector: 'app-boites-aux-lettres',
  templateUrl: './boites-aux-lettres.component.html',
  styleUrls: ['./boites-aux-lettres.component.css']
})
export class BoitesAuxLettresComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean;
  message_resu:any;
  messages:any;
  message:any;
  constructor(private formBuilder: FormBuilder,private msgserve:MessageService) { }

  ngOnInit() {
    this.getMessageEnvoyer();
    this.getMessageRemis();
    this.registerForm = this.formBuilder.group({
      a: [null, [Validators.required]],
      objet: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }
  get f() { return this.registerForm.controls; }
  envoyermessage(){
    if (this.registerForm.invalid ) {
      this.submitted=true
       return;
        }
    const fr=new FormData();
        fr.append('id',localStorage.getItem('id'));
        fr.append('a',this.registerForm.get('a').value);
        fr.append('objet',this.registerForm.get('objet').value);
        fr.append('message',this.registerForm.get('message').value);
      this.msgserve.envoyermessage(fr).subscribe(
              (data)=>{console.log(data)},
              (err)=>{console.log(err)})

  }
  getMessageEnvoyer(){
    this.msgserve.getMessageEnvoyer(localStorage.getItem('id')).subscribe(
      (data)=>{console.log(data);this.messages=data},
      (err)=>{console.log(err)}
    )
  }
  getMessageRemis(){
    this.msgserve.getMessageRemis(localStorage.getItem('id')).subscribe(
        (data)=>{console.log(data);this.message_resu=data},
        (err)=>{console.log(err)});
  }
  date(d){
  
    let date=new Date()
    let datec=new Date(d.created_at)
   let s= Math.abs(date.getTime() - datec.getTime()) / 60000;
    let time= Math.round( s);
    if(time==0){
      return "a linstent"
    }else if(time<60){
      return " Il y a "+ time +" minutes ";
    }else if(time>=60){
      let heur= Math.round(time/60);
      if(heur<24){
        return " Il y a "+ heur +" heur";
      }else{
        return " Il y a "+ Math.round(heur/24)+ " jour";
      }
    }
  }
  msg(m){
    this.message=m;
    console.log(this.message)
  }
  
}
