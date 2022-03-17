import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InputModule } from '../../ui-kit/input/input.module';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { AccountTypeModalComponent } from './account-type-modal/account-type-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LoginPageRoutingModule,
    InputModule
  ],
  declarations: [
    LoginPage,
    AccountTypeModalComponent
  ]
})
export class LoginPageModule {}
