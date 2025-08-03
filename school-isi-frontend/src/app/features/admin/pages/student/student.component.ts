import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EleveService } from '../../services/eleve.service';
import { Eleve } from '../../../../core/models/eleve.model';
import { Classe } from '../../../../core/models/classe.model';
import { ClasseService } from '../../services/classe.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  eleves: Eleve[] = [];
  classes: Classe[] = [];
  eleveForm: FormGroup;
  selectedFile: File | null = null;
  isEditing = false;
  currentEleveId?: number;
  errorMessage: string | null = null;

  constructor(
    private eleveService: EleveService,
    private classeService: ClasseService,
    private fb: FormBuilder
  ) {
    this.eleveForm = this.fb.group({
      // Champs de l'utilisateur
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // Champs de l'élève
      classe_id: ['', Validators.required],
      date_naissance: ['', Validators.required],
      lieu_naissance: ['', Validators.required],
      adresse: ['', Validators.required],
      justificatif: [null] // Pour le fichier
    });
  }

  ngOnInit(): void {
    this.loadEleves();
    this.loadClasses();
  }

  loadEleves(): void {
    this.eleveService.getEleves().subscribe(data => this.eleves = data);
  }

  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => this.classes = data);
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
  if (this.eleveForm.invalid) {
    return;
  }
  this.errorMessage = null;

  const formData = new FormData();
  Object.keys(this.eleveForm.value).forEach(key => {
    if (key !== 'justificatif') {
      formData.append(key, this.eleveForm.value[key]);
    }
  });

  if (this.selectedFile) {
    formData.append('justificatif', this.selectedFile, this.selectedFile.name);
  }

  // On sépare la logique pour gérer la réponse différemment
  if (this.isEditing && this.currentEleveId) {
    // --- CAS DE LA MISE À JOUR ---
    this.eleveService.updateEleve(this.currentEleveId, formData).subscribe({
      next: (updatedEleve) => {
        // L'API nous renvoie l'élève mis à jour.
        // On cherche son ancienne version dans notre tableau 'eleves'.
        const index = this.eleves.findIndex(eleve => eleve.id === this.currentEleveId);
        
        // Si on l'a trouvé, on le remplace par la nouvelle version.
        if (index !== -1) {
          this.eleves[index] = updatedEleve;
        }
        
        this.resetForm();
      },
      error: (err) => { 
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour.';
        console.error(err);
      }
    });
  } else {
    // --- CAS DE LA CRÉATION ---
    this.eleveService.createEleve(formData).subscribe({
      next: (newEleve) => {
        // L'API nous renvoie le nouvel élève.
        // On l'ajoute au début de notre tableau 'eleves'.
        this.eleves.unshift(newEleve);
        
        this.resetForm();
      },
      error: (err) => { 
        this.errorMessage = 'Une erreur est survenue lors de la création.';
        console.error(err);
      }
    });
  }
}

  editEleve(eleve: Eleve): void {
    this.isEditing = true;
    this.currentEleveId = eleve.id;
    console.log('Mode édition activé :', this.isEditing);
  console.log('ID de l\'élève à modifier :', this.currentEleveId);
    this.eleveForm.patchValue({
      nom: eleve.user?.nom,
      prenom: eleve.user?.prenom,
      email: eleve.user?.email,
      classe_id: eleve.classe?.id,
      date_naissance: eleve.date_naissance,
      lieu_naissance: eleve.lieu_naissance,
      adresse: eleve.adresse
    });
    // On ne peut pas pré-remplir un champ de fichier, on le laisse vide
  }

  deleteEleve(id?: number): void {
    if (!id) return;
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      this.eleveService.deleteEleve(id).subscribe(() => this.loadEleves());
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentEleveId = undefined;
    this.selectedFile = null;
    this.eleveForm.reset();
    (document.getElementById('justificatif-input') as HTMLInputElement).value = '';
  }
}