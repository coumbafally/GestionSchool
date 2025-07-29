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
    HttpClientModule
  ]
})
export class AdminModule {}

