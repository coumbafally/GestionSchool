import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { EleveDetailsComponent } from './pages/eleve-details/eleve-details.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
    FormsModule,
  ]
})
export class StudentModule { }
