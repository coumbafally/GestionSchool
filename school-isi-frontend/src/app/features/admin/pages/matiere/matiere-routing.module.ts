
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatiereFormComponent } from '../matiere/pages/matiere-form/matiere-form.component'; 


const routes: Routes = [
  
  { path: 'create', component: MatiereFormComponent },      
  { path: 'edit/:id', component: MatiereFormComponent }    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatiereRoutingModule {}
