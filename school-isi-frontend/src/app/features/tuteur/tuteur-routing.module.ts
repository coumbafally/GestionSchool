import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { HomeTuteurComponent } from './pages/home-tuteur/home-tuteur.component';

const routes: Routes = [

  { path: 'home-tuteur', component: HomeTuteurComponent, canActivate: [authGuard] },
  { path: '', redirectTo: 'home-tuteur', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuteurRoutingModule { }
