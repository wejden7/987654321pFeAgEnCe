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
const routes: Routes = [
  {path: 'accueil', component:HommeComponent  },
  {path: 'hotels', component:HotelsComponent  },
  {path: 'vols', component:VolsComponent  },
  {path: 'voyages', component:VoyagesComponent  },
  {path: 'omra', component:OmraComponent  },
  {path: 'contact', component:ContactComponent  },
  {path: 'connexion', component:ConnexionComponent  },
  {path: 'insecription', component:InsecriptionComponent  },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
