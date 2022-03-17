import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DirectivesModule } from '../ui-kit/directives/directives.module';

import { TeacherTabsComponent } from './teacher-tabs/teacher-tabs.component';
import { StudentTabsComponent } from './student-tabs/student-tabs.component';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [
    TeacherTabsComponent,
    StudentTabsComponent,
    TabsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    DirectivesModule
  ],
  exports: [
    TabsComponent
  ]
})
export class TabsModule { }
