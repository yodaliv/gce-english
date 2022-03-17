import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { CommonService } from '../../core/services/common.service';
import { Question } from '../../core/models/question';
import { ExamService } from '../../core/services/exam.service';
import { ManageQuestionModalComponent } from './manage-question-modal/manage-question-modal.component';

@Component({
  selector: 'app-tab-questions',
  templateUrl: './tab-questions.component.html',
  styleUrls: ['./tab-questions.component.scss'],
})
export class TabQuestionsComponent implements OnInit {

  total = 0;
  isLoading = false;
  examId;
  questions: Question[] = [];

  constructor(
    private commonService: CommonService,
    private examService: ExamService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.examId = this.route.parent.snapshot.params.id;
  }

  ngOnInit() {
    this.questions = [];
    this.loadQuestions();
  }

  ionViewWillEnter() {
  }

  private async loadQuestions() {
    this.isLoading = true;
    try {
      const res = await this.examService.getQuestionsByExamId(this.examId, this.questions.length).toPromise();
      this.total = res.count;
      this.questions = this.questions.concat(res.results.map(x => x.question_details));
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load questions. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  async loadMore(event) {
    await this.loadQuestions();
    event.target.complete();
  }

  async openManageModal() {
    const modal = await this.modalController.create({
      component: ManageQuestionModalComponent,
      componentProps: {examId: this.examId},
      cssClass: 'modal-bottom-option',
      swipeToClose: true,
    });
    await modal.present();
  }
}


