import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { DirectivesModule } from '../ui-kit/directives/directives.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { QuestionModule } from '../ui-kit/question/question.module';
import { ExamInfiniquizPageRoutingModule } from './exam-infiniquiz-routing.module';

import { ExamInfiniquizPage } from './exam-infiniquiz.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamInfiniquizPageRoutingModule,
    CommonKitModule,
    QuestionModule,
    DirectivesModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [ExamInfiniquizPage]
})
export class ExamInfiniquizPageModule {}
