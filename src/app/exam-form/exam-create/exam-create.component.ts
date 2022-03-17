import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ExamAssignedPipe } from 'src/app/ui-kit/pipes/exam-assigned.pipe';
import { Exam } from '../../core/models/exam';
import { CommonService } from '../../core/services/common.service';
import { ExamInfoFormComponent } from '../exam-info-form/exam-info-form.component';
import { ExamPreviewComponent } from '../exam-preview/exam-preview.component';
import { StateManageService } from '../../core/services/state-manage.service';
import { QuestionService } from '../../core/services/question.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.scss'],
  providers: [ExamAssignedPipe]
})
export class ExamCreatePage implements OnInit {

  @ViewChild(ExamInfoFormComponent) form: ExamInfoFormComponent;
  @ViewChild('stepper') stepper: MatStepper;

  exam: Exam;
  enableStepper = false;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private modalController: ModalController,
    public state: StateManageService,
    private questionService: QuestionService
  ) { }

  ngOnInit() { }

  async createQuiz() {
    const value = this.checkExamFormValidation();
    if (!value) {
      return;
    }
    this.state.createdQuestions = [];
    this.state.queriedQuestions = [];
    this.exam = await this.form.save();
  }

  formUpdated() {
    this.enableStepper = true;
    setTimeout(() => {
      this.stepper.next();
    });
  }

  private checkExamFormValidation() {
    const value = this.form.form.value;
    if (!value.exam_title) {
      this.commonService.showToast('Please enter the exam title');
      return;
    }
    return value;
  }

  createQuestion() {
    if ( this.exam ) {
      this.router.navigate(['exam-form', this.exam.id, 'questions']);
    }
  }

  browseDatabase() {
    if (this.exam) {
      this.router.navigate(['exam-form', this.exam.id, 'search-database']);
    }
  }

  async preview() {
    const modal = await this.modalController.create({
      component: ExamPreviewComponent,
      cssClass: '',
      componentProps: {examId: this.exam.id},
      swipeToClose: true,
    });
    await modal.present();
  }

  async next() {
    switch (this.stepper.selectedIndex) {
      case 0:
        this.createQuiz();
        break;
      case 1:
        if (this.state.queriedQuestions && this.state.queriedQuestions.length) {
          await this.saveQueriedQuestions();
        }
        this.stepper.next();
        break;
    }
  }

  finishHandler() {
    this.commonService.openSuccessModal(
      'Yay!',
      'You have successfully created your test',
      `/exam-form/${this.exam.id}`,
      'VIEW QUIZ',
      true
    );
  }

  async saveQueriedQuestions() {
    const loading = await this.commonService.showLoading('Saving questions...');
    try {
      await this.questionService.saveQuestionsToExam(this.exam.id, this.state.queriedQuestions.map(x => x.id)).toPromise();
    } catch (e) {
      this.commonService.showToast('Sorry, failed  save questions.');
    } finally {
      await loading.dismiss();
    }
  }
}
