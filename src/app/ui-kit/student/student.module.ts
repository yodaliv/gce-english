import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../common-kit/common-kit.module';

import { StudentAssignerComponent } from './student-assigner/student-assigner.component';

@NgModule({
  declarations: [
    StudentAssignerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    CommonKitModule,
  ],
  exports: [
    StudentAssignerComponent
  ]
})
export class StudentModule { }
