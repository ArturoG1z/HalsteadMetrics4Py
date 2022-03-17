import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalShowcodePage } from './modal-showcode.page';

const routes: Routes = [
  {
    path: '',
    component: ModalShowcodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalShowcodePageRoutingModule {}
