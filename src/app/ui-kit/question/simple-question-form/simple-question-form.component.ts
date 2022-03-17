import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Question, QuestionAssignment, QuestionType } from '../../../core/models/question';
import { CommonService } from '../../../core/services/common.service';
import { QuestionService } from '../../../core/services/question.service';
import { QuestionFormService } from '../question-form.service';

@Component({
  selector: 'app-simple-question-form',
  templateUrl: './simple-question-form.component.html',
  styleUrls: ['./simple-question-form.component.scss'],
})
export class SimpleQuestionFormComponent implements OnInit, OnDestroy {

  @Input() examId: string;
  @Input() question: Question;
  @Output() created: EventEmitter<QuestionAssignment> = new EventEmitter<QuestionAssignment>();

  isUpdated = false;
  form: FormGroup;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private questionService: QuestionService,
    private questionFormService: QuestionFormService
  ) {
  }

  ngOnInit() {
    this.buildSimpleQuestionForm(this.question);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async saveQuestion(): Promise<Question> {
    const question: Question = this.checkValidator() as Question;
    if (!question) {
      return;
    }
    const loading = await this.commonService.showLoading('Saving question...');
    try {
      let res;
      if (question.id) {
        res = await this.questionService.updateQuestion(question.id, question).toPromise();
      } else {
        res = await this.questionService.createQuestion(question).toPromise();
        const questionAssignment = await this.questionService.saveQuestionToExam(this.examId, res.id).toPromise();
        // emit saved object to parent
        this.created.emit(questionAssignment);
      }
      // check for update
      this.question = res;
      this.buildSimpleQuestionForm(this.question);
      this.isUpdated = this.isQuestionUpdated(this.form.value);
    } catch (e) {
      this.commonService.showToast('Sorry, failed to save your question.');
      return null;
    } finally {
      await loading.dismiss();
    }
  }

  private buildSimpleQuestionForm(question?: Question) {
    const data: Question = question || {sub_questions: []};
    this.form = this.fb.group({
      id: data.id,
      sub_questions: this.fb.array([this.questionFormService.buildSubQuestionForm(question.sub_questions[0])])
    });
    this.unsubscribeAll.next();
    this.form.valueChanges.pipe(takeUntil(this.unsubscribeAll)).subscribe(value => this.isUpdated = this.isQuestionUpdated(value));
  }

  private isQuestionUpdated(value) {
    const sub = this.question.sub_questions[0] || {} as any;
    const question = {
      id: this.question.id || null,
      sub_questions: [
        {
          question_text: sub.question_text || '',
          data: {
            options: sub.options || ['', '', '', ''],
            correct_answer: sub.correct_answer || ''
          }
        }
      ]
    };
    return JSON.stringify(question) !== JSON.stringify(value);
  }

  private checkValidator(): Question | boolean {
    const value = this.form.value;
    const question: Question = {
      id: value.id,
      question_type: QuestionType.MCQ,
      sub_questions: [
        {
          question_text: value.sub_questions[0].question_text,
          options: value.sub_questions[0].data.options,
          correct_answer: value.sub_questions[0].data.correct_answer
        }
      ],
    };
    const sub = question.sub_questions[0];
    if (!sub.question_text) {
      this.commonService.showToast('Please enter question passage.');
      return false;
    }
    if (!sub.correct_answer) {
      this.commonService.showToast('Please select the correct answer.');
      return false;
    }
    if (!sub.options || sub.options.length !== 4 || Boolean(sub.options.find(x => !x || x === ''))) {
      this.commonService.showToast('Please enter all candidate options.');
      return false;
    }
    return question;
  }
}
