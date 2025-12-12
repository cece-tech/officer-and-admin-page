import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Use the imports that match your project files.
// I included imports from both snippets you provided — adapt to the ones that exist.
// If you use LoginPage (Ionic) instead of LoginComponent, replace the import below accordingly.

import { LoginComponent } from './components/login/login.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { OfficerDashboardComponent } from './components/officer-dashboard/officer-dashboard.component';
import { RegistrarDashboardComponent } from './components/registrar-dashboard/registrar-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ClearanceDetailComponent } from './components/clearance-detail/clearance-detail.component';

// From your earlier app.routes.ts (adjust paths if different in your project)
import { ProfilePage } from './profile/profile.page';
import { DigitsPage } from './digits/digits.page';
import { AdviserPage } from './adviser/adviser.page';

const routes: Routes = [
  // Default Route
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Authentication
  // Use LoginComponent OR LoginPage depending on which one you have.
  { path: 'login', component: LoginComponent },

  // Profile / other pages from previous app.routes.ts
  { path: 'profile', component: ProfilePage },
  { path: 'digits-treasurer', component: DigitsPage },
  { path: 'adviser', component: AdviserPage },

  // Student Routes
  { path: 'student', component: StudentDashboardComponent },

  // Officer Routes
  { path: 'officer', component: OfficerDashboardComponent },
  { path: 'officer/clearance/:id', component: ClearanceDetailComponent },

  // Registrar/SSC Routes
  { path: 'registrar', component: RegistrarDashboardComponent },

  // Admin Routes
  { path: 'admin', component: AdminDashboardComponent },

  // Legacy Routes (Backwards Compatibility)
  { path: 'student-dashboard', redirectTo: '/student', pathMatch: 'full' },
  { path: 'ssc-dashboard', redirectTo: '/registrar', pathMatch: 'full' },

  // Fallback Route (must be last)
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
