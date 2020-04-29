import { Component, OnInit,Input } from '@angular/core';
import{VoyagesService} from '../../../service/client/voyages.service'
import { ActivatedRoute,Router } from '@angular/router';
import {MessageService} from '../../../service/admin/message.service'
@Component({
  selector: 'app-b-voyages',
  templateUrl: './b-voyages.component.html',
  styleUrls: ['./b-voyages.component.css']
})
export class BVoyagesComponent implements OnInit {
  
    pays:any[]=[];
    voyages:any[]=[];
    id:string;
    data:any;
    errer_voyage_not_found:boolean=false;
  constructor(private voyage:VoyagesService,private route: ActivatedRoute,private router: Router,private message:MessageService) { }

  ngOnInit() {
    this.message.setMessage("hhhh");
    window.scroll(0, 0);
    this.id = this.route.snapshot.paramMap.get('id');
   this.data=this.id;
        this.getvoyage();
        this.getpays();
    
  }
  getpays(){
    this.voyage.getpaye().subscribe((data)=>{
      this.pays=data;
      console.log(this.pays);
     
      
  }
  );
  }
  getvoyage(){
    this.errer_voyage_not_found=false;
    this.voyage.getvoyagevisibleofpays(this.id).subscribe(
      (data)=>{
        if(Object.keys(data).length>0){
          this.voyages=data;
          console.log(data)
        }else{
          this.errer_voyage_not_found=true;
          this.voyages=[];
        }
             
        },
        (err)=>{
                
               
              }
    );

  }
  filterForeCasts(p) {
    this.id=p;
    this.getvoyage();
    this.router.navigate(['/index/voyages/voyage/'+p]);

  }

 
}
