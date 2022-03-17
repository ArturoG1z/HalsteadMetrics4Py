import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IFile,
  IHalsteadMetrics,
  IToken,
} from '../../models/interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalShowcodePage } from '../modal-showcode/modal-showcode.page';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';
import halsteadProcessData from '../../utils/processing';
import { ModalTokensInfoPage } from '../modal-tokens-info/modal-tokens-info.page';

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
  metricNames = [
    '# unique operands',
    '# occur. operands',
    '# unique operators',
    '# occur. operators',
    'Program Length',
    'Program Vocabulary',
    'Program Volume',
    'Difficulty',
    'Effort',
    'Time',
    'Bugs',
  ];
  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController
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
    this
      .presentToast(`Now you can process the file ${this.file.name}, you can start this process
    by clicking on the button 'process data' in the floating button down in the screen,
    also you can see the code of the file in a modal pressing the option 'show content in the file'`);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration: 2900,
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
    // antes de la animacion de cierre
    console.log('resp: ', resp);

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
    this.metricsObjectToArray(this.metrics);
  }

  parseFloat(value: number) {
    return parseFloat('' + value);
  }

  metricsObjectToArray(metrics: IHalsteadMetrics) {
    this.metricsArray = [];
    let index = 0;
    for (const key in metrics) {
      if (metrics.hasOwnProperty(key)) {
        if (key === 'initial') {
          for (const secKey in metrics.initial) {
            if (metrics.initial.hasOwnProperty(secKey)) {
              this.metricsArray.push([
                `${secKey}: ${this.metricNames[index]}`,
                metrics.initial[secKey],
              ]);
              index++;
            }
          }
        } else {
          this.metricsArray.push([
            `${key}: ${this.metricNames[index]}`,
            metrics[key],
          ]);
          index++;
        }
      }
    }
  }
}
