import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ClassManagementComponent } from './pages/class-management/class-management.component';
import { AdminRoutingModule } from './admin-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
