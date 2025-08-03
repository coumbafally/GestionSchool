import { Component , OnInit} from '@angular/core';
import { FormBuilder,  Validators } from '@angular/forms';
import { TuteurService } from '../../../../services/tuteur.service';
import { EleveService } from '../../../../services/eleve.service';
import { Eleve } from '../../../../../../core/models/eleve.model';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModule } from "../../../../admin.module";
import { RouterModule } from '@angular/router'; 
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ajouter-tuteur',
  standalone: true,
  templateUrl: './ajouter-tuteur.component.html',
  styleUrl: './ajouter-tuteur.component.css',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ]
})

export class AjouterTuteurComponent implements OnInit {
  formTuteur!: FormGroup;
  eleves: Eleve[] = [];

  constructor(
    private fb: FormBuilder,
    private tuteurService: TuteurService,
    private eleveService: EleveService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEleves();
  }

  initForm(): void {
    this.formTuteur = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numero_tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['Passer@1'], 
      eleve_id: ['', Validators.required]
    });
  }

  loadEleves(): void {
    this.eleveService.getAll().subscribe({
      next: (data) => this.eleves = data,
      error: (err) => console.error('Erreur chargement élèves', err)
    });
  }

  onSubmit(): void {
    if (this.formTuteur.valid) {
      this.tuteurService.createTuteur(this.formTuteur.value).subscribe({
        next: () => alert('Tuteur ajouté avec succès'),
        error: () => alert('Erreur lors de l\'ajout')
      });
    }
  }
}
