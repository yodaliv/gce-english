import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { QuestionAssignment, QuestionType } from '../../../core/models/question';
import { CommonService } from '../../../core/services/common.service';
import { QuestionService } from '../../../core/services/question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss'],
})
export class QuestionEditComponent implements OnInit {

  @Input() examId: string;
  @Input() question: QuestionAssignment;
  @Output() save: EventEmitter<QuestionAssignment> = new EventEmitter<QuestionAssignment>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  type = QuestionType.MCQ;
  options = [
    {value: QuestionType.MCQ, icon: 'grid-outline', label: 'MCQ'},
    {value: QuestionType.Cloze, icon: 'apps-outline', label: 'Cloze'},
  ];
  QuestionType = QuestionType;

  constructor(
    private commonService: CommonService,
    private questionService: QuestionService,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    const question = this.question.question_details;
    this.type = !question.passage && question.sub_questions.length === 1 ? QuestionType.MCQ : QuestionType.Cloze;
  }

  onSave(e) {
    this.question = e;
    this.save.emit(this.question);
  }

  async askDelete() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: '<div class="font-16 text-dark">Are you sure to delete this question?</div>',
      buttons: [
        {
          text: 'Delete',
          cssClass: 'text-danger font-13 font-weight-normal',
          handler: (blah) => {
            this.deleteQuestion();
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

  private async deleteQuestion() {
    const loading = await this.commonService.showLoading('Deleting question...');
    try {
      if (this.question.id) {
        await this.questionService.deleteQuestionFromExam(this.examId, this.question.id).toPromise();
        this.delete.emit(this.question.id);
      } else {
        this.delete.emit();
      }
      // this.commonService.showToast('Question has been removed.');
    } catch (e) {
      this.commonService.showToast('Sorry, failed to delete question. Please tyr again.');
    } finally {
      await loading.dismiss();
    }
  }

}
