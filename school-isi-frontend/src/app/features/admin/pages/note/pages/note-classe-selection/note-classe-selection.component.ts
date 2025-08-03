import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../../../../services/classe.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-classe-selection',
  standalone: true,
  templateUrl: './note-classe-selection.component.html',
  imports: [CommonModule],
})
export class NoteClasseSelectionComponent implements OnInit {
  classes: any[] = [];

  constructor(private classeService: ClasseService, private router: Router) {}

  ngOnInit(): void {
    this.classeService.getAll().subscribe(data => this.classes = data);
  }

  goToNoteForm(classeId: number) {
    this.router.navigate(['/admin/notes/create', { classeId }]);
  }
}
