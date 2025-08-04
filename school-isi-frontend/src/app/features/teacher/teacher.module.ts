import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { NoteFormComponent } from '../admin/pages/note/pages/note-form/note-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { TeacherClassesComponent } from './pages/teacher-classes/teacher-classes.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    NoteFormComponent,
    TeacherDashboardComponent,
    TeacherClassesComponent
  ]
})
export class TeacherModule {}
