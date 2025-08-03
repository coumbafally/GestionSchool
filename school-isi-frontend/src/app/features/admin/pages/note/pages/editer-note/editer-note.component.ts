import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../../admin/services/note.service';

@Component({
  selector: 'app-editor-note',
  standalone: false,
  templateUrl: './editer-note.component.html',
  styleUrl: './editer-note.component.css'
})

export class EditerNoteComponent implements OnInit {
  noteForm!: FormGroup;
  noteId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.noteId = Number(this.route.snapshot.paramMap.get('id'));

    this.noteForm = this.fb.group({
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      type: ['', Validators.required],
      coefficient: ['', [Validators.required, Validators.min(1)]]
    });

    this.chargerNote();
  }

  chargerNote(): void {
    this.noteService.getNoteById(this.noteId).subscribe({
      next: (data) => {
        this.noteForm.patchValue({
          note: data.note,
          type: data.type,
          coefficient: data.coefficient
        });
      },
      error: () => alert('Erreur chargement note')
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.noteService.updateNote(this.noteId, this.noteForm.value).subscribe({
        next: () => {
          alert('Note modifiée avec succès');
          this.router.navigate(['/notes']);
        },
        error: () => alert("Erreur lors de la mise à jour")
      });
    }
  }
}
