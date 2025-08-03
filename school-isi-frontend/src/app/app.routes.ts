import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';



<<<<<<< HEAD
=======


>>>>>>> origin/magou
export const routes: Routes = [
  
  {
    path: 'auth',
    
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  
  },

  
  {
<<<<<<< HEAD
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: { role: 'admin' },
  // On utilise la syntaxe pour charger un NgModule
  loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
},
=======
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
>>>>>>> origin/magou

  
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { role: 'enseignant' },
    loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule)
  },

  
  {
    path: 'tuteur',
    canActivate: [authGuard, roleGuard],
    data: { role: 'tuteur' },
    loadChildren: () => import('./features/tuteur/tuteur.module').then(m => m.TuteurModule)
  },

<<<<<<< HEAD
 
=======

>>>>>>> origin/magou
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { role: 'eleve' },
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  
  
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
<<<<<<< HEAD


  {
    path: '**', // Pour toute autre URL non trouvée
=======
  {
    path: '**', 
>>>>>>> origin/magou
    redirectTo: 'auth/login'
  }
];