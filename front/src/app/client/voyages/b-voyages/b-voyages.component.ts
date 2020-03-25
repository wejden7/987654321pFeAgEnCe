import { Component, OnInit,Input } from '@angular/core';
import{VoyagesService} from '../../../service/client/voyages.service'
import { ActivatedRoute } from '@angular/router';
import{Voyage} from '../../../admin/class/voyage';
import{Categori}from '../../../admin/class/Categori';
@Component({
  selector: 'app-b-voyages',
  templateUrl: './b-voyages.component.html',
  styleUrls: ['./b-voyages.component.css']
})
export class BVoyagesComponent implements OnInit {
  
    pays:Categori[]=[];
    voyages:Voyage[]=[];
    id:string;
  constructor(private voyage:VoyagesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
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
    this.voyage.getvoyagedepays(this.id).subscribe((data)=>{
        this.voyages=data;
        console.log(this.voyages);
       
        
    }
    );

  }
  filterForeCasts(p) {
    this.id=p;
    this.getvoyage();
  }

 
}
