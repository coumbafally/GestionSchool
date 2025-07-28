import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe.service';
import { Classe } from '../../../../models/classe.model';

@Component({
  selector: 'app-class-management',
  //standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
   classes: Classe[] = [];
  classeForm: FormGroup;
  isEditing = false;
  currentClasseId: number | null = null;
  errorMessage: string | null = null;

  constructor(
    private classeService: ClasseService,
    private fb: FormBuilder
  ) {
    this.classeForm = this.fb.group({
      nom: ['', Validators.required],
      niveau: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    console.log("1. ngOnInit du ClassComponent est bien appelé !");
    this.loadClasses();
  }

  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  onSubmit(): void {
    if (this.classeForm.invalid) return;

    const formValue = this.classeForm.value;
    const request = this.isEditing
      ? this.classeService.updateClasse(this.currentClasseId!, formValue)
      : this.classeService.createClasse(formValue);

    request.subscribe({
      next: () => {
        this.resetForm();
        this.loadClasses();
      },
      error: (err) => {
        console.error('Erreur lors de la soumission du formulaire', err);
        // Gérer les erreurs de validation du backend
        if (err.status === 422) {
          this.errorMessage = "Les données sont invalides. Le nom de la classe existe peut-être déjà.";
        }
      }
    });
  }

  editClasse(classe: Classe): void {
    this.isEditing = true;
    this.currentClasseId = classe.id;
    this.classeForm.patchValue({
      nom: classe.nom,
      niveau: classe.niveau
    });
  }

  deleteClasse(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) {
      this.classeService.deleteClasse(id).subscribe({
        next: () => {
          this.loadClasses(); // Recharger la liste si la suppression réussit
        },
        error: (err) => {
          console.error('Erreur lors de la suppression', err);
          if (err.status === 409) { // 409 Conflict
            this.errorMessage = err.error.message; // Affiche le message de notre API
          } else {
            this.errorMessage = 'Une erreur est survenue lors de la suppression.';
          }
        }
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentClasseId = null;
    this.classeForm.reset();
    this.errorMessage = null;
  }
}