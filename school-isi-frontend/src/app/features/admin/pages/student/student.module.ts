import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing.module';
import { RouterModule } from '@angular/router';
import { EleveDetailsComponent } from './pages/eleve-details/eleve-details.component';
import { TuteurFormComponent } from '../tuteur/pages/tuteur-form/tuteur-form.component';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    RouterModule,
    FormsModule,
    TuteurFormComponent
  ]
})
export class StudentModule { }
