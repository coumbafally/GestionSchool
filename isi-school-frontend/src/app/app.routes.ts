import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
      {
     path: 'auth',
    // Charge de manière paresseuse le AuthModule et toutes ses routes.
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  

  {
        path: 'admin',
        canActivate: [authGuard, roleGuard],
        data: { role: 'admin' },
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
    },

    // --- AJOUT : ROUTE PROTÉGÉE POUR L'ENSEIGNANT ---
    {
        path: 'teacher',
        canActivate: [authGuard, roleGuard],
        data: { role: 'enseignant' },
        loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule)
    },

    // --- AJOUT : ROUTE PROTÉGÉE POUR L'ÉLÈVE ---
    {
        path: 'student',
        canActivate: [authGuard, roleGuard],
        data: { role: 'eleve' },
        loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
    },

    {
    // Si l'utilisateur arrive à la racine du site, on le redirige vers la page de connexion.
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },


  // Si l'utilisateur tape une URL qui n'existe pas, on le redirige aussi vers la connexion.
  { path: '**', 
    redirectTo: 'auth/login' }
];
