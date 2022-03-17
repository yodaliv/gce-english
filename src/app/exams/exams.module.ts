import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { ExamModule } from '../ui-kit/exam/exam.module';
import { DirectivesModule } from '../ui-kit/directives/directives.module';

import { ExamsPageRoutingModule } from './exams-routing.module';

import { ExamsPage } from './exams.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamsPageRoutingModule,
    CommonKitModule,
    ExamModule,
    DirectivesModule
  ],
  declarations: [ExamsPage]
})
export class ExamsPageModule {}
