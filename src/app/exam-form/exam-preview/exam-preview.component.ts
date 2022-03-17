import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

import { StateManageService } from '../../core/services/state-manage.service';
import { QuestionAssignment } from '../../core/models/question';
import { CommonService } from '../../core/services/common.service';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-exam-preview',
  templateUrl: './exam-preview.component.html',
  styleUrls: ['./exam-preview.component.scss'],
})
export class ExamPreviewComponent implements OnInit {

  examId: string;
  questions: QuestionAssignment[] = [];

  constructor(
    private state: StateManageService,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questions = [...this.state.createdQuestions, ...this.state.queriedQuestions.map(x => ({question_details: x}))];
  }

  close() {
    this.modalController.dismiss();
  }

  async askDelete(question: QuestionAssignment, index: number) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: '<div class="font-16 text-dark">Are you sure to delete this question?</div>',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'text-danger font-13 font-weight-normal',
          handler: (blah) => {
            this.deleteQuestion(question, index);
          }
        },
        {
          text: 'Cancel',
          cssClass: 'text-dark font-13 font-weight-normal',
        }
      ]
    });

    await alert.present();
  }

  private async deleteQuestion(question: QuestionAssignment, index: number) {
    if (!question.id) {
      this.questions.splice(index, 1);
      // remove from temporary arrays
      const found = this.state.queriedQuestions.findIndex(x => x.id === question.question_details.id);
      if (found >= 0) {
        this.state.queriedQuestions.splice(index, 1);
      }
    } else {
      const loading = await this.commonService.showLoading('Deleting question...');
      try {
        await this.questionService.deleteQuestionFromExam(this.examId, question.id).toPromise();
        // remove from temporary arrays
        this.questions.splice(index, 1);
        const found = this.state.createdQuestions.findIndex(x => x.id === question.id);
        if (found >= 0) {
          this.state.createdQuestions.splice(index, 1);
        }
      } catch (e) {
        this.commonService.showToast('Sorry, failed to delete question. Please tyr again.');
      } finally {
        await loading.dismiss();
      }
    }
  }

}
