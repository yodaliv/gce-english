import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamStudentsPage } from './exam-students.page';

const routes: Routes = [
  {
    path: '',
    component: ExamStudentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamStudentsPageRoutingModule {}
