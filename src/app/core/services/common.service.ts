import { Injectable } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { SuccessModalComponent } from '../../ui-kit/common-kit/success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {}

  async showLoading(message: string) {
    const loading =  await this.loadingController.create({message});
    loading.present();
    return loading;
  }

  async showToast(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      duration: 2000,
      message
    });
    await toast.present();
  }

  async openSuccessModal(title: string, description: string, backUrl?: string, btnTitle?: string, replaceUrl: boolean = false) {
    const modal = await this.modalController.create({
      component: SuccessModalComponent,
      componentProps: {title, description, backUrl, btnTitle, replaceUrl},
      swipeToClose: false,
    });
    await modal.present();
  }
}
