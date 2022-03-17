import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamInfiniquizPage } from './exam-infiniquiz.page';

const routes: Routes = [
  {
    path: '',
    component: ExamInfiniquizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamInfiniquizPageRoutingModule {}
