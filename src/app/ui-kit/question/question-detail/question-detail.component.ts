import { Component, EventEmitter, forwardRef, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { Question, SubQuestion } from '../../../core/models/question';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuestionDetailComponent),
      multi: true
    }
  ]
})
export class QuestionDetailComponent implements ControlValueAccessor, OnChanges {

  @ViewChild('stepper') stepper: MatStepper;

  @Input() index: number;
  @Input() allowSkip = false;
  @Input() allowChange = false;
  @Input() hideNext = false;
  @Input() subQuestionIndex = 0;
  @Input() readOnly = false;
  @Input() showQuestionNumber = true;

  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  @Output() subQuestionsLoaded: EventEmitter<any> = new EventEmitter<number>();
  @Output() nextSubQuestionLoaded: EventEmitter<any> = new EventEmitter<any>();
  @Output() nextSubQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Output() answerSelected: EventEmitter<any> = new EventEmitter<any>(true);

  question: Question;
  currentStep = 0;

  value = new FormArray([]);

  onChange;
  onTouched;

  constructor() { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(question: Question): void {
    this.question = question;
    if (!question) {
      return;
    }
    question.sub_questions.forEach( sq => {
      this.value.controls.push(new FormControl(sq));
    });
    const step = question.sub_questions.findIndex( sq => sq.answer === undefined);
    if (step < 0) {
      this.currentStep = 0;
    } else {
      this.currentStep = step;
    }
    this.subQuestionsLoaded.emit(this.currentStep);
    setTimeout(() => {
      if (this.stepper) {
        this.stepper.selectedIndex = this.currentStep;
      }
    });
  }

  change(subQuestion: SubQuestion) {
    if (this.onChange) {
      this.onChange(this.question);
      this.answerSelected.emit({ subQuestion, index: this.currentStep });
    }
  }

  ngOnChanges(changes) {
    if (this.stepper && changes.readOnly) {
      this.stepper.reset();
    }
  }

  async nestedSubQuestionAnswer(subQuestion, index: number) {
    if (this.onChange) {
      this.onChange(this.question);
      this.nextSubQuestion.emit({ subQuestion: subQuestion.value, index: this.currentStep });
    }
    if (index === this.question.sub_questions.length - 1) {
      this.next.emit();
    } else {
      this.currentStep = this.stepper.selectedIndex + 1 ;
      this.stepper.next();
      this.currentStep = this.stepper.selectedIndex;
    }
  }

  async onStepChange({ selectedIndex }) {
    this.nextSubQuestionLoaded.emit(selectedIndex);
  }

}
