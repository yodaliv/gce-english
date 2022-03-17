import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonKitModule } from '../../ui-kit/common-kit/common-kit.module';
import { InputModule } from '../../ui-kit/input/input.module';
import { PipesModule } from '../../ui-kit/pipes/pipes.module';
import { StudentModule } from '../../ui-kit/student/student.module';
import { ExamStudentsListComponent } from './exam-students-list.component';



@NgModule({
  declarations: [
    ExamStudentsListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    InputModule,
    CommonKitModule,
    StudentModule,
    PipesModule
  ],
  exports: [
    ExamStudentsListComponent
  ]
})
export class ExamStudentsListModule { }
