import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EleveListComponent } from './pages/student/pages/eleve-list/eleve-list.component';
import { ListeTuteurComponent } from './pages/tuteur/pages/liste-tuteur/liste-tuteur.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MatiereFormComponent } from './pages/matiere/pages/matiere-form/matiere-form.component';
import { TuteurFormComponent } from './pages/tuteur/pages/tuteur-form/tuteur-form.component';
import { NoteFormComponent } from './pages/note/pages/note-form/note-form.component';
import { NoteClasseComponent } from './pages/note/pages/note-classe/note-classe.component';



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
    ToastrModule.forRoot(),
    MatiereFormComponent,
    TuteurFormComponent
  ]
})
export class AdminModule {}

