import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { QuestionSamplingDialogComponent } from '../question-sampling-dialog/question-sampling-dialog.component';
import { Question } from '../../core/models/question';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  @Input() questions: Question[] = [];
  @Input() limit: number;
  @Output() limitChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async openSamplingDialog() {
    const modal = await this.modalController.create({
      component: QuestionSamplingDialogComponent,
      cssClass: 'modal-bottom-option',
      swipeToClose: true,
      componentProps: {limit: this.limit}
    });
    await modal.present();
    modal.onWillDismiss().then((value: any) => {
      if (value && value.data && value.data.limit) {
        this.limit = value.data.limit;
        this.limitChange.emit(this.limit);
      }
    });
  }

}
