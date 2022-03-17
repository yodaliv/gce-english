import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonKitModule } from '../ui-kit/common-kit/common-kit.module';
import { InputModule } from '../ui-kit/input/input.module';
import { QuestionModule } from '../ui-kit/question/question.module';

import { SearchDatabasePageRoutingModule } from './search-database-routing.module';

import { SearchDatabasePage } from './search-database.page';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CategorySelectDialogComponent } from './category-select-dialog/category-select-dialog.component';
import { QuestionSamplingDialogComponent } from './question-sampling-dialog/question-sampling-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchDatabasePageRoutingModule,
    CommonKitModule,
    InputModule,
    QuestionModule
  ],
  declarations: [
    SearchDatabasePage,
    CategoryFilterComponent,
    SearchResultComponent,
    CategorySelectDialogComponent,
    QuestionSamplingDialogComponent
  ]
})
export class SearchDatabasePageModule {}
