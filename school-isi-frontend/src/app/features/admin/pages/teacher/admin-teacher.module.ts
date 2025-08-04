import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './admin-teacher-routing.module';

import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    RouterModule,
    
  ]
})
export class TeacherModule { }
