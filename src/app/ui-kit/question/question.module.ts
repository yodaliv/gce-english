import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { IonicModule } from '@ionic/angular';

import { InputModule } from '../input/input.module';
import { PipesModule } from '../pipes/pipes.module';

import { QuestionFormService } from './question-form.service';

import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { SimpleQuestionFormComponent } from './simple-question-form/simple-question-form.component';
import { NestedQuestionFormComponent } from './nested-question-form/nested-question-form.component';
import { SubQuestionComponent } from './sub-question/sub-question.component';
import { QuestionPreviewComponent } from './question-preview/question-preview.component';

@NgModule({
  declarations: [
    QuestionDetailComponent,
    QuestionEditComponent,
    SimpleQuestionFormComponent,
    NestedQuestionFormComponent,
    SubQuestionComponent,
    QuestionPreviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatStepperModule,
    IonicModule,
    InputModule,
    PipesModule,
  ],
  exports: [
    QuestionDetailComponent,
    QuestionEditComponent,
    SubQuestionComponent,
    QuestionPreviewComponent
  ],
  providers: [
    QuestionFormService
  ]
})
export class QuestionModule { }
