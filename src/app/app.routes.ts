import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { AboutComponent } from './app'; // Assuming AboutComponent is also in app.ts

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];