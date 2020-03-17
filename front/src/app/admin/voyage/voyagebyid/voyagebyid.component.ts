import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';
import{Voyage} from '../../../admin/class/voyage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-voyagebyid',
  templateUrl: './voyagebyid.component.html',
  styleUrls: ['./voyagebyid.component.css']
})
export class VoyagebyidComponent implements OnInit {
voyage:Voyage;
id:string;
nb:number=0;
  constructor(private payerservice:VoyageService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getvoyage();
  }
  getvoyage(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.payerservice.getvoyage(this.id).subscribe((data)=>{
      this.voyage=data;
      console.log(this.voyage);
      
    }
    );
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
}
