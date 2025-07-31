import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EnseignantService } from '../../../../services/enseignant.service';
import { Enseignant } from '../../../../../../core/models/enseignant.model';

@Component({
  selector: 'app-enseignant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.css']
})
export class EnseignantFormComponent implements OnInit {
  enseignant: Enseignant = {
    user_id: 0,
    matricule: '',
    user: {
      nom: '',
      prenom: '',
      email: ''
    }
  };

  newUser = {
    nom: '',
    prenom: '',
    email: '',
    password: 'Passer@1',
    password_confirmation: 'Passer@1',
    role: 'enseignant'
  };

  enseignants: any[] = [];
  isEditMode = false;
  id!: number;
  validationErrors: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enseignantService: EnseignantService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    this.loadEnseignants();

    if (this.isEditMode) {
      this.enseignantService.getById(this.id).subscribe(data => {
        this.enseignant = data;
      });
    }

    // Sécurité : on s'assure que user existe
    if (!this.enseignant.user) {
      this.enseignant.user = { nom: '', prenom: '', email: '' };
    }
  }

  loadEnseignants(): void {
    this.enseignantService.getAll().subscribe({
      next: (data) => this.enseignants = data,
      error: (err) => console.error("Erreur chargement enseignants", err)
    });
  }

  onRegister(): void {
    this.enseignantService.registerUser(this.newUser).subscribe({
      next: (userRes) => {
        this.enseignant.user_id = userRes.user.id;
        this.enseignant.user = {
          nom: userRes.user.nom,
          prenom: userRes.user.prenom,
          email: userRes.user.email
        };
        alert('Utilisateur créé avec succès !');
        this.newUser = {
          nom: '', prenom: '', email: '',
          password: 'Passer@1', password_confirmation: 'Passer@1', role: 'enseignant'
        };
        this.onSubmit(); // Crée automatiquement l'enseignant après création user
      },
      error: (err) => {
        if (err.status === 422 || err.status === 400) {
          this.validationErrors = err.error;
        }
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('user_id', this.enseignant.user_id.toString());
    formData.append('matricule', this.enseignant.matricule);

    if (this.enseignant.user) {
      formData.append('nom', this.enseignant.user.nom);
      formData.append('prenom', this.enseignant.user.prenom);
      formData.append('email', this.enseignant.user.email);
    }

    if (this.isEditMode) {
      this.enseignantService.update(this.id, formData).subscribe(() => {
        alert('Enseignant mis à jour');
        this.router.navigate(['/admin/enseignants']);
      });
    } else {
      this.enseignantService.create(formData).subscribe(() => {
        alert('Enseignant ajouté');
        this.resetForm();
        this.loadEnseignants();
      });
    }
  }

  resetForm(): void {
    this.enseignant = {
      user_id: 0,
      matricule: '',
      user: { nom: '', prenom: '', email: '' }
    };
    this.validationErrors = null;
  }

  editEnseignant(id: number) {
    this.router.navigate(['/admin/enseignants/edit', id]);
  }

  deleteEnseignant(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cet enseignant ?")) {
      this.enseignantService.delete(id).subscribe(() => {
        alert("Enseignant supprimé avec succès");
        this.loadEnseignants();
      });
    }
  }
}
