import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantFormComponent } from './pages/enseignant-form/enseignant-form.component';

const routes: Routes = [
   {
  path: 'enseignants/edit/:id',
  component: EnseignantFormComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
