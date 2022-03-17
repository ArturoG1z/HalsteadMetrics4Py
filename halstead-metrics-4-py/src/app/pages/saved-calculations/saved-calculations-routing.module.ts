import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedCalculationsPage } from './saved-calculations.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCalculationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedCalculationsPageRoutingModule {}
