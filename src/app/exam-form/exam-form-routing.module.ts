import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamResolver } from '../core/resolvers/exam.resolver';

import { ExamFormPage } from './exam-form.page';
import { ExamCreatePage } from './exam-create/exam-create.component';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { TabQuestionsComponent } from './tab-questions/tab-questions.component';
import { TabStatsComponent } from './tab-stats/tab-stats.component';
import { TabStudentsComponent } from './tab-students/tab-students.component';
import { ExamEditPage } from './exam-edit/exam-edit.page';
import { ExamDetailsResolver } from '../core/resolvers/exam-details.resolver';

const routes: Routes = [
  {
    path: 'create',
    component: ExamCreatePage
  },
  {
    path: ':id/edit',
    component: ExamEditPage,
    resolve: { exam: ExamDetailsResolver },
  },
  {
    path: ':id/questions',
    component: ExamQuestionsComponent,
    resolve: {exam: ExamResolver},
  }, {
    path: ':id/students',
    loadChildren: () => import('./exam-students/exam-students.module').then( m => m.ExamStudentsPageModule)
  },
  {
    path: ':id/search-database',
    loadChildren: () => import('../search-database/search-database.module').then( m => m.SearchDatabasePageModule)
  },
  {
    path: ':id',
    component: ExamFormPage,
    resolve: {exam: ExamResolver},
    children: [
      {
        path: 'tab-questions',
        component: TabQuestionsComponent
      },
      {
        path: 'tab-students',
        component: TabStudentsComponent
      },
      {
        path: 'tab-stats',
        component: TabStatsComponent
      },
      { path: '**', redirectTo: 'tab-questions' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExamFormPageRoutingModule {}
