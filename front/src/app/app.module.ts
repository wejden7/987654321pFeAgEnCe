import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule }from "@angular/common/http";
import{AdminGuard} from './service/admin/admin.guard'
import { ChartModule } from 'angular-highcharts';
import{HighchartserviceService} from '../app/service/Highcharts/highchartservice.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FusionChartsModule } from 'angular-fusioncharts';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load themes
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';


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
import { RVolComponent } from './client/vols/r-vol/r-vol.component';
import { BVoyagesComponent } from './client/voyages/b-voyages/b-voyages.component';
import { BOmraComponent } from './client/omra/b-omra/b-omra.component';

import { ConnexionComponent } from './client/connexion/connexion.component';
import { BConnexionComponent } from './client/connexion/b-connexion/b-connexion.component';
import { InsecriptionComponent } from './client/insecription/insecription.component';
import { BInsecriptionComponent } from './client/insecription/b-insecription/b-insecription.component';
import { IndexComponent } from './admin/index/index.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { VoyageComponent } from './admin/voyage/voyage.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { OmrasComponent } from './admin/omras/omras.component';
import{ReservationComponent as ReservationComponentOmra} from'./admin/omras/reservation/reservation.component'
import { DashbordComponent } from './admin/dashbord/dashbord.component';
import { DetailsComponent } from './admin/voyage/details/details.component';
import { VoyagebyidComponent } from './admin/voyage/voyagebyid/voyagebyid.component';

import{IndexComponent as index} from './client/index/index.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PVoyagesComponent } from './client/voyages/p-voyages/p-voyages.component';
import { ProfilComponent } from './client/profil/profil.component';
import { ReservationComponent } from './admin/voyage/reservation/reservation.component';
import { HotelidComponent } from './admin/hotel/hotelid/hotelid.component';
import { HotelidClientComponent } from './client/hotels/hotelid-client/hotelid-client.component';
import { ReservationHotelComponent } from './admin/hotel/reservation-hotel/reservation-hotel.component';
import { BoitesAuxLettresComponent } from './admin/boites-aux-lettres/boites-aux-lettres.component';
import { OmraidComponent } from './admin/omras/omraid/omraid.component';
import { ClientComponent } from './admin/client/client.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme)

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
    RVolComponent,
    BVoyagesComponent,
    BOmraComponent,
    ConnexionComponent,
    BConnexionComponent,
    InsecriptionComponent,
    BInsecriptionComponent,
    IndexComponent,
    SidebarComponent,
    NavbarComponent,
    VoyageComponent,
    HotelComponent,
    OmrasComponent,
    DashbordComponent,
    DetailsComponent,
    VoyagebyidComponent,
    index,
    PVoyagesComponent,
    ProfilComponent,
    ReservationComponent,
    HotelidComponent,
    HotelidClientComponent,
    ReservationHotelComponent,
    BoitesAuxLettresComponent,
    OmraidComponent,
    ReservationComponentOmra,
    ClientComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FusionChartsModule,
    HttpClientModule,
    NgxPaginationModule,
    RxReactiveFormsModule,
    Ng2SearchPipeModule,
    ChartModule
  ],
  providers: [
    DatePipe,AdminGuard,HighchartserviceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
