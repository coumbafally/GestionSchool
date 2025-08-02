import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importer

import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; import { ClasseService} from '../../services/classe.service';
import { Classe } from '../../../../core/models/classe.model';
//import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-classe',
    standalone: true, 
    imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classes: Classe[] = [];
  classeForm: FormGroup;
  isEditing = false;
  currentClasseId?: number;
  errorMessage: string | null = null;

  constructor(private classeService: ClasseService, private fb: FormBuilder) {
    this.classeForm = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  ngOnInit(): void { this.loadClasses(); }

  loadClasses(): void {
  this.classeService.getClasses().subscribe({
    next: (data) => { 
      // On crée une nouvelle copie du tableau pour forcer Angular à voir le changement.
      this.classes = [...data]; // <== MODIFIEZ LA LIGNE POUR UTILISER L'OPÉRATEUR SPREAD "..."
    },
    error: (err) => { this.errorMessage = 'Erreur lors du chargement des classes.'; }
  });
}
  onSubmit(): void {
    if (this.classeForm.invalid) return;
    this.errorMessage = null;
     console.log('Soumission du formulaire.');
     console.log('Mode édition ?', this.isEditing);
     console.log('ID actuel ?', this.currentClasseId);
    const action$ = this.isEditing
      ? this.classeService.updateClasse(this.currentClasseId!, this.classeForm.value)
      : this.classeService.createClasse(this.classeForm.value);
    action$.subscribe({
      next: () => { this.resetForm(); this.loadClasses(); },
      error: (err) => { this.errorMessage = err.error?.message || 'Erreur lors de la soumission.'; }
    });
  }

  editClasse(classe: Classe): void {
     console.log('Modification de la classe :', classe); 
    this.isEditing = true;
    this.currentClasseId = classe.id;
    this.classeForm.patchValue(classe);
  }

  deleteClasse(id?: number): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr ?')) {
      this.classeService.deleteClasse(id).subscribe({
        next: () => this.loadClasses(),
        error: (err) => { alert(err.error?.message || 'Erreur de suppression.'); }
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentClasseId = undefined;
    this.classeForm.reset();
    this.errorMessage = null;
  }
}