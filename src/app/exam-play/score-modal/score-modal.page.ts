import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { StudentAssignmentStats } from './../../core/models/student';
import { HEADING_TEXT, SCORE_VALUE } from './score-modal.modal';

@Component({
  selector: 'app-score-modal',
  templateUrl: './score-modal.page.html',
  styleUrls: ['./score-modal.page.scss'],
})
export class ScoreModalPage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  @Input() studentStats: StudentAssignmentStats;
  @Input() primaryBtnText = 'REVIEW ANSWERS';

  public headingText = HEADING_TEXT;
  public scoreValue = SCORE_VALUE;

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController
  ) { }

  // Home button click event handler
  goToHome() {
    this.modalController.dismiss({ primary: false });
  }

  // Review answer button click event handler
  primaryClicked() {
    this.modalController.dismiss({ primary: true });
  }

}
