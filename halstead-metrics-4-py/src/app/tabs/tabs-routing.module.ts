import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tabs/halstead-metrics',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'halstead-metrics',
        loadChildren: () =>
          import('../pages/halstead-metrics/halstead-metrics.module').then(
            (m) => m.HalsteadMetricsPageModule
          ),
      },
      {
        path: 'saved-calculations',
        loadChildren: () =>
          import('../pages/saved-calculations/saved-calculations.module').then(
            (m) => m.SavedCalculationsPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
