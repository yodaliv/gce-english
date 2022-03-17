import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Pagination } from '../models/pagination';
import { paginatorParam } from '../utils/api.util';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class InfiniquizService {

  constructor(
    private http: HttpClient
  ) { }

  getQuiz(offset = 0, limit = 10): Observable<Pagination<Question>> {
    const url = `${environment.api}/infiniquiz/`;
    return this.http.get<Pagination<Question>>(url, {params: paginatorParam(offset, limit)});
  }

  answerQuiz(questionId: string, answer: string) {
    const url = `${environment.api}/infiniquiz/answer/`;
    const payload = {
      question: questionId,
      answer,
    };
    return this.http.post<any>(url, payload);
  }

}
