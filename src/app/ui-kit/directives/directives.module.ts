import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IfRoleDirective } from './if-role.directive';

@NgModule({
  declarations: [
    IfRoleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IfRoleDirective
  ]
})
export class DirectivesModule { }
