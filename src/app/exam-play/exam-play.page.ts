import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonSlides, ModalController, NavController } from '@ionic/angular';
import { Role } from '../core/models/auth';
import { Exam } from '../core/models/exam';
import { QuestionAssignment } from '../core/models/question';
import { AssignmentService } from '../core/services/assignment.service';
import { CommonService } from '../core/services/common.service';
import { QuestionService } from '../core/services/question.service';
import { StudentAssignmentStats } from './../core/models/student';
import { ScoreModalPage } from './score-modal/score-modal.page';


@Component({
  selector: 'app-exam-play',
  templateUrl: './exam-play.page.html',
  styleUrls: ['./exam-play.page.scss'],
})
export class ExamPlayPage implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) slider: IonSlides;

  current = 0;
  currentSubQuestionIndex = 0;

  exam: Exam = this.route.snapshot.data.assignment.exam;
  assignmentId = this.route.snapshot.data.assignment.id;
  questionAssignments: QuestionAssignment[] = this.exam.questions;
  reviewMode = this.route.snapshot.data.review || false;
  role = this.route.snapshot.data.role[0] || false;

  slideOpts = {
    initialSlide: 0
  };

  didInit = false;
  private totalScoreCount = 0;

  questionsForms = new FormArray([]);

  constructor(
    private modalController: ModalController,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private assignmentService: AssignmentService,
    private questionService: QuestionService,
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    const initialQuestion = this.exam.questions.findIndex( (q, index) => {
      return q.question_details.sub_questions.findIndex( sq => sq.answer === undefined ) >= 0;
    });
    if (initialQuestion > -1) {
      this.current = initialQuestion;
      this.slideOpts.initialSlide = this.current;
    }
    this.prepareFormControls(this.questionAssignments);
  }

  ngAfterViewInit() {
    this.didInit = true; // TODO: https://github.com/ionic-team/ionic/issues/20356
  }

  prepareFormControls(questions) {
    this.questionsForms = new FormArray([]);
    questions.forEach( question => {
      if (question.question_details) {
        this.questionsForms.controls.push(new FormControl(question.question_details));
      } else {
        this.questionsForms.controls.push(new FormControl(question));
      }
    });
  }

  async slided(e) {
    this.current = await this.slider.getActiveIndex();
  }

  async next() {
    if (this.current < this.questionAssignments.length - 1) {
      this.currentSubQuestionIndex = 0;
      this.slider.slideNext();
    } else if (this.role === Role.Student) {
      let response;
      if (!this.reviewMode) {
        try {
          await this.assignmentService.markCompleted(this.assignmentId).toPromise();
        } catch (e) { }
      } else {
        this.reviewMode = false;
      }
      try {
        response = await this.questionService.getReport(this.exam.id, this.assignmentId).toPromise();
        const { correct, total, wrong, answered } = response;
        // NOTE: Need to ask for API change to pass skipped and score props.
        const skipped = total - (correct + wrong);
        const score = correct * 100 / total;
        const stats: StudentAssignmentStats = { correct, total, wrong, answered, skipped, score };
        response.stats = stats;
        this.openScoreModal(response);
      } catch (e) {}
    } else {
      this.navCtrl.back();
    }
  }

  // Open score modal with total and score props
  // Listen to modal dismiss event
  async openScoreModal(report) {
    // const totalQuestions = this.questionAssignments.reduce((total, assignments) =>
    //   assignments.question_details.sub_questions.length + total, 0
    // );
    const modal = await this.modalController.create({
      component: ScoreModalPage,
      swipeToClose: false,
      componentProps: {
        studentStats: report.stats
      }
    });
    // This is modal dismiss event handler
    const dismiss = modal.onWillDismiss();
    dismiss.then((result: any) => {
      if (result.data && result.data.primary) {
        this.prepareFormControls(report.answers);
        this.reviewMode = true;
        this.current = 0;
        this.startReview();
      } else {
        this.navCtrl.back();
      }
    });
    return await modal.present();
  }

  async nextQuestion() {
    if (
      !this.exam.is_practice &&
      !this.reviewMode
    ) {
      await this.submitAnswer();
    }
    this.next();
  }

  async subQuestionsLoaded(subQuestionIndex, questionIndex) {
    if (this.current === questionIndex) {
      this.currentSubQuestionIndex = subQuestionIndex;
    }
  }

  async answerSelected({ subQuestion, index }, questionId) {
    if (this.exam.is_practice && !this.reviewMode) {
      await this.submitAnswer(subQuestion, questionId);
    }
  }

  nextSubQuestion({ subQuestion, index }, questionId) {
    if (!this.exam.is_practice && !this.reviewMode) {
      this.submitAnswer(subQuestion, questionId);
    }
  }

  nextSubQuestionLoaded(index) {
    this.currentSubQuestionIndex = index;
  }

  async submitAnswer(subQuestion = this.getCurrentSubQuestion(), questionId = this.getCurrentQuestionId()) {
    if (!subQuestion || !questionId) {
      return;
    }
    if (this.exam.is_practice && subQuestion.answer === subQuestion.correct_answer) {
      this.totalScoreCount++;
    }
    try {
      this.questionService
        .checkInvisibleAnswer(this.exam.id, this.assignmentId, questionId, subQuestion.id, subQuestion.answer).toPromise();
      if (!this.exam.is_practice) {
        this.totalScoreCount++;
      }
    } catch (e) {
      let message = '';
      if (e.error && e.error.exam) {
        message = e.error.exam;
      } else {
        message = 'Sorry, there is an error!';
      }
      // await this.commonService.showToast(message);
    }
  }

  startReview() {
    this.slider.slideTo(0);
  }

  totalSubQuestions() {
    if (this.questionAssignments[this.current]) {
      return this.questionAssignments[this.current].question_details.sub_questions.length;
    } else {
      return 0;
    }
  }

  isLastSubQuestion() {
    const totalSubQuestions = this.totalSubQuestions();
    return this.currentSubQuestionIndex === totalSubQuestions - 1;
  }

  getCurrentSubQuestion() {
    return this.questionAssignments[this.current].question_details.sub_questions[this.currentSubQuestionIndex];
  }
  getCurrentQuestionId() {
    return this.questionAssignments[this.current].id;
  }

  showFinish() {
    return this.isLastSubQuestion() && !(this.exam.is_practice && this.getCurrentSubQuestion().answer === undefined);
  }

  showFinishLabel() {
    return (this.getCurrentSubQuestion().answer !== undefined || this.reviewMode)
    ? (this.current < this.questionAssignments.length - 1 ? 'Next' : 'Finish')
      : 'Skip';
  }
}
