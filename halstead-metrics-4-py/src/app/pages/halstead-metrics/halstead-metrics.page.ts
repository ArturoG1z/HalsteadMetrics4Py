import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IFile,
  IHalsteadMetrics,
  IHalsteadMetricsBForFile,
  IToken,
} from '../../models/interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalShowcodePage } from '../modal-showcode/modal-showcode.page';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';
import halsteadProcessData from '../../utils/processing';
import { ModalTokensInfoPage } from '../modal-tokens-info/modal-tokens-info.page';
import { StorageService } from '../../services/storage.service';
import {
  halsteadDBRowsAreTheSame,
  metricNames,
  metricsObjectToArray,
  myParseFloat,
} from 'src/app/utils/tools';

@Component({
  selector: 'app-halstead-metrics',
  templateUrl: './halstead-metrics.page.html',
  styleUrls: ['./halstead-metrics.page.scss'],
})
export class HalsteadMetricsPage implements OnInit {
  @ViewChild('fileInput') fileInput;
  file: IFile;
  operands: IToken[] = [];
  operators: IToken[] = [];
  errors: string[] = [];
  metrics: IHalsteadMetrics | null = null;
  metricsArray: any[][] = [];
  isItStored = false;
  canBeUpdated = false;
  currRow: IHalsteadMetricsBForFile | null = null;
  myParseFloat = myParseFloat;
  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
    private storageService: StorageService
  ) {
    this.file = {
      name: '',
      content: '',
      contentHTML: '',
      type: '',
      size: 0,
    };
  }

  ngOnInit() {
    this.file = {
      name: '',
      content: '',
      contentHTML: '',
      type: '',
      size: 0,
    };
  }

  openFile() {
    this.fileInput.el.querySelector('input').click();
  }

  onClickClearVariables() {
    this.file.name = '';
    this.file.content = '';
    this.file.type = '';
    this.file.size = 0;
    this.fileInput.value = '';
    this.operands = [];
    this.operators = [];
    this.errors = [];
    this.metrics = null;
    this.isItStored = false;
    this.canBeUpdated = false;
    this.currRow = null;
  }

  async onChangeFile(event) {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }
    //check if is not the same file selected
    const file: File = files.item(0);

    if (this.file.name === file.name && this.file.size === file.size) {
      return;
    }
    this.onClickClearVariables();
    this.file.name = file.name;
    this.file.type = file.type;
    this.file.size = file.size;
    const reader: FileReader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      this.file.content = reader.result as string;
      hljs.registerLanguage('python', python);
      this.file.contentHTML = hljs.highlight('python', this.file.content).value;
    };
    this.presentToast(
      `Now you can process the file ${this.file.name}, you can start this process
    by clicking on the button 'process data' in the floating button down in the screen,
    also you can see the code of the file in a modal pressing the option 'show content in the file'`,
      3000
    );
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration,
      cssClass: 'toast-w-custom-width',
      mode: 'ios',
    });
    toast.present();
  }

  async presentCodeModal() {
    const modal = await this.modalController.create({
      component: ModalShowcodePage,
      componentProps: {
        file: this.file,
      },
    });
    await modal.present();
    // despues de la animacion de cierre
    const resp = await modal.onDidDismiss();

    return resp;
  }

  async presentTokensModal(tokenType: string) {
    const modal = await this.modalController.create({
      component: ModalTokensInfoPage,
      componentProps: {
        tokenType,
        tokens: tokenType === 'Operators' ? this.operators : this.operands,
      },
    });
    await modal.present();
    // despues de la animacion de cierre
    const resp = await modal.onDidDismiss();
    // antes de la animacion de cierre
    console.log('resp: ', resp);

    return resp;
  }

  async onClickProcessData() {
    const data = halsteadProcessData(this.file.content);
    this.operands = data.operands;
    this.operators = data.operators;
    this.errors = data.errors;
    this.metrics = data.halsteadMetrics;
    this.metricsArray = metricsObjectToArray(this.metrics);
    this.isItStored = await this.storageService.keyExists(this.file.name);
    this.currRow = {
      id: -1,
      fileName: this.file.name,
      fileSize: this.file.size,
      metrics: this.metrics,
    };
    let message = '';
    let time = 1400;
    if (this.isItStored) {
      const rowFromDB = await this.storageService.getValue(this.file.name);
      if (halsteadDBRowsAreTheSame(this.currRow, rowFromDB)) {
        message = `This file ${this.file.name} is already stored in the database`;
      } else {
        this.currRow.id = rowFromDB.id;
        this.canBeUpdated = true;
        message = `This file ${this.file.name} is already stored in the database, but it has different metrics`;
      }
    } else {
      message = `The file ${this.file.name} and his metrics are not
      saved in the database, you can store it pressing the button 'save data'`;
      time = 2700;
    }
    this.presentToast(message, time);
  }

  async onClickSaveData() {
    if (this.isItStored && !this.canBeUpdated) { return; }
    this.currRow.id = await this.storageService.getMaxId() + 1;
    await this.storageService.setValue(this.file.name, this.currRow);
    this.presentToast(
      `The file ${this.file.name} and his metrics are saved in the database`,
      1500
    );
    this.isItStored = true;
    this.canBeUpdated = false;
  }
}
