
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.scss']
})
export class ConnexionComponent {
  formConnexion: FormGroup;
  erreur: string = '';

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) {
    this.formConnexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', Validators.required]
    });
  }

  seConnecter() {
    if (this.formConnexion.valid) {
      const identifiants = this.formConnexion.value;
      interface Identifiants {
        email: string;
        mot_de_passe: string;
      }

      interface LoginResponse {
        token: string;
      }

      this.AuthService.seConnecter(identifiants as Identifiants).subscribe({
        next: (res: LoginResponse) => {
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error: (err: unknown) => {
          this.erreur = 'Email ou mot de passe incorrect';
        }
      });
    }
  }
}

