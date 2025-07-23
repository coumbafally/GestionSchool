import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
   const authService = inject(AuthService);
  const router = inject(Router);

  // 1. On récupère le rôle REQUIS pour accéder à cette route.
  //    On le définira dans notre fichier de routage (app.routes.ts).
  const expectedRole = route.data['role'];

  // 2. On récupère le rôle ACTUEL de l'utilisateur connecté.
  const currentRole = authService.getUserRole();

  // Si on n'a pas défini de rôle attendu, on laisse passer (sécurité par défaut)
  if (!expectedRole) {
    return true;
  }

  // 3. On compare les deux.
  if (currentRole === expectedRole) {
    // Les rôles correspondent, la navigation est autorisée.
    return true;
  } else {
    // Les rôles ne correspondent pas.
    console.error(`Accès refusé par RoleGuard. Rôle attendu : "${expectedRole}", Rôle actuel : "${currentRole}".`);
    // On redirige l'utilisateur (par exemple vers sa propre page d'accueil ou au login).
    router.navigate(['/auth/login']);
    return false;
  }
};
