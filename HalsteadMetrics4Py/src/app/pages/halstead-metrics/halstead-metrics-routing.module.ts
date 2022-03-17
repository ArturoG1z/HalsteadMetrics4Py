import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HalsteadMetricsPage } from './halstead-metrics.page';

const routes: Routes = [
  {
    path: '',
    component: HalsteadMetricsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HalsteadMetricsPageRoutingModule {}
