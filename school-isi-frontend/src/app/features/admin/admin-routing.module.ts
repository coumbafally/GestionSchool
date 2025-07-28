import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ClasseComponent } from './pages/classe/classe.component';

const routes: Routes = [

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'classes', // L'URL sera /admin/classes
        component: ClasseComponent // On utilise votre ClasseComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
