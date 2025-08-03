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
  loading = false;
  successMessage: string | null = null;

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
    this.loading = true;
    this.enseignantService.registerUser(this.newUser).subscribe({
      next: (userRes) => {
        this.enseignant.user_id = userRes.user.id;
        this.enseignant.user = {
          nom: userRes.user.nom,
          prenom: userRes.user.prenom,
          email: userRes.user.email
        };
        this.newUser = {
          nom: '', prenom: '', email: '',
          password: 'Passer@1', password_confirmation: 'Passer@1', role: 'enseignant'
        };
        this.onSubmit(); 
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 422 || err.status === 400) {
          this.validationErrors = err.error.errors || err.error;
        } else {
          alert("Erreur serveur lors de la création de l'utilisateur.");
        }
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('user_id', this.enseignant.user_id.toString());

    if (this.enseignant.user) {
      formData.append('nom', this.enseignant.user.nom);
      formData.append('prenom', this.enseignant.user.prenom);
      formData.append('email', this.enseignant.user.email);
    }

    if (this.isEditMode) {
      this.enseignantService.update(this.id, formData).subscribe(() => {
        this.successMessage = 'Enseignant mis à jour';
        this.router.navigate(['/admin/enseignants']);
        this.loading = false;
      });
    } else {
      this.enseignantService.create(formData).subscribe({
        next: () => {
          this.successMessage = 'Enseignant ajouté';
          this.resetForm();
          this.loadEnseignants();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 500) {
            alert("Erreur de création : " + (err.error?.error || 'Erreur interne du serveur'));
          } else if (err.status === 422 || err.status === 400) {
            this.validationErrors = err.error.errors || err.error;
          }
        }
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
