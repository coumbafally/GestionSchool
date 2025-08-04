import { Component, NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EleveService } from '../../../../features/admin/services/eleve.service';
import {Eleve} from '../../../../core/models/eleve.model';

@Component({
  selector: 'app-home-eleve',
  standalone: true,
  imports: [
  ],
  templateUrl: './home-eleve.component.html',
  styleUrls: ['./home-eleve.component.css']
})
export class HomeEleveComponent {

    eleve: Eleve[] = [];
    niveau = '';
    classeNom?: '';
    documents: any[] = [];
  
  
    constructor(
      private eleveService: EleveService,
      private router: Router
    ) {}

    allerAuxBulletins() {
  this.router.navigate(['/bulletins/eleve']);
}


              
}