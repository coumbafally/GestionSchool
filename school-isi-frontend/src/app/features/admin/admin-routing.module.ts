import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { EleveListComponent } from './pages/student/pages/eleve-list/eleve-list.component';
import { ListeTuteurComponent } from './pages/tuteur/pages/liste-tuteur/liste-tuteur.component';
import { authGuard } from '../../core/guards/auth.guard';
import { EleveFormComponent } from './pages/student/pages/eleve-form/eleve-form.component';
import { EleveDetailsComponent } from './pages/student/pages/eleve-details/eleve-details.component';
import { EnseignantFormComponent } from './pages/teacher/pages/enseignant-form/enseignant-form.component';
import { MatiereFormComponent } from './pages/matiere/pages/matiere-form/matiere-form.component';
import { AffectationFormComponent } from './pages/affectation/pages/affectation-form/affectation-form.component';
import { TuteurFormComponent } from './pages/tuteur/pages/tuteur-form/tuteur-form.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },

  //éléves
  { path: 'eleve', component: EleveListComponent, canActivate: [authGuard] },
  { path: 'eleve/create', component: EleveFormComponent, canActivate: [authGuard] },
  { path: 'eleve/edit/:id', component: EleveFormComponent , canActivate: [authGuard]},
  { path: 'eleve/:id', component: EleveDetailsComponent, canActivate: [authGuard] },

  //tuteur
  { path: 'tuteurs', component: ListeTuteurComponent, canActivate: [authGuard] },
  { path: 'tuteurs/create', component: TuteurFormComponent, canActivate: [authGuard] },
  { path: 'tuteurs/edit/:id', component: TuteurFormComponent , canActivate: [authGuard]},
  //{ path: 'tuteurs/:id', component: TuteurDetailsComponent, canActivate: [authGuard] },
  
  //Enseignant
  { path: 'enseignants', component: EnseignantFormComponent, canActivate: [authGuard] },
  { path: 'enseignants/create', component: EnseignantFormComponent, canActivate: [authGuard] },
  { path: 'enseignants/edit/:id', component: EnseignantFormComponent, canActivate: [authGuard] },
  { path: 'enseignants/list', component: EnseignantFormComponent, canActivate: [authGuard] },
    
  //matiere
  { path: 'matieres', component: MatiereFormComponent, canActivate: [authGuard] },
  { path: 'matieres/create', component: MatiereFormComponent, canActivate: [authGuard] },
  { path: 'matieres/edit/:id', component: MatiereFormComponent, canActivate: [authGuard] }, 

  //affectation
  { path: 'affectations', component: AffectationFormComponent, canActivate: [authGuard] },
  { path: 'affectations/create', component: AffectationFormComponent, canActivate: [authGuard] },
  { path: 'affectations/edit/:id', component: AffectationFormComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


