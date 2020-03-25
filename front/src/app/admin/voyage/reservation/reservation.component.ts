import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../../service/admin/voyage.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private service:VoyageService) { }

  ngOnInit() {
    this.getallrezervation();
  }
  getallrezervation(){
this.service.getallrezervation().subscribe((data)=>{
  console.log(data);
})
  }

}
