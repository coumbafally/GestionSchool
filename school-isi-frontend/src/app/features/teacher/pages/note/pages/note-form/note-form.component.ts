import { Component, OnInit } from '@angular/core';

import { Affectation,Note,Eleve } from '../../../../../../core/models/model';
import { NotesService } from '../../../../services/note.service';
import { NgFor, NgIf} from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

declare var bootstrap: any;

@Component({
  selector: 'app-notes',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  standalone: true,
  imports: [ NgIf,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
  ]
})

export class NotesComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  affectations: Affectation[] = [];
  eleves: Eleve[] = [];
  
  noteForm: FormGroup;
  showForm = false;
  isEditing = false;
editingNoteId: number | null | undefined = null;
  
  loading = false;
  submitting = false;
  
  message = '';
  messageType: 'success' | 'error' | 'warning' = 'success';
  
  searchTerm = '';
  selectedClasseId: number | null = null;
  
  noteToDelete: Note | null = null;
  private deleteModal: any;

  constructor(
    private notesService: NotesService,
    private fb: FormBuilder
  ) {
    this.noteForm = this.fb.group({
      mce_id: ['', Validators.required],
      eleve_id: ['', Validators.required],
      type: ['', Validators.required],
      periode: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      coefficient: [1, [Validators.min(0.1)]],
      appreciation: ['']
    });
  }

  ngOnInit(): void {
    this.loadNotes();
    this.loadAffectations();
    this.loadEleves;
    this.deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    console.log('NotesComponent initialized');
  }

  loadNotes(): void {
    this.loading = true;
    this.notesService.getNotes().subscribe({
      next: (response) => {
        this.notes = response.data || [];
        this.filteredNotes = [...this.notes];
        this.loading = false;
      },
      error: (error) => {
        this.showMessage('Erreur lors du chargement des notes', 'error');
        this.loading = false;
      }
    });
  }

  loadAffectations(): void {
    this.notesService.getMesAffectations().subscribe({
      next: (response) => {
        console.log('Affectations:', response);
        this.affectations = response.data || [];

      },
      error: (error) => {
        this.showMessage('Erreur lors du chargement des affectations', 'error');
      }
    });
  }

  onAffectationChange(): void {
    const affectationId = this.noteForm.get('mce_id')?.value;
    const selectedAffectation = this.affectations.find(a => a.id === affectationId);
    
    this.selectedClasseId = selectedAffectation?.classe?.id || null;
    this.noteForm.get('eleve_id')?.reset('');
    
    if (this.selectedClasseId) {
      this.loadEleves(this.selectedClasseId);
    }
  }

  loadEleves(classeId: number): void {
    this.notesService.getElevesParClasse(classeId).subscribe({
      next: (response) => {
        this.eleves = response.data || [];
      },
      error: (error) => {
        this.showMessage('Erreur lors du chargement des élèves', 'error');
      }
    });
  }

  toggleFormulaire(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const noteData = this.noteForm.value;

    if (this.isEditing && this.editingNoteId) {
      this.notesService.updateNote(this.editingNoteId, noteData).subscribe({
        next: (response) => {
          this.showMessage('Note mise à jour avec succès', 'success');
          this.loadNotes();
          this.resetForm();
        },
        error: (error) => {
          this.showMessage('Erreur lors de la mise à jour de la note', 'error');
          this.submitting = false;
        }
      });
    } else {
      this.notesService.createNote(noteData).subscribe({
        next: (response) => {
          this.showMessage('Note créée avec succès', 'success');
          this.loadNotes();
          this.resetForm();
        },
        error: (error) => {
          this.showMessage('Erreur lors de la création de la note', 'error');
          this.submitting = false;
        }
      });
    }
  }

  editNote(note: Note): void {
    this.isEditing = true;
    
    this.editingNoteId = note.id;
    this.showForm = true;

    this.noteForm.patchValue({
      mce_id: note.matiere_classe_enseignant?.id,
      eleve_id: note.eleve?.id,
      type: note.type,
      periode: note.periode,
      note: note.note,
      coefficient: note.coefficient,
      appreciation: note.appreciation
    });

    if (note.matiere_classe_enseignant?.classe?.id) {
      this.loadEleves(note.matiere_classe_enseignant.classe.id);
    }
  }

  confirmDelete(note: Note): void {
    this.noteToDelete = note;
    this.deleteModal.show();
  }

  deleteNote(): void {
    if (!this.noteToDelete) return;

    this.submitting = true;
    if (this.noteToDelete.id) {
    this.notesService.deleteNote(this.noteToDelete.id).subscribe({
      next: (response) => {
   //     this.showMessage('Note supprimée avec succès', 'success');
        this.loadNotes();
        this.deleteModal.hide();
        this.submitting = false;
      },
      error: (error) => {
    //    this.showMessage('Erreur lors de la suppression de la note', 'error');
        this.submitting = false;
      }
    });
  }
  }

  cancelForm(): void {
    this.resetForm();
    this.showForm = false;
  }

  resetForm(): void {
    this.noteForm.reset({
      coefficient: 1
    });
    this.isEditing = false;
    this.editingNoteId = null;
    this.submitting = false;
    this.selectedClasseId = null;
    this.eleves = [];
  }

  showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.message = message;
    this.messageType = type;
    setTimeout(() => this.message = '', 5000);
  }

  
  trackByNoteId(index: number, note: Note): number {
  return note.id ?? -1; // Si note.id est undefined, retourne -1
}
  onSearchChange(): void {
    this.filteredNotes = this.filterNotes();
  }

  private filterNotes(): Note[] {
    if (!this.searchTerm.trim()) return this.notes;
    
    const term = this.searchTerm.toLowerCase().trim();
    return this.notes.filter(note => {
      const eleveNom = note.eleve?.user?.nom?.toLowerCase() || '';
      const elevePrenom = note.eleve?.user?.prenom?.toLowerCase() || '';
      const matiere = note.matiere_classe_enseignant?.matiere?.nom?.toLowerCase() || '';
      const classe = note.matiere_classe_enseignant?.classe?.nom?.toLowerCase() || '';
      const type = note.type?.toLowerCase() || '';
      const periode = note.periode?.toLowerCase() || '';

      return eleveNom.includes(term) || 
             elevePrenom.includes(term) ||
             matiere.includes(term) ||
             classe.includes(term) ||
             type.includes(term) ||
             periode.includes(term);
    });
  }
}
