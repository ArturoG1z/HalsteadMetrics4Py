import { Component, OnInit, ViewChild } from '@angular/core';
import { IFile } from '../../models/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { ModalShowcodePage } from '../modal-showcode/modal-showcode.page';
import hljs from 'highlight.js';
import python from 'highlight.js/lib/languages/python';

@Component({
  selector: 'app-halstead-metrics',
  templateUrl: './halstead-metrics.page.html',
  styleUrls: ['./halstead-metrics.page.scss'],
})
export class HalsteadMetricsPage implements OnInit {
  @ViewChild('fileInput') fileInput;
  file: IFile;
  constructor(
    private modalController: ModalController,
  ) {
    this.file = {
      name: '',
      content: '',
      type: '',
      size: 0
    };
  }

  ngOnInit() {
  }

  openFile() {
    this.fileInput.el.querySelector('input').click();
  }

  onClickClearVariables(e = null) {
    this.file.name = '';
    this.file.content = '';
    this.file.type = '';
    this.file.size = 0;
    this.fileInput.value = '';
  }

  onChangeFile(event) {
    console.log(event.target.files);
    const files = event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      this.file.name = file.name;
      this.file.type = file.type;
      this.file.size = file.size;
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        this.file.content = reader.result as string;
        hljs.registerLanguage('python', python);
        this.file.content = hljs.highlight('python', this.file.content).value;
      };
    }
  }

  async presentCodeModal() {
    const modal = await this.modalController.create({
      component: ModalShowcodePage,
      componentProps: {
        file: this.file
      },
    });
    await modal.present();
    // despues de la animacion de cierre
    const resp = await modal.onDidDismiss();
    // antes de la animacion de cierre
    console.log('resp: ', resp);

    return resp;
  }
}

