import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { Question } from '../core/models/question';
import { CommonService } from '../core/services/common.service';
import { InfiniquizService } from '../core/services/infiniquiz.service';

@Component({
  selector: 'app-exam-infiniquiz',
  templateUrl: './exam-infiniquiz.page.html',
  styleUrls: ['./exam-infiniquiz.page.scss'],
})
export class ExamInfiniquizPage implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) slider: IonSlides;

  current = 0;
  currentSubQuestionIndex = 0;

  questionAssignments;
  didInit = false;
  questionsForms = new FormArray([]);


  question: Question;

  constructor(
    private infiniquizService: InfiniquizService,
    private commonService: CommonService,
  ) {
  }

  ngOnInit() {
    this.getNextQuiz();
  }

  ngAfterViewInit() {
    this.didInit = true; // TODO: https://github.com/ionic-team/ionic/issues/20356
  }

  async getNextQuiz() {
    const quiz = await this.infiniquizService.getQuiz().toPromise();
    this.questionAssignments = quiz.results;
    this.questionsForms = new FormArray([]);
    this.questionAssignments.forEach( question => {
      this.questionsForms.controls.push(new FormControl(question));
    });
    this.current = 0;
    this.currentSubQuestionIndex = 0;
  }

  async slided(e) {
    this.current = await this.slider.getActiveIndex();
    this.currentSubQuestionIndex = 0;
  }

  async next() {
    if (this.current < this.questionAssignments.length - 1) {
      this.slider.slideNext();
    } else {
      this.getNextQuiz();
    }
  }

  async answerSelected() {
    await this.submitAnswer();
  }

  nextSubQuestionLoaded(index) {
    this.currentSubQuestionIndex = index;
  }

  async submitAnswer() {
    const subQuestion = this.getCurrentSubQuestion();
    const questionId = this.getCurrentQuestionId();
    if (!subQuestion || !questionId) {
      return;
    }
    try {
      await this.infiniquizService.answerQuiz(subQuestion.id, subQuestion.answer).toPromise();
    } catch (e) {
      let message = '';
      if (e.error && e.error.exam) {
        message = e.error.exam;
      } else {
        message = 'Sorry, there is an error!';
      }
      this.commonService.showToast(message);
    }
  }

  startReview() {
    this.slider.slideTo(0);
  }

  totalSubQuestions() {
    return this.questionAssignments ? this.questionAssignments[this.current].sub_questions.length : -1;
  }

  isLastSubQuestion() {
    const totalSubQuestions = this.totalSubQuestions();
    return this.currentSubQuestionIndex === totalSubQuestions - 1;
  }

  getCurrentSubQuestion() {
    return this.questionAssignments[this.current].sub_questions[this.currentSubQuestionIndex];
  }

  getCurrentQuestionId() {
    return this.questionAssignments[this.current].id;
  }

  showFinish() {
    return this.isLastSubQuestion() && this.getCurrentSubQuestion().answer !== undefined;
  }

}
