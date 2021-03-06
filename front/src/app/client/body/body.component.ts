import { Component, OnInit } from '@angular/core';
import{ServiceHotelService}from '../../service/hotels/service-hotel.service';
import{VoyagesService} from '../../service/client/voyages.service';
import {MessageService} from './../../service/admin/message.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

hotel_carousel:any;
pays:any;
omras:any;
nb_omra:number;
  constructor(private hotelservice:ServiceHotelService,private voyageservice:VoyagesService,private message:MessageService) { }

  ngOnInit() {
    this.message.setMessage("");
    this.get_all_hotel_a_client_of_Carousel();
    this.getpaye();
  this.geAllOmraVisible()
    window.scroll(0, 0);
  
  }
  get_all_hotel_a_client_of_Carousel(){
    this.hotelservice.get_all_hotel_a_client_of_Carousel().subscribe(
          (data)=>{this.hotel_carousel=data;console.log(data)},
          (err)=>{console.log(err)})
  }
  getpaye(){
    this.voyageservice.getpaye().subscribe(
          (data)=>{console.log(data);this.pays=data},
          (err)=>{console.log()})
  }
  geAllOmraVisible(){
    this.voyageservice.geAllOmraVisible().subscribe(
      (data)=>{console.log(data);this.omras=data;this.nb_omra=Object.keys(data).length},
      (err)=>{console.log(err)});
  }
  createRange(number){
    var items: number[] = [];
    for(var i =1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
 

 

}
