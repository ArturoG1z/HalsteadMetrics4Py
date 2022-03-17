import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedCalculationsPageRoutingModule } from './saved-calculations-routing.module';

import { SavedCalculationsPage } from './saved-calculations.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedCalculationsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [SavedCalculationsPage]
})
export class SavedCalculationsPageModule {}
