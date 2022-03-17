import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import { Question, QuestionAssignment } from '../../../core/models/question';
import { QuestionFormService } from '../question-form.service';
import { QuestionService } from '../../../core/services/question.service';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-nested-question-form',
  templateUrl: './nested-question-form.component.html',
  styleUrls: ['./nested-question-form.component.scss'],
})
export class NestedQuestionFormComponent implements OnInit, OnDestroy {

  @Input() question: Question;
  @Input() examId: string;
  @Output() created: EventEmitter<QuestionAssignment> = new EventEmitter<QuestionAssignment>();

  isUpdated = false;
  form: FormGroup;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  get sub_questions(): FormArray {
    return this.form.get('sub_questions') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private questionFormService: QuestionFormService,
    private questionService: QuestionService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.buildNestedQuestionForm(this.question);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  addSubQuestion() {
    if (this.questionFormService.isQuestionValid(this.form.value)) {
      this.sub_questions.push(this.questionFormService.buildSubQuestionForm());
    }
  }

  async saveQuestion() {
    const question: Question = this.questionFormService.isQuestionValid(this.form.value) as Question;
    if (!question) {
      return;
    }
    const loading = await this.commonService.showLoading('Saving question...');
    try {
      let res;
      if (question.id) {
        res = await this.questionService.updateQuestion(question.id, question).toPromise();
        this.question = res;
        this.isUpdated = this.isQuestionUpdated(this.form.value);
      } else {
        res = await this.questionService.createQuestion(question).toPromise();
        const questionAssignment = await this.questionService.saveQuestionToExam(this.examId, res.id).toPromise();
        this.question = questionAssignment.question_details;
        this.form.get('id').setValue(this.question.id);
        this.isUpdated = this.isQuestionUpdated(this.form.value);
        // emit saved object to parent
        this.created.emit(questionAssignment);
      }
    } catch (e) {
      this.commonService.showToast('Sorry, failed to save question. Please try again.');
    } finally {
      await loading.dismiss();
    }
  }

  private buildNestedQuestionForm(question?: Question) {
    const data: Question = question || {sub_questions: []} as any;
    this.form = this.fb.group({
      id: data.id,
      passage: [data.passage || '', Validators.required],
      sub_questions: this.fb.array(
        data.sub_questions.length ?
          data.sub_questions.map(x => this.questionFormService.buildSubQuestionForm(x))
          : [this.questionFormService.buildSubQuestionForm()]
      )
    });
    this.unsubscribeAll.next();
    this.form.valueChanges.subscribe(value => {
      this.isUpdated = this.isQuestionUpdated(value);
    });
  }

  private isQuestionUpdated(value) {
    const question = {
      id: this.question.id || null,
      passage: this.question.passage || '',
      sub_questions: this.question.sub_questions.map(sub => {
        return {
          question_text: sub.question_text || '',
          data: {
            options: sub.options || ['', '', '', ''],
            correct_answer: sub.correct_answer || ''
          }
        };
      })
    };
    return JSON.stringify(question) !== JSON.stringify(value);
  }
}
