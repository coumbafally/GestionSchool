import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../../../services/eleve.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClasseService } from '../../../../services/classe.service';
import { UserService } from '../../../../services/user.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eleve-form',
  standalone: true,
  templateUrl: './eleve-form.component.html',
  styleUrl: './eleve-form.component.css',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class EleveFormComponent implements OnInit {
  eleve: any = {
    nom: '',
    prenom: '',
    email: '',
    classe_id: 0,
    date_naissance: '',
    lieu_naissance: '',
    adresse: '',
    identifiant_eleve: ''
  };

  isEditMode = false;
  id!: number;
  users: any[] = [];
  classes: any[] = [];
  selectedFile!: File;
  documentUrl: string | null = null;
  validationErrors: any = null;
  registeredEleveInfo: { nom: string; prenom: string } | null = null;

  newUser = {
    nom: '',
    prenom: '',
    email: '',
    password: 'Passer@1',
    password_confirmation: 'Passer@1',
    role: 'eleve'
  };

  constructor(
    private eleveService: EleveService,
    private userService: UserService,
    private classeService: ClasseService,
    private route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadClasses();
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
      this.eleveService.getById(this.id).subscribe(data => {
        this.eleve = data;
        if (data.documents?.length > 0) {
          const doc = data.documents.find((d: any) => d.type_document === 'Justificatif');
          if (doc) {
            this.documentUrl = 'http://localhost:8000/storage/' + doc.chemin_fichier;
          }
        }
      });
    }
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: data => (this.users = data),
      error: err => console.error(err)
    });
  }

  loadClasses(): void {
    this.classeService.getAll().subscribe({
      next: data => (this.classes = data),
      error: err => console.error(err)
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onRegister() {
    this.newUser.password = 'Passer@1';
    this.newUser.password_confirmation = 'Passer@1';
    this.newUser.role = 'eleve';

    this.userService.register(this.newUser).subscribe({
      next: (response: any) => {
        this.eleve.user_id = response.user.id;
        this.registeredEleveInfo = {
          nom: response.user.nom,
          prenom: response.user.prenom
        };
        this.loadUsers();
        this.toastr.success('Utilisateur inscrit avec succès !');
      },
      error: error => {
        if (error.status === 422) {
          this.validationErrors = error.error.errors;
          if (this.validationErrors?.email?.[0]) {
            this.toastr.error('Cet email est déjà utilisé.');
          } else {
            this.toastr.error('Erreur de validation du formulaire.');
          }
        } else {
          this.toastr.error('Erreur lors de l’inscription.');
        }
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();

    if (this.isEditMode && this.eleve.user) {
      formData.append('nom', this.eleve.user.nom);
      formData.append('prenom', this.eleve.user.prenom);
      formData.append('email', this.eleve.user.email);
    }

    formData.append('user_id', this.eleve.user_id.toString());
    formData.append('classe_id', this.eleve.classe_id.toString());
    formData.append('date_naissance', this.eleve.date_naissance);
    formData.append('lieu_naissance', this.eleve.lieu_naissance);
    formData.append('adresse', this.eleve.adresse);

    if (this.selectedFile) {
      formData.append('justificatif', this.selectedFile);
    }

    if (this.isEditMode) {
      this.eleveService.update(this.id, formData).subscribe({
        next: () => {
          this.toastr.success('Élève mis à jour avec succès !');
          this.router.navigate(['/admin/eleve']);
        },
        error: () => {
          this.toastr.error('Erreur lors de la mise à jour.');
        }
      });
    } else {
      this.eleveService.create(formData).subscribe({
        next: () => {
          this.toastr.success('Élève ajouté avec succès !');
          this.router.navigate(['/admin/eleve']);
        },
        error: () => {
          this.toastr.error('Erreur lors de la création de l’élève.');
        }
      });
    }
  }
}
