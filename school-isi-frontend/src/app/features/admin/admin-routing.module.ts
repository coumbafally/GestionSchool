import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EleveListComponent } from './pages/student/pages/eleve-list/eleve-list.component';
import { ListeTuteurComponent } from './pages/tuteur/pages/liste-tuteur/liste-tuteur.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'eleve',
    component : EleveListComponent
  },
  {
    path : 'tuteur',
    component : ListeTuteurComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


