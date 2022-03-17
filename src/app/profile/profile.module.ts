import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { DirectivesModule } from '../ui-kit/directives/directives.module';
import { PipesModule } from '../ui-kit/pipes/pipes.module';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonKitModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    DirectivesModule,
    PipesModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
