import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  // On récupère le rôle attendu, défini dans le fichier de routes
  const expectedRole = route.data['role'];

  // On récupère le rôle réel de l'utilisateur
  const currentRole = authService.getUserRole(); // Assurez-vous que cette méthode existe dans votre AuthService !

  // On compare
  if (currentRole === expectedRole) {
    // C'est bon, on autorise.
    return true;
  }

  // Sinon, accès refusé.
  console.error(`Accès refusé par roleGuard. Rôle attendu : "${expectedRole}", Rôle actuel : "${currentRole}".`);
  router.navigate(['/auth/login']); // On le renvoie au login
  return false;
};
