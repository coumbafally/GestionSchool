import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component'; // Importer le composant
import { ReactiveFormsModule } from '@angular/forms'; // Importer le module de formulaires

@NgModule({
  declarations: [
    LoginComponent /
  ],
  imports: [
    CommonModule,
  
    ReactiveFormsModule // Le module est importé ici
  ]
})
export class AuthModule { }