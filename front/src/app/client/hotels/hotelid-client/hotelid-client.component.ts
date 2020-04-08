import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{ServiceHotelService} from '../../../service/hotels/service-hotel.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-hotelid-client',
  templateUrl: './hotelid-client.component.html',
  styleUrls: ['./hotelid-client.component.css']
})
export class HotelidClientComponent implements OnInit {
  descriptions_hotel:boolean[]=[];
  question_hotel:boolean[]=[];
id:any;
images:any;
image:any;
ville:any;
nb_etoile:any;
hotels_de_meme_ville:any;
amenagement:any;
nom_hotel:string;
dscription:string;
descriptions:any;
question:any;
interdi:any;
registerForm:FormGroup;
submitted:boolean;
  constructor(private route: ActivatedRoute,private service:ServiceHotelService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.get_hotel_by_id();
    this.get_all_photo_of_hotel();
    this.get_all_loisire_of_hotel();
    this.get_all_description_of_on_hotel();
    this.get_all_question_of_one_hotel();
    this.get_all_interdi_of_hotel();
   
    this.registerForm = this.formBuilder.group({
      ville: ["choisire un ville", [Validators.required]],
      nbchamber: [1, [Validators.required]],
      dp:[null],
      nuit: [null, [Validators.required]],
      number_adulte1: [1, [Validators.required]],
      number_enfants1: [0, [Validators.required]],
      number_adulte2: [1, [Validators.required]],
      number_enfants2: [0, [Validators.required]],
      number_adulte3: [1, [Validators.required]],
      number_enfants3: [0, [Validators.required]],
      number_adulte4: [1, [Validators.required]],
      number_enfants4: [0, [Validators.required]],
      number_adulte5: [1, [Validators.required]],
      number_enfants5: [0, [Validators.required]],
    });
  }
  get f() { return this.registerForm.controls; }
  get_all_photo_of_hotel(){
this.service.get_all_photo_of_hotel(this.id).subscribe(
        (data)=>{this.images=data
                console.log(data);
                },
        (err)=>{console.log(err)})
  }
  get_hotel_by_id(){
    this.service.get_hotel_by_id(this.id).subscribe(
      (data)=>{this.dscription=data.description; this.image=data.image;this.nom_hotel=data.nom;this.ville=data.ville;this.nb_etoile=data.etoile; this.get_hotels_of_ville();},
      (err)=>{console.log(err)}
    )
  }
  get_all_loisire_of_hotel(){
    this.service.get_all_loisire_of_hotel(this.id).subscribe(
            (data)=>{this.amenagement=data;console.log(data)},
            (err)=>{console.log(err)}
            )
  }
  get_all_description_of_on_hotel(){
    this.service.get_all_description_of_on_hotel(this.id).subscribe(
         (data)=>{this.descriptions=data;console.log(data)},
         (err)=>{console.log(err)});

    }
    get_all_question_of_one_hotel(){
      this.service.get_all_question_of_one_hotel(this.id).subscribe(
              (data)=>{this.question=data;console.log(data)},
              (err)=>{console.log(err)})
    }
    get_hotels_of_ville(){
    this.service.get_hotels_of_ville(this.ville).subscribe(
          (data)=>{this.hotels_de_meme_ville=data;},
          (err)=>{console.log(err)});
    }
    get_all_interdi_of_hotel(){
      this.service.get_all_interdi_of_hotel(this.id).subscribe(
            (data)=>{this.interdi=data;},
            (err)=>{console.log(err)}
            )
    }
    createRange(number){
      var items: number[] = [];
      for(var i =1; i <= number; i++){
         items.push(i);
      }
      return items;
    }
}
