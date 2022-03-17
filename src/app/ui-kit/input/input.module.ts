import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TextInputComponent } from './text-input/text-input.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { AnswerInputComponent } from './answer-input/answer-input.component';
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [
    TextInputComponent,
    CheckboxComponent,
    TextareaComponent,
    AnswerInputComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent,
    CheckboxComponent,
    TextareaComponent,
    AnswerInputComponent,
    SearchInputComponent
  ]
})
export class InputModule {
}
