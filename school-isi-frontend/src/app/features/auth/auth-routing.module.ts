import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login', // quand l'url est .../auth/login
    component: LoginComponent
  },
  {
    path: '', // quand l'url est juste .../auth
    redirectTo: 'login',
    pathMatch: 'full'
  }
  ];