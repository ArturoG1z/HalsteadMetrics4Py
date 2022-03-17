import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { IHalsteadMetricsBForFile } from '../models/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage | null = null;
  constructor(
    private storageCtrl: Storage,
  ) {
    this.init();
  }

  public async setValue(key: string, value: IHalsteadMetricsBForFile) {
    await this.storage?.set(key, value);
  }

  public async getValue(key: string): Promise<IHalsteadMetricsBForFile | null>{
    return await this.storage?.get(key);
  }

  public async keyExists(key: string): Promise<boolean> {
    return await this.storage?.get(key) !== null;
  }

  public async getAllValues() {
    const values: IHalsteadMetricsBForFile[] = [];
    const keys = await this.storage?.keys();
    if (keys) {
      for (const key of keys) {
        const value = await this.storage?.get(key);
        if (value) {
          values.push(value);
        }
      }
    }
    return this.orderById(values);
  }

  public async getMaxId(): Promise<number> {
    const values = await this.getAllValues();
    if (values.length === 0) {
      return 0;
    }
    return Math.max(...values.map(v => v.id));
  }

  private async init() {
    this.storage = await this.storageCtrl.create();
  }

  private orderById(values): IHalsteadMetricsBForFile[] {
    return values.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });
  }

}
