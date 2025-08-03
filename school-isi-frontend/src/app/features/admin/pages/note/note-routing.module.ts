import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteClasseComponent } from './pages/note-classe/note-classe.component';
import { NoteFormComponent } from './pages/note-form/note-form.component';

const routes: Routes = [
  { path: '', component: NoteClasseComponent },
  { path: 'ajouter', component: NoteFormComponent },
  { path: 'editer/:id', component: NoteFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
