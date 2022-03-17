import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchDatabasePage } from './search-database.page';

const routes: Routes = [
  {
    path: '',
    component: SearchDatabasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchDatabasePageRoutingModule {}
