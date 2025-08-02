// Fichier: client/src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ClasseComponent } from './pages/classe/classe.component';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NavbarComponent,
    ClasseComponent
  ]
})
export class AdminModule { }