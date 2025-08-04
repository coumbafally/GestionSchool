import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuteurRoutingModule } from './tuteur-routing.module';
import { HomeTuteurComponent } from './pages/home-tuteur/home-tuteur.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TuteurRoutingModule,
    HomeTuteurComponent
  ]
})
export class TuteurModule { }
