import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 

import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { ClassManagementComponent } from './pages/class-management/class-management.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      // On ajoutera les routes pour le dashboard, les classes, etc. ici
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'classes', component: ClassManagementComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Redirection par défaut pour /admin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
