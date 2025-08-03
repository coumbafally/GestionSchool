<<<<<<< HEAD
// Fichier: client/src/app/features/admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ClasseComponent } from './pages/classe/classe.component';
import { StudentComponent } from './pages/student/student.component';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NavbarComponent,
    ClasseComponent,
    StudentComponent
  ]
})
export class AdminModule { }
=======
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EleveListComponent } from './pages/student/pages/eleve-list/eleve-list.component';
import { ListeNoteComponent } from './pages/note/pages/liste-note/liste-note.component';
import { ListeTuteurComponent } from './pages/tuteur/pages/liste-tuteur/liste-tuteur.component';
import { HttpClientModule } from '@angular/common/http';
import { TeacherModule } from '../teacher/teacher.module';
import { MatiereFormComponent } from './pages/matiere/pages/matiere-form/matiere-form.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    NavbarComponent,
    
    ListeTuteurComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    EleveListComponent,
    HttpClientModule,
    TeacherModule,
    MatiereFormComponent    
  ]
})
export class AdminModule {}

>>>>>>> origin/magou
