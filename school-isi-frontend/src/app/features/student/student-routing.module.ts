import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { roleGuard } from '../../core/guards/role.guard';
import { HomeEleveComponent } from './pages/home-eleve/home-eleve.component';
import { MesBulletinsComponent } from './pages/mes-bulletins/mes-bulletins.component';

const routes: Routes = [
  
    { path: 'bulletins/eleve', component: MesBulletinsComponent, canActivate: [authGuard] },
    { path: 'home-eleve', component: HomeEleveComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'home-eleve', pathMatch: 'full' },

    { path: '**', redirectTo: 'home-eleve' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
