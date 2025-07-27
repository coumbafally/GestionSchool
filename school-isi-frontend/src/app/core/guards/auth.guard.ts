import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si le service dit que l'utilisateur est authentifié...
  if (authService.isAuthenticated()) {
    // ... on autorise la navigation.
    return true;
  }

  // Sinon, on le redirige vers la page de connexion...
  console.warn("Accès refusé par authGuard : Utilisateur non authentifié.");
  router.navigate(['/auth/login']);
  // ... et on bloque la navigation.
  return false;
};
