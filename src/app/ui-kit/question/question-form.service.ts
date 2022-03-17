import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { SubQuestion } from '../../core/models/question';
import { CommonService } from '../../core/services/common.service';

@Injectable()
export class QuestionFormService {

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
  ) { }

  buildSubQuestionForm(sub?: SubQuestion) {
    const data: SubQuestion = sub || {} as any;
    return this.fb.group({
      question_text: [data.question_text || '', Validators.required],
      data: [{
        options: data.options || ['', '', '', ''],
        correct_answer: data.correct_answer || ''
      }, Validators.required]
    });
  }

  isQuestionValid(value: any) {
    if (!value.passage) {
      this.commonService.showToast('Please enter the main question.');
      return false;
    }
    const subQuestions = value.sub_questions.map(x => this.isSubQuestionValid(x));
    const invalid = subQuestions.find(x => !x);
    if (invalid === false) {
      return false;
    }
    return {
      id: value.id,
      passage: value.passage,
      sub_questions: subQuestions
    };
  }

  isSubQuestionValid(value: any) {
    const subQuestion: SubQuestion = {
      question_text: value.question_text,
      options: value.data.options,
      correct_answer: value.data.correct_answer
    };
    if (!subQuestion.question_text) {
      this.commonService.showToast('Please enter question text.');
      return false;
    }
    if (!subQuestion.correct_answer) {
      this.commonService.showToast('Please select the correct answer.');
      return false;
    }
    if (!subQuestion.options || subQuestion.options.length !== 4 || Boolean(subQuestion.options.find(x => !x || x === ''))) {
      this.commonService.showToast('Please enter all candidate options.');
      return false;
    }
    return subQuestion;
  }
}
