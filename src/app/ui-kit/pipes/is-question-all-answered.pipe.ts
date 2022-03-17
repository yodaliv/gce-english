import { Pipe, PipeTransform } from '@angular/core';
import { Question } from '../../core/models/question';

@Pipe({
  name: 'isQuestionAllAnswered',
  pure: false
})
export class IsQuestionAllAnsweredPipe implements PipeTransform {

  transform(question: Question): boolean {
    if (!question) {
      return false;
    }
    const answers = question.sub_questions.map(x => x.answer).filter(x => x);
    return answers.length === question.sub_questions.length;
  }

}
