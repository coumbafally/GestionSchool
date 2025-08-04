import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoteRoutingModule } from './note-routing.module';
import { NoteFormComponent } from './pages/note-form/note-form.component';
import { NoteClasseComponent } from './pages/note-classe/note-classe.component';

@NgModule({
  declarations: [
 
  ],
  imports: [
    NoteFormComponent,
    NoteClasseComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NoteRoutingModule,
    
  ]
})
export class NoteModule {}
