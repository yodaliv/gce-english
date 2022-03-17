import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamAssignedPipe } from './exam-assigned.pipe';
import { AnswerOptionStatsPipe } from './answer-option-stats.pipe';
import { IsQuestionAllAnsweredPipe } from './is-question-all-answered.pipe';
import { AnswerIconPipe } from './answer-icon.pipe';
import { PercentagePipe } from './percentage.pipe';
import { StudentLevelPipe } from './student-level.pipe';
import { EmailHashPipe } from './email-hash.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { ScoreLabelPipe } from './score-label.pipe';

@NgModule({
  declarations: [
    ExamAssignedPipe,
    AnswerOptionStatsPipe,
    IsQuestionAllAnsweredPipe,
    AnswerIconPipe,
    PercentagePipe,
    StudentLevelPipe,
    EmailHashPipe,
    TimeAgoPipe,
    ScoreLabelPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ExamAssignedPipe,
    AnswerOptionStatsPipe,
    IsQuestionAllAnsweredPipe,
    AnswerIconPipe,
    PercentagePipe,
    StudentLevelPipe,
    EmailHashPipe,
    TimeAgoPipe,
    ScoreLabelPipe
  ]
})
export class PipesModule { }
