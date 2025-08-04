import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HomeEleveComponent } from './features/student/pages/home-eleve/home-eleve.component';
import { MesBulletinsComponent } from './features/student/pages/mes-bulletins/mes-bulletins.component';





export const routes: Routes = [
  
  {
    path: 'auth',
    
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  
  },

  
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },

  
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


  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { role: 'eleve' },
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },

  { path: 'bulletins/eleve', component: MesBulletinsComponent, canActivate: [authGuard] },
{ path: 'home-eleve', component: HomeEleveComponent, canActivate: [authGuard] },
{ path: '', redirectTo: 'home-eleve', pathMatch: 'full' },

  
  
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**', 
    redirectTo: 'auth/login'
  }
];