import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalTokensInfoPage } from './pages/modal-tokens-info/modal-tokens-info.page';

@NgModule({
  declarations: [AppComponent, ModalTokensInfoPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
