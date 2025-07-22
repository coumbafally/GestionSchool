import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

   const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si OUI, la navigation peut continuer.
    return true;
  } else {
    // Si NON, on bloque la navigation.
    console.warn("Accès refusé par AuthGuard : utilisateur non authentifié.");
    // Et on redirige l'utilisateur vers la page de connexion.
    router.navigate(['/auth/login']);
    return false;
  }
};
