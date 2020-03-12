import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './client/nav/nav.component';
import { HommeComponent } from './client/homme/homme.component';
import { CarouselComponent } from './client/carousel/carousel.component';
import { RechercheComponent } from './client/recherche/recherche.component';
import { FooterComponent } from './client/footer/footer.component';
import { BodyComponent } from './client/body/body.component';
import { HotelsComponent } from './client/hotels/hotels.component';
import { VolsComponent } from './client/vols/vols.component';
import { VoyagesComponent } from './client/voyages/voyages.component';
import { OmraComponent } from './client/omra/omra.component';
import { ContactComponent } from './client/contact/contact.component';
import { HRechercheComponent } from './client/hotels/h-recherche/h-recherche.component';
import { HBodyComponent } from './client/hotels/h-body/h-body.component';
import { RVolComponent } from './client/vols/r-vol/r-vol.component';
import { RVoyageComponent } from './client/voyages/r-voyage/r-voyage.component';
import { BVoyagesComponent } from './client/voyages/b-voyages/b-voyages.component';
import { BOmraComponent } from './client/omra/b-omra/b-omra.component';
import { BContactComponent } from './client/contact/b-contact/b-contact.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import { BConnexionComponent } from './client/connexion/b-connexion/b-connexion.component';
import { InsecriptionComponent } from './client/insecription/insecription.component';
import { BInsecriptionComponent } from './client/insecription/b-insecription/b-insecription.component';
import { IndexComponent } from './admin/index/index.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NavbarComponent } from './admin/navbar/navbar.component';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HommeComponent,
    CarouselComponent,
    RechercheComponent,
    FooterComponent,
    BodyComponent,
    HotelsComponent,
    VolsComponent,
    VoyagesComponent,
    OmraComponent,
    ContactComponent,
    HRechercheComponent,
    HBodyComponent,
    RVolComponent,
    RVoyageComponent,
    BVoyagesComponent,
    BOmraComponent,
    BContactComponent,
    ConnexionComponent,
    BConnexionComponent,
    InsecriptionComponent,
    BInsecriptionComponent,
    IndexComponent,
    SidebarComponent,
    NavbarComponent,
   
    
   
   
   
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
