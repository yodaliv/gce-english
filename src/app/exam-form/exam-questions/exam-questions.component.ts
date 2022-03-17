import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

import { Exam } from '../../core/models/exam';
import { emptyQuestionAssignment, QuestionAssignment } from '../../core/models/question';
import { CommonService } from '../../core/services/common.service';
import { ExamService } from '../../core/services/exam.service';
import { QuestionEditComponent } from '../../ui-kit/question/question-edit/question-edit.component';
import { StateManageService } from '../../core/services/state-manage.service';

@Component({
  selector: 'app-exam-questions',
  templateUrl: './exam-questions.component.html',
  styleUrls: ['./exam-questions.component.scss'],
})
export class ExamQuestionsComponent implements OnInit {

  @ViewChildren(QuestionEditComponent) editors: QueryList<QuestionEditComponent>;

  total = 0;
  isLoading = false;
  exam: Exam = this.route.snapshot.data.exam;
  questions: QuestionAssignment[] = [];

  backUrl = '/exams';

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private navCtrl: NavController,
    private state: StateManageService
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.questions = [];
    this.loadQuestions();
  }

  private async loadQuestions() {
    if (!this.exam) {
      return;
    }
    this.backUrl = `/exam-form/${this.exam.id}`;
    this.isLoading = true;
    const loading = await this.commonService.showLoading('Loading questions...');
    try {
      const res = await this.examService.getQuestionsByExamId(this.exam.id, this.questions.length).toPromise();
      this.total = res.count;
      this.questions = this.questions.concat(res.results);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to load questions. Please try again.');
    } finally {
      await loading.dismiss();
      this.isLoading = false;
    }
  }

  async loadMore(event) {
    await this.loadQuestions();
    event.target.complete();
  }

  async addQuestion() {
    this.questions.push(emptyQuestionAssignment());
  }

  onSave(question: QuestionAssignment, i: number) {
    this.questions[i] = question;
  }

  finish() {
    this.state.createdQuestions = this.questions;
    this.navCtrl.back();
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  ionViewWillLeave() {
    this.exam = null;
    this.questions = [];
    this.total = 0;
    this.isLoading = false;
  }

}
