import { Component, OnInit } from '@angular/core';
import { EleveService} from '../../../../services/eleve.service';
import { Eleve } from '../../../../../../core/models/eleve.model';
import { ActivatedRoute} from '@angular/router';
import { ClasseService } from '../../../../services/classe.service';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eleve-form',
  standalone: true,
  templateUrl: './eleve-form.component.html',
  styleUrl: './eleve-form.component.css',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
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

  newUser = {
    nom: '',
    prenom: '',
    email: '',
    password: 'Passer@1',
    password_confirmation: 'Passer@1',
    role: 'eleve'
  };

registeredUserId: number | null = null;

  constructor(
    private eleveService: EleveService,
    private userService: UserService,
    private classeService: ClasseService,
    private route: ActivatedRoute,
    public router: Router 
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadClasses();

    this.id = this.route.snapshot.params['id'];
    this.isEditMode = !!this.id;

    if (this.isEditMode) {
  this.eleveService.getById(this.id).subscribe(data => {
    this.eleve = data;
    if (data.documents && data.documents.length > 0) {
      // On suppose que c’est un seul document de type justificatif
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
      next: data => {
        console.log("Users reçus :", data);
        this.users = data;
      },
      error: err => {
        console.error("Erreur lors du chargement des users :", err);
      }
    });
  }

  loadClasses(): void {
    this.classeService.getAll().subscribe({
      next: data => {
        console.log("Classes reçues :", data);
        this.classes = data;
      },
      error: err => {
        console.error("Erreur lors du chargement des classes :", err);
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
    // ⚠️ Met à jour l'élève
    this.eleveService.update(this.id, formData).subscribe(() => {
      alert("Élève mis à jour avec succès !");
      this.router.navigate(['/admin/eleve']);
    });
  } else {
    // ✅ Crée un nouvel élève
    this.eleveService.create(formData).subscribe(() => {
      alert("Élève ajouté avec succès !");
      this.router.navigate(['/admin/eleve']);
    });
  }
}


validationErrors: any = null;

  onRegister() {
    this.newUser.password = "Passer@1";
    this.newUser.password_confirmation = "Passer@1";
    this.newUser.role = "eleve";

    this.userService.register(this.newUser).subscribe({
      next: (response: any) => {
        const userId = response.user.id;
        this.eleve.user_id = userId;
        this.loadUsers();
        alert("Utilisateur inscrit avec succès !");
      },
    error: (error) => {
      if (error.status === 422) {
        this.validationErrors = error.error;
      }
    }
    });
  }
  




  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
