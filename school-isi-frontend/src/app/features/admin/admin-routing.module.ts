// Fichier: client/src/app/features/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClasseComponent } from './pages/classe/classe.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
            { path: 'dashboard', component: AdminDashboardComponent },

      { path: 'classes', component: ClasseComponent },
      { path: '', redirectTo: 'classes', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }