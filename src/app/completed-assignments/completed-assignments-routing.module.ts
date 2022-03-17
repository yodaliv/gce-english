import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompletedAssignmentsPage } from './completed-assignments.page';

const routes: Routes = [
  {
    path: '',
    component: CompletedAssignmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompletedAssignmentsPageRoutingModule {}
