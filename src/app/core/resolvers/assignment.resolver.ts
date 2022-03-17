import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Assignment } from '../models/assignment';
import { ExamService } from '../services/exam.service';


@Injectable({
  providedIn: 'root'
})
export class AssignmentResolver implements Resolve<Assignment> {

  constructor(
    private examService: ExamService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Assignment> | Promise<Assignment> | Assignment {
    const assignmentId = route.params.id;
    const examId = route.params.examId;

    const questions$ = this.examService.getAssignmentQuestionsByExamId(examId, assignmentId);
    const exam$ = this.examService.getExamById(examId);
    return combineLatest([questions$, exam$])
    .pipe(
      switchMap(([questions, exam]) => {
        exam.questions = questions;
        return of({exam, id: assignmentId, is_completed: false});
      })
    );
  }
}
