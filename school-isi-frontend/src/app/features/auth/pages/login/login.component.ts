
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
    CommonModule,         // Pour *ngIf, *ngFor, etc.
    ReactiveFormsModule   // Pour [formGroup], formControlName, etc.
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  } 

<<<<<<< HEAD
  onSubmit(): void {
    if (this.loginForm.invalid) { return; }
    this.errorMessage = null;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('Connexion réussie', response);
        this.router.navigate(['/admin']);
          this.loginForm.reset();
      },
      error: (err: any) => {
        console.error('Erreur de connexion', err);
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  } 
=======
 onSubmit(): void {
  if (this.loginForm.invalid) return;

  this.errorMessage = null;

  this.authService.login(this.loginForm.value).subscribe({
    next: (response: any) => {
      console.log('Connexion réussie', response);
      const role = response.user.role;

      localStorage.setItem('token', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirection selon le rôle
      switch (role) {
        case 'admin':
          this.router.navigate(['/admin/dashboard']);
          break;
        case 'enseignant':
          this.router.navigate(['/teacher']); 
          break;
        case 'tuteur':
          this.router.navigate(['/tuteur']);
          break;
        case 'eleve':
          this.router.navigate(['/student']);
          break;
        default:
          this.errorMessage = 'Rôle non reconnu.';
      }

      this.loginForm.reset();
    },
    error: (err: any) => {
      console.error('Erreur de connexion', err);
      this.errorMessage = 'Email ou mot de passe incorrect.';
    }
  });
}
>>>>>>> origin/magou

  
}
