import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scoreLabel'
})
export class ScoreLabelPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value > 90) {
      return '<strong>Awesome!</strong>';
    } else if ( value > 80) {
      return '<strong>Well done!</strong>';
    } else if (value > 70) {
      return '<strong>Good try!</strong>';
    }
    return 'You will do better next time!';
  }

}
