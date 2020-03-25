import { Component, OnInit } from '@angular/core';
import{VoyageService} from '../../service/admin/voyage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nbreservation:any;
  constructor(private service:VoyageService) { }

  ngOnInit() {
    setInterval(() => {
      this.getreservation();
          },3000);
    
  }
  getreservation(){
    this.service.getreservaion().subscribe((data)=>{
      console.log(data);
     this.nbreservation=data;

    });
  }

}
