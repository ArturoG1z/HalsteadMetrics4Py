import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTokensInfoPageRoutingModule } from './modal-tokens-info-routing.module';

import { ModalTokensInfoPage } from './modal-tokens-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTokensInfoPageRoutingModule
  ],
  declarations: [ModalTokensInfoPage]
})
export class ModalTokensInfoPageModule {}
