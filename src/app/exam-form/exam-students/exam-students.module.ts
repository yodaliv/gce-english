import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../../ui-kit/common-kit/common-kit.module';
import { InputModule } from '../../ui-kit/input/input.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { StudentModule } from '../../ui-kit/student/student.module';
import { ExamStudentsListModule } from '../exam-students-list/exam-students-list.module';

import { ExamStudentsPageRoutingModule } from './exam-students-routing.module';

import { ExamStudentsPage } from './exam-students.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExamStudentsPageRoutingModule,
    CommonKitModule,
    StudentModule,
    InputModule,
    PipesModule,
    ExamStudentsListModule
  ],
  declarations: [
    ExamStudentsPage,
  ]
})
export class ExamStudentsPageModule {}
