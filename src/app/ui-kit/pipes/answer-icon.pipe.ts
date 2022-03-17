import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answerIcon'
})
export class AnswerIconPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'valid') {
      return 'checkmark-circle-outline';
    } else if (value === 'invalid') {
      return 'close-circle-outline';
    } else {
      return '';
    }
  }

}
