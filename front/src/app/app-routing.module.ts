import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HommeComponent} from '../app/client/homme/homme.component';
import { HotelsComponent } from './client/hotels/hotels.component';
import { VolsComponent } from './client/vols/vols.component';
import { VoyagesComponent } from './client/voyages/voyages.component';
import { OmraComponent } from './client/omra/omra.component';
import { ContactComponent } from './client/contact/contact.component';
import { InsecriptionComponent } from './client/insecription/insecription.component';
import { ConnexionComponent } from './client/connexion/connexion.component';
import{IndexComponent} from './admin/index/index.component';
import {VoyageComponent} from '.././app/admin/voyage/voyage.component'
import{HotelComponent} from'./admin/hotel/hotel.component';
import {OmrasComponent } from './admin/omras/omras.component';
import{DashbordComponent} from './admin/dashbord/dashbord.component';
import{DetailsComponent} from './admin/voyage/details/details.component';
import{VoyagebyidComponent} from './admin/voyage/voyagebyid/voyagebyid.component';
import{IndexComponent as index  }from '../../src/app/client/index/index.component';
import{BVoyagesComponent} from './client/voyages/b-voyages/b-voyages.component';
import{PVoyagesComponent} from './client/voyages/p-voyages/p-voyages.component';
import { AdminGuard } from '../app/service/admin/admin.guard';
import { BoitesAuxLettresComponent } from './admin/boites-aux-lettres/boites-aux-lettres.component';
import{ProfilComponent} from '../../src/app/client/profil/profil.component';
import{ProfilService} from '../../src/app/service/activate/profil.service';
import{ReservationComponent} from '../../src/app/admin/voyage/reservation/reservation.component';
import{ReservationComponent as ReservationComponentOmra} from'./admin/omras/reservation/reservation.component'
import{HotelidComponent} from '../../src/app/admin/hotel/hotelid/hotelid.component';
import{HotelidClientComponent} from '../../src/app/client/hotels/hotelid-client/hotelid-client.component';
import{ReservationHotelComponent}from './admin/hotel/reservation-hotel/reservation-hotel.component';
import{OmraidComponent} from '../app/admin/omras/omraid/omraid.component'
import{BOmraComponent} from '../app/client/omra/b-omra/b-omra.component'
import{ClientComponent} from '../app/admin/client/client.component'
const routes: Routes = [
  {path: 'index', component:index,
     children:[
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {path:'voyages', component:VoyagesComponent  },
      {path:'voyages/voyage/:id', component:BVoyagesComponent  },
      {path:'voyages/voyage/:id/programme/:id', component:PVoyagesComponent  },
      {path: 'accueil', component:HommeComponent},
      {path: 'profil', component:ProfilComponent,canActivate: [ProfilService]},
      {path: 'hotels', component:HotelsComponent  },
      {path: 'hotels/hotelclient/:id', component:HotelidClientComponent},
      {path: 'hotels/hotelclientAndResulta/:id', component:HotelidClientComponent },
      {path: 'vols', component:VolsComponent  },
      {path: 'omra', component:OmraComponent  },
      {path: 'omra/programm/:id', component:BOmraComponent  },
      {path: 'contact', component:ContactComponent  },
      {path: 'connexion', component:ConnexionComponent  },
      {path: 'connexion/insecription', component:InsecriptionComponent  }
        ]
     },
  
  {path:'admin',component:IndexComponent,
          children: [
                       { path: '', redirectTo: 'overview', pathMatch: 'full' },
                       { path: 'client', component: ClientComponent },
                       { path: 'voyage', component: VoyageComponent },
                       { path: 'voyage/reservation', component: ReservationComponent },
                       { path:'voyage/detailvoyage/:id',component:DetailsComponent},
                       { path:'voyage/detailvoyage/:id/voyagebyid/:id',component:VoyagebyidComponent},
                       { path: 'hotel', component: HotelComponent },
                       { path: 'hotel/hotelid/:id', component: HotelidComponent },
                       { path:'hotel/reservatio',component:ReservationHotelComponent},
                       { path: 'omra', component: OmrasComponent },
                       { path: 'omra/reservation', component: ReservationComponentOmra },
                       { path: 'omra/omrabyid/:id', component: OmraidComponent },
                       {path:'boitesauxlettre',component:BoitesAuxLettresComponent},
                       { path: 'dashboard', component: DashbordComponent },
                    ],canActivate: [AdminGuard]},
  { path: '**', redirectTo: 'index/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
