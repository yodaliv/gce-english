import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'examAssigned'
})
export class ExamAssignedPipe implements PipeTransform {

  transform(exams: number[], examId: number): boolean {
    return exams.findIndex(x => x === examId) >= 0;
  }

}
