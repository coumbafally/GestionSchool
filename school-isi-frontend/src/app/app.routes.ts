import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'auth',
    // Charge paresseusement le fichier de routes d'authentification
    loadChildren: () => import('./features/auth/auth-routing.module').then(r => r.AUTH_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**', // Pour toute autre URL non trouvée
    redirectTo: 'auth/login'
  }
];
