import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../services/note.service';
import { ClasseService } from '../../../../services/classe.service';
import { Note } from '../../../../../../core/models/note.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-classe',
  standalone : true,
  templateUrl: './note-classe.component.html',
  styleUrls: ['./note-classe.component.css'],
  imports : [FormsModule,CommonModule,RouterModule]
})
export class NoteClasseComponent implements OnInit {
  classes: any[] = [];
  notes: Note[] = [];
  selectedClasseId: number | null = null;
  periode: string = '';

  constructor(
    private noteService: NoteService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.classeService.getAll().subscribe(data => {
      this.classes = data;
    });
  }

  loadNotes() {
    if (this.selectedClasseId && this.periode) {
      this.noteService.getByClasseAndPeriode(this.selectedClasseId, this.periode).subscribe({
        next: data => this.notes = data,
        error: err => console.error(err)
      });
    }
  }

  getNotesForEleve(eleveId: number): Note[] {
    return this.notes.filter(n => n.eleve_id === eleveId);
  }

  getUniqueEleves(): any[] {
    const uniqueMap = new Map();
    this.notes.forEach(n => {
      if (n.eleve && !uniqueMap.has(n.eleve.id)) {
        uniqueMap.set(n.eleve.id, n.eleve);
      }
    });
    return Array.from(uniqueMap.values());
  }

  deleteNote(id: number) {
  if (confirm('Voulez-vous vraiment supprimer cette note ?')) {
    this.noteService.delete(id).subscribe(() => {
      this.notes = this.notes.filter(note => note.id !== id);
    });
  }
}

}
