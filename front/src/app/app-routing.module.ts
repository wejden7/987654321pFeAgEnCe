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
import { AuthGuardService } from '../../src/app/client/auth-guard.service';
import{ProfilComponent} from '../../src/app/client/profil/profil.component';
import{ProfilService} from '../../src/app/service/activate/profil.service';
import{ReservationComponent} from '../../src/app/admin/voyage/reservation/reservation.component';
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
      {path: 'vols', component:VolsComponent  },
      {path: 'omra', component:OmraComponent  },
      {path: 'contact', component:ContactComponent  },
      {path: 'connexion', component:ConnexionComponent  },
      {path: 'connexion/insecription', component:InsecriptionComponent  }
        ]
     },
  
  {path:'admin',component:IndexComponent,
          children: [
                       { path: '', redirectTo: 'overview', pathMatch: 'full' },
                       { path: 'voyage', component: VoyageComponent },
                       { path: 'voyage/reservation', component: ReservationComponent },
                       { path:'voyage/detailvoyage/:id',component:DetailsComponent},
                       { path:'voyage/detailvoyage/:id/voyagebyid/:id',component:VoyagebyidComponent},
                       { path: 'hotel', component: HotelComponent },
                       { path: 'omra', component: OmrasComponent },
                       { path: 'dashboard', component: DashbordComponent },
                    ],canActivate: [AuthGuardService]},
  { path: '**', redirectTo: 'index/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
