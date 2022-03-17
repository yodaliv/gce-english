import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ExamCardComponent } from './exam-card/exam-card.component';

@NgModule({
  declarations: [
    ExamCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ExamCardComponent
  ]
})
export class ExamModule { }
