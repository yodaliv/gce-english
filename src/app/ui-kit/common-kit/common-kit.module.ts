import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { InputModule } from '../input/input.module';
import { PipesModule } from '../pipes/pipes.module';

import { AvatarComponent } from './avatar/avatar.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { EmptyDescriptionComponent } from './empty-description/empty-description.component';
import { ExamStatsComponent } from './exam-stats/exam-stats.component';
import { HeaderComponent } from './header/header.component';
import { ProfilePopoverComponent } from './profile-popover/profile-popover.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';

@NgModule({
  declarations: [
    HeaderComponent,
    EmptyDescriptionComponent,
    SuccessModalComponent,
    ProfilePopoverComponent,
    DoughnutChartComponent,
    ExamStatsComponent,
    AvatarComponent,
    EmptyScreenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    IonicModule,
    InputModule,
    PipesModule,
  ],
  exports: [
    HeaderComponent,
    EmptyDescriptionComponent,
    SuccessModalComponent,
    ProfilePopoverComponent,
    DoughnutChartComponent,
    ExamStatsComponent,
    AvatarComponent,
    EmptyScreenComponent
  ]
})
export class CommonKitModule {
}
