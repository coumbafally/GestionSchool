import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EleveListComponent } from './pages/student/pages/eleve-list/eleve-list.component';
import { ListeTuteurComponent } from './pages/tuteur/pages/liste-tuteur/liste-tuteur.component';
import { authGuard } from '../../core/guards/auth.guard';
import { EleveFormComponent } from './pages/student/pages/eleve-form/eleve-form.component';
import { EleveDetailsComponent } from './pages/student/pages/eleve-details/eleve-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },

  //éléves
  { path: 'eleve', component: EleveListComponent, canActivate: [authGuard] },
  { path: 'eleve/create', component: EleveFormComponent, canActivate: [authGuard] },
  { path: 'eleve/edit/:id', component: EleveFormComponent , canActivate: [authGuard]},
  { path: 'eleve/:id', component: EleveDetailsComponent, canActivate: [authGuard] },

  //tuteur
  { path: 'tuteurs', component: ListeTuteurComponent, canActivate: [authGuard] },
  { path: 'tuteurs/create', component: EleveFormComponent, canActivate: [authGuard] },
  { path: 'tuteurs/edit/:id', component: EleveFormComponent , canActivate: [authGuard]},
  { path: 'tuteurs/:id', component: EleveDetailsComponent, canActivate: [authGuard] },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


