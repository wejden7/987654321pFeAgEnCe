import { Component, OnInit } from '@angular/core';
import{VoyagesService} from '../../../service/client/voyages.service'
import { ActivatedRoute, Data } from '@angular/router';
import{Periode} from '../../../admin/class/periode';
import{Programme} from '../../../admin/class/programme';
import{Voyage} from '../../../admin/class/voyage';
import{Images} from '../../../admin/class/images';

@Component({
  selector: 'app-p-voyages',
  templateUrl: './p-voyages.component.html',
  styleUrls: ['./p-voyages.component.css']
})
export class PVoyagesComponent implements OnInit {
  voyages:Voyage;
programmes:Programme[]=[];
periodes:Periode[]=[]
images:Images[]=[];
  id:string;
  prix:number;
  date:Date;
  dateto:Date
  jour:number;
  constructor(private voyage:VoyagesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getvoyage();
    this.getallprogrammeofonevoyage();
    this.getperiode();
    this.getallimageofVoyage();
    
  }

  getallprogrammeofonevoyage(){
         this.voyage.getallprogrammeofonevoyage(this.id).subscribe(
              (data)=>{
                          this.programmes=data;
                       });
  }
  getperiode(){
    this.voyage.getperiode(this.id).subscribe(
      (data)=>{
        this.periodes=data;
       
        this.prix= this.periodes[0].prix;
      
      }
    )
  }
  getvoyage(){
   
    this.voyage.getvoyage(this.id).subscribe((data)=>{
      this.voyages=data;
      
      
    }
    );
  }
 
  filterForeCasts(p) {
    
    this.prix= this.periodes[p].prix;
    
  }
  ajouter(date){
    this.dateto=new Date(date);
    this.jour=Number(this.voyages.nbjour);
  return  this.dateto.setDate(this.dateto.getDate()+this.jour-1 );

  }
 
  getallimageofVoyage(){
    this.voyage.getallimageofVoyage(this.id).subscribe((data)=>{
      
  
      this.images=data;
           });
  }
  onPrint() {
    window.print();
  }

}

