import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Exam } from '../models/exam';
import { ExamService } from '../services/exam.service';


@Injectable({
  providedIn: 'root'
})
export class ExamDetailsResolver implements Resolve<Exam> {

  constructor(
    private examService: ExamService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Exam> {
    return this.examService.getExamById(route.params.id);
  }
}
