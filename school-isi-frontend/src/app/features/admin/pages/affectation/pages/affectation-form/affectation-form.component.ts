import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatiereClasseEnseignantService } from '../../../../services/matiere-classe-enseignant.service';
import { EnseignantService } from '../../../../services/enseignant.service';
import { ClasseService } from '../../../../services/classe.service';
import { MatiereService } from '../../../../services/matiere.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-affectation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './affectation-form.component.html',
  styleUrls: ['./affectation-form.component.css']
})
export class AffectationFormComponent implements OnInit {
  affectations: any[] = [];
  enseignants: any[] = [];
  matieres: any[] = [];
  classes: any[] = [];

  form = {
    id: 0,
    classe_id: 0,
    matiere_id: 0,
    enseignant_id: 0
  };

  validationErrors: any = null;

  constructor(
    private affectationService: MatiereClasseEnseignantService,
    private enseignantService: EnseignantService,
    private matiereService: MatiereService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.affectationService.getAll().subscribe(res => this.affectations = res);
    this.enseignantService.getAll().subscribe(res => this.enseignants = res);
    this.classeService.getAll().subscribe(res => this.classes = res);
    this.matiereService.getAll().subscribe(res => this.matieres = res);
  }

  save() {
    this.validationErrors = null;
    if (this.form.id) {
      this.affectationService.update(this.form.id, this.form).subscribe({
        next: () => {
          alert('Mise à jour réussie');
          this.form = { id: 0, classe_id: 0, matiere_id: 0, enseignant_id: 0 };
          this.loadAll();
        },
        error: err => {
          if (err.status === 422) this.validationErrors = err.error;
          const message = 'Format Invalide';
          console.error(message, err);
          alert(message);
        }
      });
    } else {
      this.affectationService.create(this.form).subscribe({
        next: () => {
          alert('Affectation créée');
          this.form = { id: 0, classe_id: 0, matiere_id: 0, enseignant_id: 0 };
          this.loadAll();
        },
        error: err => {
          if (err.status === 422) this.validationErrors = err.error;
          const message = 'Tous les champs sont obligatoires';
          console.error(message, err);
          alert(message);
        }
      });
    }
  }

  edit(item: any) {
    this.form = { ...item };
  }

  delete(id: number) {
    if (confirm("Supprimer cette affectation ?")) {
      this.affectationService.delete(id).subscribe(() => {
        alert("Supprimé !");
        this.loadAll();
      });
    }
  }
}
