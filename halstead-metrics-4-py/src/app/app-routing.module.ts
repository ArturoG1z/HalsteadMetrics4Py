import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  // {
  //   path: 'halstead-metrics',
  //   loadChildren: () => import('./pages/halstead-metrics/halstead-metrics.module').then( m => m.HalsteadMetricsPageModule)
  // },
  // {
  //   path: 'saved-calculations',
  //   loadChildren: () => import('./pages/saved-calculations/saved-calculations.module').then( m => m.SavedCalculationsPageModule)
  // },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
