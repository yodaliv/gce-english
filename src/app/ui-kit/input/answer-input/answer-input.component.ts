import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CommonService } from '../../../core/services/common.service';
import { LETTERS } from '../../../core/utils/common.util';

@Component({
  selector: 'app-answer-input',
  templateUrl: './answer-input.component.html',
  styleUrls: ['./answer-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AnswerInputComponent),
      multi: true,
    }
  ]
})
export class AnswerInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  value;
  onChange;

  form: FormGroup;
  letters = LETTERS;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  get correct_answer(): string {
    return this.form.get('correct_answer').value;
  }

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService
  ) {
    this.form = this.buildQuestionForm();
    this.subscribeValueChange();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.form = this.buildQuestionForm(obj);
    this.subscribeValueChange();
  }

  selectCorrectAnswer(e, option: string) {
    if (option) {
      this.form.get('correct_answer').setValue(option);
    } else {
      this.commonService.showToast('Please enter the answer first.');
      e.preventDefault();
      e.stopPropagation();
    }
  }

  buildQuestionForm(obj?: any) {
    const data = obj || {options: ['', '', '', '']} as any;
    return this.fb.group({
      options: this.fb.array(data.options ? data.options.map(x => this.buildOptionForm(x)) : []),
      correct_answer: [data.correct_answer || '', Validators.required]
    });
  }

  buildOptionForm(option?: string) {
    return this.fb.group({
      option: [option || '', Validators.required]
    });
  }

  private subscribeValueChange() {
    this.unsubscribeAll.next();
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(value => {
      if (this.onChange) {
        this.onChange({
          ...value,
          options: value.options.map(x => x.option),
        });
      }
    });
  }

}
