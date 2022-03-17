import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';
import { QuestionModule } from '../ui-kit/question/question.module';
import { ExamPlayPageRoutingModule } from './exam-play-routing.module';
import { ExamPlayPage } from './exam-play.page';
import { ScoreModalPage } from './score-modal/score-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExamPlayPageRoutingModule,
    CommonKitModule,
    QuestionModule,
    PipesModule
  ],
  declarations: [ExamPlayPage, ScoreModalPage]
})
export class ExamPlayPageModule {}
