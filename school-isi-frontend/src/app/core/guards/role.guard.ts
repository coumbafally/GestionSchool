import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  // On récupère le rôle attendu, défini dans le fichier de routes
  const expectedRole = route.data['role'];

  // On récupère le rôle réel de l'utilisateur
  const currentRole = authService.getUserRole();

  // On compare
  if (currentRole === expectedRole) {
    return true;
  }

  // Sinon, accès refusé.
  console.error(`Accès refusé par roleGuard. Rôle attendu : "${expectedRole}", Rôle actuel : "${currentRole}".`);
  router.navigate(['/auth/login']);
  return false;
};
