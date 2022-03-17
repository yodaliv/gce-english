import { Pipe, PipeTransform } from '@angular/core';
import { StudentLevel, StudentLevelDetail } from '../../core/models/student';

@Pipe({
  name: 'studentLevel'
})
export class StudentLevelPipe implements PipeTransform {

  transform(value: StudentLevel, ...args: any[]): StudentLevelDetail {
    return null;
  }

}
