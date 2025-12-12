import { Routes } from '@angular/router';
import { LoginPage } from './auth/login';
import { ProfilePage } from './profile/profile.page';
import { DigitsPage } from './digits/digits.page';
import { AdviserPage } from './adviser/adviser.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'profile', component: ProfilePage },
  { path: 'digits-treasurer', component: DigitsPage },
  { path: 'adviser', component: AdviserPage }
];
