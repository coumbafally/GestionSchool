import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteRoutingModule } from './note-routing.module';
import { ListeNoteComponent } from './pages/liste-note/liste-note.component';
import { AjouterNoteComponent } from './pages/ajouter-note/ajouter-note.component';
import { EditerNoteComponent } from './pages/editer-note/editer-note.component';

@NgModule({
  declarations: [
    ListeNoteComponent,
    AjouterNoteComponent,
    EditerNoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoteRoutingModule
  ]
})
export class NoteModule {}
