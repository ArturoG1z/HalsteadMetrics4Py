import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTokensInfoPage } from './modal-tokens-info.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTokensInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTokensInfoPageRoutingModule {}
