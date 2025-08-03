import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeNoteComponent } from './pages/liste-note/liste-note.component';
import { AjouterNoteComponent } from './pages/ajouter-note/ajouter-note.component';
import { EditerNoteComponent } from './pages/editer-note/editer-note.component';

const routes: Routes = [
  { path: '', component: ListeNoteComponent },
  { path: 'ajouter', component: AjouterNoteComponent },
  { path: 'editer/:id', component: EditerNoteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule {}
