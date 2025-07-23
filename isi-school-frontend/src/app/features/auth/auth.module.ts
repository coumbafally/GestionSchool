// Fichier: client/src/app/features/auth/auth.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
// On n'a plus besoin de ReactiveFormsModule ici, car le composant l'importe lui-même

@NgModule({
  // La section declarations est maintenant vide, car LoginComponent est standalone
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    // On importe le composant standalone comme si c'était un module
    LoginComponent
  ]
})
export class AuthModule { }