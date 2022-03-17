import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { InputModule } from '../ui-kit/input/input.module';
import { StudentModule } from '../ui-kit/student/student.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';

import { StudentsPageRoutingModule } from './students-routing.module';

import { StudentsPage } from './students.page';
import { InviteModalComponent } from './invite-modal/invite-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StudentsPageRoutingModule,
    CommonKitModule,
    InputModule,
    StudentModule,
    PipesModule
  ],
  declarations: [
    StudentsPage,
    InviteModalComponent
  ]
})
export class StudentsPageModule {}
