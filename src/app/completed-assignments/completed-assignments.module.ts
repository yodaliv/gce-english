import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompletedAssignmentsPageRoutingModule } from './completed-assignments-routing.module';

import { CompletedAssignmentsPage } from './completed-assignments.page';
import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { ExamModule } from '../ui-kit/exam/exam.module';
import { DirectivesModule } from '../ui-kit/directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonKitModule,
    ExamModule,
    DirectivesModule,
    CompletedAssignmentsPageRoutingModule
  ],
  declarations: [CompletedAssignmentsPage]
})
export class CompletedAssignmentsPageModule {}
