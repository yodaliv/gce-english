import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentResolver } from '../core/resolvers/assignment.resolver';
import { ExamPlayPage } from './exam-play.page';


const routes: Routes = [
  {
    path: ':examId/:id',
    component: ExamPlayPage,
    resolve: {assignment: AssignmentResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamPlayPageRoutingModule {}
