import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TuteurService } from '../../../../services/tuteur.service';
import { EleveService } from '../../../../services/eleve.service';
import { UserService } from '../../../../services/user.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tuteur-form',
  templateUrl: './tuteur-form.component.html',
  styleUrl: './tuteur-form.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TuteurFormComponent implements OnInit {
  tuteur: any = {
    user_id: null,
    eleve_id: null,
    numero_tel: '',
    identifiant_tuteur: ''
  };

  eleves: any[] = [];
  newUser = {
    nom: '',
    prenom: '',
    email: '',
    password: 'Passer@1',
    password_confirmation: 'Passer@1',
    role: 'tuteur'
  };

  isEditMode = false;
  id!: number;
  validationErrors: any = null;
  registeredTuteurInfo: { nom: string; prenom: string } | null = null;

  constructor(
    private tuteurService: TuteurService,
    private eleveService: EleveService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.loadEleves().then(() => {
        this.tuteurService.getById(this.id).subscribe(t => {
          this.tuteur = t;
        });
      });
    } else {
      this.loadEleves();
    }
  }


  loadEleves(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.eleveService.getAll().subscribe({
        next: data => {
          this.eleves = data;
          resolve();
        },
        error: err => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  onRegister() {
    this.userService.register(this.newUser).subscribe({
      next: (response: any) => {
        this.tuteur.user_id = response.user.id;
        this.registeredTuteurInfo = {
          nom: response.user.nom,
          prenom: response.user.prenom
        };
        this.toastr.success('Utilisateur tuteur créé');
      },
      error: error => {
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
          if (this.validationErrors?.email?.[0]) {
            this.toastr.error('Cet email est déjà utilisé');
          } else {
            this.toastr.error('Erreur de validation');
          }
        } else {
          this.toastr.error('Erreur serveur');
        }
      }
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.tuteurService.update(this.id, this.tuteur).subscribe({
        next: () => {
          this.toastr.success('Tuteur mis à jour');
          this.router.navigate(['/admin/tuteurs']);
        },
        error: () => this.toastr.error('Erreur lors de la mise à jour')
      });
    } else {
      this.tuteurService.create(this.tuteur).subscribe({
        next: () => {
          this.toastr.success('Tuteur enregistré');
          this.router.navigate(['/admin/tuteurs']);
        },
        error: () => this.toastr.error('Erreur lors de la création')
      });
    }
  }
}