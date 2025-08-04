import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { HomeEleveComponent } from './pages/home-eleve/home-eleve.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HomeEleveComponent
  ]
})
export class StudentModule { }
