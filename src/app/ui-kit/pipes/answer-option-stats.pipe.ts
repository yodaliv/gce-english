import { Pipe, PipeTransform } from '@angular/core';
import { SubQuestion } from '../../core/models/question';

@Pipe({
  name: 'answerOptionStats'
})
export class AnswerOptionStatsPipe implements PipeTransform {

  transform(answer: string, sub: SubQuestion, option: string): string {
    if (sub.correct_answer) {
      if (sub.answer) {
        if (option === sub.answer) {
          return option === sub.correct_answer ? 'valid' : 'invalid';
        } else {
          return option === sub.correct_answer ? 'valid' : '';
        }
      } else {
        return '';
      }
    } else {
      if (sub.answer) {
        return option === sub.answer ? 'valid' : '';
      } else {
        return '';
      }
    }
  }

}
