import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IFile } from '../../models/interfaces/interfaces';

@Component({
  selector: 'app-modal-showcode',
  templateUrl: './modal-showcode.page.html',
  styleUrls: ['./modal-showcode.page.scss'],
})
export class ModalShowcodePage implements OnInit {
  @Input() file: IFile;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  exitWithoutArgs() {
    this.modalController.dismiss();
  }
}
