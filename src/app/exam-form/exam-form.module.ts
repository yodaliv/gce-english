import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { ExamModule } from '../ui-kit/exam/exam.module';
import { InputModule } from '../ui-kit/input/input.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { QuestionModule } from '../ui-kit/question/question.module';
import { StudentModule } from '../ui-kit/student/student.module';
import { ExamStudentsListModule } from './exam-students-list/exam-students-list.module';

import { ExamFormPageRoutingModule } from './exam-form-routing.module';

import { ExamCreatePage } from './exam-create/exam-create.component';
import { ExamFormPage } from './exam-form.page';
import { ExamInfoFormComponent } from './exam-info-form/exam-info-form.component';
import { ExamQuestionsComponent } from './exam-questions/exam-questions.component';
import { ExamStudentStatsPage } from './exam-student-stats/exam-student-stats.page';
import { ManageQuestionModalComponent } from './tab-questions/manage-question-modal/manage-question-modal.component';
import { TabQuestionsComponent } from './tab-questions/tab-questions.component';
import { TabStatsComponent } from './tab-stats/tab-stats.component';
import { TabStudentsComponent } from './tab-students/tab-students.component';
import { ExamPreviewComponent } from './exam-preview/exam-preview.component';
import { ExamEditPage } from './exam-edit/exam-edit.page';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatRadioModule,
    IonicModule,
    ExamFormPageRoutingModule,
    CommonKitModule,
    InputModule,
    ExamModule,
    QuestionModule,
    StudentModule,
    PipesModule,
    ExamStudentsListModule
  ],
  declarations: [
    ExamFormPage,
    ExamCreatePage,
    ExamEditPage,
    ExamInfoFormComponent,
    ExamQuestionsComponent,
    TabQuestionsComponent,
    ExamPreviewComponent,
    ManageQuestionModalComponent,
    TabStudentsComponent,
    TabStatsComponent,
    ExamStudentStatsPage,
  ]
})
export class ExamFormPageModule {}
