import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PopMetricsInfoComponent } from './pop-metrics-info/pop-metrics-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopMetricsInfoComponent
  ],
  exports: [
    HeaderComponent,
    PopMetricsInfoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
