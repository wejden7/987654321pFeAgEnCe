import { Component, OnInit } from '@angular/core';
import{VoyagesService} from '../../service/client/voyages.service';
import {MessageService} from '../../service/admin/message.service'
@Component({
  selector: 'app-omra',
  templateUrl: './omra.component.html',
  styleUrls: ['./omra.component.css']
})
export class OmraComponent implements OnInit {
voyages:any;
errer_voyage_not_found:boolean=false
  constructor(private server:VoyagesService,private message:MessageService) { }

  ngOnInit() {
    this.getallVoyage();
  }
getallVoyage(){
  this.message.setMessage("");
 this.server.geAllOmraVisible().subscribe(
      (data)=>{let nb=Object.keys(data).length;
        if(nb>0){
          this.voyages=data;
        }else{
          this.errer_voyage_not_found=true
        }
             },
      (err)=>{console.log(err);this.errer_voyage_not_found=true});
}
}
