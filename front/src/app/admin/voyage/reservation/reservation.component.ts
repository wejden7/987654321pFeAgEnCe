import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
reservation:any;
pays:any;
voyages:any;
searchText:any;
voyage:any="";
_pays:any="";



  constructor(private service:VoyageService) { }

  ngOnInit() {
    
    
    this.getallrezervation();
    this.getpays();
    this.getvoyage();
  }
  getallrezervation(){
          this.service.getallrezervation().subscribe(
            (data)=>{
                       console.log(data);
                       this.reservation=data;
                    });
                      }
   annulation(id){
    this.service.annulation(id).subscribe((data)=>{
      this.getallrezervation();
    });
   }
   validation(id){
    this.service.validation(id).subscribe((data)=>{
      this.getallrezervation();
    });
   }
   enatente(id){
    this.service.enatente(id).subscribe((data)=>{
      this.getallrezervation();
    });
   }
   getpays(){
     this.service.getpaye().subscribe((data)=>{
      this.pays=data;
     });
   }
   getvoyage(){
     this.service.voyage().subscribe((data)=>{
       this.voyages=data;
     })
   }
   f_pays(ch){
     if(this._pays==""){
       this._pays=ch;
     }else{
       this._pays="";
     }

   }
   f_voyage(ch){
     if(this.voyage==""){
       this.voyage=ch;
     }else{
       this.voyage="";
     }

   }
 
}
