import { Component, OnInit, Input } from '@angular/core';
import { IToken } from 'src/app/models/interfaces/interfaces';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal-tokens-info',
  templateUrl: './modal-tokens-info.page.html',
  styleUrls: ['./modal-tokens-info.page.scss'],
})
export class ModalTokensInfoPage implements OnInit {
  @Input() tokenType = '';
  @Input() tokens: IToken[] = [];
  constructor(
    private modalController: ModalController,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
  }
  isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  itemClicked(event, token: IToken) {
    if (this.isOverflown(event.target)) {
      this.presentToast(token.value);
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'middle',
      duration: 400,
      cssClass: 'toast-w-custom-width',
      mode: 'ios',
    });
    toast.present();
  }

  exitWithoutArgs() {
    this.modalController.dismiss();
  }
}
