import { Component,ViewChild ,OnInit} from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from '@ng-bootstrap/ng-bootstrap';
import{AccueilService} from '../../service/accueil/accueil.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent  implements OnInit {
  images:any;
  constructor(private service:AccueilService,private router:Router) { }

  ngOnInit() {
    this.get_All_Ala_une();
    console.log(this.router.url);
    let rev = this.router.url.split('/').reverse().join('/');
    console.log(rev)
    const mois = this.router.url.split('/');
    console.log(mois[2]);
  }
  
  get_All_Ala_une(){
    this.service.get_All_Ala_une().subscribe(
          (data)=>{this.images=data,console.log(data)},
          (err)=>{console.log(err)});
  }
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;

  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  }


