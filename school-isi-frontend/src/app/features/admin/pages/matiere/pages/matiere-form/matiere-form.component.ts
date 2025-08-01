import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatiereService } from '../../../../services/matiere.service';
import { Matiere } from '../../../../../../core/models/matiere';

@Component({
  selector: 'app-matiere-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './matiere-form.component.html',
  styleUrls: ['./matiere-form.component.css']
})
export class MatiereFormComponent implements OnInit {
  matiere: Matiere = { nom: '', coefficient: 1 };
  matieres: Matiere[] = [];
  isEditMode = false;
  id!: number;

  constructor(
    private matiereService: MatiereService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.loadMatieres();

    if (this.isEditMode) {
      this.matiereService.getById(this.id).subscribe(data => {
        this.matiere = data;
      });
    }
  }

  loadMatieres() {
    this.matiereService.getAll().subscribe(data => this.matieres = data);
  }

  onSubmit() {
    if (this.isEditMode) {
      this.matiereService.update(this.id, this.matiere).subscribe(() => {
        alert('Matière mise à jour');
        this.router.navigate(['/admin/matieres']);
      });
    } else {
      this.matiereService.create(this.matiere).subscribe(() => {
        alert('Matière ajoutée');
        this.matiere = { nom: '', coefficient: 1 }; // Réinitialiser
        this.loadMatieres();
      });
    }
  }

  editMatiere(id: number) {
    this.router.navigate(['/admin/matieres/edit', id]);
  }

  deleteMatiere(id: number) {
    if (confirm("Supprimer cette matière ?")) {
      this.matiereService.delete(id).subscribe(() => {
        alert("Supprimée avec succès");
        this.loadMatieres();
      });
    }
  }
}
