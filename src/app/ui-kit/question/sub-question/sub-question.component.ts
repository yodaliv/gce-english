import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SubQuestion } from 'src/app/core/models/question';

@Component({
  selector: 'app-sub-question',
  templateUrl: './sub-question.component.html',
  styleUrls: ['./sub-question.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SubQuestionComponent),
      multi: true
    }
  ]
})
export class SubQuestionComponent implements ControlValueAccessor {

  @Input() value: SubQuestion = null;
  @Input() showNextBtn = false;
  @Input() showCorrectAnswer = true;
  @Input() allowChange = false;
  @Input() readOnly = false;

  @Output() optionSelected = new EventEmitter();

  onChange;
  onTouch;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  change(value) {
    if (this.onChange) {
      this.onChange(this.value);
      this.optionSelected.emit(value);
    }
  }

  selectAnswer(option) {
    if ( (this.allowChange || !this.value.answer ) && !this.readOnly) {
      this.value.answer = option;
      this.change(this.value);
    }
  }

  getClass(option: string) {
    if (this.value) {
      if (option === this.value.answer) {
        if (option === this.value.correct_answer) {
          return 'valid';
        } else {
          return 'invalid';
        }
      } else if (option === this.value.correct_answer) {
        return 'valid';
      }
    }
    return '';
  }

}
