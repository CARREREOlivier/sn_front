import { Routes } from '@angular/router';
import { RecitsComponent } from './recits/recits.component';
import {NewsDetailsComponent} from './news-details/news-details.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {NewsFormComponent} from './news-form/news-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recits', component: RecitsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news/add', component: NewsFormComponent },
  { path: 'news/:id', component: NewsDetailsComponent },


  { path: '**', redirectTo: '' }, // Redirection vers la page d'accueil
];
