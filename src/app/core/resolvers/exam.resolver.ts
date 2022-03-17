import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Exam } from '../models/exam';
import { ExamService } from '../services/exam.service';


@Injectable({
  providedIn: 'root'
})
export class ExamResolver implements Resolve<Exam> {

  constructor(
    private examService: ExamService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exam> | Promise<Exam> | Exam {
    const questions$ = this.examService.getQuestionsByExamId(route.params.id);
    const exam$ = this.examService.getExamById(route.params.id);
    return combineLatest([questions$, exam$])
    .pipe(
      switchMap(([questions, exam]) => {
        exam.questions = questions.results;
        return of(exam);
      })
    );
  }
}
