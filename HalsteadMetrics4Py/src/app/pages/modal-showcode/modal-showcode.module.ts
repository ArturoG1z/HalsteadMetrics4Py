import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalShowcodePageRoutingModule } from './modal-showcode-routing.module';

import { ModalShowcodePage } from './modal-showcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalShowcodePageRoutingModule
  ],
  declarations: [ModalShowcodePage]
})
export class ModalShowcodePageModule {}
