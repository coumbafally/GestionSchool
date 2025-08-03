// note-form.component.ts
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../services/note.service';
import { EleveService } from '../../../../services/eleve.service';
import { MatiereClasseEnseignantService } from '../../../../services/matiere-classe-enseignant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-form',
  standalone: true,
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
  imports: [FormsModule, CommonModule]
})
export class NoteFormComponent implements OnInit {
  note: any = {
    eleve_id: null,
    mce_id: null,
    type: 'Devoir',
    note: 0,
    coefficient: 1,
    periode: '',
    appreciation: ''
  };

  eleves: any[] = [];
  mces: any[] = [];
  isEditMode = false;
  id!: number;

  constructor(
    private noteService: NoteService,
    private eleveService: EleveService,
    private mceService: MatiereClasseEnseignantService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    const classeId = this.route.snapshot.params['classeId'];

    if (this.isEditMode) {
      this.noteService.getById(this.id).subscribe(note => {
        this.note = note;

        const classeIdFromEleve = note.eleve?.classe?.id || note.eleve?.classe_id;

        if (classeIdFromEleve) {
          this.eleveService.getByClasseId(classeIdFromEleve).subscribe(data => this.eleves = data);
          this.mceService.getByClasse(classeIdFromEleve).subscribe(data => this.mces = data);
        }
      });
    } else if (classeId) {
      this.eleveService.getByClasseId(+classeId).subscribe(data => this.eleves = data);
      this.mceService.getByClasse(+classeId).subscribe(data => this.mces = data);
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.noteService.update(this.id, this.note).subscribe(() => {
        this.toastr.success('Note mise à jour');
        this.router.navigate(['/admin/notes']);
      });
    } else {
      this.noteService.create(this.note).subscribe(() => {
        this.toastr.success('Note ajoutée');
        this.router.navigate(['/admin/notes']);
      });
    }
  }
}
