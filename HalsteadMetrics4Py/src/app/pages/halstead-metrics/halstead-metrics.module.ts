import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HalsteadMetricsPageRoutingModule } from './halstead-metrics-routing.module';

import { HalsteadMetricsPage } from './halstead-metrics.page';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HalsteadMetricsPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [HalsteadMetricsPage]
})
export class HalsteadMetricsPageModule {}
