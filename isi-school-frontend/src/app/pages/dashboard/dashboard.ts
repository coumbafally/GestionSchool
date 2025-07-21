import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  userEmail: string | null = null;

  constructor(private authService: AuthService) {
    this.userEmail = this.authService['getUserEmail']();
  }

  seDeconnecter() {
    this.authService['deconnexion']().subscribe({
      next: () => {
        this.userEmail = null;
      },
      error: (err: any) => {
        console.error('Erreur lors de la déconnexion:', err);
      }
    });
  }
}