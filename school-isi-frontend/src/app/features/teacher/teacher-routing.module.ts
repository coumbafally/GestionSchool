import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { TeacherDashboardComponent } from './pages/teacher-dashboard/teacher-dashboard.component';
import { NoteFormComponent } from '../admin/pages/note/pages/note-form/note-form.component';
import { TeacherClassesComponent } from './pages/teacher-classes/teacher-classes.component';
import { NotesComponent } from './pages/note/pages/note-form/note-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TeacherDashboardComponent, canActivate: [authGuard] },
  { path: 'notes', component: NoteFormComponent, canActivate: [authGuard] },
  { path: 'notes/create', component: NotesComponent },
  { path: 'notes/edit/:id', component: NoteFormComponent, canActivate: [authGuard] },
  { path: 'mes-classes', component: TeacherClassesComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
