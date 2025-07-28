import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
//import { NavbarComponent } from './components/navbar/navbar.component';
//import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { ClasseComponent } from './pages/classe/classe.component';
import { ClasseService } from './services/classe.service';


@NgModule({
  declarations: [
    //NavbarComponent,
   //AdminDashboardComponent,
    ClasseComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],

   providers: [
    ClasseService
  ]
})
export class AdminModule { }
