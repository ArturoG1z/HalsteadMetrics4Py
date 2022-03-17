import { Component, OnInit } from '@angular/core';
import { PopoverController, ViewDidEnter } from '@ionic/angular';
import { IHalsteadMetricsBForFile } from 'src/app/models/interfaces/interfaces';
import { StorageService } from '../../services/storage.service';
import { PopMetricsInfoComponent } from '../../components/pop-metrics-info/pop-metrics-info.component';

@Component({
  selector: 'app-saved-calculations',
  templateUrl: './saved-calculations.page.html',
  styleUrls: ['./saved-calculations.page.scss'],
})
export class SavedCalculationsPage implements OnInit, ViewDidEnter {
  rows: IHalsteadMetricsBForFile[] = [];
  constructor(
    private storageService: StorageService,
    private popoverCtrl: PopoverController,
  ) { }

  async ngOnInit() {
    await this.getData();
  }

  async ionViewDidEnter() {
    await this.getData();
  }

  async getData() {
    this.rows = await this.storageService.getAllValues();
  }

  async presentPopover(ev: any = null, row: IHalsteadMetricsBForFile) {
    const popover = await this.popoverCtrl.create({
      component: PopMetricsInfoComponent,
      event: ev,
      translucent: true,
      componentProps: {
        metrics: row.metrics,
      },
      alignment: 'center',
      // size: 'cover' // 'auto'
      // backdropDismiss: false,
    });
    // return await popover.present();
    await popover.present();
    //? is more recommended use the onWillDismiss than the onDidDismiss its faster
    const { data } = await popover.onWillDismiss();
    return data;
  }
}
