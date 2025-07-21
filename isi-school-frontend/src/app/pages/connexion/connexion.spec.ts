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
  erreur: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.formConnexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mot_de_passe: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  seConnecter() {
    if (this.formConnexion.valid) {
      const { email, mot_de_passe } = this.formConnexion.value;
      this.authService['connexion'](email, mot_de_passe).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err: { message: string | null; }) => this.erreur = err.message
      });
    }
  }
}
