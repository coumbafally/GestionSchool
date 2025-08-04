
import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TuteurService } from '../../../../features/admin/services/tuteur.service';
import {Tuteur} from '../../../../core/models/tuteur.model';

@Component({
  selector: 'app-home-tuteur',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './home-tuteur.component.html',
  styleUrls: ['./home-tuteur.component.css']
})
export class HomeTuteurComponent {

    tuteur: Tuteur[] = [];
    niveau = '';
    classeNom?: '';
    documents: any[] = [];
  
  
    constructor(
      private tuteurService: TuteurService,
      private router: Router
    ) {}

  allerAuxBulletins() {
    this.router.navigate(['/admin/bulletins/tuteur', this.tuteur[0]?.id]);
  }
              
}
