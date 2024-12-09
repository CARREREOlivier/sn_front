import { Routes } from '@angular/router';
import { RecitsComponent } from './recits/recits.component';
import {NewsDetailsComponent} from './news-details/news-details.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recits', component: RecitsComponent },
  { path: 'news/:id', component: NewsDetailsComponent },

  { path: '**', redirectTo: '' }, // Redirection vers la page d'accueil
];
