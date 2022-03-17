import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalTokensInfoPageRoutingModule } from './modal-tokens-info-routing.module';

import { ModalTokensInfoPage } from './modal-tokens-info.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    ModalTokensInfoPageRoutingModule,
  ],
  declarations: []
})
export class ModalTokensInfoPageModule {}
